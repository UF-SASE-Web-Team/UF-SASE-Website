export function optimizeImage(url: string, { quality = 75, width }: { width: number; quality?: number }) {
  if (!url.startsWith("http")) return url;
  return `https://wsrv.nl/?url=${encodeURIComponent(url)}&w=${width}&q=${quality}&output=webp`;
}
