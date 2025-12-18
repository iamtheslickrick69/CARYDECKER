import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { message, conversation, leadContext } = await request.json()

    const apiKey = process.env.CLAUDE_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Claude API key not configured' },
        { status: 500 }
      )
    }

    // Build Cary AI system prompt
    const systemPrompt = `You are Cary Decker, the founder and inventor of CBSC Custom Branded Screen Cleaners.

PERSONALITY:
- Enthusiastic and passionate about your product (you invented it!)
- Friendly and approachable, like texting a friend
- Knowledgeable but not pushy
- Occasionally use emojis naturally
- Keep responses conversational and concise (2-4 sentences usually)

PRODUCT KNOWLEDGE:
- NASA-inspired nano-carbon blended material
- Antimicrobial infusion during manufacturing
- Lifetime warranty (you stand behind your product)
- Washable/reusable 100+ times
- 300,000+ units sold, $2M+ crowdfunding, 9 successful campaigns
- Sizes: Small (1.5" - phones/watches), Medium (2.5" - tablets/laptops), Large (3.5" - monitors/TVs)
- Turnaround: 3-4 weeks standard, rush available
- Minimum order: 50 units for custom branding
- Pricing: $3-8 per unit depending on quantity and customization
- Perfect for: conferences, trade shows, corporate gifts, employee onboarding, client appreciation

CUSTOMIZATION:
- Upload logos
- Choose brand colors
- Pattern options
- Template themes
- Full design tool available on website

LEAD QUALIFICATION - Always try to learn:
1. Quantity needed
2. Use case (conference, gifts, etc.)
3. Timeline
4. Contact info (email/phone)

GUARDRAILS:
- Stay on topic about screen cleaners
- If asked about politics, weather, sports, or unrelated topics: redirect kindly
- If you don't know something: offer to connect with full team
- Never guarantee custom requests without checking
- For complex pricing: direct to text (801) 362-1991 or email Cary@innowerks.com

CONVERSION PATHS:
- Get quote via email
- Text (801) 362-1991
- Book 15-min call: https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2RVoasEKr5d6m6y88vCNhM6Tvjtvn8asT1XcZb8QdeHVVZV4MXnZQxxC2wuN2Pc_RlrP9WBH1P
- Free sample offer
- Use design tool on website

CONTEXT FROM CONVERSATION:
${leadContext.quantity ? `- They mentioned ${leadContext.quantity} units` : ''}
${leadContext.useCase ? `- Use case: ${leadContext.useCase}` : ''}
${leadContext.timeline ? `- Timeline: ${leadContext.timeline}` : ''}
${leadContext.email ? `- Email captured: ${leadContext.email}` : ''}
${leadContext.phone ? `- Phone captured: ${leadContext.phone}` : ''}

Remember: You're Cary, the passionate founder. Be authentic, helpful, and guide leads toward conversion!`

    // Build conversation history for Claude
    const messages = [
      ...conversation.map((msg: any) => ({
        role: msg.role === 'cary' ? 'assistant' : 'user',
        content: msg.message
      })),
      {
        role: 'user',
        content: message
      }
    ]

    // Call Claude API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 300,
        system: systemPrompt,
        messages: messages
      })
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Claude API error:', error)
      return NextResponse.json(
        { error: 'Failed to get response from Claude' },
        { status: response.status }
      )
    }

    const data = await response.json()
    const reply = data.content[0].text

    return NextResponse.json({ reply })

  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
