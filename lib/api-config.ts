/**
 * API Configuration helper for KiddoTube
 * Supports calling deployed production backend endpoints over HTTPS in Capacitor mobile builds
 */

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export function getApiUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  const baseUrl = API_BASE_URL.replace(/\/$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return baseUrl ? `${baseUrl}${cleanPath}` : cleanPath;
}
