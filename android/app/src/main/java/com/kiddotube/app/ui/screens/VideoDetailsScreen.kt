package com.kiddotube.app.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Favorite
import androidx.compose.material.icons.filled.FavoriteBorder
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.kiddotube.app.data.model.VideoItem
import com.kiddotube.app.data.repository.VideoRepository
import com.kiddotube.app.ui.components.VideoCard
import com.kiddotube.app.ui.components.YouTubeWebView
import com.kiddotube.app.ui.theme.Pink500
import com.kiddotube.app.ui.theme.Purple700
import kotlinx.coroutines.launch

@Composable
fun VideoDetailsScreen(
    videoId: String,
    repository: VideoRepository,
    onVideoClick: (String) -> Unit
) {
    var video by remember { mutableStateOf<VideoItem?>(null) }
    var relatedVideos by remember { mutableStateOf<List<VideoItem>>(emptyList()) }
    var isLoading by remember { mutableStateOf(true) }
    var isFav by remember { mutableStateOf(repository.isFavorite(videoId)) }
    val scope = rememberCoroutineScope()

    LaunchedEffect(videoId) {
        scope.launch {
            isLoading = true
            val details = repository.getVideoDetails(videoId)
            video = details
            isFav = repository.isFavorite(videoId)

            if (details != null) {
                repository.addRecentlyWatched(details)
                relatedVideos = repository.searchVideos("${details.channelTitle} kids", 6)
                    .filter { it.id != videoId }
            }
            isLoading = false
        }
    }

    if (isLoading) {
        Box(
            modifier = Modifier.fillMaxSize(),
            contentAlignment = Alignment.Center
        ) {
            CircularProgressIndicator(color = Purple700)
        }
    } else {
        LazyColumn(
            modifier = Modifier.fillMaxSize(),
            contentPadding = PaddingValues(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            item {
                YouTubeWebView(videoId = videoId)
            }

            video?.let { v ->
                item {
                    Card(
                        shape = RoundedCornerShape(24.dp),
                        colors = CardDefaults.cardColors(containerColor = Color.White),
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Column(
                            modifier = Modifier.padding(18.dp)
                        ) {
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.Top
                            ) {
                                Column(modifier = Modifier.weight(1f)) {
                                    Text(
                                        text = v.title,
                                        fontWeight = FontWeight.Black,
                                        fontSize = 18.sp,
                                        color = Color(0xFF0F172A)
                                    )
                                    Spacer(modifier = Modifier.height(4.dp))
                                    Text(
                                        text = v.channelTitle,
                                        fontWeight = FontWeight.Bold,
                                        fontSize = 13.sp,
                                        color = Purple700
                                    )
                                }

                                IconButton(
                                    onClick = {
                                        isFav = repository.toggleFavorite(v)
                                    }
                                ) {
                                    Icon(
                                        imageVector = if (isFav) Icons.Default.Favorite else Icons.Default.FavoriteBorder,
                                        contentDescription = "Favorite",
                                        tint = if (isFav) Pink500 else Color.Gray
                                    )
                                }
                            }

                            if (v.description.isNotBlank()) {
                                Spacer(modifier = Modifier.height(12.dp))
                                Surface(
                                    shape = RoundedCornerShape(16.dp),
                                    color = Color(0xFFF1F5F9),
                                    modifier = Modifier.fillMaxWidth()
                                ) {
                                    Text(
                                        text = v.description,
                                        fontSize = 12.sp,
                                        color = Color(0xFF334155),
                                        modifier = Modifier.padding(12.dp)
                                    )
                                }
                            }
                        }
                    }
                }
            }

            if (relatedVideos.isNotEmpty()) {
                item {
                    Text(
                        text = "More Fun Videos",
                        fontWeight = FontWeight.Black,
                        fontSize = 18.sp,
                        color = Color(0xFF0F172A)
                    )
                }

                items(relatedVideos) { rel ->
                    VideoCard(
                        video = rel,
                        isFavorite = repository.isFavorite(rel.id),
                        onVideoClick = onVideoClick,
                        onFavoriteToggle = { repository.toggleFavorite(it) }
                    )
                }
            }
        }
    }
}
