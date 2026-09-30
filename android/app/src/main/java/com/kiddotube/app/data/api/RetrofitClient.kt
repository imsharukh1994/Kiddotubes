package com.kiddotube.app.data.api

import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import java.util.concurrent.TimeUnit

object RetrofitClient {

    private const val DEFAULT_BASE_URL = "http://10.0.2.2:3000/"
    private var baseUrl: String = DEFAULT_BASE_URL

    fun init(context: android.content.Context) {
        val prefs = context.getSharedPreferences("kiddotube_prefs", android.content.Context.MODE_PRIVATE)
        val savedUrl = prefs.getString("custom_backend_url", null)
        if (!savedUrl.isNullOrEmpty() && savedUrl.isNotBlank()) {
            setCustomBaseUrl(savedUrl)
        }
    }

    fun getBaseUrl(): String = baseUrl

    fun setCustomBaseUrl(url: String) {
        val cleanUrl = url.trim()
        baseUrl = if (cleanUrl.endsWith("/")) cleanUrl else "$cleanUrl/"
        apiService = createService()
    }

    private val loggingInterceptor = HttpLoggingInterceptor().apply {
        level = HttpLoggingInterceptor.Level.BODY
    }

    private val okHttpClient = OkHttpClient.Builder()
        .addInterceptor(loggingInterceptor)
        .connectTimeout(8, TimeUnit.SECONDS)
        .readTimeout(8, TimeUnit.SECONDS)
        .build()

    private fun createService(): KiddoTubeApiService {
        return Retrofit.Builder()
            .baseUrl(baseUrl)
            .client(okHttpClient)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
            .create(KiddoTubeApiService::class.java)
    }

    var apiService: KiddoTubeApiService = createService()
}
