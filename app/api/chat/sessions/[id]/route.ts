import { type NextRequest, NextResponse } from "next/server"

// Mock database - replace with actual database implementation
let chatSessions: any[] = []

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { title } = await request.json()
    const sessionId = params.id

    // Find and update session
    const sessionIndex = chatSessions.findIndex((s) => s.id === sessionId)
    if (sessionIndex !== -1) {
      chatSessions[sessionIndex] = {
        ...chatSessions[sessionIndex],
        title,
        lastMessage: new Date().toISOString(),
      }
    }

    // In a real app, this would update your database
    // await db.chatSessions.update({
    //   where: { id: sessionId },
    //   data: { title, lastMessage: new Date() }
    // })

    return NextResponse.json({
      success: true,
      session: chatSessions[sessionIndex],
    })
  } catch (error) {
    console.error("Error updating chat session:", error)
    return NextResponse.json({ error: "Failed to update chat session" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const sessionId = params.id

    // Remove session and its messages
    chatSessions = chatSessions.filter((s) => s.id !== sessionId)

    // In a real app, this would delete from your database
    // await db.chatSessions.delete({
    //   where: { id: sessionId }
    // })
    // await db.chatMessages.deleteMany({
    //   where: { chatSessionId: sessionId }
    // })

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    console.error("Error deleting chat session:", error)
    return NextResponse.json({ error: "Failed to delete chat session" }, { status: 500 })
  }
}
