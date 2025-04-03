"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { toast } from "sonner"
import { useTranslations } from "next-intl"
import { useAuth } from "@/context/AuthContext"
import { apiFetch } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe } from "lucide-react"

export default function LoginPage() {
  const t = useTranslations('LoginPage');
  const tError = useTranslations('ErrorMessages');
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Define expected response type
      interface LoginResponse {
        token: string;
        message?: string; // Optional message field
      }

      // Use apiFetch for the request, specifying the expected response type
      const data = await apiFetch<LoginResponse>("api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      })

      // If apiFetch is successful and returns a token, call login
      if (data.token) {
        login(data.token)
        // Optional: Show success toast here if not handled in login function
        // toast.success("Login successful!") 
      } else {
         // This case might not be reached if apiFetch throws on non-ok status
         // but included for robustness if apiFetch logic changes
         toast.error(data.message || tError('loginFailed'))
      }
    } catch (error) {
      console.error("Login error:", error)
      // Display the error message thrown by apiFetch or a default message
      const errorMessage = error instanceof Error ? error.message : tError('unexpectedError')
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <Link href="/" className="mb-8 flex items-center gap-2 text-lg font-semibold">
        <Globe className="h-6 w-6" />
        <span>{t('brandName')}</span>
      </Link>
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">{t('title')}</CardTitle>
          <CardDescription>{t('description')}</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t('form.email')}</Label>
              <Input
                id="email"
                type="email"
                placeholder={t('form.emailPlaceholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">{t('form.password')}</Label>
                <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                  {t('form.forgotPassword')}
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? t('form.submitting') : t('form.submit')}
            </Button>
            {/* 
            Optional: Keep or remove the "Or continue with" section 
            <div className="relative mt-4"> 
              <div className="absolute inset-0 flex items-center"> 
                <span className="w-full border-t" /> 
              </div> 
              <div className="relative flex justify-center text-xs uppercase"> 
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span> 
              </div> 
            </div> 
            <Button variant="outline" type="button" className="w-full" disabled={isLoading}> 
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="mr-2 h-4 w-4" 
              > 
                <path d="M9 9a3 3 0 1 1 5.12 2.12L9 16.5"></path> 
                <path d="M7.2 7.2 16.5 16.5"></path> 
                <circle cx="12" cy="12" r="10"></circle> 
              </svg> 
              Google 
            </Button> 
            */}
          </CardContent>
        </form>
        <CardFooter>
          <p className="text-center text-sm text-muted-foreground w-full">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
