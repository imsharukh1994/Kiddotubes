package com.kiddotube.app.ui.components

import android.annotation.SuppressLint
import android.webkit.WebChromeClient
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.unit.dp
import androidx.compose.ui.viewinterop.AndroidView

@SuppressLint("SetJavaScriptEnabled")
@Composable
fun YouTubeWebView(
    videoId: String,
    modifier: Modifier = Modifier
) {
    val embedHtml = """
        <!DOCTYPE html>
        <html>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
            <style>
                body, html { margin: 0; padding: 0; width: 100%; height: 100%; background-color: #000; overflow: hidden; }
                iframe { width: 100%; height: 100%; border: none; }
            </style>
        </head>
        <body>
            <iframe 
                src="https://www.youtube-nocookie.com/embed/$videoId?autoplay=1&rel=0&modestbranding=1" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
            </iframe>
        </body>
        </html>
    """.trimIndent()

    AndroidView(
        modifier = modifier
            .fillMaxWidth()
            .aspectRatio(16f / 9f)
            .clip(RoundedCornerShape(20.dp)),
        factory = { context ->
            WebView(context).apply {
                settings.javaScriptEnabled = true
                settings.domStorageEnabled = true
                settings.loadWithOverviewMode = true
                settings.useWideViewPort = true
                webChromeClient = WebChromeClient()
                webViewClient = WebViewClient()
                loadDataWithBaseURL("https://www.youtube-nocookie.com", embedHtml, "text/html", "utf-8", null)
            }
        },
        update = { webView ->
            webView.loadDataWithBaseURL("https://www.youtube-nocookie.com", embedHtml, "text/html", "utf-8", null)
        }
    )
}
