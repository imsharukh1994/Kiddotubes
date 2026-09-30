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

    private val _isOfflineMode = MutableStateFlow(false)
    val isOfflineMode: StateFlow<Boolean> = _isOfflineMode.asStateFlow()

    companion object {
        val FALLBACK_VIDEOS = listOf(
            VideoItem(
                id = "_slpLnBoHek",
                title = "Meow Meow Billi Karti | Hindi Rhyme For Kids | Balgeet In Hindi",
                description = "Fun educational nursery rhymes for toddlers and kids with cute animated characters.",
                channelTitle = "Zolotune Toons",
                publishedAt = "2024-01-15T00:00:00Z",
                duration = "6:16",
                categorySlug = "2-4"
            ),
            VideoItem(
                id = "fC7oUOUEEi4",
                title = "Wheels on the Bus Go Round and Round | CoComelon Nursery Rhymes",
                description = "Sing along with JJ and family to the classic nursery rhyme Wheels on the Bus!",
                channelTitle = "CoComelon - Nursery Rhymes",
                publishedAt = "2024-02-10T00:00:00Z",
                duration = "3:32",
                categorySlug = "2-4"
            ),
            VideoItem(
                id = "XqZsoesa55w",
                title = "Baby Shark Dance | #babyshark Most Viewed Video",
                description = "Sing and dance along with Baby Shark, Mommy Shark, Daddy Shark and friends!",
                channelTitle = "Pinkfong Baby Shark",
                publishedAt = "2024-01-01T00:00:00Z",
                duration = "2:16",
                categorySlug = "2-4"
            ),
            VideoItem(
                id = "t0Q2otsqC4I",
                title = "Learn ABC Alphabet Phonics Song for Kids & Toddlers",
                description = "Learn letters A to Z with Phonics sounds and colorful animations.",
                channelTitle = "Super Simple Songs",
                publishedAt = "2024-03-05T00:00:00Z",
                duration = "4:45",
                categorySlug = "2-4"
            ),
            VideoItem(
                id = "30pY7-F-JdI",
                title = "30 Cute Animal Sounds for Kids | Real Animal Sounds for Toddlers",
                description = "Learn wild animals and farm animals sounds with fun 4K visuals.",
                channelTitle = "Kids Learning Fun",
                publishedAt = "2024-02-20T00:00:00Z",
                duration = "8:22",
                categorySlug = "5-7"
            ),
            VideoItem(
                id = "71h8MZKFkt4",
                title = "Solar System Song for Kids | Planet Song Educational Discovery",
                description = "Explore Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune!",
                channelTitle = "Kids Learning Tube",
                publishedAt = "2024-01-20T00:00:00Z",
                duration = "5:10",
                categorySlug = "5-7"
            ),
            VideoItem(
                id = "dp1_xV0-R0k",
                title = "Bedtime Lullaby Calm Music for Babies to Sleep",
                description = "Gentle relaxing music and calm twinkling stars for bedtime sleep.",
                channelTitle = "Lullaby World",
                publishedAt = "2024-01-10T00:00:00Z",
                duration = "12:00",
                categorySlug = "2-4"
            ),
            VideoItem(
                id = "hTqtGJwsJVE",
                title = "Easy Drawing & Painting Craft Tutorial for Kids",
                description = "Step by step easy drawing for kids to boost creativity and imagination.",
                channelTitle = "Art for Kids Hub",
                publishedAt = "2024-03-01T00:00:00Z",
                duration = "7:40",
                categorySlug = "8-12"
            )
        )
    }

    suspend fun searchVideos(query: String, limit: Int = 12): List<VideoItem> {
        return try {
            val response = RetrofitClient.apiService.searchVideos(query, limit)
            if (response.isSuccessful && response.body()?.success == true && !response.body()?.data.isNullOrEmpty()) {
                _isOfflineMode.value = false
                response.body()?.data ?: getFallbackVideosForQuery(query, limit)
            } else {
                _isOfflineMode.value = true
                getFallbackVideosForQuery(query, limit)
            }
        } catch (e: Exception) {
            e.printStackTrace()
            _isOfflineMode.value = true
            getFallbackVideosForQuery(query, limit)
        }
    }

    private fun getFallbackVideosForQuery(query: String, limit: Int): List<VideoItem> {
        val lower = query.lowercase()
        val filtered = FALLBACK_VIDEOS.filter {
            it.title.lowercase().contains(lower) ||
            it.description.lowercase().contains(lower) ||
            (it.categorySlug != null && lower.contains(it.categorySlug.lowercase()))
        }
        val result = if (filtered.isNotEmpty()) filtered else FALLBACK_VIDEOS
        return result.take(limit)
    }

    suspend fun getVideoDetails(videoId: String): VideoItem? {
        return try {
            val response = RetrofitClient.apiService.getVideoDetails(videoId)
            if (response.isSuccessful && response.body()?.success == true && response.body()?.data != null) {
                _isOfflineMode.value = false
                response.body()?.data
            } else {
                _isOfflineMode.value = true
                FALLBACK_VIDEOS.find { it.id == videoId } ?: FALLBACK_VIDEOS.firstOrNull()
            }
        } catch (e: Exception) {
            e.printStackTrace()
            _isOfflineMode.value = true
            FALLBACK_VIDEOS.find { it.id == videoId } ?: FALLBACK_VIDEOS.firstOrNull()
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
