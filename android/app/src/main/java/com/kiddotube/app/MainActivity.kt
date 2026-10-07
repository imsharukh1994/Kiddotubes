package com.kiddotube.app

import android.os.Bundle
import androidx.activity.enableEdgeToEdge
import com.getcapacitor.BridgeActivity
import com.kiddotube.app.billing.BillingPlugin

class MainActivity : BridgeActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        enableEdgeToEdge()
        registerPlugin(BillingPlugin::class.java)
        super.onCreate(savedInstanceState)
    }
}