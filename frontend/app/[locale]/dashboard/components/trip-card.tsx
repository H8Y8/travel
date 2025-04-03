import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarDays, Users, CreditCard } from "lucide-react"

interface TripCardProps {
  title: string
  date: string
  members: number
  expenses: number
  currency: string
  status: "active" | "completed" | "planned"
}

export function TripCard({ title, date, members, expenses, currency, status }: TripCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          <Badge variant={status === "active" ? "default" : status === "completed" ? "secondary" : "outline"}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-3">
          <div className="flex items-center text-sm text-muted-foreground">
            <CalendarDays className="mr-1 h-4 w-4" />
            {date}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="mr-1 h-4 w-4" />
            {members} {members === 1 ? "member" : "members"}
          </div>
          <div className="flex items-center text-sm">
            <CreditCard className="mr-1 h-4 w-4" />
            <span className="font-medium">
              {currency === "USD" ? "$" : currency === "EUR" ? "€" : currency} {expenses.toFixed(2)}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link
          href={`/dashboard/trips/${encodeURIComponent(title.toLowerCase().replace(/\s+/g, "-"))}`}
          className="w-full"
        >
          <Button variant="outline" className="w-full">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

