package com.kiddotube.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Category
import androidx.compose.material.icons.filled.Favorite
import androidx.compose.material.icons.filled.History
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Search
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.navigation.NavGraph.Companion.findStartDestination
import androidx.navigation.NavType
import androidx.navigation.compose.*
import androidx.navigation.navArgument
import com.kiddotube.app.data.repository.VideoRepository
import com.kiddotube.app.ui.screens.*
import com.kiddotube.app.ui.theme.KiddoTubeTheme
import com.kiddotube.app.ui.theme.Purple700

class MainActivity : ComponentActivity() {

    private lateinit var repository: VideoRepository

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        repository = VideoRepository(applicationContext)

        setContent {
            KiddoTubeTheme {
                val navController = rememberNavController()

                val items = listOf(
                    NavigationItem("home", "Home", Icons.Default.Home),
                    NavigationItem("category/2-4", "Categories", Icons.Default.Category),
                    NavigationItem("search", "Search", Icons.Default.Search),
                    NavigationItem("favorites", "Favorites", Icons.Default.Favorite),
                    NavigationItem("history", "History", Icons.Default.History)
                )

                val navBackStackEntry by navController.currentBackStackEntryAsState()
                val currentRoute = navBackStackEntry?.destination?.route

                Scaffold(
                    topBar = {
                        CenterAlignedTopAppBar(
                            title = {
                                Text(
                                    text = "KiddoTube",
                                    fontWeight = FontWeight.Black,
                                    color = Purple700
                                )
                            },
                            colors = TopAppBarDefaults.centerAlignedTopAppBarColors(
                                containerColor = Color.White
                            )
                        )
                    },
                    bottomBar = {
                        NavigationBar(
                            containerColor = Color.White
                        ) {
                            items.forEach { item ->
                                val selected = currentRoute == item.route || 
                                    (item.route.startsWith("category") && currentRoute?.startsWith("category") == true)

                                NavigationBarItem(
                                    icon = { Icon(item.icon, contentDescription = item.title) },
                                    label = { Text(item.title, fontWeight = FontWeight.Bold) },
                                    selected = selected,
                                    colors = NavigationBarItemDefaults.colors(
                                        selectedIconColor = Purple700,
                                        selectedTextColor = Purple700,
                                        indicatorColor = Color(0xFFEDE9FE)
                                    ),
                                    onClick = {
                                        navController.navigate(item.route) {
                                            popUpTo(navController.graph.findStartDestination().id) {
                                                saveState = true
                                            }
                                            launchSingleTop = true
                                            restoreState = true
                                        }
                                    }
                                )
                            }
                        }
                    }
                ) { paddingValues ->
                    NavHost(
                        navController = navController,
                        startDestination = "home",
                        modifier = Modifier.padding(paddingValues)
                    ) {
                        composable("home") {
                            HomeScreen(
                                repository = repository,
                                onVideoClick = { videoId -> navController.navigate("watch/$videoId") },
                                onCategoryClick = { slug -> navController.navigate("category/$slug") },
                                onSearchClick = { navController.navigate("search") }
                            )
                        }

                        composable(
                            route = "category/{slug}",
                            arguments = listOf(navArgument("slug") { type = NavType.StringType })
                        ) { backStackEntry ->
                            val slug = backStackEntry.arguments?.getString("slug") ?: "2-4"
                            CategoriesScreen(
                                categorySlug = slug,
                                repository = repository,
                                onVideoClick = { videoId -> navController.navigate("watch/$videoId") },
                                onCategoryClick = { newSlug -> navController.navigate("category/$newSlug") }
                            )
                        }

                        composable("search") {
                            SearchScreen(
                                repository = repository,
                                onVideoClick = { videoId -> navController.navigate("watch/$videoId") }
                            )
                        }

                        composable("favorites") {
                            FavoritesScreen(
                                repository = repository,
                                onVideoClick = { videoId -> navController.navigate("watch/$videoId") }
                            )
                        }

                        composable("history") {
                            RecentlyWatchedScreen(
                                repository = repository,
                                onVideoClick = { videoId -> navController.navigate("watch/$videoId") }
                            )
                        }

                        composable(
                            route = "watch/{videoId}",
                            arguments = listOf(navArgument("videoId") { type = NavType.StringType })
                        ) { backStackEntry ->
                            val videoId = backStackEntry.arguments?.getString("videoId") ?: ""
                            VideoDetailsScreen(
                                videoId = videoId,
                                repository = repository,
                                onVideoClick = { newVideoId -> navController.navigate("watch/$newVideoId") }
                            )
                        }
                    }
                }
            }
        }
    }
}

data class NavigationItem(
    val route: String,
    val title: String,
    val icon: androidx.compose.ui.graphics.vector.ImageVector
)
