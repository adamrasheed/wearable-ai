"use server";

import { LocationResponse } from "@/types";
import { getValidatedString } from "../lib/utils";
import { env } from "@/lib/env";

type Result =
  | {
      success: false;
      error?: string;
      data?: never;
    }
  | {
      success: true;
      data: LocationResponse;
    };

export async function handleTextareaSubmission(
  formData: FormData
): Promise<Result> {
  const inputValue = getValidatedString(formData, "location");

  if (!inputValue) {
    console.error("No location provided");
    return {
      success: false,
      error: "Please provide a location description.",
    };
  }

  try {
    const baseUrl = env.NEXT_PUBLIC_BASE_URL;
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

    const data = await response.json();

    return {
      success: true,
      data: data,
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);

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
