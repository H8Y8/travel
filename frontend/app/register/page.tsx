"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { apiFetch } from "@/lib/api" // Import apiFetch
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe } from "lucide-react"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false) // Add loading state
  const router = useRouter() // Initialize useRouter

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Use apiFetch for the request
      await apiFetch("api/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      })

      // If apiFetch doesn't throw an error, registration was successful
      toast.success("Registration successful! Please login.")
      router.push("/login") 

    } catch (error) {
      console.error("Registration error:", error)
      // Display the error message thrown by apiFetch or a default message
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred."
      toast.error(errorMessage)
    } finally {
      setIsLoading(false) // Reset loading state
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <Link href="/" className="mb-8 flex items-center gap-2 text-lg font-semibold">
        <Globe className="h-6 w-6" />
        <span>TravelSplit</span>
      </Link>
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription>Enter your information to create an account</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
            {/* 
            Optional: Keep or remove the "Or continue with" section based on requirements 
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
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
