package com.kiddotube.app.billing

import android.app.Activity
import android.content.Context
import android.util.Log
import com.android.billingclient.api.*
import kotlinx.coroutines.*
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow

/**
 * Centralized Google Play Billing Manager for KiddoTube.
 * Handles BillingClient lifecycle, product queries, purchases, acknowledgements,
 * purchase restoration, and subscription status updates without third-party SDKs.
 */
class BillingManager private constructor(context: Context) : PurchasesUpdatedListener {

    private val applicationContext = context.applicationContext
    private val scope = CoroutineScope(Dispatchers.Main + SupervisorJob())

    private var billingClient: BillingClient? = null
    private var isConnecting = false
    private var reconnectAttempts = 0
    private val maxReconnectAttempts = 3

    private val _subscriptionState = MutableStateFlow(SubscriptionState.UNKNOWN)
    val subscriptionState: StateFlow<SubscriptionState> = _subscriptionState.asStateFlow()

    private val _subscriptionProducts = MutableStateFlow<List<SubscriptionProduct>>(emptyList())
    val subscriptionProducts: StateFlow<List<SubscriptionProduct>> = _subscriptionProducts.asStateFlow()

    private val _billingMessage = MutableStateFlow<String?>(null)
    val billingMessage: StateFlow<String?> = _billingMessage.asStateFlow()

    private val _isLoading = MutableStateFlow(false)
    val isLoading: StateFlow<Boolean> = _isLoading.asStateFlow()

    companion object {
        private const val TAG = "KiddoTubeBilling"

        @Volatile
        private var INSTANCE: BillingManager? = null

        fun getInstance(context: Context): BillingManager {
            return INSTANCE ?: synchronized(this) {
                INSTANCE ?: BillingManager(context).also { INSTANCE = it }
            }
        }
    }

    init {
        setupBillingClient()
    }

    /**
     * Initializes the official Google Play BillingClient.
     */
    private fun setupBillingClient() {
        val pendingParams = PendingPurchasesParams.newBuilder()
            .enableOneTimeProducts()
            .build()

        billingClient = BillingClient.newBuilder(applicationContext)
            .setListener(this)
            .enablePendingPurchases(pendingParams)
            .build()

        startConnection()
    }

    /**
     * Starts connection to Google Play Billing Service safely.
     */
    fun startConnection(onConnected: (() -> Unit)? = null) {
        val client = billingClient ?: return
        if (client.isReady) {
            onConnected?.invoke()
            querySubscriptionProducts()
            queryActivePurchases()
            return
        }

        if (isConnecting) return
        isConnecting = true
        _isLoading.value = true

        client.startConnection(object : BillingClientStateListener {
            override fun onBillingSetupFinished(billingResult: BillingResult) {
                isConnecting = false
                _isLoading.value = false
                if (billingResult.responseCode == BillingClient.BillingResponseCode.OK) {
                    Log.d(TAG, "Connected to Google Play Billing Service")
                    reconnectAttempts = 0
                    querySubscriptionProducts()
                    queryActivePurchases()
                    onConnected?.invoke()
                } else {
                    Log.e(TAG, "Billing setup failed code: ${billingResult.responseCode} - ${billingResult.debugMessage}")
                    _billingMessage.value = mapBillingError(billingResult.responseCode)
                }
            }

            override fun onBillingServiceDisconnected() {
                isConnecting = false
                _isLoading.value = false
                Log.w(TAG, "Google Play Billing Service disconnected. Will retry...")
                retryConnection()
            }
        })
    }

    private fun retryConnection() {
        if (reconnectAttempts < maxReconnectAttempts) {
            reconnectAttempts++
            scope.launch {
                delay(2000L * reconnectAttempts)
                startConnection()
            }
        } else {
            Log.e(TAG, "Max reconnect attempts reached.")
            _billingMessage.value = "Google Play Billing is currently unavailable. Please check your connection."
        }
    }

    /**
     * Queries Google Play for configured subscription products (e.g. kiddotube_premium).
     * Retrieves actual localized price, title, description, and offer details.
     */
    fun querySubscriptionProducts() {
        val client = billingClient
        if (client == null || !client.isReady) {
            startConnection { querySubscriptionProducts() }
            return
        }

        val productList = listOf(
            QueryProductDetailsParams.Product.newBuilder()
                .setProductId(BillingConfig.PRODUCT_ID_PREMIUM)
                .setProductType(BillingClient.ProductType.SUBS)
                .build()
        )

        val params = QueryProductDetailsParams.newBuilder()
            .setProductList(productList)
            .build()

        client.queryProductDetailsAsync(params) { billingResult, productDetailsList ->
            if (billingResult.responseCode == BillingClient.BillingResponseCode.OK) {
                val parsedProducts = mutableListOf<SubscriptionProduct>()

                for (productDetails in productDetailsList) {
                    val offerDetailsList = productDetails.subscriptionOfferDetails ?: emptyList()
                    for (offer in offerDetailsList) {
                        val basePlanId = offer.basePlanId
                        val pricingPhase = offer.pricingPhases.pricingPhaseList.firstOrNull()
                        val formattedPrice = pricingPhase?.formattedPrice ?: "₹99/month"

                        parsedProducts.add(
                            SubscriptionProduct(
                                productId = productDetails.productId,
                                basePlanId = basePlanId,
                                formattedPrice = formattedPrice,
                                title = productDetails.title,
                                description = productDetails.description,
                                billingPeriod = pricingPhase?.billingPeriod ?: "P1M",
                                productDetails = productDetails,
                                offerToken = offer.offerToken
                            )
                        )
                    }
                }

                _subscriptionProducts.value = parsedProducts
                Log.d(TAG, "Queried ${parsedProducts.size} subscription products from Google Play")
            } else {
                Log.e(TAG, "Failed to query products: ${billingResult.debugMessage}")
            }
        }
    }

    /**
     * Launches the official Google Play purchase flow for a parent user.
     */
    fun launchPurchaseFlow(activity: Activity, product: SubscriptionProduct) {
        val client = billingClient
        if (client == null || !client.isReady) {
            _billingMessage.value = "Google Play Store is connecting. Please try again."
            startConnection()
            return
        }

        val productDetailsParamsList = listOf(
            BillingFlowParams.ProductDetailsParams.newBuilder()
                .setProductDetails(product.productDetails)
                .setOfferToken(product.offerToken)
                .build()
        )

        val billingFlowParams = BillingFlowParams.newBuilder()
            .setProductDetailsParamsList(productDetailsParamsList)
            .build()

        _isLoading.value = true
        val billingResult = client.launchBillingFlow(activity, billingFlowParams)
        if (billingResult.responseCode != BillingClient.BillingResponseCode.OK) {
            _isLoading.value = false
            _billingMessage.value = mapBillingError(billingResult.responseCode)
            Log.e(TAG, "Failed to launch billing flow: ${billingResult.debugMessage}")
        }
    }

    /**
     * Google Play PurchasesUpdatedListener callback implementation.
     */
    override fun onPurchasesUpdated(billingResult: BillingResult, purchases: List<Purchase>?) {
        _isLoading.value = false
        when (billingResult.responseCode) {
            BillingClient.BillingResponseCode.OK -> {
                if (!purchases.isNullOrEmpty()) {
                    for (purchase in purchases) {
                        handlePurchase(purchase)
                    }
                }
            }
            BillingClient.BillingResponseCode.USER_CANCELED -> {
                Log.d(TAG, "User canceled the purchase flow.")
                _billingMessage.value = "Purchase canceled."
            }
            BillingClient.BillingResponseCode.ITEM_ALREADY_OWNED -> {
                Log.d(TAG, "Item already owned. Refreshing subscription state...")
                _billingMessage.value = "You are already subscribed to KiddoTube Premium!"
                queryActivePurchases()
            }
            else -> {
                Log.e(TAG, "Purchase updated error: ${billingResult.debugMessage}")
                _billingMessage.value = mapBillingError(billingResult.responseCode)
            }
        }
    }

    /**
     * Validates, processes, and acknowledges Google Play purchases.
     */
    private fun handlePurchase(purchase: Purchase) {
        if (purchase.products.contains(BillingConfig.PRODUCT_ID_PREMIUM)) {
            when (purchase.purchaseState) {
                Purchase.PurchaseState.PURCHASED -> {
                    if (!purchase.isAcknowledged) {
                        acknowledgePurchase(purchase)
                    } else {
                        _subscriptionState.value = SubscriptionState.PREMIUM
                        _billingMessage.value = "Welcome to KiddoTube Premium!"
                    }
                }
                Purchase.PurchaseState.PENDING -> {
                    _subscriptionState.value = SubscriptionState.PENDING
                    _billingMessage.value = "Your purchase is pending approval from Google Play."
                }
                else -> {
                    _subscriptionState.value = SubscriptionState.FREE
                }
            }
        }
    }

    /**
     * Acknowledges a subscription purchase using official Google Play Billing API.
     */
    private fun acknowledgePurchase(purchase: Purchase) {
        val client = billingClient ?: return
        val acknowledgePurchaseParams = AcknowledgePurchaseParams.newBuilder()
            .setPurchaseToken(purchase.purchaseToken)
            .build()

        client.acknowledgePurchase(acknowledgePurchaseParams) { billingResult ->
            if (billingResult.responseCode == BillingClient.BillingResponseCode.OK) {
                Log.d(TAG, "Purchase acknowledged successfully.")
                _subscriptionState.value = SubscriptionState.PREMIUM
                _billingMessage.value = "KiddoTube Premium is now active!"
            } else {
                Log.e(TAG, "Failed to acknowledge purchase: ${billingResult.debugMessage}")
                _billingMessage.value = "Subscription active, but acknowledgement pending."
            }
        }
    }

    /**
     * Queries active purchases from Google Play Store (app launch / restoration / parent zone).
     */
    fun queryActivePurchases(onComplete: ((Boolean) -> Unit)? = null) {
        val client = billingClient
        if (client == null || !client.isReady) {
            startConnection { queryActivePurchases(onComplete) }
            return
        }

        val params = QueryPurchasesParams.newBuilder()
            .setProductType(BillingClient.ProductType.SUBS)
            .build()

        client.queryPurchasesAsync(params) { billingResult, purchasesList ->
            if (billingResult.responseCode == BillingClient.BillingResponseCode.OK) {
                val activePremiumPurchase = purchasesList.firstOrNull { purchase ->
                    purchase.products.contains(BillingConfig.PRODUCT_ID_PREMIUM) &&
                            purchase.purchaseState == Purchase.PurchaseState.PURCHASED
                }

                if (activePremiumPurchase != null) {
                    if (!activePremiumPurchase.isAcknowledged) {
                        acknowledgePurchase(activePremiumPurchase)
                    } else {
                        _subscriptionState.value = SubscriptionState.PREMIUM
                    }
                    onComplete?.invoke(true)
                } else {
                    val pendingPurchase = purchasesList.firstOrNull { purchase ->
                        purchase.products.contains(BillingConfig.PRODUCT_ID_PREMIUM) &&
                                purchase.purchaseState == Purchase.PurchaseState.PENDING
                    }
                    if (pendingPurchase != null) {
                        _subscriptionState.value = SubscriptionState.PENDING
                    } else {
                        _subscriptionState.value = SubscriptionState.FREE
                    }
                    onComplete?.invoke(false)
                }
            } else {
                Log.e(TAG, "Error querying active purchases: ${billingResult.debugMessage}")
                onComplete?.invoke(false)
            }
        }
    }

    /**
     * Restores existing Google Play purchases.
     */
    fun restorePurchases(onResult: (String) -> Unit) {
        _isLoading.value = true
        queryActivePurchases { hasActive ->
            _isLoading.value = false
            val message = if (hasActive) {
                "KiddoTube Premium restored successfully!"
            } else {
                "No active KiddoTube Premium subscription was found."
            }
            _billingMessage.value = message
            onResult(message)
        }
    }

    /**
     * Clears transient error messages.
     */
    fun clearBillingMessage() {
        _billingMessage.value = null
    }

    /**
     * Converts raw BillingResponseCode into friendly user messages.
     */
    private fun mapBillingError(responseCode: Int): String {
        return when (responseCode) {
            BillingClient.BillingResponseCode.SERVICE_UNAVAILABLE ->
                "Google Play Billing service is currently unavailable. Please check your network connection."
            BillingClient.BillingResponseCode.BILLING_UNAVAILABLE ->
                "Google Play Billing is not supported on this device or account."
            BillingClient.BillingResponseCode.ITEM_UNAVAILABLE ->
                "The requested subscription is currently unavailable in your region."
            BillingClient.BillingResponseCode.DEVELOPER_ERROR ->
                "Billing configuration error. Please verify Google Play Console settings."
            BillingClient.BillingResponseCode.ERROR ->
                "An unexpected error occurred while communicating with Google Play."
            else -> "Google Play Billing error ($responseCode). Please try again later."
        }
    }

    /**
     * Disconnects safely on app shutdown.
     */
    fun endConnection() {
        billingClient?.endConnection()
        billingClient = null
    }
}
