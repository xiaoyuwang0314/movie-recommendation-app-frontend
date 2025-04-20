// utils/genreColors.js

// A color map that assigns a specific background color to each movie genre
export const genreColorMap = {
    Action: "#FF6B6B",
    Adventure: "#4ECDC4",
    Animation: "#FFD93D",
    Children: "#FFA07A",
    Comedy: "#F7B267",
    Crime: "#A29BFE",
    Documentary: "#70C1B3",
    Drama: "#A3D9A5",
    Fantasy: "#CBAACB",
    Horror: "#FF7E79",
    Mystery: "#6C5B7B",
    Romance: "#F67280",
    SciFi: "#57C7FF",
    Thriller: "#616161",
    War: "#9E9D24",
    Western: "#D7CCC8"
};

// Get the background color for a given genre
// If the genre is not defined, fall back to a light gray
export const getGenreColor = (genre) => genreColorMap[genre] || "#ccc";

// Compute a readable text color based on the brightness of the background
// Uses perceived luminance formula to determine whether to use dark or light text
export const getGenreTextColor = (hexColor) => {
    const hex = hexColor.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Calculate brightness based on human perception weights
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

    // Return dark text if the background is light, else white
    return luminance > 150 ? "#222" : "#fff";
};