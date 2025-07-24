import { type NextRequest, NextResponse } from "next/server"

// Mock database - replace with actual database implementation
const chatSessions: any[] = []
let sessionIdCounter = 1

export async function GET() {
  try {
    // In a real app, this would query your database
    // const sessions = await db.chatSessions.findMany({
    //   where: { userId: currentUser.id },
    //   orderBy: { lastMessage: 'desc' }
    // })

    return NextResponse.json({
      success: true,
      sessions: chatSessions.sort((a, b) => new Date(b.lastMessage).getTime() - new Date(a.lastMessage).getTime()),
    })
  } catch (error) {
    console.error("Error fetching chat sessions:", error)
    return NextResponse.json({ error: "Failed to fetch chat sessions" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title } = await request.json()

    const newSession = {
      id: `chat_${sessionIdCounter++}`,
      title: title || "New Chat",
      lastMessage: new Date().toISOString(),
      messageCount: 1, // Start with 1 for the welcome message
      createdAt: new Date().toISOString(),
    }

    chatSessions.push(newSession)

    // In a real app, this would save to your database
    // const session = await db.chatSessions.create({
    //   data: {
    //     userId: currentUser.id,
    //     title,
    //     lastMessage: new Date(),
    //     messageCount: 1
    //   }
    // })

    return NextResponse.json({
      success: true,
      chatId: newSession.id,
      session: newSession,
    })
  } catch (error) {
    console.error("Error creating chat session:", error)
    return NextResponse.json({ error: "Failed to create chat session" }, { status: 500 })
  }
}
