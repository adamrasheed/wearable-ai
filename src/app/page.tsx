"use client";

import { ChevronRightIcon, LoaderCircleIcon } from "lucide-react";
import { handleTextareaSubmission } from "./actions";
import { cn } from "@/lib/utils";
import { useState, useTransition } from "react";
import { translations } from "@/lib/translations";
import { type ClothingRecommendation as ClothingRecommendationType } from "@/types";
import { ClothingRecommendation } from "@/app/components";

export default function Home() {
  const [isPending, startTransition] = useTransition();
  const [location, setLocation] = useState("");
  const [clothingRecommendation, setClothingRecommendation] = useState<
    ClothingRecommendationType[]
  >([]);
  const [alternatives, setAlternatives] = useState<string[]>([]);
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
          setLocation(result.data.city);
          setAlternatives(result.data.alternatives);
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
    <div className="max-w-2xl mx-auto my-8 space-y-4">
      <p className="mb-4 font-bold">{translations.title}</p>

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

      {isPending && (
        <div className="flex items-center gap-2">
          <p>Hang tight, we're getting your recommendations...</p>
          <LoaderCircleIcon className="size-4 animate-spin" />
        </div>
      )}

      {location && (
        <div className="my-4">
          <p>{translations.locationGuess(location)}</p>
          {alternatives.length > 0 && (
            <p className="text-sm text-gray-500">
              {translations.alternatives(alternatives)}
            </p>
          )}
          <p className="text-lg mt-4">{translations.recommendationTitle}</p>
        </div>
      )}

      {clothingRecommendation.length > 0 && (
        <div className="space-y-8">
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
