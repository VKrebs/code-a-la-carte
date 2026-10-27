export function absoluteUrlOf(path: string): URL {
  return new URL(path, import.meta.env.SITE);
}

export function displayUrlOf(url: URL): string {
  return url.host + url.pathname;
}
