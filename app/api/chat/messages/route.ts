import { type NextRequest, NextResponse } from "next/server"

// Mock database - replace with actual database implementation
const chatMessages: { [chatId: string]: any[] } = {}
const chatSessions: any[] = []

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const chatId = searchParams.get("chatId")

    if (!chatId) {
      return NextResponse.json({ error: "Chat ID is required" }, { status: 400 })
    }

    const messages = chatMessages[chatId] || []

    // In a real app, this would query your database
    // const messages = await db.chatMessages.findMany({
    //   where: { chatSessionId: chatId },
    //   orderBy: { timestamp: 'asc' }
    // })

    return NextResponse.json({
      success: true,
      messages,
    })
  } catch (error) {
    console.error("Error fetching chat messages:", error)
    return NextResponse.json({ error: "Failed to fetch chat messages" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { chatId, message } = await request.json()

    if (!chatId || !message) {
      return NextResponse.json({ error: "Chat ID and message are required" }, { status: 400 })
    }

    // Initialize chat messages array if it doesn't exist
    if (!chatMessages[chatId]) {
      chatMessages[chatId] = []
    }

    // Add message to chat
    chatMessages[chatId].push(message)

    // Update session message count and last message time
    const sessionIndex = chatSessions.findIndex((s) => s.id === chatId)
    if (sessionIndex !== -1) {
      chatSessions[sessionIndex].messageCount = chatMessages[chatId].length
      chatSessions[sessionIndex].lastMessage = message.timestamp

      // Update title if it's still "New Chat" and this is a user message
      if (chatSessions[sessionIndex].title === "New Chat" && message.type === "user") {
        const newTitle = message.content.length > 30 ? message.content.substring(0, 30) + "..." : message.content
        chatSessions[sessionIndex].title = newTitle
      }
    }

    // In a real app, this would save to your database
    // await db.chatMessages.create({
    //   data: {
    //     chatSessionId: chatId,
    //     type: message.type,
    //     content: message.content,
    //     timestamp: new Date(message.timestamp),
    //     attachment: message.attachment,
    //     parsedTransaction: message.parsedTransaction
    //   }
    // })

    // await db.chatSessions.update({
    //   where: { id: chatId },
    //   data: {
    //     messageCount: { increment: 1 },
    //     lastMessage: new Date(message.timestamp),
    //     title: newTitle // Update title if needed
    //   }
    // })

    return NextResponse.json({
      success: true,
      message,
    })
  } catch (error) {
    console.error("Error saving chat message:", error)
    return NextResponse.json({ error: "Failed to save chat message" }, { status: 500 })
  }
}
