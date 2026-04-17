import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const groqCodeSummarizationApi = async (entireSummarizerMessages, code) => {
  const CODE_SUMMARIZATION_KEY = process.env.GROQ_API_KEY;
  const systemContent = `
You are a professional AI code assistant. 
Your job is to explain and summarize code, fix code bug if asked or optimized code if asked, clearly and concisely and keep it as short as possible until user asks for detail explaination. 
- Adapt your explanation style based on the user's request and the complexity of the code.  
- If the code is very short/simple, give a **brief  explanation as much required**.  
- If the user requests detail, provide a **structured breakdown** using Markdown (headings, bullet points, steps) but also keep it in a **concise** manner not big detail but still readable.  
- Keep answers professional, easy to read, and avoid unnecessary verbosity.
- Here is the code:${code}
`;
  const safeMessages = entireSummarizerMessages.map((msg) => ({
    role:
      msg.role === "ai"
        ? "assistant"
        : msg.role === "assistant"
          ? "assistant"
          : "user",
    content: msg.content || msg.message ,
  }));

  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${CODE_SUMMARIZATION_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [{ role: "system", content: systemContent }, ...safeMessages],
          temperature: 0.7,
          max_tokens: 600,
          top_p: 1,
          stream: true,
        }),
      },
    );
    return response.body || "Oops! No response from AI";


  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
  }
};
