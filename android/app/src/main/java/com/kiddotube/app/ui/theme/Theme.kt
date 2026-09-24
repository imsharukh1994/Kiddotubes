package com.kiddotube.app.ui.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable

private val LightColorScheme = lightColorScheme(
    primary = Purple700,
    secondary = Pink500,
    tertiary = Amber500,
    background = BackgroundLight,
    surface = SurfaceWhite,
    onPrimary = SurfaceWhite,
    onSecondary = SurfaceWhite,
    onBackground = TextDark,
    onSurface = TextDark
)

@Composable
fun KiddoTubeTheme(
    content: @Composable () -> Unit
) {
    MaterialTheme(
        colorScheme = LightColorScheme,
        content = content
    )
}
