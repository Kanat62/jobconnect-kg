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
            className="flex-shrink-0 w-[210px] h-[110px] bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 hover:shadow-md transition-all group"
          >
            {(company as any).banner ? (
              <img
                src={(company as any).banner}
                alt={company.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted">
                <span className="text-3xl">{company.logo}</span>
              </div>
            )}
          </button>
        ))}
      </div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent 
          className="p-0 overflow-hidden border-none max-w-[700px] w-[700px] h-[500px] rounded-3xl"
          closeClassName="top-4 right-4 p-2 rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors z-10 opacity-100"
        >
          {selected && (
            <div className="relative w-full h-full">
              {/* Background Image */}
              <div
                className="absolute inset-[-1px] bg-cover bg-center"
                style={{ backgroundImage: `url(${(selected as any).banner})` }}
              />

              {/* Overlay to ensure button visibility if needed, but the user didn't ask for it */}
              <div className="absolute inset-0 bg-black/10" />

              {/* Action Button */}
              <div className="absolute bottom-10 left-0 right-0 px-10 flex justify-center">
                <Button
                  className="w-[200px] bg-primary hover:bg-primary shadow-2xl text-white text-lg font-semibold h-14 rounded-2xl transition-all active:scale-[0.98]"
                  onClick={() => setSelected(null)}
                >
                  Перейти
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
