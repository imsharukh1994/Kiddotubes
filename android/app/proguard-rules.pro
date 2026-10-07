# Capacitor Core and Plugins
-keep class com.getcapacitor.** { *; }
-keep class com.capacitorjs.** { *; }

# Application Models (Gson parsing)
-keep class com.kiddotube.app.data.model.** { *; }
-keep class com.kiddotube.app.billing.** { *; }

# Keep Billing classes
-keep class com.android.billingclient.** { *; }

# Keep MainActivity and Capacitor plugins
-keep class com.kiddotube.app.MainActivity { *; }
-keep public class * extends com.getcapacitor.Plugin { *; }

# Retrofit/Gson
-keepattributes Signature
-keepattributes *Annotation*
-keep class retrofit2.** { *; }
-keepclasseswithmembers class * {
    @retrofit2.http.* <methods>;
}
-keep class com.google.gson.** { *; }
