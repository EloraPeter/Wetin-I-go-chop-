// src/data/moods.ts
export type MoodOption = {
  id: string;
  emoji: string;
  label: string;
};

export const MOODS: MoodOption[] = [
  { id: "tired", emoji: "😴", label: "I'm tired" },
  { id: "happy", emoji: "😊", label: "I'm feeling good" },
  { id: "comforting", emoji: "😔", label: "I need comfort" },
  { id: "spicy", emoji: "🌶️", label: "I want something spicy" },
  { id: "craving", emoji: "😋", label: "I'm craving something good" },
  { id: "any", emoji: "🤷", label: "I honestly don't know" },
];

export const MOOD_LABELS: Record<string, string> = {
  tired: "tired",
  happy: "happy",
  comforting: "comfort-seeking",
  spicy: "spicy",
  craving: "craving",
  quick: "quick",
  hungry: "hungry",
  budget: "budget",
  special: "special",
  any: "whatever",
};

export function moodLabel(id: string): string {
  return MOOD_LABELS[id] ?? id;
}
