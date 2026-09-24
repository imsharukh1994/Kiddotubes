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
import com.kiddotube.app.data.model.CategoryData
import com.kiddotube.app.data.model.VideoItem
import com.kiddotube.app.data.repository.VideoRepository
import com.kiddotube.app.ui.components.CategoryCard
import com.kiddotube.app.ui.components.VideoCard
import com.kiddotube.app.ui.theme.Purple700
import kotlinx.coroutines.launch

@Composable
fun CategoriesScreen(
    categorySlug: String,
    repository: VideoRepository,
    onVideoClick: (String) -> Unit,
    onCategoryClick: (String) -> Unit
) {
    val category = CategoryData.getBySlug(categorySlug) ?: CategoryData.categories.first()
    var videos by remember { mutableStateOf<List<VideoItem>>(emptyList()) }
    var isLoading by remember { mutableStateOf(true) }
    val scope = rememberCoroutineScope()

    LaunchedEffect(categorySlug) {
        scope.launch {
            isLoading = true
            videos = repository.searchVideos(category.query, 12)
            isLoading = false
        }
    }

    LazyColumn(
        modifier = Modifier.fillMaxSize(),
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        item {
            CategoryCard(
                category = category,
                onCategoryClick = {}
            )
        }

        item {
            Text(
                text = "${category.title} Videos",
                fontWeight = FontWeight.Black,
                fontSize = 20.sp,
                color = Color(0xFF0F172A)
            )
        }

        if (isLoading) {
            item {
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(150.dp),
                    contentAlignment = Alignment.Center
                ) {
                    CircularProgressIndicator(color = Purple700)
                }
            }
        } else if (videos.isEmpty()) {
            item {
                Text(
                    text = "No videos found for this category.",
                    color = Color.Gray,
                    fontSize = 14.sp
                )
            }
        } else {
            items(videos) { video ->
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
