package com.kiddotube.app.data.repository

import android.content.Context
import android.content.SharedPreferences
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import com.kiddotube.app.data.api.RetrofitClient
import com.kiddotube.app.data.model.VideoItem
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow

class VideoRepository(context: Context) {

    private val prefs: SharedPreferences =
        context.getSharedPreferences("kiddotube_prefs", Context.MODE_PRIVATE)
    private val gson = Gson()

    private val _favorites = MutableStateFlow<List<VideoItem>>(getSavedFavorites())
    val favorites: StateFlow<List<VideoItem>> = _favorites.asStateFlow()

    private val _history = MutableStateFlow<List<VideoItem>>(getSavedHistory())
    val history: StateFlow<List<VideoItem>> = _history.asStateFlow()

    suspend fun searchVideos(query: String, limit: Int = 12): List<VideoItem> {
        return try {
            val response = RetrofitClient.apiService.searchVideos(query, limit)
            if (response.isSuccessful && response.body()?.success == true) {
                response.body()?.data ?: emptyList()
            } else {
                emptyList()
            }
        } catch (e: Exception) {
            e.printStackTrace()
            emptyList()
        }
    }

    suspend fun getVideoDetails(videoId: String): VideoItem? {
        return try {
            val response = RetrofitClient.apiService.getVideoDetails(videoId)
            if (response.isSuccessful && response.body()?.success == true) {
                response.body()?.data
            } else {
                null
            }
        } catch (e: Exception) {
            e.printStackTrace()
            null
        }
    }

    // Local Favorites
    private fun getSavedFavorites(): List<VideoItem> {
        val json = prefs.getString("favorites", null) ?: return emptyList()
        val type = object : TypeToken<List<VideoItem>>() {}.type
        return try {
            gson.fromJson(json, type)
        } catch (e: Exception) {
            emptyList()
        }
    }

    fun isFavorite(videoId: String): Boolean {
        return _favorites.value.any { it.id == videoId }
    }

    fun toggleFavorite(video: VideoItem): Boolean {
        val current = _favorites.value.toMutableList()
        val index = current.indexOfFirst { it.id == video.id }
        val isFav: Boolean

        if (index >= 0) {
            current.removeAt(index)
            isFav = false
        } else {
            current.add(0, video)
            isFav = true
        }

        prefs.edit().putString("favorites", gson.toJson(current)).apply()
        _favorites.value = current
        return isFav
    }

    // Local Recently Watched
    private fun getSavedHistory(): List<VideoItem> {
        val json = prefs.getString("history", null) ?: return emptyList()
        val type = object : TypeToken<List<VideoItem>>() {}.type
        return try {
            gson.fromJson(json, type)
        } catch (e: Exception) {
            emptyList()
        }
    }

    fun addRecentlyWatched(video: VideoItem) {
        val current = _history.value.filter { it.id != video.id }.toMutableList()
        current.add(0, video)
        if (current.size > 30) current.removeAt(current.size - 1)

        prefs.edit().putString("history", gson.toJson(current)).apply()
        _history.value = current
    }
}
