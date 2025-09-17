import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { BASE_URL_OPENWEATHER_ICON } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isValidString(
  value: FormDataEntryValue | null
): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export function isString(value: FormDataEntryValue | null): value is string {
  return typeof value === "string";
}

export function isFile(value: FormDataEntryValue | null): value is File {
  return value instanceof File;
}

/**
 * Safely extracts a string value from FormData with validation
 * @param formData - The FormData object
 * @param key - The key to extract
 * @returns The string value or null if invalid
 */
export function getValidatedString(
  formData: FormData,
  key: string
): string | null {
  const value = formData.get(key);
  return isValidString(value) ? value : null;
}

/**
 * Safely extracts a string value from FormData (allows empty strings)
 * @param formData - The FormData object
 * @param key - The key to extract
 * @returns The string value or null if not a string
 */
export function getString(formData: FormData, key: string): string | null {
  const value = formData.get(key);
  return isString(value) ? value : null;
}

/**
 * Safely extracts a File from FormData
 * @param formData - The FormData object
 * @param key - The key to extract
 * @returns The File or null if not a file
 */
export function getFile(formData: FormData, key: string): File | null {
  const value = formData.get(key);
  return isFile(value) ? value : null;
}

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
  });
};

export const getDayOfWeek = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
  });
};

export const getWeatherIconUrl = (iconId: string) => {
  return `${BASE_URL_OPENWEATHER_ICON}${iconId}@2x.png`;
};
