import { categories } from "@/lib/mock-data";
import {
  LayoutGrid, Hammer, Car, Monitor, UtensilsCrossed,
  GraduationCap, Sparkles, Wrench, ShoppingBag, Factory, Shield,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  LayoutGrid, Hammer, Car, Monitor, UtensilsCrossed,
  GraduationCap, Sparkles, Wrench, ShoppingBag, Factory, Shield,
};

const iconColors: Record<string, string> = {
  all: "#64748b",          // Slate 500
  construction: "#f59e0b", // Amber 500
  transport: "#3b82f6",    // Blue 500
  it: "#8b5cf6",           // Violet 500
  food: "#ef4444",         // Red 500
  education: "#10b981",    // Emerald 500
  beauty: "#ec4899",       // Pink 500
  services: "#facc15",     // Yellow 400
  trade: "#0ea5e9",        // Sky 500
  manufacturing: "#475569",// Slate 600
  security: "#dc2626",     // Red 600
};

interface Props {
  active: string;
  onChange: (id: string) => void;
}

export default function CategoryChips({ active, onChange }: Props) {
  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide py-1 px-1">
      {categories.map((cat) => {
        const Icon = iconMap[cat.icon];
        const isActive = active === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            className={`flex items-center hover:shadow gap-1.5 px-4 py-2.5 border rounded-full text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${
              isActive
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-white text-muted-foreground hover:bg-accent"
            }`}
          >
            {Icon && (
              <Icon 
                size={18} 
                color={isActive ? "currentColor" : (iconColors[cat.id] || "currentColor")} 
                className={isActive ? "" : "opacity-90"}
              />
            )}
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
