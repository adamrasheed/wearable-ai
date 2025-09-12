import OpenAI from "openai";
import {
  ClothingRecommendation,
  CityGuess,
  OpenWeatherForecastResponse,
} from "@/types";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function inferCityFromText(userText: string): Promise<CityGuess> {
  const system = `
You identify the most likely real-world location from a person's casual description.
Users might try to trick you; rely on concrete clues (landmarks, transit lines, slang, sports teams, cuisine, climate, accent hints, pop culture references, etc.).
Return ONLY valid JSON (no markdown, no code blocks) with: lat, lon, city, region (state/province if known), country, confidence (0..1), rationale (one sentence), and alternatives (up to 2),
and up to 2 alternatives with confidence.
If ambiguous, pick the best guess but keep confidence low and include alternatives. Do NOT give me unknown values for lat, lon, city, region, country. give me specific values.
Example format: {lat: '34.052235', lon: '-118.243683', "city": "Los Angeles", "region": "California", "country": "USA", "confidence": 0.9, "rationale": "Mention of celebrities suggests Hollywood area", "alternatives": [{ lat: '37.774929', lon: '-122.419416', "city": "San Francisco", "region": "California", "country": "USA", "confidence": 0.8, "rationale": "Mention of Golden Gate Bridge suggests San Francisco area"}, { lat: '40.712776', lon: '-74.005974', "city": "New York", "region": "New York", "country": "USA", "confidence": 0.7, "rationale": "Mention of Broadway suggests New York area"}]}`;

  try {
    const completion = await openai.responses.create({
      model: "gpt-4o-mini",
      input: [
        { role: "system", content: system },
        { role: "user", content: userText },
      ],
    });

    const response = completion.output_text;

    const cleanedResponse = response
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();

    const parsedResponse = JSON.parse(cleanedResponse) as CityGuess;
    return parsedResponse;
  } catch (error) {
    console.error("OpenAI error:", error);
    throw new Error(`OpenAI error: ${error}`);
  }
}

export async function getClothingRecommendation(
  weatherData: OpenWeatherForecastResponse["daily"]
): Promise<ClothingRecommendation[]> {
  const system = `
  You are a helpful assistant that recommends clothing based on the weather.
  You are given a JSON object with the weather data.
  You need to recommend the clothing based on the weather data for each of the provided days.
  Provided recommendations for a casual, work, and formal outfit.
  Return ONLY valid JSON (no markdown, no code blocks) with: date (YYYY-MM-DD format), clothing (object with casual, work, formal properties), rationale (one sentence).
  Example format: [{"date": "2024-01-15", "clothing": {"casual": "Wear a light jacket", "work": "Business casual with light layers", "formal": "Suit with light jacket"}, "rationale": "It's a sunny day with mild temperatures"}, {"date": "2024-01-16", "clothing": {"casual": "Wear a raincoat", "work": "Waterproof jacket over business attire", "formal": "Formal raincoat or umbrella"}, "rationale": "It's a rainy day with precipitation expected"}]}
  `;

  console.log("Getting clothing recommendation for:", weatherData);

  if (!weatherData || weatherData.length === 0) {
    throw new Error("Weather data is required");
  }

  try {
    const completion = await openai.responses.create({
      model: "gpt-4o-mini",
      input: [
        { role: "system", content: system },
        { role: "user", content: JSON.stringify(weatherData) },
      ],
    });

    const response = completion.output_text;

    const cleanedResponse = response
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();

    console.log("Cleaned response:", cleanedResponse);

    const parsedResponse = JSON.parse(
      cleanedResponse
    ) as ClothingRecommendation[];
    return parsedResponse;
  } catch (error) {
    console.error("OpenAI error:", error);
    throw new Error(`OpenAI error: ${error}`);
  }
}
