const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function publicPath(path: string) {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${cleanPath}`;
}
