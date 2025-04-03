"use client"

import { usePathname, useRouter } from "next/navigation"
import { useLocale } from "next-intl"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"
import { locales } from "@/i18n"

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  // 當前路徑如果為 /en/xxx 或 /zh-TW/xxx，應該將語系前綴移除
  const pathnameWithoutLocale = 
    locales.some(loc => pathname.startsWith(`/${loc}`))
      ? pathname.replace(new RegExp(`^/${locale}`), '')
      : pathname

  const switchLocale = (newLocale: string) => {
    // 使用正確的格式跳轉到新的語系路徑
    router.push(`/${newLocale}${pathnameWithoutLocale || ''}`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Globe className="h-5 w-5" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => switchLocale('en')}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => switchLocale('zh-TW')}>
          繁體中文
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
