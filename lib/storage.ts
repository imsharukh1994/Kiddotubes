import { VideoItem } from '@/types/youtube';

const FAVORITES_KEY = 'kiddotube_favorites_v1';
const HISTORY_KEY = 'kiddotube_history_v1';
const GAMIFICATION_KEY = 'kiddotube_gamification_v1';

export interface GamificationData {
  stars: number;
  badges: string[];
}

const getKidPrefix = () => {
  if (typeof window === 'undefined') return '';
  try {
    const user = localStorage.getItem('kiddotube_current_user_v1');
    if (user) {
      const parsed = JSON.parse(user);
      if (parsed.activeKidId) return `${parsed.activeKidId}_`;
    }
  } catch (e) {}
  return '';
};

const getFavoritesKey = () => `${getKidPrefix()}${FAVORITES_KEY}`;
const getHistoryKey = () => `${getKidPrefix()}${HISTORY_KEY}`;
const getGamificationKey = () => `${getKidPrefix()}${GAMIFICATION_KEY}`;

export function getGamification(): GamificationData {
  if (typeof window === 'undefined') return { stars: 0, badges: [] };
  try {
    const data = localStorage.getItem(getGamificationKey());
    return data ? JSON.parse(data) : { stars: 0, badges: [] };
  } catch (e) {
    return { stars: 0, badges: [] };
  }
}

export function addStars(amount: number, badgeStr?: string): GamificationData {
  if (typeof window === 'undefined') return { stars: 0, badges: [] };
  try {
    const data = getGamification();
    const updated = {
      stars: data.stars + amount,
      badges: badgeStr && !data.badges.includes(badgeStr) ? [...data.badges, badgeStr] : data.badges
    };
    localStorage.setItem(getGamificationKey(), JSON.stringify(updated));
    window.dispatchEvent(new Event('kiddotube_gamification_updated'));
    return updated;
  } catch (e) {
    return { stars: 0, badges: [] };
  }
}

export function getFavorites(): VideoItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(getFavoritesKey());
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

    localStorage.setItem(getFavoritesKey(), JSON.stringify(updated));
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
    localStorage.removeItem(getFavoritesKey());
    window.dispatchEvent(new Event('kiddotube_favorites_updated'));
  } catch (e) {
    console.error('Error clearing favorites in localStorage:', e);
  }
}

export function getRecentlyWatched(): VideoItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(getHistoryKey());
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
    const isNew = !history.some(item => item.id === video.id);
    const filtered = history.filter(item => item.id !== video.id);
    const updated = [video, ...filtered].slice(0, 30); // Keep max 30 items
    localStorage.setItem(getHistoryKey(), JSON.stringify(updated));
    window.dispatchEvent(new Event('kiddotube_history_updated'));
    
    // Gamification: Earn 1 star for watching a new video!
    if (isNew) {
      addStars(1);
    }
  } catch (e) {
    console.error('Error saving history to localStorage:', e);
  }
}

export function clearHistory(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(getHistoryKey());
    window.dispatchEvent(new Event('kiddotube_history_updated'));
  } catch (e) {
    console.error('Error clearing history in localStorage:', e);
  }
}
