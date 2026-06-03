import { GoogleGenAI } from "@google/genai";
const apiKey = import.meta.env.WXT_GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey });

async function getGeminiOverview(text: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `Explain this highlighted text: ${text}`,
  });
  return response.text;
}

export default defineBackground(() => {
  browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "explain") {
      (async () => {
        const explanation = await getGeminiOverview(message.text);
        sendResponse({ explanation });
      })();
    }
    return true;
  });
});
