"use client"
import type React from "react"
import axios from "axios"
import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Send,
  Bot,
  User,
  DollarSign,
  ShoppingCart,
  Car,
  Home,
  Coffee,
  Paperclip,
  Upload,
  Edit3,
  Save,
  X,
  CheckCircle,
} from "lucide-react"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
  attachment?: {
    name: string
    type: string
    url: string
  }
  parsedTransaction?: ParsedTransaction
  savedTransaction?: SavedTransaction
}

interface ParsedTransaction {
  amount: number
  type: "income" | "expense"
  category: string
  subcategory?: string
  description: string
  date: string
  confidence: number
  merchant?: string
  location?: string
}

interface SavedTransaction {
  amount: number
  type: "income" | "expense"
  category: string
  subcategory?: string
  description: string
  date: string
  merchant?: string
  location?: string
  savedAt: Date
}

interface ChatbotResponse {
  amount: number | null
  category: string | null
  date: string | null
  description: string | null
  intent: string
  response_text: string
  subcategory: string | null
  type: "expense" | "income" | null
}

export function ChatbotSection() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "bot",
      content:
        "Hi! I'm your financial assistant. You can tell me about your transactions like \"I spent $50 on groceries\" or upload receipts, and I'll help you categorize and track them!",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState<ParsedTransaction | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const categories = [
    {
      value: "food",
      label: "Food & Dining",
      subcategories: ["Groceries", "Restaurants", "Coffee & Snacks", "Fast Food"],
    },
    {
      value: "transportation",
      label: "Transportation",
      subcategories: ["Gas", "Public Transit", "Parking", "Rideshare"],
    },
    { value: "entertainment", label: "Entertainment", subcategories: ["Movies", "Games", "Events", "Subscriptions"] },
    { value: "shopping", label: "Shopping", subcategories: ["Clothing", "Electronics", "Books", "Home Goods"] },
    { value: "healthcare", label: "Healthcare", subcategories: ["Doctor Visits", "Pharmacy", "Fitness", "Insurance"] },
    { value: "utilities", label: "Utilities", subcategories: ["Electricity", "Internet", "Water", "Phone"] },
    { value: "income", label: "Income", subcategories: ["Salary", "Freelance", "Investment", "Other Income"] },
  ]

  const chatbotInteract = async (message: string): Promise<ChatbotResponse | null> => {
    try {
      const response = await axios.post(
        "https://ai-personal-financial-insights-357761203344.asia-south1.run.app/chatbot/chatbot-interact",
        {
          utterance: message,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      )

      console.log("✅ Chat Response:", response.data)

      // Add bot response message
      const botMessage: Message = {
        id: Date.now().toString(),
        type: "bot",
        content: response.data.response_text,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])

      return response.data as ChatbotResponse
    } catch (error: any) {
      console.error("❌ Failed to interact with chatbot:", error.response?.data || error.message)

      const errorMessage: Message = {
        id: Date.now().toString(),
        type: "bot",
        content: "Sorry, I had trouble processing your request. Please try again.",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, errorMessage])

      return null
    }
  }

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [messages])

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "food":
      case "groceries":
        return ShoppingCart
      case "transportation":
        return Car
      case "dining":
      case "coffee":
        return Coffee
      case "utilities":
        return Home
      default:
        return DollarSign
    }
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const convertChatbotResponseToTransaction = (response: ChatbotResponse): ParsedTransaction | null => {
    // Check if essential data is present and not null
    if (!response.amount || !response.type || !response.category || !response.description) {
      return null
    }

    return {
      amount: response.amount,
      type: response.type,
      category: response.category.toLowerCase(),
      subcategory: response.subcategory || undefined,
      description: response.description,
      date: response.date || new Date().toISOString().split("T")[0],
      confidence: 0.85, // Default confidence since it's not provided by the API
      merchant: undefined,
      location: undefined,
    }
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim() && !selectedFile) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue || "Uploaded file",
      timestamp: new Date(),
      attachment: selectedFile
        ? {
            name: selectedFile.name,
            type: selectedFile.type,
            url: URL.createObjectURL(selectedFile),
          }
        : undefined,
    }

    setMessages((prev) => [...prev, userMessage])

    setIsLoading(true)

    try {
      // Call chatbot API and get response
      const chatbotResponse = await chatbotInteract(inputValue)

      if (chatbotResponse) {
        // Convert response to transaction format
        const parsedTransaction = convertChatbotResponseToTransaction(chatbotResponse)

        // Only show transaction popup if we have valid transaction data
        if (parsedTransaction) {
          setEditingTransaction(parsedTransaction)
        }
      }
    } catch (error) {
      console.error("Error processing message:", error)
    }

    setInputValue("")
    setSelectedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    setIsLoading(false)
  }

  const handleSaveTransaction = async () => {
    if (!editingTransaction) return

    setIsLoading(true)
    try {
      // Call the add_transaction API
      const response = await axios.post(
        "https://ai-personal-financial-insights-357761203344.asia-south1.run.app/transactions/add_transaction",
        {
          user_id: 1,
          date: editingTransaction.date,
          amount: editingTransaction.amount,
          type: editingTransaction.type,
          category: editingTransaction.category,
          description: editingTransaction.description,
          location: editingTransaction.location || "",
          payment_method: "",
          merchant: editingTransaction.merchant || "",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      )

      console.log("✅ Transaction Added:", response.data)

      // Create saved transaction object
      const savedTransaction: SavedTransaction = {
        amount: editingTransaction.amount,
        type: editingTransaction.type,
        category: editingTransaction.category,
        subcategory: editingTransaction.subcategory,
        description: editingTransaction.description,
        date: editingTransaction.date,
        merchant: editingTransaction.merchant,
        location: editingTransaction.location,
        savedAt: new Date(),
      }

      const successMessage: Message = {
        id: Date.now().toString(),
        type: "bot",
        content: `✅ Transaction saved successfully! Here are the details:`,
        timestamp: new Date(),
        savedTransaction,
      }
      setMessages((prev) => [...prev, successMessage])
      setEditingTransaction(null)
    } catch (error: any) {
      console.error("❌ Failed to add transaction:", error.response?.data || error.message)
      const errorMessage: Message = {
        id: Date.now().toString(),
        type: "bot",
        content: "❌ Sorry, there was an error saving your transaction. Please try again.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    }
    setIsLoading(false)
  }

  const handleCancelEdit = () => {
    setEditingTransaction(null)
  }

  const updateEditingTransaction = (field: keyof ParsedTransaction, value: any) => {
    if (editingTransaction) {
      setEditingTransaction({
        ...editingTransaction,
        [field]: value,
      })
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const TransactionTable = ({ transaction }: { transaction: SavedTransaction }) => {
    const CategoryIcon = getCategoryIcon(transaction.category)

    return (
      <div className="mt-3 p-4 bg-white bg-opacity-95 rounded-lg border border-green-200">
        <div className="flex items-center mb-3">
          <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
          <h4 className="font-semibold text-sm text-green-800">Transaction Saved</h4>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="py-2 pr-4 font-medium text-gray-700">Amount:</td>
                <td className="py-2 text-right">
                  <span
                    className={`font-semibold ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}
                  >
                    {transaction.type === "income" ? "+" : "-"}
                    {formatCurrency(transaction.amount)}
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-medium text-gray-700">Type:</td>
                <td className="py-2 text-right">
                  <Badge variant={transaction.type === "income" ? "default" : "secondary"} className="text-xs">
                    {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                  </Badge>
                </td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-medium text-gray-700">Category:</td>
                <td className="py-2 text-right">
                  <div className="flex items-center justify-end">
                    <CategoryIcon className="h-3 w-3 mr-1" />
                    <span className="capitalize">{transaction.category}</span>
                  </div>
                </td>
              </tr>
              {transaction.subcategory && (
                <tr>
                  <td className="py-2 pr-4 font-medium text-gray-700">Subcategory:</td>
                  <td className="py-2 text-right capitalize">{transaction.subcategory}</td>
                </tr>
              )}
              <tr>
                <td className="py-2 pr-4 font-medium text-gray-700">Date:</td>
                <td className="py-2 text-right">{formatDate(transaction.date)}</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-medium text-gray-700">Description:</td>
                <td className="py-2 text-right">{transaction.description}</td>
              </tr>
              {transaction.merchant && (
                <tr>
                  <td className="py-2 pr-4 font-medium text-gray-700">Merchant:</td>
                  <td className="py-2 text-right">{transaction.merchant}</td>
                </tr>
              )}
              {transaction.location && (
                <tr>
                  <td className="py-2 pr-4 font-medium text-gray-700">Location:</td>
                  <td className="py-2 text-right">{transaction.location}</td>
                </tr>
              )}
              <tr>
                <td className="py-2 pr-4 font-medium text-gray-700">Saved At:</td>
                <td className="py-2 text-right text-xs text-gray-500">{transaction.savedAt.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 gap-6 h-[calc(100vh-8rem)]">
        {/* Main Chat Area */}
        <div className="col-span-1">
          <Card className="h-full flex flex-col">
            <CardHeader className="flex-shrink-0">
              <CardTitle className="flex items-center space-x-2">
                <Bot className="h-6 w-6 text-blue-600" />
                <span>Financial Assistant</span>
              </CardTitle>
              <CardDescription>
                Tell me about your transactions, upload receipts, and I'll help you categorize and track them
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col min-h-0 p-6">
              {/* Messages Area - Scrollable */}
              <div className="flex-1 overflow-hidden mb-4">
                <ScrollArea className="h-full pr-4" ref={scrollAreaRef}>
                  <div className="space-y-4 pb-4">
                    {messages.map((message) => {
                      const Icon = message.type === "user" ? User : Bot
                      const CategoryIcon = message.parsedTransaction
                        ? getCategoryIcon(message.parsedTransaction.category)
                        : null
                      return (
                        <div
                          key={message.id}
                          className={`flex items-start space-x-3 ${
                            message.type === "user" ? "flex-row-reverse space-x-reverse" : ""
                          }`}
                        >
                          <div
                            className={`p-2 rounded-full flex-shrink-0 ${
                              message.type === "user" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className={`flex-1 min-w-0 ${message.type === "user" ? "text-right" : ""}`}>
                            <div
                              className={`inline-block p-3 rounded-lg max-w-[85%] ${
                                message.type === "user" ? "bg-blue-600 text-white ml-auto" : "bg-gray-100 text-gray-900"
                              }`}
                            >
                              <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                              {message.attachment && (
                                <div className="mt-2 p-2 bg-white bg-opacity-20 rounded border">
                                  <div className="flex items-center space-x-2 text-xs">
                                    <Paperclip className="h-3 w-3" />
                                    <span className="truncate">{message.attachment.name}</span>
                                  </div>
                                </div>
                              )}
                              {message.parsedTransaction && (
                                <div className="mt-3 p-3 bg-white bg-opacity-90 rounded border text-gray-900">
                                  <h4 className="font-medium text-sm mb-2 flex items-center">
                                    {CategoryIcon && <CategoryIcon className="h-3 w-3 mr-1" />}
                                    Parsed Transaction Data
                                  </h4>
                                  <div className="grid grid-cols-2 gap-2 text-xs">
                                    <div>
                                      <strong>Amount:</strong> ${message.parsedTransaction.amount}
                                    </div>
                                    <div>
                                      <strong>Type:</strong> {message.parsedTransaction.type}
                                    </div>
                                    <div>
                                      <strong>Category:</strong> {message.parsedTransaction.category}
                                    </div>
                                    <div>
                                      <strong>Date:</strong> {message.parsedTransaction.date}
                                    </div>
                                    <div className="col-span-2">
                                      <strong>Description:</strong> {message.parsedTransaction.description}
                                    </div>
                                    {message.parsedTransaction.merchant && (
                                      <div className="col-span-2">
                                        <strong>Merchant:</strong> {message.parsedTransaction.merchant}
                                      </div>
                                    )}
                                    <div className="col-span-2">
                                      <Badge variant="outline" className="text-xs">
                                        Confidence: {Math.round(message.parsedTransaction.confidence * 100)}%
                                      </Badge>
                                    </div>
                                  </div>
                                </div>
                              )}
                              {message.savedTransaction && <TransactionTable transaction={message.savedTransaction} />}
                            </div>
                            <p className="text-xs text-gray-500 mt-1 px-1">{message.timestamp.toLocaleTimeString()}</p>
                          </div>
                        </div>
                      )
                    })}
                    {isLoading && (
                      <div className="flex items-start space-x-3">
                        <div className="p-2 rounded-full bg-gray-200 text-gray-700">
                          <Bot className="h-4 w-4" />
                        </div>
                        <div className="bg-gray-100 p-3 rounded-lg">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </div>
              {/* Transaction Editor - Fixed Position */}
              {editingTransaction && (
                <div className="flex-shrink-0 mb-4">
                  <Card className="border-blue-200 bg-blue-50">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center justify-between">
                        <span className="flex items-center">
                          <Edit3 className="h-4 w-4 mr-2" />
                          Edit Transaction Details
                        </span>
                        <Button variant="ghost" size="sm" onClick={handleCancelEdit}>
                          <X className="h-4 w-4" />
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="amount">Amount ($)</Label>
                          <Input
                            id="amount"
                            type="number"
                            step="0.01"
                            value={editingTransaction.amount}
                            onChange={(e) => updateEditingTransaction("amount", Number.parseFloat(e.target.value))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="type">Transaction Type</Label>
                          <Select
                            value={editingTransaction.type}
                            onValueChange={(value) => updateEditingTransaction("type", value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="expense">Expense</SelectItem>
                              <SelectItem value="income">Income</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="category">Category</Label>
                          <Select
                            value={editingTransaction.category}
                            onValueChange={(value) => updateEditingTransaction("category", value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((cat) => (
                                <SelectItem key={cat.value} value={cat.value}>
                                  {cat.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="subcategory">Subcategory</Label>
                          <Select
                            value={editingTransaction.subcategory || ""}
                            onValueChange={(value) => updateEditingTransaction("subcategory", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select subcategory" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories
                                .find((cat) => cat.value === editingTransaction.category)
                                ?.subcategories.map((sub) => (
                                  <SelectItem key={sub} value={sub.toLowerCase()}>
                                    {sub}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="date">Date</Label>
                          <Input
                            id="date"
                            type="date"
                            value={editingTransaction.date}
                            onChange={(e) => updateEditingTransaction("date", e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="merchant">Merchant (Optional)</Label>
                          <Input
                            id="merchant"
                            value={editingTransaction.merchant || ""}
                            onChange={(e) => updateEditingTransaction("merchant", e.target.value)}
                            placeholder="Store or merchant name"
                          />
                        </div>
                        <div className="md:col-span-2 lg:col-span-3">
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            value={editingTransaction.description}
                            onChange={(e) => updateEditingTransaction("description", e.target.value)}
                            placeholder="Transaction description"
                            rows={2}
                          />
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2 mt-4">
                        <Button variant="outline" onClick={handleCancelEdit}>
                          Cancel
                        </Button>
                        <Button onClick={handleSaveTransaction} disabled={isLoading}>
                          <Save className="h-4 w-4 mr-2" />
                          Save Transaction
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
              {/* File Upload Preview - Fixed Position */}
              {selectedFile && (
                <div className="flex-shrink-0 mb-4">
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 min-w-0">
                        <Upload className="h-4 w-4 text-yellow-600 flex-shrink-0" />
                        <span className="text-sm font-medium truncate">File Selected: {selectedFile.name}</span>
                        <Badge variant="outline" className="text-xs flex-shrink-0">
                          {(selectedFile.size / 1024).toFixed(1)} KB
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedFile(null)
                          if (fileInputRef.current) fileInputRef.current.value = ""
                        }}
                        className="flex-shrink-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              {/* Input Area - Fixed at Bottom */}
              <div className="flex-shrink-0">
                <div className="flex space-x-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,.pdf,.txt"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isLoading}
                    className="flex-shrink-0"
                  >
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Tell me about a transaction or upload a receipt... (e.g., 'I spent $50 on groceries')"
                    onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
                    disabled={isLoading}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={isLoading || (!inputValue.trim() && !selectedFile)}
                    className="flex-shrink-0"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
