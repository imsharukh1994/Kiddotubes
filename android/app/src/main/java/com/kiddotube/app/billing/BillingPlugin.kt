package com.kiddotube.app.billing

import android.util.Log
import com.getcapacitor.JSArray
import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.collectLatest
import kotlinx.coroutines.launch

@CapacitorPlugin(name = "BillingPlugin")
class BillingPlugin : Plugin() {

    private lateinit var billingManager: BillingManager

    override fun load() {
        super.load()
        billingManager = BillingManager.getInstance(context)

        // Observe subscription state and notify Web UI
        CoroutineScope(Dispatchers.Main).launch {
            billingManager.subscriptionState.collectLatest { state ->
                val ret = JSObject()
                ret.put("subscriptionState", state.name)
                ret.put("isPremium", state == SubscriptionState.PREMIUM)
                notifyListeners("subscriptionStatusChanged", ret)
            }
        }
    }

    /**
     * Re-check Google Play every time the app returns to the foreground so an expired or
     * refunded subscription loses Premium without requiring an app restart.
     */
    override fun handleOnResume() {
        super.handleOnResume()
        if (::billingManager.isInitialized) {
            billingManager.queryActivePurchases()
        }
    }

    @PluginMethod
    fun getSubscriptionStatus(call: PluginCall) {
        val state = billingManager.subscriptionState.value
        val ret = JSObject()
        ret.put("subscriptionState", state.name)
        ret.put("isPremium", state == SubscriptionState.PREMIUM)
        call.resolve(ret)
    }

    @PluginMethod
    fun getProducts(call: PluginCall) {
        billingManager.startConnection {
            billingManager.querySubscriptionProducts { products ->
                val productArray = JSArray()
                for (p in products) {
                    val item = JSObject()
                    item.put("productId", p.productId)
                    item.put("basePlanId", p.basePlanId)
                    item.put("formattedPrice", p.formattedPrice)
                    item.put("title", p.title)
                    item.put("description", p.description)
                    item.put("billingPeriod", p.billingPeriod)
                    item.put("offerToken", p.offerToken)
                    productArray.put(item)
                }
                val ret = JSObject()
                ret.put("products", productArray)
                call.resolve(ret)
            }
        }
    }

    @PluginMethod
    fun launchPurchase(call: PluginCall) {
        val activity = activity
        if (activity == null) {
            call.reject("Activity is null")
            return
        }

        val basePlanId = call.getString("basePlanId") ?: BillingConfig.BASE_PLAN_MONTHLY
        if (basePlanId != BillingConfig.BASE_PLAN_MONTHLY && basePlanId != BillingConfig.BASE_PLAN_YEARLY) {
            call.reject("Unknown subscription plan.")
            return
        }

        billingManager.startConnection {
            billingManager.querySubscriptionProducts { products ->
                // Exact match on the Play Console Base Plan ID only. Never fall back to a different plan:
                // a user must not be charged for a plan they did not choose.
                val targetProduct = products.find {
                    it.productId == BillingConfig.PRODUCT_ID_PREMIUM && it.basePlanId == basePlanId
                }

                if (targetProduct != null) {
                    activity.runOnUiThread {
                        billingManager.launchPurchaseFlow(activity, targetProduct)
                    }
                    val ret = JSObject()
                    ret.put("success", true)
                    ret.put("message", "Billing flow launched")
                    call.resolve(ret)
                } else {
                    Log.w("BillingPlugin", "No matching product found on Google Play Console for basePlanId: $basePlanId. Total products found: ${products.size}")
                    call.reject("This subscription plan is not available from Google Play right now. Please try again later.")
                }
            }
        }
    }

    @PluginMethod
    fun restorePurchases(call: PluginCall) {
        billingManager.startConnection {
            billingManager.restorePurchases { resultMsg ->
                val state = billingManager.subscriptionState.value
                val ret = JSObject()
                ret.put("resultMessage", resultMsg)
                ret.put("subscriptionState", state.name)
                ret.put("isPremium", state == SubscriptionState.PREMIUM)
                call.resolve(ret)
            }
        }
    }
}
