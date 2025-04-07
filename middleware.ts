import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createServerClient } from "@supabase/ssr"
import {
  PUBLIC_ROUTES,
  PRIVATE_ROUTES,
  DEFAULT_LOGIN_REDIRECT,
  DEFAULT_AUTHENTICATED_REDIRECT,
} from "./constants/routes"

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Create a Supabase client
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return request.cookies.get(name)?.value
        },
        set(name, value, options) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name, options) {
          request.cookies.set({
            name,
            value: "",
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: "",
            ...options,
          })
        },
      },
    },
  )

  // Get the current path
  const path = request.nextUrl.pathname

  // Get the user session
  const {
    data: { user },
  } = await supabase.auth.getUser()
  const isAuthenticated = !!user

  // Check if the path is in the public or private routes
  const isPublicRoute = PUBLIC_ROUTES.includes(path)
  const isPrivateRoute = PRIVATE_ROUTES.some((route) => path.startsWith(route))

  // Handle access control
  if (isPrivateRoute && !isAuthenticated) {
    // Redirect unauthenticated users trying to access private routes to login
    const redirectUrl = new URL(DEFAULT_LOGIN_REDIRECT, request.url)
    // Store the original URL to redirect back after login
    redirectUrl.searchParams.set("callbackUrl", path)
    return NextResponse.redirect(redirectUrl)
  }

  if (isPublicRoute && isAuthenticated) {
    // Redirect authenticated users away from login/register pages
    if (path === "/login" || path === "/register") {
      // Check if there's a callback URL to redirect to
      const callbackUrl = request.nextUrl.searchParams.get("callbackUrl")
      const redirectUrl = callbackUrl || DEFAULT_AUTHENTICATED_REDIRECT
      return NextResponse.redirect(new URL(redirectUrl, request.url))
    }
  }

  // Refresh the session
  await supabase.auth.getSession()

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (e.g. robots.txt)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}

