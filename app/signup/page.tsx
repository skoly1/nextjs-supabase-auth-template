import { SignUpForm } from "@/components/auth/sign-up-form"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

export default async function SignUp() {
  const supabase = createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    redirect("/dashboard")
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
      <div className="w-full max-w-md space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight">Create a new account</h1>
          <p className="mt-2 text-sm text-gray-600">
            Or{" "}
            <a href="/signin" className="font-medium text-primary hover:underline">
              sign in to your existing account
            </a>
          </p>
        </div>
        <SignUpForm />
      </div>
    </div>
  )
}

