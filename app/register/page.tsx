import { RegisterForm } from "@/components/auth/register-form"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { DEFAULT_AUTHENTICATED_REDIRECT } from "@/constants/routes"

export default async function Register() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect(DEFAULT_AUTHENTICATED_REDIRECT)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold">Create an Account</h1>
          <p className="mt-2 text-gray-600">Sign up to get started with our application</p>
        </div>
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <RegisterForm />
        </div>
      </div>
    </div>
  )
}

