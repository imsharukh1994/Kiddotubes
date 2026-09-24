package com.kiddotube.app.data.api

import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import java.util.concurrent.TimeUnit

object RetrofitClient {

    // Default to Android Emulator loopback host for Next.js dev server running on port 3000
    private var baseUrl: String = "http://10.0.2.2:3000/"

    fun setCustomBaseUrl(url: String) {
        baseUrl = if (url.endsWith("/")) url else "$url/"
        apiService = createService()
    }

    private val loggingInterceptor = HttpLoggingInterceptor().apply {
        level = HttpLoggingInterceptor.Level.BODY
    }

    private val okHttpClient = OkHttpClient.Builder()
        .addInterceptor(loggingInterceptor)
        .connectTimeout(15, TimeUnit.SECONDS)
        .readTimeout(15, TimeUnit.SECONDS)
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
