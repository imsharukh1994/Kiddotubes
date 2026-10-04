package com.kiddotube.app

import android.os.Bundle
import com.getcapacitor.BridgeActivity
import com.kiddotube.app.billing.BillingPlugin

class MainActivity : BridgeActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        registerPlugin(BillingPlugin::class.java)
        super.onCreate(savedInstanceState)
    }
}