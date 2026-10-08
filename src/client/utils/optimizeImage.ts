export function optimizeImage(url: string, { quality = 75, width }: { width: number; quality?: number }) {
  if (!url.startsWith("http")) return url;
  return `https://wsrv.nl/?url=${encodeURIComponent(url)}&w=${width}&q=${quality}&output=webp`;
}

// 1x and 2x candidates so high-density screens get a sharp image
export function optimizeImageSrcSet(url: string, { quality = 85, width }: { width: number; quality?: number }) {
  if (!url.startsWith("http")) return undefined;
  return `${optimizeImage(url, { width, quality })} 1x, ${optimizeImage(url, { width: width * 2, quality })} 2x`;
}
