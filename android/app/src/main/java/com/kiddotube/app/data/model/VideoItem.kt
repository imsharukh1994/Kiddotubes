package com.kiddotube.app.data.model

import com.google.gson.annotations.SerializedName

data class VideoThumbnail(
    val url: String,
    val width: Int? = null,
    val height: Int? = null
)

data class ThumbnailsMap(
    val default: VideoThumbnail? = null,
    val medium: VideoThumbnail? = null,
    val high: VideoThumbnail? = null,
    val maxres: VideoThumbnail? = null
)

data class VideoItem(
    val id: String,
    val title: String,
    val description: String,
    val channelTitle: String,
    val channelId: String? = null,
    val publishedAt: String,
    val duration: String? = "0:00",
    val thumbnails: ThumbnailsMap? = null,
    val categorySlug: String? = null
) {
    fun getBestThumbnailUrl(): String {
        return thumbnails?.high?.url
            ?: thumbnails?.medium?.url
            ?: thumbnails?.default?.url
            ?: "https://img.youtube.com/vi/$id/hqdefault.jpg"
    }
}

data class ApiResponse<T>(
    val success: Boolean,
    val data: T?,
    val error: String? = null
)
