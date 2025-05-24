import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

export const elementColors = {
  Strategy: "#3B82F6",
  Structure: "#10B981",
  Systems: "#F59E0B",
  "Shared Values": "#8B5CF6",
  Skills: "#EC4899",
  Style: "#EF4444",
  Staff: "#6366F1"
};

export function getElementColor(element: string) {
  return elementColors[element as keyof typeof elementColors] || "#64748B";
}

export function calculateAlignment(scores: number[]): number {
  if (scores.length === 0) return 0;
  
  const sum = scores.reduce((acc, score) => acc + score, 0);
  return Math.round((sum / scores.length) * 100) / 100;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}