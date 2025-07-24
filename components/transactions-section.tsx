"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, ShoppingCart, TrendingUp, Car, Filter, Download, Home, Plane, Heart, DollarSign } from "lucide-react"
import { DatePickerWithRange } from "@/components/date-range-picker"
import type { DateRange } from "react-day-picker"

interface Transaction {
  id: number
  title: string
  category: string
  account: string
  date: string
  amount: number
  type: "income" | "expense"
  tags: string[]
  recurring?: boolean
  merchant?: string
  location?: string
}

export function TransactionsSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [selectedCategory, setSelectedCategory] = useState<string>("all-categories")
  const [selectedAccount, setSelectedAccount] = useState<string>("all-accounts")
  const [allTransactions, setAllTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Mock transaction data - in a real app, this would come from your database
  const mockTransactions: Transaction[] = [
    {
      id: 1,
      title: "Whole Foods Market",
      category: "food",
      account: "checking",
      date: "2024-06-28",
      amount: -85.32,
      type: "expense",
      tags: ["groceries", "weekly"],
      merchant: "Whole Foods",
      location: "Downtown",
    },
    {
      id: 2,
      title: "Salary Deposit",
      category: "income",
      account: "checking",
      date: "2024-06-28",
      amount: 3200.0,
      type: "income",
      tags: ["salary", "monthly"],
      recurring: true,
      merchant: "ABC Company",
    },
    {
      id: 3,
      title: "Shell Gas Station",
      category: "transportation",
      account: "credit-card",
      date: "2024-06-27",
      amount: -45.2,
      type: "expense",
      tags: ["fuel", "car"],
      merchant: "Shell",
      location: "Highway 101",
    },
    {
      id: 4,
      title: "Netflix Subscription",
      category: "entertainment",
      account: "credit-card",
      date: "2024-06-26",
      amount: -15.99,
      type: "expense",
      tags: ["streaming", "monthly"],
      recurring: true,
      merchant: "Netflix",
    },
    {
      id: 5,
      title: "Starbucks Coffee",
      category: "food",
      account: "checking",
      date: "2024-06-25",
      amount: -6.75,
      type: "expense",
      tags: ["coffee", "daily"],
      merchant: "Starbucks",
      location: "Main Street",
    },
    {
      id: 6,
      title: "Freelance Payment",
      category: "income",
      account: "checking",
      date: "2024-06-24",
      amount: 850.0,
      type: "income",
      tags: ["freelance", "project"],
      merchant: "XYZ Client",
    },
    {
      id: 7,
      title: "Amazon Purchase",
      category: "shopping",
      account: "credit-card",
      date: "2024-06-23",
      amount: -129.99,
      type: "expense",
      tags: ["online", "electronics"],
      merchant: "Amazon",
    },
    {
      id: 8,
      title: "Electric Bill",
      category: "utilities",
      account: "checking",
      date: "2024-06-22",
      amount: -89.45,
      type: "expense",
      tags: ["utilities", "monthly"],
      recurring: true,
      merchant: "City Electric",
    },
    {
      id: 9,
      title: "Doctor Visit",
      category: "healthcare",
      account: "checking",
      date: "2024-06-21",
      amount: -150.0,
      type: "expense",
      tags: ["medical", "checkup"],
      merchant: "Family Health Clinic",
    },
    {
      id: 10,
      title: "Uber Ride",
      category: "transportation",
      account: "credit-card",
      date: "2024-06-20",
      amount: -18.5,
      type: "expense",
      tags: ["rideshare", "commute"],
      merchant: "Uber",
    },
    {
      id: 11,
      title: "Target Shopping",
      category: "shopping",
      account: "checking",
      date: "2024-06-19",
      amount: -67.89,
      type: "expense",
      tags: ["retail", "household"],
      merchant: "Target",
    },
    {
      id: 12,
      title: "Investment Dividend",
      category: "income",
      account: "investment",
      date: "2024-06-18",
      amount: 125.5,
      type: "income",
      tags: ["dividend", "investment"],
      merchant: "Vanguard",
    },
    // Add more historical transactions
    {
      id: 13,
      title: "Grocery Store",
      category: "food",
      account: "checking",
      date: "2024-05-15",
      amount: -92.15,
      type: "expense",
      tags: ["groceries", "weekly"],
      merchant: "Safeway",
    },
    {
      id: 14,
      title: "Gas Station",
      category: "transportation",
      account: "credit-card",
      date: "2024-04-10",
      amount: -52.3,
      type: "expense",
      tags: ["fuel", "car"],
      merchant: "Chevron",
    },
    {
      id: 15,
      title: "Salary Deposit",
      category: "income",
      account: "checking",
      date: "2024-03-28",
      amount: 3200.0,
      type: "income",
      tags: ["salary", "monthly"],
      recurring: true,
      merchant: "ABC Company",
    },
  ]

  // Fetch transactions based on filters
  const fetchTransactions = async (filters: {
    dateRange?: DateRange
    category?: string
    account?: string
    searchQuery?: string
  }) => {
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    try {
      // In a real app, this would be an API call:
      // const response = await fetch('/api/transactions', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(filters)
      // })
      // const data = await response.json()

      let filteredTransactions = [...mockTransactions]

      // Filter by date range
      if (filters.dateRange?.from) {
        const fromDate = new Date(filters.dateRange.from)
        const toDate = filters.dateRange.to ? new Date(filters.dateRange.to) : new Date()

        filteredTransactions = filteredTransactions.filter((transaction) => {
          const transactionDate = new Date(transaction.date)
          return transactionDate >= fromDate && transactionDate <= toDate
        })
      }

      // Filter by category
      if (filters.category && filters.category !== "all-categories") {
        filteredTransactions = filteredTransactions.filter((transaction) => transaction.category === filters.category)
      }

      // Filter by account
      if (filters.account && filters.account !== "all-accounts") {
        filteredTransactions = filteredTransactions.filter((transaction) => transaction.account === filters.account)
      }

      // Filter by search query
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase()
        filteredTransactions = filteredTransactions.filter(
          (transaction) =>
            transaction.title.toLowerCase().includes(query) ||
            transaction.category.toLowerCase().includes(query) ||
            transaction.merchant?.toLowerCase().includes(query) ||
            transaction.tags.some((tag) => tag.toLowerCase().includes(query)),
        )
      }

      // Sort by date (newest first)
      filteredTransactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

      setAllTransactions(filteredTransactions)
    } catch (error) {
      console.error("Error fetching transactions:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Load initial transactions
  useEffect(() => {
    fetchTransactions({})
  }, [])

  // Refetch when filters change
  useEffect(() => {
    fetchTransactions({
      dateRange,
      category: selectedCategory,
      account: selectedAccount,
      searchQuery,
    })
  }, [dateRange, selectedCategory, selectedAccount, searchQuery])

  // Calculate summary statistics
  const summaryStats = useMemo(() => {
    const expenses = allTransactions.filter((t) => t.type === "expense")
    const income = allTransactions.filter((t) => t.type === "income")

    const totalExpenses = expenses.reduce((sum, t) => sum + Math.abs(t.amount), 0)
    const totalIncome = income.reduce((sum, t) => sum + t.amount, 0)

    const daysInPeriod =
      dateRange?.from && dateRange?.to
        ? Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24)) + 1
        : 30 // Default to 30 days if no range selected

    const avgDailySpending = totalExpenses / daysInPeriod

    return {
      totalExpenses,
      totalIncome,
      avgDailySpending,
      transactionCount: allTransactions.length,
    }
  }, [allTransactions, dateRange])

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "food":
        return ShoppingCart
      case "transportation":
        return Car
      case "entertainment":
        return Plane
      case "shopping":
        return ShoppingCart
      case "healthcare":
        return Heart
      case "utilities":
        return Home
      case "income":
        return TrendingUp
      default:
        return DollarSign
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "food":
        return { bg: "bg-green-100", text: "text-green-600" }
      case "transportation":
        return { bg: "bg-blue-100", text: "text-blue-600" }
      case "entertainment":
        return { bg: "bg-purple-100", text: "text-purple-600" }
      case "shopping":
        return { bg: "bg-pink-100", text: "text-pink-600" }
      case "healthcare":
        return { bg: "bg-red-100", text: "text-red-600" }
      case "utilities":
        return { bg: "bg-yellow-100", text: "text-yellow-600" }
      case "income":
        return { bg: "bg-green-100", text: "text-green-600" }
      default:
        return { bg: "bg-gray-100", text: "text-gray-600" }
    }
  }

  const formatAccountName = (account: string) => {
    switch (account) {
      case "checking":
        return "Checking Account"
      case "credit-card":
        return "Credit Card"
      case "savings":
        return "Savings Account"
      case "investment":
        return "Investment Account"
      default:
        return account
    }
  }

  const formatCategoryName = (category: string) => {
    switch (category) {
      case "food":
        return "Food & Dining"
      case "transportation":
        return "Transportation"
      case "entertainment":
        return "Entertainment"
      case "shopping":
        return "Shopping"
      case "healthcare":
        return "Healthcare"
      case "utilities":
        return "Utilities"
      case "income":
        return "Income"
      default:
        return category
    }
  }

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="space-y-4">
        {/* Top Row - Date Range and Export */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Transactions</h2>
            <p className="text-gray-600 mt-1">
              {allTransactions.length > 0
                ? `Showing ${allTransactions.length} transaction${allTransactions.length !== 1 ? "s" : ""}`
                : "No transactions found for the selected filters"}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <DatePickerWithRange date={dateRange} setDate={setDateRange} />
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export ({allTransactions.length})
            </Button>
          </div>
        </div>

        {/* Bottom Row - Filters and Actions */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-categories">All Categories</SelectItem>
                <SelectItem value="food">Food & Dining</SelectItem>
                <SelectItem value="transportation">Transportation</SelectItem>
                <SelectItem value="entertainment">Entertainment</SelectItem>
                <SelectItem value="shopping">Shopping</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="utilities">Utilities</SelectItem>
                <SelectItem value="income">Income</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedAccount} onValueChange={setSelectedAccount}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Accounts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-accounts">All Accounts</SelectItem>
                <SelectItem value="checking">Checking Account</SelectItem>
                <SelectItem value="credit-card">Credit Card</SelectItem>
                <SelectItem value="savings">Savings Account</SelectItem>
                <SelectItem value="investment">Investment Account</SelectItem>
              </SelectContent>
            </Select>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>

            {/* Active Filters Indicator */}
            {(selectedCategory !== "all-categories" ||
              selectedAccount !== "all-accounts" ||
              searchQuery ||
              dateRange?.from) && (
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="text-xs">
                  {
                    [
                      selectedCategory !== "all-categories" && formatCategoryName(selectedCategory),
                      selectedAccount !== "all-accounts" && formatAccountName(selectedAccount),
                      searchQuery && `"${searchQuery}"`,
                      dateRange?.from && "Date Range",
                    ].filter(Boolean).length
                  }{" "}
                  filter
                  {[
                    selectedCategory !== "all-categories" && formatCategoryName(selectedCategory),
                    selectedAccount !== "all-accounts" && formatAccountName(selectedAccount),
                    searchQuery && `"${searchQuery}"`,
                    dateRange?.from && "Date Range",
                  ].filter(Boolean).length !== 1
                    ? "s"
                    : ""}{" "}
                  active
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedCategory("all-categories")
                    setSelectedAccount("all-accounts")
                    setSearchQuery("")
                    setDateRange(undefined)
                  }}
                  className="text-xs h-6 px-2"
                >
                  Clear All
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading transactions...</p>
          </CardContent>
        </Card>
      )}

      {/* Summary Cards */}
      {!isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {dateRange?.from ? "Selected Period" : "This Month"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">-${summaryStats.totalExpenses.toFixed(2)}</div>
              <p className="text-sm text-gray-500">Total Expenses</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {dateRange?.from ? "Selected Period" : "This Month"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">+${summaryStats.totalIncome.toFixed(2)}</div>
              <p className="text-sm text-gray-500">Total Income</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Average Daily</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">${summaryStats.avgDailySpending.toFixed(0)}</div>
              <p className="text-sm text-gray-500">Spending</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{summaryStats.transactionCount}</div>
              <p className="text-sm text-gray-500">{dateRange?.from ? "In Period" : "This Period"}</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Transactions List */}
      {!isLoading && (
        <Card>
          <CardHeader>
            <CardTitle>{allTransactions.length > 0 ? "Filtered Transactions" : "No Transactions Found"}</CardTitle>
            <p className="text-sm text-gray-600">
              {allTransactions.length > 0
                ? `Showing ${allTransactions.length} transaction${allTransactions.length !== 1 ? "s" : ""} matching your filters`
                : "Try adjusting your filters to see more transactions"}
            </p>
          </CardHeader>
          <CardContent>
            {allTransactions.length > 0 ? (
              <div className="space-y-4">
                {allTransactions.map((transaction) => {
                  const Icon = getCategoryIcon(transaction.category)
                  const colors = getCategoryColor(transaction.category)

                  return (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-full ${colors.bg}`}>
                          <Icon className={`h-5 w-5 ${colors.text}`} />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{transaction.title}</h3>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <span>{formatCategoryName(transaction.category)}</span>
                            <span>•</span>
                            <span>{formatAccountName(transaction.account)}</span>
                            <span>•</span>
                            <span>{new Date(transaction.date).toLocaleDateString()}</span>
                            {transaction.recurring && (
                              <>
                                <span>•</span>
                                <Badge variant="secondary" className="text-xs">
                                  Recurring
                                </Badge>
                              </>
                            )}
                          </div>
                          <div className="flex space-x-1 mt-1">
                            {transaction.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          {transaction.merchant && (
                            <p className="text-xs text-gray-400 mt-1">
                              {transaction.merchant}
                              {transaction.location && ` • ${transaction.location}`}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className={`text-lg font-bold ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}
                        >
                          {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
                        </div>
                        <p className="text-sm text-gray-500">{transaction.type === "income" ? "Income" : "Expense"}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions found</h3>
                <p className="text-gray-600 mb-4">No transactions match your current filter criteria.</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedCategory("all-categories")
                    setSelectedAccount("all-accounts")
                    setSearchQuery("")
                    setDateRange(undefined)
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
