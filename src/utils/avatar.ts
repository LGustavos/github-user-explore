export const avatarUrl = (url: string, size: number): string => {
  const parsed = new URL(url)
  parsed.searchParams.set('s', String(size))
  return parsed.toString()
}
