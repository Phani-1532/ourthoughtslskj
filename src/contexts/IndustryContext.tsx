import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type IndustryKey =
  | "default"
  | "elearning"
  | "healthcare"
  | "hospitality"
  | "it"
  | "consulting"
  | "bpm";

export interface IndustryMeta {
  key: IndustryKey;
  label: string;
  emoji: string;
  tagline: string;
}

export const INDUSTRIES: IndustryMeta[] = [
  { key: "default", label: "All Industries", emoji: "🌐", tagline: "Multi-domain innovation" },
  { key: "elearning", label: "E-Learning", emoji: "🎓", tagline: "EdTech & live learning" },
  { key: "healthcare", label: "Healthcare", emoji: "❤️", tagline: "Digital health platforms" },
  { key: "hospitality", label: "Hospitality", emoji: "🏨", tagline: "Hotels, F&B and guest experiences" },
  { key: "it", label: "IT & Technology", emoji: "💻", tagline: "Engineering & cloud" },
  { key: "consulting", label: "Consulting", emoji: "📊", tagline: "Strategy & transformation" },
  { key: "bpm", label: "BPM", emoji: "⚙️", tagline: "Business process management" },
];

const STORAGE_KEY = "ot_industry";
const ASKED_KEY = "ot_industry_asked";

interface Ctx {
  industry: IndustryKey;
  setIndustry: (k: IndustryKey) => void;
  asked: boolean;
  markAsked: () => void;
  reset: () => void;
}

const IndustryContext = createContext<Ctx | null>(null);

export const IndustryProvider = ({ children }: { children: ReactNode }) => {
  const [industry, setIndustryState] = useState<IndustryKey>("default");
  const [asked, setAsked] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as IndustryKey | null;
    const wasAsked = localStorage.getItem(ASKED_KEY) === "1";
    if (stored) setIndustryState(stored);
    setAsked(wasAsked);
  }, []);

  const setIndustry = (k: IndustryKey) => {
    setIndustryState(k);
    localStorage.setItem(STORAGE_KEY, k);
  };

  const markAsked = () => {
    localStorage.setItem(ASKED_KEY, "1");
    setAsked(true);
  };

  const reset = () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(ASKED_KEY);
    setIndustryState("default");
    setAsked(false);
  };

  return (
    <IndustryContext.Provider value={{ industry, setIndustry, asked, markAsked, reset }}>
      {children}
    </IndustryContext.Provider>
  );
};

export const useIndustry = () => {
  const ctx = useContext(IndustryContext);
  if (!ctx) throw new Error("useIndustry must be used within IndustryProvider");
  return ctx;
};
