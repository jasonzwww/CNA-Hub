
import { GoogleGenAI } from "@google/genai";
import { Language } from "../types";

// Always initialize GoogleGenAI with the API key from process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getRacingAdvice = async (userPrompt: string, lang: Language = 'en') => {
  try {
    const instruction = lang === 'en' 
      ? "You are the CNA Racing AI Steward. You are an expert in iRacing, endurance strategy, racing etiquette, and the CNA Racing league rules. Be helpful, professional, and concise. Please respond in English."
      : "你是 CNA Racing AI 赛事干事。你是 iRacing、耐力赛策略、赛车礼仪和 CNA Racing 联赛规则方面的专家。请务必专业、简洁并乐于助人。请用中文回答。";

    // Use gemini-3-pro-preview for complex reasoning tasks like racing strategy and strategy advice
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: userPrompt,
      config: {
        systemInstruction: instruction,
        temperature: 0.7,
      },
    });
    // Extract the text output using the .text property
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return lang === 'en' ? "I'm having trouble connecting to the stewards. Please try again later." : "无法连接到干事处，请稍后再试。";
  }
};
