import { useParams, useNavigate } from "react-router-dom";
import { mockJobs } from "@/lib/mock-data";
import { ArrowLeft, Heart, Share2, MapPin, Briefcase, Clock, Globe, DollarSign, Building2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import AppLayout from "@/components/AppLayout";

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = mockJobs.find((j) => j.id === id);
  const [isFav, setIsFav] = useState(false);
  const [applied, setApplied] = useState(false);

  if (!job) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
        <p className="text-5xl mb-4">😕</p>
        <h2 className="text-lg font-semibold">Вакансия больше не активна</h2>
        <p className="text-base text-muted-foreground mt-1">Возможно, она была закрыта или удалена</p>
        <Button className="mt-6 rounded-xl" onClick={() => navigate("/")}>
          Посмотреть другие вакансии
        </Button>
      </div>
    );
  }

  const meta = [
    { icon: Briefcase, label: "Опыт", value: job.experience },
    { icon: MapPin, label: "Город", value: job.city },
    ...(job.address ? [{ icon: Building2, label: "Адрес", value: job.address }] : []),
    { icon: Clock, label: "График", value: job.schedule },
    { icon: Globe, label: "Удалённая работа", value: job.remote ? "Да" : "Нет" },
    ...(job.salaryPeriod ? [{ icon: Calendar, label: "Период оплаты", value: job.salaryPeriod }] : []),
    { icon: DollarSign, label: "Зарплата", value: job.salary || "По договорённости" },
  ];

  return (
    <AppLayout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-background border-b border-border px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-1.5 rounded-xl hover:bg-muted transition-colors">
            <ArrowLeft size={22} />
          </button>
          <span className="flex-1 font-semibold text-base truncate">Детальная страница</span>
        </header>

        <div className="max-w-3xl mx-auto px-4 lg:px-6 py-6 pb-28 space-y-6 animate-fade-in">
          {/* ... existing content ... */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold text-foreground break-words">{job.title}</h1>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-muted-foreground">{job.company}</span>
                <span className="bg-primary-light text-primary text-sm px-2 py-0.5 rounded-full flex items-center gap-1 font-medium">
                  <MapPin size={10} /> {job.city}
                </span>
                <span className="text-sm text-muted-foreground">Опубликовано: {job.date}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0 pt-1">
              <button 
                onClick={() => setIsFav(!isFav)} 
                className="p-2 rounded-xl bg-muted hover:bg-muted/80 transition-colors"
                title={isFav ? "Удалить из избранного" : "Добавить в избранное"}
              >
                <Heart size={22} className={isFav ? "fill-red-500 text-red-500" : "text-muted-foreground"} />
              </button>
              <button 
                className="p-2 rounded-xl bg-muted hover:bg-muted/80 transition-colors"
                title="Поделиться"
              >
                <Share2 size={22} className="text-muted-foreground" />
              </button>
            </div>
          </div>
          {job.salary && (
            <p className="mt-3 text-xl font-bold text-foreground">
              {job.salary}
              {job.salaryPeriod && <span className="text-base font-normal text-muted-foreground ml-1">{job.salaryPeriod}</span>}
            </p>
          )}

          {/* Meta */}
          <div className="bg-muted rounded-2xl p-4 space-y-3">
            {meta.map((m, i) => (
              <div key={i} className="flex items-center gap-3">
                <m.icon size={16} className="text-muted-foreground flex-shrink-0" />
                <span className="text-base text-muted-foreground w-36">{m.label}</span>
                <span className="text-base font-medium text-foreground">{m.value}</span>
              </div>
            ))}
          </div>

          {/* Responsibilities */}
          {job.responsibilities && job.responsibilities.length > 0 && (
            <section>
              <h3 className="font-semibold text-foreground mb-2">Обязанности</h3>
              <ul className="space-y-1.5">
                {job.responsibilities.map((r, i) => (
                  <li key={i} className="text-base text-muted-foreground flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    {r}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Requirements */}
          {job.requirements && job.requirements.length > 0 && (
            <section>
              <h3 className="font-semibold text-foreground mb-2">Требования</h3>
              <ul className="space-y-1.5">
                {job.requirements.map((r, i) => (
                  <li key={i} className="text-base text-muted-foreground flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    {r}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Conditions */}
          {job.conditions && job.conditions.length > 0 && (
            <section>
              <h3 className="font-semibold text-foreground mb-2">Условия</h3>
              <ul className="space-y-1.5">
                {job.conditions.map((c, i) => (
                  <li key={i} className="text-base text-muted-foreground flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-success mt-1.5 flex-shrink-0" />
                    {c}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Fixed bottom bar */}
        <div className="fixed bottom-0 left-0 right-0 lg:left-[260px] bg-background border-t border-border p-4 z-20">
          <div className="max-w-3xl mx-auto flex gap-3">
            {applied ? (
              <>
                <Button disabled className="flex-1 rounded-xl h-12 bg-muted text-muted-foreground">
                  Вы откликнулись ✓
                </Button>
                <Button variant="outline" className="flex-1 rounded-xl h-12" onClick={() => navigate("/chat")}>
                  Написать
                </Button>
              </>
            ) : (
              <>
                <Button className="flex-1 rounded-xl h-12" onClick={() => setApplied(true)}>
                  Откликнуться
                </Button>
                <Button variant="outline" className="flex-1 rounded-xl h-12" onClick={() => navigate("/chat")}>
                  Написать
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
