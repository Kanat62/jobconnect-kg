import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Zap, MessageCircle } from "lucide-react";

const slides = [
  {
    icon: MapPin,
    title: "Находи работу рядом с домом",
    description: "Вакансии по всему Кыргызстану — Бишкек, Ош, Жалал-Абад и другие города",
    color: "bg-primary",
  },
  {
    icon: Zap,
    title: "Откликайся в один клик",
    description: "Создай резюме один раз и откликайся на вакансии мгновенно",
    color: "bg-success",
  },
  {
    icon: MessageCircle,
    title: "Общайся с работодателем напрямую",
    description: "Встроенный чат для быстрой связи без лишних посредников",
    color: "bg-info",
  },
];

export default function Onboarding() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-12">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xl">Ж</span>
          </div>
          <span className="text-2xl font-bold text-foreground">Жомуш.kg</span>
        </div>

        {/* Slide */}
        <div className="text-center animate-fade-in" key={current}>
          <div className={`w-20 h-20 rounded-3xl ${slides[current].color} flex items-center justify-center mx-auto mb-6`}>
            {(() => {
              const Icon = slides[current].icon;
              return <Icon size={36} className="text-primary-foreground" />;
            })()}
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">{slides[current].title}</h2>
          <p className="text-sm text-muted-foreground">{slides[current].description}</p>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all ${
                i === current ? "w-6 bg-primary" : "w-2 bg-muted"
              }`}
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="mt-10 space-y-3">
          <Button className="w-full rounded-xl h-12 text-base" onClick={() => navigate("/auth")}>
            Войти
          </Button>
          <Button variant="outline" className="w-full rounded-xl h-12 text-base" onClick={() => navigate("/auth?mode=register")}>
            Зарегистрироваться
          </Button>
          <button
            className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
            onClick={() => navigate("/")}
          >
            Продолжить без регистрации
          </button>
        </div>
      </div>
    </div>
  );
}
