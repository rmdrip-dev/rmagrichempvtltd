import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || ''; // Ensure this is set in your environment
const ai = new GoogleGenAI({ apiKey });

export const getAgriAdvice = async (query: string): Promise<string> => {
  if (!apiKey) {
    return "AI Service is unavailable. Please check API Key configuration.";
  }

  try {
    const model = 'gemini-2.5-flash-latest'; // Using the latest flash model for speed
    const systemInstruction = `You are an expert AI Agronomist for RM Agrichem, a premium agricultural company. 
    Your goal is to assist farmers and investors with technical agricultural advice, crop protection strategies, and fertilizer usage.
    
    Guidelines:
    1. Be professional, empathetic, and scientific but accessible.
    2. If the user asks about products, recommend generic types (e.g., "Use a systemic fungicide") unless you can infer a match from general agricultural knowledge.
    3. Keep answers concise (under 150 words) unless detailed protocols are asked.
    4. Always end with a disclaimer: "For specific product dosages and diagnosis, please consult a local agricultural officer."
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: query,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text || "I couldn't generate a response at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I am having trouble connecting to the agricultural database right now. Please try again later.";
  }
};