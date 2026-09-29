package com.kiddotube.app.billing

import android.content.Context
import android.content.SharedPreferences
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.*

/**
 * Repository that exposes subscription status to KiddoTube UI screens and ViewModels.
 * Synchronizes local cache with the primary source of truth: Google Play Billing.
 */
class SubscriptionRepository(context: Context) {

    private val applicationContext = context.applicationContext
    private val billingManager = BillingManager.getInstance(applicationContext)
    private val prefs: SharedPreferences =
        applicationContext.getSharedPreferences("kiddotube_billing_prefs", Context.MODE_PRIVATE)

    private val scope = CoroutineScope(Dispatchers.Main)

    val subscriptionState: StateFlow<SubscriptionState> = billingManager.subscriptionState
    val subscriptionProducts: StateFlow<List<SubscriptionProduct>> = billingManager.subscriptionProducts
    val billingMessage: StateFlow<String?> = billingManager.billingMessage
    val isLoading: StateFlow<Boolean> = billingManager.isLoading

    val isPremium: StateFlow<Boolean> = subscriptionState.map { state ->
        val active = state == SubscriptionState.PREMIUM
        saveCachedPremiumState(active)
        active
    }.stateIn(scope, SharingStarted.Eagerly, getCachedPremiumState())

    init {
        // Refresh active purchases from Google Play on repository creation
        billingManager.queryActivePurchases()
    }

    fun refreshSubscriptionStatus() {
        billingManager.queryActivePurchases()
    }

    fun restorePurchases(onResult: (String) -> Unit) {
        billingManager.restorePurchases(onResult)
    }

    fun clearMessage() {
        billingManager.clearBillingMessage()
    }

    private fun getCachedPremiumState(): Boolean {
        return prefs.getBoolean("is_premium_cached", false)
    }

    private fun saveCachedPremiumState(isPremium: Boolean) {
        prefs.edit().putBoolean("is_premium_cached", isPremium).apply()
    }
}
