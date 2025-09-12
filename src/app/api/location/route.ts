import { OpenWeatherForecastResponse } from "@/types";
import { isValidString } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { inferCityFromText, getClothingRecommendation } from "@/services/ai";

export async function POST(req: NextRequest) {
  try {
    const { description, units = "imperial" } = await req.json();

    if (!isValidString(description)) {
      return NextResponse.json(
        { error: "Provide a 'description' string." },
        { status: 400 }
      );
    }

    const guess = await inferCityFromText(description);

    const origin = new URL(req.url).origin;

    const weatherURL = new URL(`${origin}/api/weather`);
    weatherURL.searchParams.set("lat", guess.lat);
    weatherURL.searchParams.set("lon", guess.lon);
    weatherURL.searchParams.set("units", units);
    weatherURL.searchParams.set("dayCount", String(7));

    console.log("Weather URL:", weatherURL.toString());

    const weatherResponse = await fetch(weatherURL.toString());

    if (!weatherResponse.ok) {
      return NextResponse.json(
        { error: "Failed to fetch weather data." },
        { status: 500 }
      );
    }

    const weatherData =
      (await weatherResponse.json()) as OpenWeatherForecastResponse;

    const clothingRecommendation = await getClothingRecommendation(
      weatherData.daily
    );

    console.log("Clothing recommendation:", clothingRecommendation);

    return NextResponse.json({
      inference: guess,
      city: guess.city,
      lat: guess.lat,
      lon: guess.lon,
      region: guess.region,
      country: guess.country,
      alternatives: guess.alternatives,
      forecast: weatherData,
      clothingRecommendation,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
