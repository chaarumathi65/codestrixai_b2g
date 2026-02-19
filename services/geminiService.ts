
import { GoogleGenAI } from "@google/genai";
// Import now valid after updates to types.ts
import { PredictionFeatures, PredictionResult } from "../types";

/**
 * Generates scientific analysis of hypoxia risk using Gemini 3 Flash.
 */
export const getScientificAnalysis = async (features: PredictionFeatures, result: PredictionResult): Promise<string> => {
  // Always initialize with named parameter apiKey from process.env.API_KEY
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    You are a Marine Biologist and Data Scientist for CodeStrix AI.
    Explain the following hypoxia risk prediction to a non-technical harbor master.
    
    Data Input:
    - Current SST: ${features.sst}°C
    - SST 7-day Avg: ${features.sst_7day_avg}°C
    - Chlorophyll-a: ${features.chlorophyll} mg/m³
    - Chlorophyll 7-day Avg: ${features.chlorophyll_7day_avg} mg/m³
    
    Prediction:
    - Risk Level: ${result.risk}
    - Confidence: ${(result.probability * 100).toFixed(1)}%
    
    Requirements:
    - Be scientific but concise (max 3 sentences).
    - Mention the relationship between Temperature (solubility) and Chlorophyll (decomposition).
    - If risk is SEVERE, recommend immediate aeration or harvest intervention.
    - If risk is WARNING, suggest increased monitoring.
  `;

  try {
    // Correct usage of generateContent with model name and prompt string
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    // Use .text property directly as it is a getter, not a method
    return response.text || "Scientific analysis unavailable.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error generating analysis. Please check network connection.";
  }
};
