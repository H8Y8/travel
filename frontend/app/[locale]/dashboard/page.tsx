"use client" 

import { useEffect } from "react" 
import Link from "next/link"
import { useRouter } from "next/navigation" 
import { useTranslations } from "next-intl"
import { useAuth } from "@/context/AuthContext" 
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu" 
import { Plus, Users, CreditCard, BarChart3, LogOut } from "lucide-react" 
import { TripCard } from "@/app/dashboard/components/trip-card"
import { ExpenseSummary } from "@/app/dashboard/components/expense-summary" 
// Removed duplicate import
import { RecentActivity } from "@/app/dashboard/components/recent-activity"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { Header } from "@/components/Header"

export default function DashboardPage() {
  const t = useTranslations("DashboardPage")
  const { isLoggedIn, isLoading, logout } = useAuth() 
  const router = useRouter()

  // console.log("DashboardPage Mount/Render:", { isLoading, isLoggedIn }); // Removed log

  useEffect(() => {
    // console.log("DashboardPage useEffect Check:", { isLoading, isLoggedIn }); // Removed log
    // Redirect to login if not logged in and not loading
    if (!isLoading && !isLoggedIn) {
      // console.log("Redirecting to /login"); // Removed log
      router.push("/login")
    }
  }, [isLoggedIn, isLoading, router])

  // Show loading state or null while checking auth state
  if (isLoading || !isLoggedIn) {
    // console.log("Rendering Loading/Redirect state"); // Removed log
    // Optionally return a loading spinner or skeleton screen
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>{t("loading")}</p> 
      </div>
    ) 
  }

  // console.log("Rendering Dashboard Content"); // Removed log
  // Render dashboard content only if logged in
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-6">
        <div className="container px-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{t("header.title")}</h1>
              <p className="text-muted-foreground">{t("header.welcome")}</p>
            </div>
            <Link href="/dashboard/trips/new">
              <Button className="gap-1">
                <Plus className="h-4 w-4" /> {t("header.newTrip")}
              </Button>
            </Link>
          </div>
          <Tabs defaultValue="overview" className="mt-6">
            <TabsList>
              <TabsTrigger value="overview">{t("tabs.overview")}</TabsTrigger>
              <TabsTrigger value="trips">{t("tabs.trips")}</TabsTrigger>
              <TabsTrigger value="expenses">{t("tabs.expenses")}</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t("statistics.activeTrips")}</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3</div>
                    <p className="text-xs text-muted-foreground">+1 {t("statistics.fromLastMonth")}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t("statistics.totalExpenses")}</CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$1,254.36</div>
                    <p className="text-xs text-muted-foreground">+$234.12 {t("statistics.fromLastMonth")}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t("statistics.pendingSettlements")}</CardTitle>
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$345.78</div>
                    <p className="text-xs text-muted-foreground">2 {t("statistics.peopleOweYou")}</p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-4">
                  <CardHeader>
                    <CardTitle>{t("recentActivity.title")}</CardTitle>
                    <CardDescription>{t("recentActivity.description")}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentActivity />
                  </CardContent>
                </Card>
                <Card className="lg:col-span-3">
                  <CardHeader>
                    <CardTitle>{t("expenseSummary.title")}</CardTitle>
                    <CardDescription>{t("expenseSummary.description")}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ExpenseSummary />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="trips" className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <TripCard
                  title="Japan Adventure"
                  date="Mar 15 - Mar 25, 2024"
                  members={5}
                  expenses={1250.75}
                  currency="USD"
                  status="active"
                />
                <TripCard
                  title="Weekend in Paris"
                  date="Feb 3 - Feb 5, 2024"
                  members={3}
                  expenses={780.5}
                  currency="EUR"
                  status="active"
                />
                <TripCard
                  title="Beach Vacation"
                  date="Jan 10 - Jan 17, 2024"
                  members={4}
                  expenses={1875.25}
                  currency="USD"
                  status="active"
                />
                <TripCard
                  title="New York City"
                  date="Dec 20 - Dec 27, 2023"
                  members={2}
                  expenses={2340.0}
                  currency="USD"
                  status="completed"
                />
              </div>
            </TabsContent>
            <TabsContent value="expenses" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{t("expenseSummary.title")}</CardTitle>
                  <CardDescription>{t("expenseSummary.description")}</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <p className="text-muted-foreground">Expense chart will be displayed here</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
