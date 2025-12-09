import { GoogleGenAI, Type } from "@google/genai";
import { Recipe, Ingredient } from "../types";

// Safety check for API key availability, though we won't throw error immediately to allow UI to render
const API_KEY = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const optimizeRecipeWithAI = async (recipe: Recipe, ingredients: Ingredient[]) => {
  if (!API_KEY) {
    throw new Error("API Key is missing. Please check your configuration.");
  }

  const ingredientList = ingredients.map(i => `${i.name} (Cost: $${i.standardCost}/${i.unit})`).join(', ');
  
  const prompt = `
    You are an expert Bakery Consultant and Food Scientist.
    Analyze the following recipe for cost optimization without sacrificing quality.
    
    Recipe: ${recipe.name} (Yield: ${recipe.yieldUnits})
    Current Ingredients in Recipe:
    ${JSON.stringify(recipe.items.map(item => {
      const ing = ingredients.find(i => i.id === item.ingredientId);
      return { name: ing?.name, quantity: item.quantity, unit: ing?.unit };
    }))}

    Available Market Ingredients:
    ${ingredientList}

    Provide a suggestion in JSON format with fields:
    - analysis (string): Brief analysis of current cost drivers.
    - suggestion (string): Specific actionable advice to reduce cost (e.g. substitution, waste reduction).
    - potentialSavings (string): Estimated % savings.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            analysis: { type: Type.STRING },
            suggestion: { type: Type.STRING },
            potentialSavings: { type: Type.STRING }
          }
        }
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("AI Service Error:", error);
    throw error;
  }
};

export const generateDemandForecast = async (salesHistory: any[]) => {
  if (!API_KEY) {
    throw new Error("API Key is missing.");
  }

  const prompt = `
    You are a Supply Chain Analyst for a bakery.
    Based on the following historical sales data (simulated), predict the demand for the next 3 days.
    
    Data: ${JSON.stringify(salesHistory)}
    
    Return JSON with:
    - forecast: Array of objects { day: string, predictedQty: number, reasoning: string }
    - trend: "UP", "DOWN", or "STABLE"
  `;

  try {
     const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("AI Forecast Error:", error);
    throw error;
  }
};