import { featuredCompanies } from "@/lib/mock-data";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function FeaturedCompanies() {
  const [selected, setSelected] = useState<(typeof featuredCompanies)[0] | null>(null);

  return (
    <>
      <div className="flex gap-3 overflow-x-auto scrollbar-hide py-1 px-1">
        {featuredCompanies.map((company) => (
          <button
            key={company.id}
            onClick={() => setSelected(company)}
            className="flex-shrink-0 w-[200px] bg-card border border-border rounded-2xl p-4 hover:border-primary/30 hover:shadow-sm transition-all text-left"
          >
            <div className="text-3xl mb-3">{company.logo}</div>
            <p className="font-semibold text-sm text-foreground">{company.name}</p>
            <span className="inline-block mt-2 text-xs bg-primary-light text-primary px-2.5 py-1 rounded-full font-medium">
              {company.badge}
            </span>
          </button>
        ))}
      </div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="rounded-2xl max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <span className="text-3xl">{selected?.logo}</span>
              {selected?.name}
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Одна из ведущих компаний Кыргызстана. Стабильная работа, официальное оформление, карьерный рост.
          </p>
          <div className="mt-2">
            <h4 className="text-sm font-semibold mb-2">Активные вакансии</h4>
            <div className="space-y-2">
              {["Менеджер по продажам", "Бухгалтер", "Кассир"].map((title) => (
                <div key={title} className="flex items-center justify-between p-3 bg-muted rounded-xl">
                  <span className="text-sm font-medium">{title}</span>
                  <span className="text-xs text-muted-foreground">Бишкек</span>
                </div>
              ))}
            </div>
          </div>
          <Button variant="outline" className="mt-3 rounded-xl" onClick={() => setSelected(null)}>
            Закрыть
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
