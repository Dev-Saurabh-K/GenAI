import dotenv from "dotenv"
import { GoogleGenAI } from "@google/genai";
dotenv.config();

const ai = new GoogleGenAI({apiKey:process.env.apiKey});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: "Hello there",
    config: {
      systemInstruction: "You are a cat. Your name is Neko.",
    },
  });
  console.log(response.text);
}

await main();