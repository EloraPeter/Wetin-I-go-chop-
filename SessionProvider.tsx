// src/components/SessionProvider.tsx
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { RecommendationResult } from "@/types/recommendation";

type SessionValue = {
  mood: string;
  budget: number;
  ingredients: string[];
  seen: string[];
  result: RecommendationResult | null;
  setMood: (m: string) => void;
  setBudget: (b: number) => void;
  setIngredients: (i: string[]) => void;
  addIngredient: (i: string) => void;
  removeIngredient: (i: string) => void;
  clearIngredients: () => void;
  setResult: (r: RecommendationResult | null) => void;
  markSeen: (id: string) => void;
  reset: () => void;
};

const SessionContext = createContext < SessionValue | null > (null);
const STORAGE_KEY = "wigc-session-v1";

type Persisted = {
  mood: string;
  budget: number;
  ingredients: string[];
  seen: string[];
};

export function SessionProvider({ children }: { children: ReactNode }) {
  const [mood, setMoodState] = useState("");
  const [budget, setBudgetState] = useState(0);
  const [ingredients, setIngredientsState] = useState < string[] > ([]);
  const [seen, setSeen] = useState < string[] > ([]);
  const [result, setResultState] = useState < RecommendationResult | null > (null);
  const [hydrated, setHydrated] = useState(false);
  
  // Restore from sessionStorage
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Persisted;
        if (parsed.mood) setMoodState(parsed.mood);
        if (typeof parsed.budget === "number") setBudgetState(parsed.budget);
        if (Array.isArray(parsed.ingredients)) setIngredientsState(parsed.ingredients);
        if (Array.isArray(parsed.seen)) setSeen(parsed.seen);
      }
    } catch {
      // ignore corrupt storage
    }
    setHydrated(true);
  }, []);
  
  // Persist
  useEffect(() => {
    if (!hydrated) return;
    try {
      const payload: Persisted = { mood, budget, ingredients, seen };
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // storage unavailable — non-fatal
    }
  }, [mood, budget, ingredients, seen, hydrated]);
  
  const addIngredient = useCallback((raw: string) => {
    setIngredientsState((prev) => (prev.includes(raw) ? prev : [...prev, raw]));
  }, []);
  
  const removeIngredient = useCallback((raw: string) => {
    setIngredientsState((prev) => prev.filter((i) => i !== raw));
  }, []);
  
  const value = useMemo < SessionValue > (
    () => ({
      mood,
      budget,
      ingredients,
      seen,
      result,
      setMood: setMoodState,
      setBudget: setBudgetState,
      setIngredients: setIngredientsState,
      addIngredient,
      removeIngredient,
      clearIngredients: () => setIngredientsState([]),
      setResult: setResultState,
      markSeen: (id: string) => setSeen((prev) => (prev.includes(id) ? prev : [...prev, id])),
      reset: () => {
        setMoodState("");
        setBudgetState(0);
        setIngredientsState([]);
        setSeen([]);
        setResultState(null);
      },
    }),
    [mood, budget, ingredients, seen, result, addIngredient, removeIngredient]
  );
  
  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession(): SessionValue {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession must be used inside <SessionProvider>");
  return ctx;
}