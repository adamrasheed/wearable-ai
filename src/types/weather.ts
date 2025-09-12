// Root response
export interface OpenWeatherForecastResponse {
  cnt: number;
  daily: DailyForecast[];
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
}

export interface DailyForecast {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number; // 0 when not available
  moonset: number;
  moon_phase: number; // 0..1
  summary: string;

  temp: TemperatureBlock;
  feels_like: FeelsLikeBlock;

  pressure: number; // hPa
  humidity: number; // %
  dew_point: number; // same unit as temp (F if imperial)
  wind_speed: number; // unit depends on API units (mph if imperial)
  wind_deg: number;
  wind_gust: number;

  weather: WeatherCondition[];
  clouds: number; // %
  pop: number; // 0..1
  uvi: number;
}

export interface TemperatureBlock {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
}

export interface FeelsLikeBlock {
  day: number;
  night: number;
  eve: number;
  morn: number;
}

export interface WeatherCondition {
  id: number;
  main: WeatherMain | string; // fall back to string for unforeseen values
  description: string;
  icon: string; // e.g., "02d"
}

export type WeatherMain =
  | "Thunderstorm"
  | "Drizzle"
  | "Rain"
  | "Snow"
  | "Clear"
  | "Clouds";
