package com.kiddotube.app.data.api

import com.kiddotube.app.data.model.ApiResponse
import com.kiddotube.app.data.model.VideoItem
import retrofit2.Response
import retrofit2.http.GET
import retrofit2.http.Query

interface KiddoTubeApiService {

    @GET("api/youtube/search")
    suspend fun searchVideos(
        @Query("q") query: String,
        @Query("limit") limit: Int = 12
    ): Response<ApiResponse<List<VideoItem>>>

    @GET("api/youtube/videos")
    suspend fun getVideoDetails(
        @Query("id") videoId: String
    ): Response<ApiResponse<VideoItem>>

    @GET("api/youtube/videos")
    suspend fun getMultipleVideoDetails(
        @Query("ids") videoIds: String
    ): Response<ApiResponse<List<VideoItem>>>
}
