package com.kiddotube.app.data.model

data class CategoryInfo(
    val id: String,
    val slug: String,
    val title: String,
    val ageGroup: String, // "2–4", "5–7", "8–12"
    val description: String,
    val query: String,
    val colorHex: String,
    val iconName: String
)

object CategoryData {
    val categories = listOf(
        CategoryInfo(
            id = "toddler-rhymes",
            slug = "2-4",
            title = "2–4 Years",
            ageGroup = "2–4",
            description = "Nursery rhymes, fun songs, shapes, and early learning for tiny tots.",
            query = "nursery rhymes alphabet for kids songs toddlers",
            colorHex = "#FF5E7E",
            iconName = "baby"
        ),
        CategoryInfo(
            id = "early-learners",
            slug = "5-7",
            title = "5–7 Years",
            ageGroup = "5–7",
            description = "Fun stories, animals, art, simple science, and counting games.",
            query = "kids stories educational science for kids animals",
            colorHex = "#8B5CF6",
            iconName = "book"
        ),
        CategoryInfo(
            id = "big-kids",
            slug = "8-12",
            title = "8–12 Years",
            ageGroup = "8–12",
            description = "STEM experiments, kids coding, nature exploration, and creative crafts.",
            query = "kids coding educational science experiments crafts",
            colorHex = "#06B6D4",
            iconName = "rocket"
        ),
        CategoryInfo(
            id = "nursery-rhymes",
            slug = "nursery-rhymes",
            title = "Nursery Rhymes",
            ageGroup = "2–4",
            description = "Classic songs and catchy tunes for toddlers.",
            query = "nursery rhymes for kids songs",
            colorHex = "#F59E0B",
            iconName = "music"
        ),
        CategoryInfo(
            id = "learning",
            slug = "learning",
            title = "Learning & Math",
            ageGroup = "5–7",
            description = "Alphabet, counting, numbers, and phonics.",
            query = "alphabet for kids numbers for kids",
            colorHex = "#10B981",
            iconName = "math"
        ),
        CategoryInfo(
            id = "science",
            slug = "science",
            title = "Science & Discovery",
            ageGroup = "8–12",
            description = "Explore the universe, animals, and cool science facts.",
            query = "educational science for kids animals space",
            colorHex = "#3B82F6",
            iconName = "science"
        )
    )

    fun getBySlug(slug: String): CategoryInfo? {
        return categories.find { it.slug == slug || it.id == slug }
    }
}
