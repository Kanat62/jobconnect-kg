import { categories } from "@/lib/mock-data";
import {
  LayoutGrid, Hammer, Car, Monitor, UtensilsCrossed,
  GraduationCap, Sparkles, Wrench, ShoppingBag, Factory, Shield,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  LayoutGrid, Hammer, Car, Monitor, UtensilsCrossed,
  GraduationCap, Sparkles, Wrench, ShoppingBag, Factory, Shield,
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
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${
              isActive
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted text-muted-foreground hover:bg-accent"
            }`}
          >
            {Icon && <Icon size={15} />}
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
