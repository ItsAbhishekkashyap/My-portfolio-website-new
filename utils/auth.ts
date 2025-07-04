// utils/auth.ts
import { cookies } from 'next/headers'

// Server-side admin check
// Server-side admin check - CORRECTED VERSION
export async function isAdminServer(): Promise<boolean> {
  const cookieStore = await cookies(); // Add await here
  const role = cookieStore.get('role')?.value;
  return role === 'admin';
}

// Client-side admin check
export const isAdmin = (): boolean => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('role') === 'admin'
  }
  return false
}