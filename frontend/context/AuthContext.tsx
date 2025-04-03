"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react"
import { useRouter } from "next/navigation"

interface AuthContextType {
  token: string | null
  isLoggedIn: boolean
  login: (newToken: string) => void
  logout: () => void
  isLoading: boolean // Add loading state for initial check
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true) // Start with loading true
  const router = useRouter()

  // Check for token in localStorage on initial load
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("token")
      if (storedToken) {
        setToken(storedToken)
        // Optionally: Add token validation logic here (e.g., check expiry)
      }
    } catch (error) {
      console.error("Failed to access localStorage:", error)
      // Handle cases where localStorage is not available or access is denied
    } finally {
      setIsLoading(false) // Finish loading after checking token
    }
  }, [])

  const login = useCallback((newToken: string) => {
    try {
      localStorage.setItem("token", newToken)
      setToken(newToken)
      router.push("/dashboard") // Redirect after login
    } catch (error) {
      console.error("Failed to set token in localStorage:", error)
    }
  }, [router])

  const logout = useCallback(() => {
    try {
      localStorage.removeItem("token")
      setToken(null)
      router.push("/login") // Redirect to login after logout
    } catch (error) {
      console.error("Failed to remove token from localStorage:", error)
    }
  }, [router])

  const value = {
    token,
    isLoggedIn: !!token,
    login,
    logout,
    isLoading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
