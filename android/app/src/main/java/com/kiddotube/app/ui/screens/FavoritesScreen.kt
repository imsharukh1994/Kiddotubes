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
import com.kiddotube.app.ui.theme.Pink500

@Composable
fun FavoritesScreen(
    repository: VideoRepository,
    onVideoClick: (String) -> Unit
) {
    val favorites by repository.favorites.collectAsState()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        Card(
            shape = androidx.compose.foundation.shape.RoundedCornerShape(24.dp),
            colors = CardDefaults.cardColors(containerColor = Pink500),
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(modifier = Modifier.padding(20.dp)) {
                Text(
                    text = "My Favorites",
                    color = Color.White,
                    fontWeight = FontWeight.Black,
                    fontSize = 22.sp
                )
                Text(
                    text = "Saved locally on your device.",
                    color = Color.White.copy(alpha = 0.9f),
                    fontSize = 13.sp
                )
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        if (favorites.isEmpty()) {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .weight(1f),
                contentAlignment = Alignment.Center
            ) {
                Text(
                    text = "No favorite videos saved yet. Tap the heart on any video!",
                    color = Color.Gray,
                    fontSize = 14.sp
                )
            }
        } else {
            LazyColumn(
                verticalArrangement = Arrangement.spacedBy(16.dp),
                modifier = Modifier.weight(1f)
            ) {
                items(favorites) { video ->
                    VideoCard(
                        video = video,
                        isFavorite = true,
                        onVideoClick = onVideoClick,
                        onFavoriteToggle = { repository.toggleFavorite(it) }
                    )
                }
            }
        }
    }
}
