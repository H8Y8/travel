"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useTranslations } from "next-intl"
import { apiFetch } from "@/lib/api" // Import apiFetch
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe } from "lucide-react"
import { Header } from "@/components/Header"

export default function RegisterPage() {
  const t = useTranslations("RegisterPage")
  const e = useTranslations("ErrorMessages")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false) // Add loading state
  const router = useRouter() // Initialize useRouter

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault()
    setIsLoading(true)

    try {
      // Use apiFetch for the request
      await apiFetch("api/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      })

      // If apiFetch doesn't throw an error, registration was successful
      toast.success(e("registrationSuccess"))
      router.push("/login") 

    } catch (error) {
      console.error("Registration error:", error)
      // Display the error message thrown by apiFetch or a default message
      const errorMessage = error instanceof Error ? error.message : e("unexpectedError")
      toast.error(e("registrationFailed") + errorMessage)
    } finally {
      setIsLoading(false) // Reset loading state
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header minimal={true} showNavigation={false} />
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <Link href="/" className="mb-8 flex items-center gap-2 text-lg font-semibold">
          <Globe className="h-6 w-6" />
          <span>{t("brandName")}</span>
        </Link>
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">{t("title")}</CardTitle>
            <CardDescription>{t("description")}</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t("form.name")}</Label>
                <Input id="name" placeholder={t("form.namePlaceholder")} value={name} onChange={(evt) => setName(evt.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t("form.email")}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t("form.emailPlaceholder")}
                  value={email}
                  onChange={(evt) => setEmail(evt.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{t("form.password")}</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(evt) => setPassword(evt.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? t("form.submitting") : t("form.submit")}
              </Button>
              {/* 
              Optional: Keep or remove the "Or continue with" section based on requirements 
              */}
            </CardContent>
          </form>
          <CardFooter>
            <p className="text-center text-sm text-muted-foreground w-full">
              {t("footer.haveAccount")}{" "}
              <Link href="/login" className="text-primary hover:underline">
                {t("footer.login")}
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
