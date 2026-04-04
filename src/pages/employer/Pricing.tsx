import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import { ArrowLeft, Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    subtitle: "Попробуйте платформу бесплатно",
    buttonLabel: "Купить",
    buttonClass: "bg-[#222222] hover:bg-black",
    headerClass: "bg-[#F2F2F2]",
    features: [
      "Размещение 1 вакансии / резюме",
      "Стандартное отображение в поиске",
      "Доступ к базовым откликам",
      "7 дней размещения",
    ],
  },
  {
    name: "Premium",
    price: "$99",
    subtitle: "Попробуйте платформу бесплатно",
    buttonLabel: "Купить",
    buttonClass: "bg-gradient-to-r from-[#4F2AD0] to-[#2E16B1] border-none shadow-[0_4px_15px_rgba(79,42,208,0.4)] hover:opacity-90",
    headerClass: "bg-gradient-to-br from-[#D1D5FF] to-[#B7BCFF]",
    popular: true,
    features: [
      "Всё из Regular",
      "Приоритетный показ в поиске",
      "Продвижение в рекомендациях",
      "Максимальное количество просмотров",
      "Выделение цветом",
      "30 дней размещения",
    ],
  },
  {
    name: "Regular",
    price: "$50",
    subtitle: "Попробуйте платформу бесплатно",
    buttonLabel: "Купить",
    buttonClass: "bg-[#222222] hover:bg-black",
    headerClass: "bg-[#F2F2F2]",
    features: [
      "Всё из Free",
      "Приоритет выше бесплатных объявлений",
      "Увеличенное количество показов",
      "14 дней размещения",
    ],
  },
];

export default function Pricing() {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="px-4 lg:px-6 py-6 lg:py-10 space-y-8 max-w-6xl mx-auto">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 rounded-xl hover:bg-muted transition-colors border border-transparent hover:border-border">
            <ArrowLeft size={22} className="text-foreground" />
          </button>
          <h1 className="text-2xl font-bold text-foreground">Выберите тариф</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan) => (
            <div 
              key={plan.name} 
              className={`bg-white rounded-[32px] overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.06)] border border-border/40 transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] ${
                plan.popular ? "md:-mt-4 relative z-10" : "md:mt-4"
              }`}
            >
              {/* Header section */}
              <div className={`p-8 pb-10 ${plan.headerClass} relative`}>
                <div className="bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-full inline-block mb-8 shadow-sm">
                  <span className="text-[13px] font-semibold text-foreground/80">{plan.name}</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-sm font-medium text-foreground/60">/month</span>
                </div>
              </div>

              {/* Action section */}
              <div className="p-8 space-y-8 bg-white -mt-6 rounded-t-[32px] relative z-10">
                <p className="text-[15px] font-medium text-foreground/80">{plan.subtitle}</p>
                
                <button className={`w-full py-4 rounded-3xl text-white font-bold text-base transition-all active:scale-[0.98] ${plan.buttonClass}`}>
                  {plan.buttonLabel}
                </button>

                <div className="space-y-4 pt-2">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Check size={18} className="mt-0.5 text-foreground flex-shrink-0" />
                      <span className="text-[15px] text-foreground font-medium leading-tight">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center pt-4">
          <button className="text-sm font-semibold text-primary hover:underline underline-offset-4">История платежей</button>
        </div>
      </div>
    </AppLayout>
  );
}
