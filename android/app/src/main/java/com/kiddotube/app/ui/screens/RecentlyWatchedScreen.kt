package com.kiddotube.app.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.kiddotube.app.data.repository.VideoRepository
import com.kiddotube.app.ui.components.VideoCard
import com.kiddotube.app.ui.theme.Cyan500

@Composable
fun RecentlyWatchedScreen(
    repository: VideoRepository,
    onVideoClick: (String) -> Unit
) {
    val history by repository.history.collectAsState()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        Card(
            shape = androidx.compose.foundation.shape.RoundedCornerShape(24.dp),
            colors = CardDefaults.cardColors(containerColor = Cyan500),
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(modifier = Modifier.padding(20.dp)) {
                Text(
                    text = "Recently Watched",
                    color = Color.White,
                    fontWeight = FontWeight.Black,
                    fontSize = 22.sp
                )
                Text(
                    text = "Videos you watched on this device.",
                    color = Color.White.copy(alpha = 0.9f),
                    fontSize = 13.sp
                )
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        if (history.isEmpty()) {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .weight(1f),
                contentAlignment = Alignment.Center
            ) {
                Text(
                    text = "No watch history yet. Start watching videos to see them here!",
                    color = Color.Gray,
                    fontSize = 14.sp
                )
            }
        } else {
            LazyColumn(
                verticalArrangement = Arrangement.spacedBy(16.dp),
                modifier = Modifier.weight(1f)
            ) {
                items(history) { video ->
                    VideoCard(
                        video = video,
                        isFavorite = repository.isFavorite(video.id),
                        onVideoClick = onVideoClick,
                        onFavoriteToggle = { repository.toggleFavorite(it) }
                    )
                }
            }
        }
    }
}
