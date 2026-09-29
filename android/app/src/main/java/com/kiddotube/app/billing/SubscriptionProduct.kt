package com.kiddotube.app.billing

import com.android.billingclient.api.ProductDetails

/**
 * Configurable product identifiers for KiddoTube Google Play subscriptions.
 */
object BillingConfig {
    const val PRODUCT_ID_PREMIUM = "kiddotube_premium"
    const val BASE_PLAN_MONTHLY = "monthly"
    const val BASE_PLAN_YEARLY = "yearly" // Configured for seamless future expansion
}

/**
 * Represents a subscription product queried dynamically from Google Play Billing.
 * Price and duration are sourced directly from Google Play, never hard-coded.
 */
data class SubscriptionProduct(
    val productId: String,
    val basePlanId: String,
    val formattedPrice: String,
    val title: String,
    val description: String,
    val billingPeriod: String,
    val productDetails: ProductDetails,
    val offerToken: String
)
