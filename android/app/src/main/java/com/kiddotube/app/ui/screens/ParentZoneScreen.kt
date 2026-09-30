package com.kiddotube.app.ui.screens

import android.app.Activity
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.kiddotube.app.billing.BillingConfig
import com.kiddotube.app.billing.BillingManager
import com.kiddotube.app.billing.SubscriptionState
import com.kiddotube.app.ui.theme.Purple700

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ParentZoneScreen(
    billingManager: BillingManager,
    onBackClick: () -> Unit
) {
    val context = LocalContext.current
    val activity = context as? Activity

    val subscriptionState by billingManager.subscriptionState.collectAsState()
    val subscriptionProducts by billingManager.subscriptionProducts.collectAsState()
    val billingMessage by billingManager.billingMessage.collectAsState()
    val isLoading by billingManager.isLoading.collectAsState()

    // Find monthly product from Google Play Billing
    val monthlyProduct = subscriptionProducts.firstOrNull {
        it.basePlanId == BillingConfig.BASE_PLAN_MONTHLY || it.productId == BillingConfig.PRODUCT_ID_PREMIUM
    }

    val snackbarHostState = remember { SnackbarHostState() }

    LaunchedEffect(billingMessage) {
        billingMessage?.let { msg ->
            snackbarHostState.showSnackbar(msg)
            billingManager.clearBillingMessage()
        }
    }

    Scaffold(
        snackbarHost = { SnackbarHost(hostState = snackbarHostState) },
        topBar = {
            TopAppBar(
                title = {
                    Text(
                        text = "Parent Zone 🔒",
                        fontWeight = FontWeight.Black,
                        color = Color(0xFF0F172A)
                    )
                },
                navigationIcon = {
                    IconButton(onClick = onBackClick) {
                        Icon(
                            imageVector = Icons.Default.ArrowBack,
                            contentDescription = "Back",
                            tint = Color(0xFF0F172A)
                        )
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = Color.White)
            )
        },
        containerColor = Color(0xFFF8FAFC)
    ) { paddingValues ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
                .verticalScroll(rememberScrollState())
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(20.dp)
        ) {
            // Header Banner
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(
                        brush = Brush.linearGradient(
                            colors = listOf(Color(0xFF5B21B6), Color(0xFF3B0764))
                        ),
                        shape = RoundedCornerShape(24.dp)
                    )
                    .padding(24.dp)
            ) {
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.spacedBy(10.dp),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Surface(
                        color = Color(0xFFFDE047),
                        shape = RoundedCornerShape(16.dp),
                        modifier = Modifier.size(56.dp)
                    ) {
                        Box(contentAlignment = Alignment.Center) {
                            Icon(
                                imageVector = Icons.Default.Star,
                                contentDescription = "Crown",
                                tint = Color(0xFF4C1D95),
                                modifier = Modifier.size(32.dp)
                            )
                        }
                    }

                    Surface(
                        color = Color(0x33FDE047),
                        shape = RoundedCornerShape(50),
                        border = androidx.compose.foundation.BorderStroke(1.dp, Color(0x66FDE047))
                    ) {
                        Text(
                            text = "OFFICIAL GOOGLE PLAY BILLING",
                            fontSize = 10.sp,
                            fontWeight = FontWeight.Black,
                            color = Color(0xFFFDE047),
                            modifier = Modifier.padding(horizontal = 12.dp, vertical = 4.dp)
                        )
                    }

                    Text(
                        text = "KiddoTube Premium",
                        fontSize = 24.sp,
                        fontWeight = FontWeight.Black,
                        color = Color.White,
                        textAlign = TextAlign.Center
                    )

                    Text(
                        text = "Safe, 100% ad-free video discovery universe with screen-time controls for your children.",
                        fontSize = 13.sp,
                        color = Color(0xFFDDD6FE),
                        textAlign = TextAlign.Center
                    )
                }
            }

            // Current Subscription Status Card
            Card(
                shape = RoundedCornerShape(20.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.SpaceBetween,
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(16.dp)
                ) {
                    Column {
                        Text(
                            text = "Current Account Status",
                            fontSize = 11.sp,
                            fontWeight = FontWeight.Bold,
                            color = Color(0xFF64748B)
                        )
                        Text(
                            text = when (subscriptionState) {
                                SubscriptionState.PREMIUM -> "KiddoTube Premium Active 🎉"
                                SubscriptionState.PENDING -> "Pending Google Play Approval ⏳"
                                else -> "Free Member Account"
                            },
                            fontSize = 16.sp,
                            fontWeight = FontWeight.Black,
                            color = when (subscriptionState) {
                                SubscriptionState.PREMIUM -> Color(0xFF059669)
                                SubscriptionState.PENDING -> Color(0xFFD97706)
                                else -> Color(0xFF0F172A)
                            }
                        )
                    }

                    if (subscriptionState == SubscriptionState.PREMIUM) {
                        Surface(
                            color = Color(0xFFD1FAE5),
                            shape = RoundedCornerShape(12.dp)
                        ) {
                            Icon(
                                imageVector = Icons.Default.Check,
                                contentDescription = "Active",
                                tint = Color(0xFF059669),
                                modifier = Modifier
                                    .padding(8.dp)
                                    .size(20.dp)
                            )
                        }
                    }
                }
            }

            // Benefits Grid
            Card(
                shape = RoundedCornerShape(20.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(
                    modifier = Modifier.padding(20.dp),
                    verticalArrangement = Arrangement.spacedBy(14.dp)
                ) {
                    Text(
                        text = "Everything Included in Premium",
                        fontSize = 16.sp,
                        fontWeight = FontWeight.Black,
                        color = Color(0xFF0F172A)
                    )

                    val perks = listOf(
                        "🚫 100% Ad-Free Video Playback",
                        "🤖 Unlimited 3D AI Profile Avatars",
                        "⏱️ Automatic Bedtime Screen Time Lock",
                        "👦 Multi-Kid Age-Tailored Feeds",
                        "🎨 PDF Printable Activity Workbooks",
                        "🛡️ Strict YouTube Channel Block & Whitelist"
                    )

                    perks.forEach { perk ->
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.spacedBy(10.dp)
                        ) {
                            Surface(
                                color = Color(0xFFF3E8FF),
                                shape = RoundedCornerShape(8.dp),
                                modifier = Modifier.size(24.dp)
                            ) {
                                Box(contentAlignment = Alignment.Center) {
                                    Icon(
                                        imageVector = Icons.Default.Check,
                                        contentDescription = null,
                                        tint = Purple700,
                                        modifier = Modifier.size(14.dp)
                                    )
                                }
                            }
                            Text(
                                text = perk,
                                fontSize = 13.sp,
                                fontWeight = FontWeight.SemiBold,
                                color = Color(0xFF334155)
                            )
                        }
                    }
                }
            }

            // Google Play Subscription Purchasing Card
            Card(
                shape = RoundedCornerShape(20.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                elevation = CardDefaults.cardElevation(defaultElevation = 4.dp),
                modifier = Modifier
                    .fillMaxWidth()
                    .border(1.5.dp, Color(0xFFDDD6FE), RoundedCornerShape(20.dp))
            ) {
                Column(
                    modifier = Modifier.padding(20.dp),
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.spacedBy(16.dp)
                ) {
                    Text(
                        text = "Google Play Subscription",
                        fontSize = 18.sp,
                        fontWeight = FontWeight.Black,
                        color = Color(0xFF0F172A)
                    )

                    // Display localized price directly from Google Play ProductDetails
                    Surface(
                        color = Color(0xFFFEF3C7),
                        shape = RoundedCornerShape(16.dp),
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Column(
                            horizontalAlignment = Alignment.CenterHorizontally,
                            modifier = Modifier.padding(16.dp)
                        ) {
                            Text(
                                text = monthlyProduct?.formattedPrice ?: "₹99 / month",
                                fontSize = 24.sp,
                                fontWeight = FontWeight.Black,
                                color = Color(0xFF78350F)
                            )
                            Text(
                                text = "Billed monthly via Google Play • Cancel anytime",
                                fontSize = 11.sp,
                                fontWeight = FontWeight.Bold,
                                color = Color(0xFF92400E)
                            )
                        }
                    }

                    // Subscribe Button
                    Button(
                        onClick = {
                            if (activity != null && monthlyProduct != null) {
                                billingManager.launchPurchaseFlow(activity, monthlyProduct)
                            } else {
                                billingManager.startConnection {
                                    billingManager.querySubscriptionProducts()
                                }
                            }
                        },
                        enabled = !isLoading && subscriptionState != SubscriptionState.PREMIUM,
                        colors = ButtonDefaults.buttonColors(
                            containerColor = Color(0xFFEAB308),
                            contentColor = Color(0xFF0F172A)
                        ),
                        shape = RoundedCornerShape(16.dp),
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(52.dp)
                    ) {
                        if (isLoading) {
                            CircularProgressIndicator(
                                modifier = Modifier.size(24.dp),
                                color = Color(0xFF0F172A),
                                strokeWidth = 2.dp
                            )
                        } else {
                            Row(
                                verticalAlignment = Alignment.CenterVertically,
                                horizontalArrangement = Arrangement.spacedBy(8.dp)
                            ) {
                                Icon(
                                    imageVector = Icons.Default.ShoppingCart,
                                    contentDescription = "Subscribe",
                                    modifier = Modifier.size(20.dp)
                                )
                                Text(
                                    text = if (subscriptionState == SubscriptionState.PREMIUM)
                                        "Premium Active"
                                    else
                                        "Subscribe via Google Play",
                                    fontWeight = FontWeight.Black,
                                    fontSize = 15.sp
                                )
                            }
                        }
                    }

                    // Restore Purchases Button
                    // Restore Purchases Button
                    OutlinedButton(
                        onClick = {
                            billingManager.restorePurchases { }
                        },
                        enabled = !isLoading,
                        shape = RoundedCornerShape(14.dp),
                        colors = ButtonDefaults.outlinedButtonColors(contentColor = Purple700),
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.spacedBy(6.dp)
                        ) {
                            Icon(
                                imageVector = Icons.Default.Refresh,
                                contentDescription = "Restore",
                                modifier = Modifier.size(16.dp)
                            )
                            Text(
                                text = "Restore Purchases",
                                fontWeight = FontWeight.Bold,
                                fontSize = 13.sp
                            )
                        }
                    }
                }
            }

            // Next.js Server Backend Settings Card
            var serverUrlText by remember {
                mutableStateOf(com.kiddotube.app.data.api.RetrofitClient.getBaseUrl())
            }
            var saveStatusMsg by remember { mutableStateOf<String?>(null) }

            Card(
                shape = RoundedCornerShape(20.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(
                    modifier = Modifier.padding(20.dp),
                    verticalArrangement = Arrangement.spacedBy(14.dp)
                ) {
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(10.dp)
                    ) {
                        Surface(
                            color = Color(0xFFEDE9FE),
                            shape = RoundedCornerShape(10.dp),
                            modifier = Modifier.size(36.dp)
                        ) {
                            Box(contentAlignment = Alignment.Center) {
                                Icon(
                                    imageVector = Icons.Default.Settings,
                                    contentDescription = null,
                                    tint = Purple700,
                                    modifier = Modifier.size(20.dp)
                                )
                            }
                        }

                        Column {
                            Text(
                                text = "Next.js Backend Connection",
                                fontSize = 16.sp,
                                fontWeight = FontWeight.Black,
                                color = Color(0xFF0F172A)
                            )
                            Text(
                                text = "Set Next.js server IP for real device testing",
                                fontSize = 12.sp,
                                color = Color(0xFF64748B)
                            )
                        }
                    }

                    OutlinedTextField(
                        value = serverUrlText,
                        onValueChange = { serverUrlText = it },
                        label = { Text("Next.js Server Base URL") },
                        placeholder = { Text("http://192.168.1.X:3000") },
                        singleLine = true,
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(12.dp)
                    )

                    Row(
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        FilterChip(
                            selected = serverUrlText.contains("10.0.2.2"),
                            onClick = { serverUrlText = "http://10.0.2.2:3000/" },
                            label = { Text("Emulator (10.0.2.2)", fontSize = 11.sp) }
                        )
                        FilterChip(
                            selected = serverUrlText.contains("localhost") || serverUrlText.contains("127.0.0.1"),
                            onClick = { serverUrlText = "http://127.0.0.1:3000/" },
                            label = { Text("Localhost", fontSize = 11.sp) }
                        )
                    }

                    Button(
                        onClick = {
                            val clean = serverUrlText.trim()
                            if (clean.isNotEmpty()) {
                                com.kiddotube.app.data.api.RetrofitClient.setCustomBaseUrl(clean)
                                val prefs = context.getSharedPreferences("kiddotube_prefs", android.content.Context.MODE_PRIVATE)
                                prefs.edit().putString("custom_backend_url", clean).apply()
                                saveStatusMsg = "Server URL updated successfully!"
                            }
                        },
                        colors = ButtonDefaults.buttonColors(containerColor = Purple700),
                        shape = RoundedCornerShape(12.dp),
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Text("Save & Connect Server", fontWeight = FontWeight.Bold)
                    }

                    saveStatusMsg?.let { msg ->
                        Text(
                            text = msg,
                            color = Color(0xFF059669),
                            fontSize = 12.sp,
                            fontWeight = FontWeight.Bold
                        )
                    }
                }
            }
        }
    }
}
