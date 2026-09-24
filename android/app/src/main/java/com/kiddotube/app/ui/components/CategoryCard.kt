package com.kiddotube.app.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.kiddotube.app.data.model.CategoryInfo

@Composable
fun CategoryCard(
    category: CategoryInfo,
    onCategoryClick: (String) -> Unit,
    modifier: Modifier = Modifier
) {
    val bgColor = try {
        Color(android.graphics.Color.parseColor(category.colorHex))
    } catch (e: Exception) {
        Color(0xFF7C3AED)
    }

    Card(
        modifier = modifier
            .fillMaxWidth()
            .clickable { onCategoryClick(category.slug) },
        shape = RoundedCornerShape(24.dp),
        colors = CardDefaults.cardColors(containerColor = bgColor),
        elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(18.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Surface(
                    shape = RoundedCornerShape(12.dp),
                    color = Color.White.copy(alpha = 0.25f)
                ) {
                    Text(
                        text = "AGE ${category.ageGroup}",
                        color = Color.White,
                        fontWeight = FontWeight.Black,
                        fontSize = 11.sp,
                        modifier = Modifier.padding(horizontal = 10.dp, vertical = 4.dp)
                    )
                }
            }

            Spacer(modifier = Modifier.height(12.dp))

            Text(
                text = category.title,
                color = Color.White,
                fontWeight = FontWeight.Black,
                fontSize = 20.sp
            )

            Spacer(modifier = Modifier.height(4.dp))

            Text(
                text = category.description,
                color = Color.White.copy(alpha = 0.9f),
                fontSize = 12.sp,
                fontWeight = FontWeight.Medium,
                maxLines = 2
            )
        }
    }
}
