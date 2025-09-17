export const translations = {
  title: "Where do you live? We'll recommend what to wear.",
  locationGuess: (location: string) => `It looks like you live in ${location}.`,
  recommendationTitle: `Here's what we recommend you wear for the week:`,
  degrees: (degrees: number, units: "imperial" | "metric" = "imperial") =>
    `${degrees}°${units === "imperial" ? "F" : "C"}`,
  alternatives: (alternatives: string[]) => {
    if (alternatives.length === 1) {
      return `You could also be in ${alternatives[0]}.`;
    } else if (alternatives.length === 2) {
      return `You could also be in ${alternatives[0]} or ${alternatives[1]}.`;
    } else {
      const [first, second, ...rest] = alternatives;
      return `You could also be in ${first}, ${second}, and ${rest.length} other places.`;
    }
  },
};
