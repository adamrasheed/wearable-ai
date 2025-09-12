import { isValidString } from "@/lib/utils";
import { NextResponse } from "next/server";

const API_KEY = process.env.OPENWEATHER_API_KEY; // keep it safe in .env.local
const BASE_URL = "https://api.openweathermap.org/data/3.0/";

const DAY_COUNT = 7;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city");
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const units = searchParams.get("units") || "imperial";
  const dayCount = searchParams.get("dayCount") || DAY_COUNT;

  if (!API_KEY) {
    console.error("OPENWEATHER_API_KEY is not set");
    return NextResponse.json(
      { error: "API key not configured" },
      { status: 500 }
    );
  }

  if (!isValidString(lat) || !isValidString(lon)) {
    return NextResponse.json(
      { error: "Lat and lon are required" },
      { status: 400 }
    );
  }

  const params = new URLSearchParams({
    lat: lat!,
    lon: lon!,
    cnt: dayCount.toString(),
    exclude: "current,minutely,hourly,alerts",
    units,
    appid: API_KEY,
  });
  const url = `${BASE_URL}/onecall?${params.toString()}`;

  console.log("Fetching weather for:", lat, lon, "for", dayCount, "days");
  console.log("API URL:", url);

  try {
    const res = await fetch(url);

    if (!res.ok) {
      const errorText = await res.text();
      console.error("OpenWeather API error:", res.status, errorText);
      throw new Error(`OpenWeather API error: ${res.status} - ${errorText}`);
    }

    const data = await res.json();
    console.log("Weather data received successfully");
    return NextResponse.json(data);
  } catch (err) {
    console.error("Weather API error:", err);
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}
