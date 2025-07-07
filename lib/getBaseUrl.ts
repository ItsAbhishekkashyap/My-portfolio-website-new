export const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""

  // Use NEXT_PUBLIC_SITE_URL for SSR
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL

  // Fallback to Vercel's internal domain
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`

  // Localhost fallback for dev
  return "http://localhost:3000"
}
