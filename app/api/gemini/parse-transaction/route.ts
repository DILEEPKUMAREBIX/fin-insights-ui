import { type NextRequest, NextResponse } from "next/server"

// Mock Gemini API integration - replace with actual Gemini API call
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const text = formData.get("text") as string
    const file = formData.get("file") as File | null

    // Simulate Gemini API processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock Gemini API response - replace with actual API call
    const parsedTransaction = await mockGeminiParsing(text, file)

    return NextResponse.json({
      success: true,
      parsedTransaction,
    })
  } catch (error) {
    console.error("Error parsing transaction with Gemini:", error)
    return NextResponse.json({ error: "Failed to parse transaction" }, { status: 500 })
  }
}

async function mockGeminiParsing(text: string, file: File | null) {
  // This would be replaced with actual Gemini API call
  // const response = await gemini.generateContent({
  //   contents: [{
  //     parts: [
  //       { text: `Parse this transaction: ${text}` },
  //       ...(file ? [{ inline_data: { mime_type: file.type, data: await fileToBase64(file) } }] : [])
  //     ]
  //   }]
  // })

  // Mock parsing logic for demonstration
  const lowerText = text.toLowerCase()
  const amountMatch = text.match(/\$?(\d+(?:\.\d{2})?)/)
  const amount = amountMatch ? Number.parseFloat(amountMatch[1]) : 0

  let type: "income" | "expense" = "expense"
  let category = "other"
  let subcategory = ""
  let merchant = ""
  let confidence = 0.85

  // Enhanced parsing logic
  if (
    lowerText.includes("salary") ||
    lowerText.includes("income") ||
    lowerText.includes("paid me") ||
    lowerText.includes("earned")
  ) {
    type = "income"
    category = "income"
    subcategory = "salary"
    confidence = 0.9
  } else if (lowerText.includes("grocery") || lowerText.includes("groceries") || lowerText.includes("supermarket")) {
    category = "food"
    subcategory = "groceries"
    merchant = extractMerchant(text, ["walmart", "target", "kroger", "safeway"])
  } else if (lowerText.includes("restaurant") || lowerText.includes("dinner") || lowerText.includes("lunch")) {
    category = "food"
    subcategory = "restaurants"
    merchant = extractMerchant(text, ["mcdonalds", "subway", "chipotle", "starbucks"])
  } else if (
    lowerText.includes("gas") ||
    lowerText.includes("fuel") ||
    lowerText.includes("shell") ||
    lowerText.includes("exxon")
  ) {
    category = "transportation"
    subcategory = "gas"
    merchant = extractMerchant(text, ["shell", "exxon", "bp", "chevron"])
  } else if (lowerText.includes("uber") || lowerText.includes("lyft") || lowerText.includes("taxi")) {
    category = "transportation"
    subcategory = "rideshare"
    merchant = extractMerchant(text, ["uber", "lyft"])
  } else if (lowerText.includes("movie") || lowerText.includes("cinema") || lowerText.includes("netflix")) {
    category = "entertainment"
    subcategory = "movies"
    merchant = extractMerchant(text, ["netflix", "amc", "regal"])
  } else if (lowerText.includes("doctor") || lowerText.includes("pharmacy") || lowerText.includes("cvs")) {
    category = "healthcare"
    subcategory = lowerText.includes("pharmacy") ? "pharmacy" : "doctor visits"
    merchant = extractMerchant(text, ["cvs", "walgreens", "rite aid"])
  }

  return {
    amount,
    type,
    category,
    subcategory,
    description: text,
    date: new Date().toISOString().split("T")[0],
    confidence,
    merchant: merchant || undefined,
    location: extractLocation(text),
  }
}

function extractMerchant(text: string, merchants: string[]): string {
  const lowerText = text.toLowerCase()
  for (const merchant of merchants) {
    if (lowerText.includes(merchant)) {
      return merchant.charAt(0).toUpperCase() + merchant.slice(1)
    }
  }
  return ""
}

function extractLocation(text: string): string | undefined {
  // Simple location extraction - could be enhanced
  const locationMatch = text.match(/at\s+([A-Za-z\s]+?)(?:\s|$|,|\.|!|\?)/i)
  return locationMatch ? locationMatch[1].trim() : undefined
}

async function fileToBase64(file: File): Promise<string> {
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  return buffer.toString("base64")
}
