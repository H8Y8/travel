import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowDownUp, Utensils, Train, Home, ShoppingBag } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "expense",
    title: "Dinner at Sakura Restaurant",
    amount: 85.5,
    currency: "USD",
    date: "Today, 7:30 PM",
    category: "Food & Drinks",
    icon: Utensils,
    user: {
      name: "John Doe",
      avatar: "/placeholder.svg",
    },
  },
  {
    id: 2,
    type: "expense",
    title: "Taxi to Airport",
    amount: 45.0,
    currency: "USD",
    date: "Today, 2:15 PM",
    category: "Transportation",
    icon: Train,
    user: {
      name: "Sarah Kim",
      avatar: "/placeholder.svg",
    },
  },
  {
    id: 3,
    type: "settlement",
    title: "Settlement from Mike",
    amount: 120.75,
    currency: "USD",
    date: "Yesterday, 5:45 PM",
    icon: ArrowDownUp,
    user: {
      name: "Mike Johnson",
      avatar: "/placeholder.svg",
    },
  },
  {
    id: 4,
    type: "expense",
    title: "Hotel Reservation",
    amount: 350.0,
    currency: "USD",
    date: "Yesterday, 10:30 AM",
    category: "Accommodation",
    icon: Home,
    user: {
      name: "Emily Chen",
      avatar: "/placeholder.svg",
    },
  },
  {
    id: 5,
    type: "expense",
    title: "Souvenir Shopping",
    amount: 65.25,
    currency: "USD",
    date: "Mar 20, 2024",
    category: "Shopping",
    icon: ShoppingBag,
    user: {
      name: "John Doe",
      avatar: "/placeholder.svg",
    },
  },
]

export function RecentActivity() {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
            <activity.icon className="h-5 w-5 text-foreground" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{activity.title}</p>
              <div className={`text-sm font-medium ${activity.type === "settlement" ? "text-green-500" : ""}`}>
                {activity.type === "settlement" ? "+" : "-"}
                {activity.currency === "USD" ? "$" : activity.currency === "EUR" ? "€" : activity.currency}
                {activity.amount.toFixed(2)}
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                  <AvatarFallback>
                    {activity.user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <span>{activity.user.name}</span>
              </div>
              <span>{activity.date}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

