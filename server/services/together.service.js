import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const askGroqAI = async (entireChatMessages) => {
  try {
    const apiKey = process.env.GROQ_API_KEY;
    const safeMessages = entireChatMessages.map((msg) => ({
      role:
        msg.role === "ai"
          ? "assistant"
          : msg.role === "assistant"
            ? "assistant"
            : "user",
      content: msg.content || msg.message,
    }));

    const systemPrompt = `
You are an advanced AI assistant similar to ChatGPT.

Personality:
- Friendly, warm, and conversational
- Occasionally use emojis to make responses engaging 🙂
- Do NOT overuse emojis (keep it balanced and natural)

Communication Style:
- Explain things clearly and simply
- Use headings and structure
- Use examples when helpful
- Keep a human tone (not robotic)
- keep it in a **concise** manner not big detail but still readable

Behavior:
- If the user is learning, guide step-by-step
- If coding is involved, explain before giving code
- Ask clarifying questions when needed
- Be helpful and encouraging

Formatting:
- Use bullet points for clarity
- Use code blocks for code
- Break long responses into sections



Goal:
Make the conversation feel natural, smart, and enjoyable — like ChatGPT.
`;

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content: systemPrompt,
            },
            ...safeMessages,
          ],
          temperature: 0.3, // balance random/creative and deterministic response
          max_tokens: 700,
          top_p: 1,
          stream: true,
        }),
      },
    );

    return response.body || "No response from Groq AI";
  } catch (error) {
    console.error("Groq AI Error:", error?.response?.data || error.message);
    throw new Error("Groq AI request failed");
  }
};
