import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import readlineSync from "readline-sync";
import { required } from "zod/mini";
dotenv.config();

const History = [];
const ai = new GoogleGenAI({ apiKey: process.env.apiKey });

function sum({ num1, num2 }) {
  return num1 + num2;
}

const sumDeclaration = {
  name: "sum",
  description: "Get the sum of two number",
  parameters: {
    type: "OBJECT",
    properties: {
      num1: {
        type: "NUMBER",
        description: "It will be first number for addition. ex: 10",
      },
      num2: {
        type: "NUMBER",
        description: "It will be Second number for addition. ex: 20",
      },
    },
    required: ["num1", "num2"],
  },
};

const availableTools = {
  sum: sum,
};

async function runAgent(userProblem) {
  History.push({
    role: "user",
    parts: [{ text: userProblem }],
  });

  while (true) {
    const response=await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents:History,
        config:{
            systemInstruction:`You are an AI Agent, You have access of 3 available tools like `
        }
    })
  }
}
