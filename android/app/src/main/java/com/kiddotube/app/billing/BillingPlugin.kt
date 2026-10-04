package com.kiddotube.app.billing

import android.util.Log
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

    @PluginMethod
    fun getSubscriptionStatus(call: PluginCall) {
        val state = billingManager.subscriptionState.value
        val ret = JSObject()
        ret.put("subscriptionState", state.name)
        ret.put("isPremium", state == SubscriptionState.PREMIUM)
        call.resolve(ret)
    }

    @PluginMethod
    fun launchPurchase(call: PluginCall) {
        val activity = activity
        if (activity == null) {
            call.reject("Activity is null")
            return
        }

        val basePlanId = call.getString("basePlanId") ?: "monthly"

        billingManager.startConnection {
            val products = billingManager.subscriptionProducts.value
            val targetProduct = products.find { it.basePlanId == basePlanId || it.productId == BillingConfig.PRODUCT_ID_PREMIUM }

            if (targetProduct != null) {
                activity.runOnUiThread {
                    billingManager.launchPurchaseFlow(activity, targetProduct)
                }
                val ret = JSObject()
                ret.put("success", true)
                ret.put("message", "Billing flow launched")
                call.resolve(ret)
            } else {
                Log.w("BillingPlugin", "No matching product found on Google Play Console for basePlanId: $basePlanId")
                call.reject("Product not available on Google Play. Make sure 'kiddotube_premium' is published in Google Play Console.")
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
