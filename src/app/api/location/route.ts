import { LocationResponse, OpenWeatherForecastResponse } from "@/types";
import { isValidString } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { inferCityFromText, getClothingRecommendation } from "@/services/ai";
import { TIME_5_MINUTES, BASE_URL_OPENWEATHER } from "@/lib/constants";
import { env } from "@/lib/env";

const API_KEY = env.OPENWEATHER_API_KEY;
const DAY_COUNT = 7;

const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = TIME_5_MINUTES; // 5 minutes

async function getWeatherData(
  lat: string,
  lon: string,
  units: string
): Promise<OpenWeatherForecastResponse> {
  if (!API_KEY) {
    throw new Error("OpenWeather API key not configured");
  }

  // TODO: Use Redis for caching
  const cacheKey = `${lat}-${lon}-${units}`;
  const cached = cache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  const params = new URLSearchParams({
    lat,
    lon,
    cnt: DAY_COUNT.toString(),
    exclude: "current,minutely,hourly,alerts",
    units,
    appid: API_KEY,
  });

  const url = `${BASE_URL_OPENWEATHER}/onecall?${params.toString()}`;
  const res = await fetch(url);

  if (!res.ok) {
    const errorText = await res.text();
    console.error("OpenWeather API error:", res.status, errorText);
    throw new Error(`OpenWeather API error: ${res.status} - ${errorText}`);
  }

  const data = await res.json();

  cache.set(cacheKey, { data, timestamp: Date.now() });

  return data;
}

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

    const weatherData = await getWeatherData(guess.lat, guess.lon, units);

    const clothingRecommendation = await getClothingRecommendation(
      weatherData.daily
    );

    const locationResponse: LocationResponse = {
      city: guess.city,
      alternatives: guess.alternatives
        ? guess.alternatives.map((alternative) => alternative.city)
        : [],
      clothingRecommendation,
    };

    return NextResponse.json(locationResponse);
  } catch (err: any) {
    console.error("Location API error:", err);
    return NextResponse.json(
      { error: err.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
