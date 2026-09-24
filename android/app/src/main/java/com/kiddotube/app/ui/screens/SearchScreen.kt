package com.kiddotube.app.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Search
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
import com.kiddotube.app.ui.theme.Purple700
import kotlinx.coroutines.launch

@Composable
fun SearchScreen(
    repository: VideoRepository,
    onVideoClick: (String) -> Unit
) {
    var searchQuery by remember { mutableStateOf("") }
    var searchResults by remember { mutableStateOf<List<VideoItem>>(emptyList()) }
    var isLoading by remember { mutableStateOf(false) }
    var hasSearched by remember { mutableStateOf(false) }
    val scope = rememberCoroutineScope()

    fun performSearch() {
        if (searchQuery.isBlank()) return
        scope.launch {
            isLoading = true
            hasSearched = true
            searchResults = repository.searchVideos(searchQuery, 16)
            isLoading = false
        }
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        OutlinedTextField(
            value = searchQuery,
            onValueChange = { searchQuery = it },
            placeholder = { Text("Search kids videos, stories, songs...") },
            trailingIcon = {
                IconButton(onClick = { performSearch() }) {
                    Icon(Icons.Default.Search, contentDescription = "Search", tint = Purple700)
                }
            },
            singleLine = true,
            shape = RoundedCornerShape(24.dp),
            modifier = Modifier.fillMaxWidth()
        )

        Spacer(modifier = Modifier.height(16.dp))

        if (isLoading) {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .weight(1f),
                contentAlignment = Alignment.Center
            ) {
                CircularProgressIndicator(color = Purple700)
            }
        } else if (hasSearched && searchResults.isEmpty()) {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .weight(1f),
                contentAlignment = Alignment.Center
            ) {
                Text(
                    text = "No videos found for '$searchQuery'",
                    color = Color.Gray,
                    fontSize = 16.sp
                )
            }
        } else {
            LazyColumn(
                modifier = Modifier.weight(1f),
                verticalArrangement = Arrangement.spacedBy(16.dp)
            ) {
                items(searchResults) { video ->
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
