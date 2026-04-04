import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import { ArrowLeft, Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pricingPlans } from "@/lib/mock-employer-data";

export default function Pricing() {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="px-4 lg:px-6 py-4 lg:py-6 space-y-6 max-w-3xl mx-auto">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-1.5 rounded-lg hover:bg-muted">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold text-foreground">Выберите тариф</h1>
        </div>

        <div className="bg-primary-light border border-primary/20 rounded-2xl p-4 text-sm text-foreground">
          У вас использовано <span className="font-bold">3 из 3</span> бесплатных вакансий
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {pricingPlans.map((plan) => (
            <div key={plan.name} className={`relative bg-card border rounded-2xl p-5 space-y-3 ${plan.popular ? "border-primary ring-2 ring-primary/20" : "border-border"}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <Star size={12} /> Популярный
                  </span>
                </div>
              )}
              <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
              <p className="text-2xl font-bold text-foreground">{plan.price}</p>
              <p className="text-sm text-muted-foreground">{plan.vacancies}</p>
              {plan.current ? (
                <Button variant="outline" disabled className="w-full rounded-xl">Текущий тариф</Button>
              ) : (
                <Button className="w-full rounded-xl">Выбрать</Button>
              )}
            </div>
          ))}
        </div>

        <button className="text-sm text-primary hover:underline">История платежей</button>
      </div>
    </AppLayout>
  );
}
