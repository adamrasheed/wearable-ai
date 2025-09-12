"use server";

import { getValidatedString } from "../lib/utils";

export async function handleTextareaSubmission(formData: FormData) {
  const inputValue = getValidatedString(formData, "location");

  if (!inputValue) {
    console.error("No location provided");
    return {
      success: false,
      error: "Please provide a location description.",
    };
  }

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/location`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description: inputValue }),
    });

    if (!response.ok) {
      console.log("Weather API error:", response.status, response.statusText);

      if (response.status === 400) {
        return {
          success: false,
          error:
            "Invalid location description. Please try a different description.",
        };
      } else if (response.status === 404) {
        return {
          success: false,
          error: "Location not found. Please try a more specific description.",
        };
      } else if (response.status >= 500) {
        return {
          success: false,
          error: "Service temporarily unavailable. Please try again later.",
        };
      } else {
        return {
          success: false,
          error: `Unable to process location. Please try again.`,
        };
      }
    }

    const weatherData = await response.json();

    // Return success response
    return {
      success: true,
      data: weatherData,
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);

    // Handle network errors
    if (error instanceof TypeError && error.message.includes("fetch")) {
      return {
        success: false,
        error: "Network error. Please check your connection and try again.",
      };
    }

    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    };
  }
}
