import Link from "next/link"
import { Button } from "@/components/ui/button"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { DEFAULT_AUTHENTICATED_REDIRECT } from "@/constants/routes"

export default async function Home() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect(DEFAULT_AUTHENTICATED_REDIRECT)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-white shadow">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <h1 className="text-xl font-bold">Next.js + Supabase</h1>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Register</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto flex flex-1 flex-col items-center justify-center px-4 py-16">
        <div className="max-w-md text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Welcome to Next.js with Supabase</h2>
          <p className="mt-4 text-lg text-gray-600">
            This application demonstrates authentication and access control with Next.js and Supabase.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/login">
              <Button size="lg">Get Started</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

