"use client"

import type React from "react"
import { Plus } from "lucide-react" // Import Plus icon

import axios from 'axios';

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
  Trash2,
  RefreshCw,
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

interface ChatSession {
  id: string
  title: string
  lastMessage: Date
  messageCount: number
}

export function ChatbotSection() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState<ParsedTransaction | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [currentChatId, setCurrentChatId] = useState<string>("")
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([])
  const [isLoadingHistory, setIsLoadingHistory] = useState(true)
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

  // Load chat history on component mount
  useEffect(() => {
    loadChatHistory()
    addTransaction();
  }, [])

  

  const addTransaction = async () => {
    try {
      const response = await axios.post(
        'https://ai-personal-financial-insights-357761203344.asia-south1.run.app/add_transaction',
        // 'http://localhost:5000/add_transaction',
        {
          user_id: 1,
          date: '24-07-2024',
          amount: 35000,
          type: 'expense',
          category: 'expense',
          description: '',
          location: '',
          payment_method: '',
          merchant: ''
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('✅ Transaction Added:', response.data);
    } catch (error: any) {
      console.error('❌ Failed to add transaction:', error.response?.data || error.message);
    }
  };


  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [messages])

  const loadChatHistory = async () => {
    try {
      setIsLoadingHistory(true)

      // Load chat sessions list
      const sessionsResponse = await fetch("/api/chat/sessions")
      if (sessionsResponse.ok) {
        const sessionsData = await sessionsResponse.json()
        setChatSessions(sessionsData.sessions || [])

        // Load the most recent chat or create a new one
        if (sessionsData.sessions && sessionsData.sessions.length > 0) {
          const mostRecentChat = sessionsData.sessions[0]
          await loadChatMessages(mostRecentChat.id)
        } else {
          await createNewChat()
        }
      } else {
        await createNewChat()
      }
    } catch (error) {
      console.error("Error loading chat history:", error)
      await createNewChat()
    } finally {
      setIsLoadingHistory(false)
    }
  }

  const loadChatMessages = async (chatId: string) => {
    try {
      const response = await fetch(`/api/chat/messages?chatId=${chatId}`)
      if (response.ok) {
        const data = await response.json()
        setMessages(
          data.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          })),
        )
        setCurrentChatId(chatId)

        // Clear editing state when switching chats
        setEditingTransaction(null)
        setSelectedFile(null)
        if (fileInputRef.current) {
          fileInputRef.current.value = ""
        }
      }
    } catch (error) {
      console.error("Error loading chat messages:", error)
    }
  }

  const createNewChat = async () => {
    try {
      const response = await fetch("/api/chat/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "New Chat",
        }),
      })

      if (response.ok) {
        const data = await response.json()
        const newChatId = data.chatId

        // Set welcome message
        const welcomeMessage: Message = {
          id: "welcome",
          type: "bot",
          content:
            "Hi! I'm your financial assistant. You can tell me about your transactions like \"I spent $50 on groceries\" or upload receipts, and I'll help you categorize and track them!",
          timestamp: new Date(),
        }

        // Clear current messages and set new chat
        setMessages([welcomeMessage])
        setCurrentChatId(newChatId)
        setEditingTransaction(null) // Clear any editing state
        setSelectedFile(null) // Clear any selected file
        if (fileInputRef.current) {
          fileInputRef.current.value = ""
        }

        // Save welcome message
        await saveMessage(newChatId, welcomeMessage)

        // Refresh chat sessions to show updated list
        await loadChatSessions()
      }
    } catch (error) {
      console.error("Error creating new chat:", error)
    }
  }

  const loadChatSessions = async () => {
    try {
      const response = await fetch("/api/chat/sessions")
      if (response.ok) {
        const data = await response.json()
        setChatSessions(data.sessions || [])
      }
    } catch (error) {
      console.error("Error loading chat sessions:", error)
    }
  }

  const saveMessage = async (chatId: string, message: Message) => {
    try {
      await fetch("/api/chat/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatId,
          message: {
            ...message,
            timestamp: message.timestamp.toISOString(),
          },
        }),
      })
    } catch (error) {
      console.error("Error saving message:", error)
    }
  }

  const updateChatTitle = async (chatId: string, title: string) => {
    try {
      await fetch(`/api/chat/sessions/${chatId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      })
      await loadChatSessions()
    } catch (error) {
      console.error("Error updating chat title:", error)
    }
  }

  const deleteChatSession = async (chatId: string) => {
    try {
      await fetch(`/api/chat/sessions/${chatId}`, {
        method: "DELETE",
      })

      // If we're deleting the current chat, create a new one
      if (chatId === currentChatId) {
        await createNewChat()
      }

      await loadChatSessions()
    } catch (error) {
      console.error("Error deleting chat session:", error)
    }
  }

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

  const parseTransactionWithGemini = async (text: string, file?: File): Promise<ParsedTransaction> => {
    try {
      const formData = new FormData()
      formData.append("text", text)
      if (file) {
        formData.append("file", file)
      }

      const response = await fetch("/api/gemini/parse-transaction", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to parse transaction")
      }

      const result = await response.json()
      return result.parsedTransaction
    } catch (error) {
      console.error("Error parsing transaction:", error)
      // Fallback parsing logic
      return fallbackParseTransaction(text)
    }
  }

  const fallbackParseTransaction = (text: string): ParsedTransaction => {
    const amountMatch = text.match(/\$?(\d+(?:\.\d{2})?)/)
    const amount = amountMatch ? Number.parseFloat(amountMatch[1]) : 0

    const lowerText = text.toLowerCase()
    let category = "other"
    let type: "income" | "expense" = "expense"

    // Simple keyword matching
    if (
      lowerText.includes("salary") ||
      lowerText.includes("income") ||
      lowerText.includes("paid") ||
      lowerText.includes("earned")
    ) {
      type = "income"
      category = "income"
    } else if (lowerText.includes("grocery") || lowerText.includes("food") || lowerText.includes("restaurant")) {
      category = "food"
    } else if (lowerText.includes("gas") || lowerText.includes("uber") || lowerText.includes("transport")) {
      category = "transportation"
    } else if (lowerText.includes("movie") || lowerText.includes("entertainment")) {
      category = "entertainment"
    }

    return {
      amount,
      type,
      category,
      description: text,
      date: new Date().toISOString().split("T")[0],
      confidence: 0.6,
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

    const newMessages = [...messages, userMessage]
    setMessages(newMessages)

    // Save user message
    await saveMessage(currentChatId, userMessage)

    // Update chat title if this is the first user message
    if (messages.length <= 1) {
      const title = inputValue.length > 30 ? inputValue.substring(0, 30) + "..." : inputValue
      await updateChatTitle(currentChatId, title)
    }

    setIsLoading(true)

    try {
      const parsedTransaction = await parseTransactionWithGemini(inputValue, selectedFile || undefined)

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: `I've analyzed your transaction and extracted the following information. Please review and edit if needed:`,
        timestamp: new Date(),
        parsedTransaction,
      }

      setMessages((prev) => [...prev, botResponse])
      await saveMessage(currentChatId, botResponse)
      setEditingTransaction(parsedTransaction)
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content:
          "Sorry, I had trouble processing your request. Please try again or enter the transaction details manually.",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, errorMessage])
      await saveMessage(currentChatId, errorMessage)
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
      const response = await fetch("/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingTransaction),
      })

      if (response.ok) {
        const successMessage: Message = {
          id: Date.now().toString(),
          type: "bot",
          content: `✅ Transaction saved successfully! $${editingTransaction.amount} ${editingTransaction.type} for ${editingTransaction.category} has been added to your records.`,
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, successMessage])
        await saveMessage(currentChatId, successMessage)
        setEditingTransaction(null)
      } else {
        throw new Error("Failed to save transaction")
      }
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now().toString(),
        type: "bot",
        content: "❌ Sorry, there was an error saving your transaction. Please try again.",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, errorMessage])
      await saveMessage(currentChatId, errorMessage)
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

  if (isLoadingHistory) {
    return (
      <div className="max-w-7xl mx-auto">
        <Card className="h-[700px] flex items-center justify-center">
          <div className="text-center">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
            <p className="text-gray-600">Loading chat history...</p>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 h-[calc(100vh-8rem)]">
        {/* Chat Sessions Sidebar */}
        

        {/* Main Chat Area */}
        <div className="xl:col-span-3">
          <Card className="h-full flex flex-col">
            <CardHeader className="flex-shrink-0">
              <CardTitle className="flex items-center space-x-2">
                <Bot className="h-6 w-6 text-blue-600" />
                <span>Financial Assistant</span>
                {/* <Badge variant="outline" className="ml-auto">
                  {messages.length} messages
                </Badge> */}
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
