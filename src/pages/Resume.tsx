import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, Edit2 } from "lucide-react";
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
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 bg-background border-b border-border px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-1.5 rounded-xl hover:bg-muted">
          <ArrowLeft size={22} />
        </button>
        <span className="flex-1 font-semibold">Моё резюме</span>
        <Button size="sm" variant="outline" className="rounded-xl">
          <Edit2 size={14} className="mr-1" /> Редактировать
        </Button>
      </header>

      <div className="max-w-2xl mx-auto p-4 lg:p-6 space-y-6 animate-fade-in">
        {/* Completeness */}
        <div className="bg-primary-light rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Резюме заполнено на {completeness}%</span>
            <span className="text-xs text-muted-foreground">Добавьте фото</span>
          </div>
          <Progress value={completeness} className="h-2" />
        </div>

        {/* Avatar */}
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center">
            <User size={32} className="text-muted-foreground" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">{resumeData.name}</h2>
            <p className="text-sm text-primary font-medium">{resumeData.position}</p>
          </div>
        </div>

        {/* Fields */}
        <div className="bg-card border border-border rounded-2xl divide-y divide-border">
          {fields.map((f) => (
            <div key={f.label} className="flex items-start gap-3 p-4">
              <span className="text-sm text-muted-foreground w-40 flex-shrink-0">{f.label}</span>
              <span className="text-sm font-medium text-foreground">{f.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
