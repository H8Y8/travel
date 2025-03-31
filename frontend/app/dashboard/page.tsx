import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Users, CreditCard, BarChart3 } from "lucide-react"
import { TripCard } from "@/app/dashboard/components/trip-card"
import { ExpenseSummary } from "@/app/dashboard/components/expense-summary"
import { RecentActivity } from "@/app/dashboard/components/recent-activity"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href="/dashboard" className="flex items-center gap-2 text-lg font-semibold">
            <Users className="h-5 w-5" />
            <span>TravelSplit</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/dashboard" className="text-sm font-medium hover:underline underline-offset-4">
              Dashboard
            </Link>
            <Link href="/dashboard/trips" className="text-sm font-medium hover:underline underline-offset-4">
              My Trips
            </Link>
            <Link href="/dashboard/expenses" className="text-sm font-medium hover:underline underline-offset-4">
              Expenses
            </Link>
            <Link href="/dashboard/settlements" className="text-sm font-medium hover:underline underline-offset-4">
              Settlements
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/dashboard/profile">
              <Button variant="ghost" size="icon" className="rounded-full">
                <span className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full">
                  <span className="flex h-full w-full items-center justify-center rounded-full bg-muted text-muted-foreground">
                    JD
                  </span>
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 py-6">
        <div className="container px-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">Welcome to your travel expense dashboard!</p>
            </div>
            <Link href="/dashboard/trips/new">
              <Button className="gap-1">
                <Plus className="h-4 w-4" /> New Trip
              </Button>
            </Link>
          </div>
          <Tabs defaultValue="overview" className="mt-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="trips">My Trips</TabsTrigger>
              <TabsTrigger value="expenses">Expenses</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Trips</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3</div>
                    <p className="text-xs text-muted-foreground">+1 from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$1,254.36</div>
                    <p className="text-xs text-muted-foreground">+$234.12 from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pending Settlements</CardTitle>
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$345.78</div>
                    <p className="text-xs text-muted-foreground">2 people owe you</p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-4">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Your recent expenses and settlements</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentActivity />
                  </CardContent>
                </Card>
                <Card className="lg:col-span-3">
                  <CardHeader>
                    <CardTitle>Expense Summary</CardTitle>
                    <CardDescription>Your spending by category</CardDescription>
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
                  <CardTitle>Expense Analytics</CardTitle>
                  <CardDescription>Your spending patterns over time</CardDescription>
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

