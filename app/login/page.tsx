import { LoginForm } from "@/components/auth/login-form"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { DEFAULT_AUTHENTICATED_REDIRECT } from "@/constants/routes"

export default async function Login({
  searchParams,
}: {
  searchParams: { callbackUrl?: string }
}) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect(searchParams.callbackUrl || DEFAULT_AUTHENTICATED_REDIRECT)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="mt-2 text-gray-600">Sign in to your account to continue</p>
        </div>
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <LoginForm callbackUrl={searchParams.callbackUrl} />
        </div>
      </div>
    </div>
  )
}

