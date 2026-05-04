import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import readline from "readline";
import { text } from "stream/consumers";
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.apiKey });

const convo = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let history = [];
async function askquestion() {
  convo.question("You: ", async (userInput) => {
    history.push({
      role: "user",
      parts: [{ text: userInput }],
    });
    const chat = ai.chats.create({
      model: "gemini-3-flash-preview",
      history: history,
    });
    const response = await chat.sendMessage({
      message: userInput
    });
    console.log("AI:",response.text);

    history.push({
        role:"model",
        parts:[{text:response.text}]
    });

    askquestion();
  });
}
askquestion();

// history.push({ role: "user", parts: [{ text: "Hello" }] });
//   const chat = ai.chats.create({
//     model: "gemini-3-flash-preview",
//     history: [
//       {
//         role: "user",
//         parts: [{ text: "Hello" }],
//       },
//       {
//         role: "model",
//         parts: [{ text: "Great to meet you. What would you like to know?" }],
//       },
//     ],
//   });

//   const response1 = await chat.sendMessage({
//     message: "I have 2 dogs in my house.",
//   });
//   console.log("Chat response 1:", response1.text);

//   const response2 = await chat.sendMessage({
//     message: "How many paws are in my house?",
//   });
//   console.log("Chat response 2:", response2.text);
