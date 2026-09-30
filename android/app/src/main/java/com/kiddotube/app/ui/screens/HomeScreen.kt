package com.kiddotube.app.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Search
import androidx.compose.material.icons.filled.Star
import androidx.compose.material.icons.filled.WifiOff
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
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
    val isOfflineMode by repository.isOfflineMode.collectAsState()
    val scope = rememberCoroutineScope()

    LaunchedEffect(Unit) {
        scope.launch {
            isLoading = true
            popularVideos = repository.searchVideos("popular kids learning videos nursery rhymes", 10)
            isLoading = false
        }
    }

    LazyColumn(
        modifier = Modifier.fillMaxSize(),
        contentPadding = PaddingValues(bottom = 24.dp),
        verticalArrangement = Arrangement.spacedBy(20.dp)
    ) {
        // Offline Status Banner if Next.js Server is Unreachable
        if (isOfflineMode) {
            item {
                Surface(
                    color = Color(0xFFFEF3C7),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(horizontal = 16.dp, vertical = 10.dp),
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(10.dp)
                    ) {
                        Icon(
                            imageVector = Icons.Default.WifiOff,
                            contentDescription = "Offline",
                            tint = Color(0xFFD97706),
                            modifier = Modifier.size(20.dp)
                        )
                        Text(
                            text = "Showing offline curated videos. Connect Next.js backend IP in Parent Zone 🔒",
                            color = Color(0xFF92400E),
                            fontSize = 12.sp,
                            fontWeight = FontWeight.SemiBold
                        )
                    }
                }
            }
        }

        // Hero Section
        item {
            Box(
                modifier = Modifier
                    .padding(horizontal = 16.dp)
                    .fillMaxWidth()
                    .background(
                        brush = Brush.horizontalGradient(
                            colors = listOf(Color(0xFF7C3AED), Color(0xFFEC4899))
                        ),
                        shape = RoundedCornerShape(26.dp)
                    )
                    .padding(20.dp)
            ) {
                Column(
                    verticalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    Surface(
                        color = Color.White.copy(alpha = 0.2f),
                        shape = RoundedCornerShape(50)
                    ) {
                        Row(
                            modifier = Modifier.padding(horizontal = 10.dp, vertical = 4.dp),
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.spacedBy(6.dp)
                        ) {
                            Icon(
                                imageVector = Icons.Default.Star,
                                contentDescription = null,
                                tint = Color.White,
                                modifier = Modifier.size(14.dp)
                            )
                            Text(
                                text = "100% KID-SAFE DISCOVERY",
                                color = Color.White,
                                fontWeight = FontWeight.Black,
                                fontSize = 10.sp
                            )
                        }
                    }

                    Text(
                        text = "Safe. Fun. Made for Kids.",
                        color = Color.White,
                        fontWeight = FontWeight.Black,
                        fontSize = 24.sp
                    )

                    Text(
                        text = "Explore educational nursery rhymes, stories, science, and fun activities.",
                        color = Color.White.copy(alpha = 0.92f),
                        fontSize = 13.sp,
                        lineHeight = 18.sp
                    )

                    // Quick Search Button Inside Hero
                    Surface(
                        modifier = Modifier
                            .fillMaxWidth()
                            .clickable { onSearchClick() },
                        shape = RoundedCornerShape(16.dp),
                        color = Color.White.copy(alpha = 0.95f)
                    ) {
                        Row(
                            modifier = Modifier.padding(horizontal = 14.dp, vertical = 12.dp),
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.spacedBy(10.dp)
                        ) {
                            Icon(
                                imageVector = Icons.Default.Search,
                                contentDescription = "Search",
                                tint = Purple700,
                                modifier = Modifier.size(20.dp)
                            )
                            Text(
                                text = "Search rhymes, cartoons, learning...",
                                color = Color(0xFF64748B),
                                fontSize = 13.sp,
                                fontWeight = FontWeight.Medium
                            )
                        }
                    }
                }
            }
        }

        // Browse Age Groups (Horizontal Scrolling Row!)
        item {
            Column(
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                Text(
                    text = "Browse by Age Group",
                    fontWeight = FontWeight.Black,
                    fontSize = 20.sp,
                    color = Color(0xFF0F172A),
                    modifier = Modifier.padding(horizontal = 16.dp)
                )

                LazyRow(
                    contentPadding = PaddingValues(horizontal = 16.dp),
                    horizontalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    items(CategoryData.categories) { cat ->
                        CategoryCard(
                            category = cat,
                            onCategoryClick = onCategoryClick
                        )
                    }
                }
            }
        }

        // Popular Videos Section Header
        item {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Text(
                    text = "🔥 Popular Kids Videos",
                    fontWeight = FontWeight.Black,
                    fontSize = 20.sp,
                    color = Color(0xFF0F172A)
                )
            }
        }

        if (isLoading) {
            item {
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(180.dp),
                    contentAlignment = Alignment.Center
                ) {
                    CircularProgressIndicator(color = Purple700)
                }
            }
        } else {
            items(popularVideos) { video ->
                Box(modifier = Modifier.padding(horizontal = 16.dp)) {
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
