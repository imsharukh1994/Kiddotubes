import { VideoItem } from '@/types/youtube';

const FAVORITES_KEY = 'kiddotube_favorites_v1';
const HISTORY_KEY = 'kiddotube_history_v1';

export function getFavorites(): VideoItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Error reading favorites from localStorage:', e);
    return [];
  }
}

export function isFavorite(videoId: string): boolean {
  const favorites = getFavorites();
  return favorites.some(item => item.id === videoId);
}

export function toggleFavorite(video: VideoItem): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const favorites = getFavorites();
    const index = favorites.findIndex(item => item.id === video.id);
    let updated: VideoItem[];
    let isFav = false;

    if (index >= 0) {
      updated = favorites.filter(item => item.id !== video.id);
      isFav = false;
    } else {
      updated = [video, ...favorites];
      isFav = true;
    }

    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('kiddotube_favorites_updated'));
    return isFav;
  } catch (e) {
    console.error('Error updating favorites in localStorage:', e);
    return false;
  }
}

export function clearFavorites(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(FAVORITES_KEY);
    window.dispatchEvent(new Event('kiddotube_favorites_updated'));
  } catch (e) {
    console.error('Error clearing favorites in localStorage:', e);
  }
}

export function getRecentlyWatched(): VideoItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Error reading history from localStorage:', e);
    return [];
  }
}

export function addRecentlyWatched(video: VideoItem): void {
  if (typeof window === 'undefined') return;
  try {
    const history = getRecentlyWatched();
    const filtered = history.filter(item => item.id !== video.id);
    const updated = [video, ...filtered].slice(0, 30); // Keep max 30 items
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('kiddotube_history_updated'));
  } catch (e) {
    console.error('Error saving history to localStorage:', e);
  }
}

export function clearHistory(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(HISTORY_KEY);
    window.dispatchEvent(new Event('kiddotube_history_updated'));
  } catch (e) {
    console.error('Error clearing history in localStorage:', e);
  }
}
