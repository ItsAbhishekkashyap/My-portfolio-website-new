import { cookies } from "next/headers"
import jwt, { JwtPayload } from "jsonwebtoken"

// Type guard to check if payload has a role
function isJwtWithRole(payload: string | JwtPayload): payload is JwtPayload & { role: string } {
  return typeof payload !== "string" && "role" in payload
}

// Server-side admin checker
export async function isAdminServer(): Promise<boolean> {
  const cookieStore = await cookies() // no need for await
  const token = cookieStore.get("token")?.value

  if (!token) return false

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) // will throw if invalid

    if (isJwtWithRole(decoded)) {
      return decoded.role === "admin"
    }

    return false
  } catch (error) {
    console.error("JWT verification failed:", error)
    return false
  }
}

