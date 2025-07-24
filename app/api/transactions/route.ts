import { type NextRequest, NextResponse } from "next/server"

// This would typically connect to your database
// For demo purposes, we'll just log the transaction and return success

export async function POST(request: NextRequest) {
  try {
    const transaction = await request.json()

    // Validate the transaction data
    if (!transaction.amount || !transaction.category || !transaction.description) {
      return NextResponse.json({ error: "Missing required transaction fields" }, { status: 400 })
    }

    // Here you would typically save to your database
    // For example, with Prisma, Supabase, or your preferred database solution
    console.log("Saving transaction:", {
      amount: transaction.amount,
      category: transaction.category,
      description: transaction.description,
      timestamp: new Date().toISOString(),
    })

    // Simulate database save delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Transaction saved successfully",
      transaction: {
        id: Date.now().toString(),
        ...transaction,
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error("Error saving transaction:", error)
    return NextResponse.json({ error: "Failed to save transaction" }, { status: 500 })
  }
}

export async function GET() {
  // This would typically fetch transactions from your database
  // For demo purposes, return some sample data

  const sampleTransactions = [
    {
      id: "1",
      amount: 50,
      category: "groceries",
      description: "Weekly grocery shopping",
      timestamp: new Date().toISOString(),
    },
    {
      id: "2",
      amount: 25,
      category: "dining",
      description: "Coffee and breakfast",
      timestamp: new Date().toISOString(),
    },
  ]

  return NextResponse.json({
    success: true,
    transactions: sampleTransactions,
  })
}
