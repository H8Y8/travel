"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTranslations } from "next-intl"
import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Users, LogOut } from "lucide-react"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"

interface HeaderProps {
  minimal?: boolean // 登入、註冊頁面等使用簡化版標頭
  showNavigation?: boolean // 是否顯示導航選項
}

export function Header({ minimal = false, showNavigation = true }: HeaderProps) {
  const t = useTranslations("DashboardPage")
  const { isLoggedIn, logout } = useAuth()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  // 監聽滾動事件，添加陰影效果
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-10 border-b bg-background ${scrolled ? "shadow-sm" : ""}`}>
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href={isLoggedIn ? "/dashboard" : "/"} className="flex items-center gap-2 text-lg font-semibold">
          <Users className="h-5 w-5" />
          <span>{t("brandName")}</span>
        </Link>
        
        {showNavigation && isLoggedIn && !minimal && (
          <nav className="hidden md:flex gap-6">
            <Link 
              href="/dashboard" 
              className={`text-sm font-medium hover:underline underline-offset-4 ${
                pathname === "/dashboard" ? "text-primary underline" : ""
              }`}
            >
              {t("navItems.dashboard")}
            </Link>
            <Link 
              href="/dashboard/trips" 
              className={`text-sm font-medium hover:underline underline-offset-4 ${
                pathname.includes("/dashboard/trips") ? "text-primary underline" : ""
              }`}
            >
              {t("navItems.myTrips")}
            </Link>
            <Link 
              href="/dashboard/expenses" 
              className={`text-sm font-medium hover:underline underline-offset-4 ${
                pathname.includes("/dashboard/expenses") ? "text-primary underline" : ""
              }`}
            >
              {t("navItems.expenses")}
            </Link>
            <Link 
              href="/dashboard/settlements" 
              className={`text-sm font-medium hover:underline underline-offset-4 ${
                pathname.includes("/dashboard/settlements") ? "text-primary underline" : ""
              }`}
            >
              {t("navItems.settlements")}
            </Link>
          </nav>
        )}
        
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          
          {isLoggedIn && !minimal && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <span className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full">
                    <span className="flex h-full w-full items-center justify-center rounded-full bg-muted text-muted-foreground">
                      JD
                    </span>
                  </span>
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{t("userMenu.myAccount")}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile">{t("userMenu.profile")}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings">{t("userMenu.settings")}</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={(event) => { event.preventDefault(); logout(); }}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{t("userMenu.logout")}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  )
} 