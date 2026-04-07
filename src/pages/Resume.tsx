import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, Edit2 } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

const resumeData = {
  name: "Иван Иванов",
  birthDate: "15.03.1995",
  phone: "+996 700 123 456",
  city: "Бишкек",
  position: "Frontend-разработчик",
  education: "Высшее",
  experience: "1–3 года",
  salary: "80 000 сом в месяц",
  skills: "React, TypeScript, JavaScript, CSS, Git, английский B2",
  about: "Ответственный, коммуникабельный, быстро учусь. Опыт работы в стартапах и продуктовых командах.",
};

const completeness = 75;

const fields = [
  { label: "ФИО", value: resumeData.name },
  { label: "Дата рождения", value: resumeData.birthDate },
  { label: "Телефон", value: resumeData.phone },
  { label: "Город", value: resumeData.city },
  { label: "Желаемая должность", value: resumeData.position },
  { label: "Образование", value: resumeData.education },
  { label: "Опыт работы", value: resumeData.experience },
  { label: "Желаемая зарплата", value: resumeData.salary },
  { label: "Навыки", value: resumeData.skills },
  { label: "О себе", value: resumeData.about },
];

export default function Resume() {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="flex flex-col min-h-[calc(100vh-64px)] lg:min-h-screen bg-background">
        <header className="sticky top-0 z-20 bg-background border-b border-border px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-1.5 rounded-xl hover:bg-muted">
            <ArrowLeft size={22} />
          </button>
          <span className="flex-1 font-semibold text-lg">Моё резюме</span>
         
        </header>

        <div className="max-w-2xl mx-auto p-4 lg:p-6 space-y-6 animate-fade-in w-full">
          {/* Completeness */}
          <div className="bg-primary/5 rounded-2xl p-5 border border-primary/10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-base font-semibold text-foreground">Резюме заполнено на {completeness}%</span>
              <span className="text-sm text-primary font-medium">Добавьте фото</span>
            </div>
            <Progress value={completeness} className="h-2.5 bg-primary/10" />
          </div>

          {/* Avatar */}
          <div className="flex items-center gap-4 py-2">
            <div className="w-24 h-24 rounded-3xl bg-muted flex items-center justify-center border-2 border-border border-dashed">
              <User size={40} className="text-muted-foreground" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-foreground">{resumeData.name}</h2>
              <p className="text-base text-primary font-semibold">{resumeData.position}</p>
              
            </div>
             <Button size="sm" variant="outline" className="rounded-xl border-primary text-primary hover:bg-primary/5">
            <Edit2 size={14} className="mr-1" /> Редактировать
          </Button>
          </div>

          {/* Fields */}
          <div className="bg-card border border-border rounded-3xl overflow-hidden divide-y divide-border">
            {fields.map((f) => (
              <div key={f.label} className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4 p-5 hover:bg-muted/30 transition-colors">
                <span className="text-sm font-medium text-muted-foreground sm:w-48 flex-shrink-0 uppercase tracking-wider">{f.label}</span>
                <span className="text-base font-semibold text-foreground">{f.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
