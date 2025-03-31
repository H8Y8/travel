"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Plus, Users, Receipt, Share2 } from "lucide-react"

export default function TripDetailsPage({ params }: { params: { id: string } }) {
  const [showAddExpenseDialog, setShowAddExpenseDialog] = useState(false)

  // This would normally be fetched from an API based on the ID
  const tripName = params.id
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href="/dashboard" className="flex items-center gap-2 text-lg font-semibold">
            <Users className="h-5 w-5" />
            <span>TravelSplit</span>
          </Link>
          <div className="flex items-center gap-4"></div>
        </div>
      </header>
      <main className="flex-1 py-6">
        <div className="container px-4">
          <div className="mb-6">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-2"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Dashboard
            </Link>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">{tripName}</h1>
                <p className="text-muted-foreground">Mar 15 - Mar 25, 2024 • 5 members</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <Share2 className="h-4 w-4" /> Share
                </Button>
                <Dialog open={showAddExpenseDialog} onOpenChange={setShowAddExpenseDialog}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="gap-1">
                      <Plus className="h-4 w-4" /> Add Expense
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Expense</DialogTitle>
                      <DialogDescription>Enter the details of the expense to split with your group.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" placeholder="Dinner at Restaurant" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="amount">Amount</Label>
                          <Input id="amount" type="number" placeholder="0.00" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="currency">Currency</Label>
                          <Select defaultValue="USD">
                            <SelectTrigger id="currency">
                              <SelectValue placeholder="Select currency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="USD">USD ($)</SelectItem>
                              <SelectItem value="EUR">EUR (€)</SelectItem>
                              <SelectItem value="JPY">JPY (¥)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="category">Category</Label>
                        <Select defaultValue="food">
                          <SelectTrigger id="category">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="food">Food & Drinks</SelectItem>
                            <SelectItem value="transportation">Transportation</SelectItem>
                            <SelectItem value="accommodation">Accommodation</SelectItem>
                            <SelectItem value="activities">Activities</SelectItem>
                            <SelectItem value="shopping">Shopping</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="paidBy">Paid By</Label>
                        <Select defaultValue="me">
                          <SelectTrigger id="paidBy">
                            <SelectValue placeholder="Select who paid" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="me">Me (John Doe)</SelectItem>
                            <SelectItem value="sarah">Sarah Kim</SelectItem>
                            <SelectItem value="mike">Mike Johnson</SelectItem>
                            <SelectItem value="emily">Emily Chen</SelectItem>
                            <SelectItem value="david">David Lee</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="date">Date</Label>
                        <Input id="date" type="date" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="notes">Notes (Optional)</Label>
                        <Input id="notes" placeholder="Add any additional details" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowAddExpenseDialog(false)}>
                        Cancel
                      </Button>
                      <Button onClick={() => setShowAddExpenseDialog(false)}>Add Expense</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>

          <Tabs defaultValue="expenses" className="mt-6">
            <TabsList>
              <TabsTrigger value="expenses">Expenses</TabsTrigger>
              <TabsTrigger value="members">Members</TabsTrigger>
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="settlements">Settlements</TabsTrigger>
            </TabsList>
            <TabsContent value="expenses" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>All Expenses</CardTitle>
                  <CardDescription>View and manage all expenses for this trip</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                        <div className="flex items-start gap-4">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                            <Receipt className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">
                              {
                                [
                                  "Dinner at Restaurant",
                                  "Taxi to Hotel",
                                  "Museum Tickets",
                                  "Souvenir Shopping",
                                  "Breakfast",
                                ][i - 1]
                              }
                            </p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span>Paid by {["John", "Sarah", "Mike", "Emily", "John"][i - 1]}</span>
                              <span>•</span>
                              <span>{["Mar 15", "Mar 16", "Mar 17", "Mar 18", "Mar 19"][i - 1]}, 2024</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${[85.5, 45.0, 60.0, 120.75, 35.25][i - 1].toFixed(2)}</p>
                          <p className="text-xs text-muted-foreground">
                            ${([85.5, 45.0, 60.0, 120.75, 35.25][i - 1] / 5).toFixed(2)} / person
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="members" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Trip Members</CardTitle>
                  <CardDescription>People participating in this trip</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {["John Doe (You)", "Sarah Kim", "Mike Johnson", "Emily Chen", "David Lee"].map((name, i) => (
                      <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                        <div className="flex items-center gap-4">
                          <Avatar>
                            <AvatarImage src="/placeholder.svg" alt={name} />
                            <AvatarFallback>
                              {name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{name}</p>
                            <p className="text-sm text-muted-foreground">{i === 0 ? "Trip Creator" : "Member"}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p
                            className={`font-medium ${["+$45.25", "-$20.50", "+$15.75", "-$30.00", "-$10.50"][i]?.startsWith("+") ? "text-green-500" : "text-red-500"}`}
                          >
                            {["+$45.25", "-$20.50", "+$15.75", "-$30.00", "-$10.50"][i]}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {["+$45.25", "-$20.50", "+$15.75", "-$30.00", "-$10.50"][i]?.startsWith("+")
                              ? "To receive"
                              : "To pay"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="summary" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Expense Breakdown</CardTitle>
                    <CardDescription>Expenses by category</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px] flex items-center justify-center">
                    <p className="text-muted-foreground">Expense chart will be displayed here</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Trip Statistics</CardTitle>
                    <CardDescription>Overview of trip expenses</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between border-b pb-2">
                        <span className="font-medium">Total Trip Cost</span>
                        <span className="font-bold">$1,250.75</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="font-medium">Average Per Person</span>
                        <span>$250.15</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="font-medium">Highest Expense</span>
                        <span>$350.00 (Hotel)</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="font-medium">Total Expenses</span>
                        <span>15 items</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Trip Duration</span>
                        <span>10 days</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="settlements" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Settlement Plan</CardTitle>
                  <CardDescription>The most efficient way to settle all debts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>SK</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">Sarah Kim</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <ArrowLeft className="h-4 w-4" />
                          <span className="font-bold">$20.50</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">John Doe (You)</span>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>EC</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">Emily Chen</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <ArrowLeft className="h-4 w-4" />
                          <span className="font-bold">$30.00</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">John Doe (You)</span>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>DL</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">David Lee</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <ArrowLeft className="h-4 w-4" />
                          <span className="font-bold">$10.50</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>MJ</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">Mike Johnson</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

