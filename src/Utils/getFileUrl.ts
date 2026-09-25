export function getFileUrl(path?: string | null): string | undefined {
  // اگر خالی یا نامعتبر بود، undefined برگردان
  if (!path || !path.trim()) return undefined;

  // اگر لینک کامل بود
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const baseUrl = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/+$/, "") ?? "";
  const cleanPath = path.replace(/^\/+/, "");

  return `${baseUrl}/${cleanPath}`;
}
