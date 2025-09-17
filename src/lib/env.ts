interface EnvConfig {
  OPENWEATHER_API_KEY: string;
  OPENAI_API_KEY: string;
  NEXT_PUBLIC_BASE_URL: string;
  NODE_ENV: string;
}

function getRequiredEnv(key: keyof EnvConfig): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

function getOptionalEnv(key: keyof EnvConfig, defaultValue: string): string {
  return process.env[key] || defaultValue;
}

function validateOpenAIKey(apiKey: string): string {
  if (!apiKey.startsWith("sk-")) {
    throw new Error('Invalid OpenAI API key format. Must start with "sk-"');
  }
  return apiKey;
}

function validateOpenWeatherKey(apiKey: string): string {
  if (apiKey.length < 20) {
    throw new Error(
      "Invalid OpenWeather API key format. Key appears to be too short"
    );
  }
  return apiKey;
}

function validateUrl(url: string): string {
  try {
    new URL(url);
    return url;
  } catch {
    throw new Error(`Invalid URL format: ${url}`);
  }
}

export const env = {
  OPENWEATHER_API_KEY: validateOpenWeatherKey(
    getRequiredEnv("OPENWEATHER_API_KEY")
  ),
  OPENAI_API_KEY: validateOpenAIKey(getRequiredEnv("OPENAI_API_KEY")),
  NEXT_PUBLIC_BASE_URL: validateUrl(
    getOptionalEnv("NEXT_PUBLIC_BASE_URL", "http://localhost:3000")
  ),
  NODE_ENV: getOptionalEnv("NODE_ENV", "development"),
} as const;

export type Env = typeof env;

export const isProduction = env.NODE_ENV === "production";

/**
 * Validate all environment variables on module load
 * This will throw an error if any required variables are missing
 */
export function validateEnv(): void {
  console.log("✅ Environment variables validated successfully");
}

// Auto-validate on import
validateEnv();
