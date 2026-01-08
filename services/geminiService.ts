
import { GoogleGenAI, Type } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async analyzeMealImage(base64Data: string, prompt: string = "Analyze this meal photo and estimate calories, protein, carbs, and fat for a standard portion.") {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: {
          parts: [
            { inlineData: { mimeType: 'image/jpeg', data: base64Data } },
            { text: prompt }
          ]
        },
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              calories: { type: Type.NUMBER },
              protein: { type: Type.NUMBER },
              carbs: { type: Type.NUMBER },
              fat: { type: Type.NUMBER },
              tips: { type: Type.STRING }
            },
            required: ["name", "calories", "protein", "carbs", "fat"]
          }
        }
      });

      if (response.text) {
        return JSON.parse(response.text.trim());
      }
      return null;
    } catch (error) {
      console.error("Gemini Analysis Error:", error);
      return null;
    }
  }

  async getHealthTips(mealName: string) {
    const response = await this.ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide 3 quick preparation tips to make ${mealName} healthier, specifically for someone on 16:8 fasting in Singapore.`,
    });
    return response.text;
  }
}

export const gemini = new GeminiService();
