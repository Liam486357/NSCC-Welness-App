import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    // Handle CORS preflight requests
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const { messages, wellnessData } = await req.json()

        const apiKey = Deno.env.get('OPENAI_API_KEY')
        if (!apiKey) {
            throw new Error('OPENAI_API_KEY is not set')
        }

        // System prompt instructing the AI on its persona and constraints
        const systemPrompt = {
            role: 'system',
            content: `You are a supportive, empathetic Wellness Companion for Nova Scotia Community College (NSCC) students.
Your goal is to provide a safe, non-judgmental space for students to reflect on their day.
You MUST NOT diagnose, prescribe, or provide medical advice.

The student's current wellness check-in data (out of 10) is:
- Sleep Quality: ${wellnessData?.sleep || 'Unknown'}
- Perceived Stress: ${wellnessData?.stress || 'Unknown'} (Higher is more stressed)
- Cognitive Energy: ${wellnessData?.cognitive || 'Unknown'}
- Social Belonging: ${wellnessData?.social || 'Unknown'}
- Food Security: ${wellnessData?.food_security || 'Unknown'}

Use this context to be empathetic, but don't explicitly list their scores back to them unless relevant.
If the student expresses thoughts of self-harm, severe distress, or crisis, you MUST include the exact string "CRISIS_ESCALATE" in your response so the client app can trigger emergency UI.`
        }

        const openAiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [systemPrompt, ...messages],
                temperature: 0.7,
                max_tokens: 300
            }),
        })

        const data = await openAiResponse.json()

        if (!openAiResponse.ok) {
            console.error("OpenAI API Error:", data);
            throw new Error(data.error?.message || 'Failed to fetch from OpenAI');
        }

        const replyContent = data.choices[0].message.content

        return new Response(JSON.stringify({ reply: replyContent }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
    } catch (error: any) {
        console.error('Error processing chat:', error)
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
        })
    }
})
