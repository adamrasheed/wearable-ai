type Guess = {
  city: string;
  lat: string;
  lon: string;
  region?: string;
  country?: string;
  confidence: number; // 0-1
  rationale: string;
};

export type CityGuess = Guess & {
  alternatives?: Array<Guess>;
};

export type WeatherData = {
  daily: {
    day: string;
    weather: string;
    temperature: number;
  }[];
};

export type Clothing = {
  casual: string;
  work: string;
  formal: string;
};

export type ClothingRecommendation = {
  date: string;
  clothing: Clothing;
  rationale: string;
  weatherIconId: string; // e.g., "01d"
  temperature: number;
};

export type LocationResponse = {
  city: string;
  alternatives: string[];
  clothingRecommendation: ClothingRecommendation[];
};
