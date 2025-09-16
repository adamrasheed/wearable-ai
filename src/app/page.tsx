"use client";
import { ChevronRightIcon, LoaderCircleIcon } from "lucide-react";
import { handleTextareaSubmission } from "./actions";
import { cn } from "@/lib/utils";
import { useState, useTransition } from "react";
import { translations } from "@/lib/translations";
import { type ClothingRecommendation as ClothingRecommendationType } from "@/types";
import { ClothingRecommendation } from "@/app/components";

const mockClothingRecommendation: ClothingRecommendationType[] = [
  {
    date: "2024-05-08",
    clothing: {
      casual: "T-shirt and shorts",
      work: "Short-sleeve button-up and chinos",
      formal: "Lightweight suit with a breathable shirt",
    },
    rationale: "It's a clear day with warm temperatures reaching 79°F.",
  },
  {
    date: "2024-05-09",
    clothing: {
      casual: "Light sweater over a T-shirt and jeans",
      work: "Smart casual with a blazer and dress pants",
      formal: "Dark suit with a lightweight tie",
    },
    rationale:
      "The day will be partly cloudy with comfortable temperatures around 77°F.",
  },
  {
    date: "2024-05-10",
    clothing: {
      casual: "Tank top and shorts",
      work: "Lightweight blouse and slacks",
      formal: "Light-colored suit with a dress shirt",
    },
    rationale: "A clear day with a high of 83°F, perfect for light clothing.",
  },
  {
    date: "2024-05-11",
    clothing: {
      casual: "Shorts and a breathable polo",
      work: "Dress shirt with tailored shorts",
      formal: "Summer suit with a light fabric",
    },
    rationale: "Expect a clear day with warm temps, reaching up to 86°F.",
  },
  {
    date: "2024-05-12",
    clothing: {
      casual: "Short-sleeve shirt and light pants",
      work: "Linen shirt with dress shorts",
      formal: "Lightweight suit with a linen shirt",
    },
    rationale:
      "Warm conditions at 85°F with clear skies indicate dress for heat.",
  },
  {
    date: "2024-05-13",
    clothing: {
      casual: "T-shirt and shorts",
      work: "Short-sleeve shirt and chinos",
      formal: "Summer suit with breathable fabric",
    },
    rationale: "Another clear and warm day, temperatures reaching 89°F.",
  },
];

export default function Home() {
  const [isPending, startTransition] = useTransition();
  const [location, setLocation] = useState("");
  const [clothingRecommendation, setClothingRecommendation] =
    useState<ClothingRecommendationType[]>();
  const [alternatives, setAlternatives] = useState<string[]>([
    "Seattle",
    "San Francisco",
  ]);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setMessage(null);
    startTransition(async () => {
      try {
        const result = await handleTextareaSubmission(formData);
        if (result?.success) {
          console.log("Location processed successfully!", result.data);
          setLocation(result.data.location);
          setClothingRecommendation(result.data.clothingRecommendation);
        } else if (result?.error) {
          setMessage({ type: "error", text: result.error });
        }
      } catch (error) {
        setMessage({
          type: "error",
          text: "An unexpected error occurred. Please try again.",
        });
      }
    });
  };

  const hasError = message?.type === "error";

  return (
    <div className="max-w-lg mx-auto mt-8">
      <p className="mb-4 font-bold">Where do you live?</p>

      {hasError && <p className="text-red-500">{message?.text}</p>}

      <form
        action={handleSubmit}
        className="flex items-center gap-2 border-slate-300 shadow border focus:ring-2 rounded-full px-1"
      >
        <input
          className="block w-full p-2 focus:outline-none"
          name="location"
          id="location"
          placeholder="I live in a place with palm trees and celebrities..."
          required
          disabled={isPending}
        />
        <button
          type="submit"
          disabled={isPending}
          className={cn(
            "rounded-full p-2 cursor-pointer transition-colors flex items-center justify-center",
            "bg-slate-500 text-white hover:bg-slate-600",
            "focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          {isPending ? (
            <LoaderCircleIcon className="size-4 animate-spin" />
          ) : (
            <ChevronRightIcon className="size-4" />
          )}
        </button>
      </form>

      {location && (
        <div className="my-4">
          <p>{translations.locationGuess(location)}</p>
          <p>{translations.recommendationTitle}</p>
        </div>
      )}
      {clothingRecommendation?.length && clothingRecommendation.length > 0 && (
        <div className="mt-4 space-y-8">
          {clothingRecommendation &&
            clothingRecommendation.map((recommendation) => (
              <ClothingRecommendation
                key={recommendation.date}
                {...recommendation}
              />
            ))}
        </div>
      )}
    </div>
  );
}
