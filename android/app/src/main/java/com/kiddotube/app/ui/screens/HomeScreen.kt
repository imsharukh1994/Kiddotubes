package com.kiddotube.app.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
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
fun HomeScreen(
    repository: VideoRepository,
    onVideoClick: (String) -> Unit,
    onCategoryClick: (String) -> Unit,
    onSearchClick: () -> Unit
) {
    var popularVideos by remember { mutableStateOf<List<VideoItem>>(emptyList()) }
    var isLoading by remember { mutableStateOf(true) }
    val favorites by repository.favorites.collectAsState()
    val scope = rememberCoroutineScope()

    LaunchedEffect(Unit) {
        scope.launch {
            isLoading = true
            popularVideos = repository.searchVideos("popular kids learning videos nursery rhymes", 8)
            isLoading = false
        }
    }

    LazyColumn(
        modifier = Modifier.fillMaxSize(),
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(20.dp)
    ) {
        // Hero Section
        item {
            Card(
                shape = androidx.compose.foundation.shape.RoundedCornerShape(28.dp),
                colors = CardDefaults.cardColors(containerColor = Purple700),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(
                    modifier = Modifier.padding(24.dp)
                ) {
                    Text(
                        text = "Safe. Fun. Made for Kids.",
                        color = Color.White,
                        fontWeight = FontWeight.Black,
                        fontSize = 26.sp
                    )
                    Spacer(modifier = Modifier.height(6.dp))
                    Text(
                        text = "KiddoTube brings safe video discovery for toddlers and children.",
                        color = Color.White.copy(alpha = 0.9f),
                        fontSize = 14.sp
                    )
                }
            }
        }

        // Browse Age Groups
        item {
            Column {
                Text(
                    text = "Browse by Age",
                    fontWeight = FontWeight.Black,
                    fontSize = 20.sp,
                    color = Color(0xFF0F172A)
                )
                Spacer(modifier = Modifier.height(12.dp))
                Row(
                    horizontalArrangement = Arrangement.spacedBy(12.dp),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    CategoryData.categories.take(3).forEach { cat ->
                        Box(modifier = Modifier.weight(1f)) {
                            CategoryCard(
                                category = cat,
                                onCategoryClick = onCategoryClick
                            )
                        }
                    }
                }
            }
        }

        // Popular Videos
        item {
            Text(
                text = "Popular Kids Videos",
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
        } else if (popularVideos.isEmpty()) {
            item {
                Text(
                    text = "Ensure Next.js backend server is running and accessible!",
                    color = Color.Gray,
                    fontSize = 14.sp
                )
            }
        } else {
            items(popularVideos) { video ->
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
