import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import { Plus, Eye, Heart, Users, MoreVertical, Pencil, ArrowUp, XCircle, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { mockEmployerVacancies, type EmployerVacancy } from "@/lib/mock-employer-data";

const statusConfig: Record<string, { label: string; className: string }> = {
  active: { label: "Активна", className: "bg-green-100 text-green-700 border-green-200" },
  moderation: { label: "На модерации", className: "bg-yellow-100 text-yellow-700 border-yellow-200" },
  rejected: { label: "Отклонена", className: "bg-red-100 text-red-700 border-red-200" },
  archived: { label: "Архив", className: "bg-muted text-muted-foreground border-border" },
};

const tabs = [
  { key: "active", label: "Активные" },
  { key: "moderation", label: "На модерации" },
  { key: "archived", label: "Архив" },
];

export default function MyVacancies() {
  const [activeTab, setActiveTab] = useState("active");
  const navigate = useNavigate();

  const filtered = mockEmployerVacancies.filter((v) => {
    if (activeTab === "active") return v.status === "active" || v.status === "rejected";
    if (activeTab === "moderation") return v.status === "moderation";
    return v.status === "archived";
  });

  const freeUsed = mockEmployerVacancies.filter(v => v.status === "active" || v.status === "moderation").length;

  return (
    <AppLayout>
      <div className="px-4 lg:px-6 py-4 lg:py-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">Мои вакансии</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Использовано {freeUsed} из 3 бесплатных</p>
          </div>
          <Button onClick={() => navigate("/employer/create-vacancy")} className="rounded-xl gap-2">
            <Plus size={18} /> Создать вакансию
          </Button>
        </div>

        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-4xl mb-4">📋</p>
            <p className="font-semibold text-foreground">
              {activeTab === "active" ? "Нет активных вакансий" : activeTab === "moderation" ? "Нет вакансий на модерации" : "Архив пуст"}
            </p>
            {activeTab === "active" && (
              <Button onClick={() => navigate("/employer/create-vacancy")} className="mt-4 rounded-xl">
                Создать первую вакансию
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((vacancy) => (
              <VacancyCard key={vacancy.id} vacancy={vacancy} />
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}

function VacancyCard({ vacancy }: { vacancy: EmployerVacancy }) {
  const navigate = useNavigate();
  const sc = statusConfig[vacancy.status];

  return (
    <div className="bg-card border border-border rounded-2xl p-4 space-y-3">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-foreground">{vacancy.title}</h3>
            <Badge variant="outline" className={`text-xs rounded-lg border ${sc.className}`}>{sc.label}</Badge>
          </div>
          <p className="text-sm text-green-600 font-medium mt-1">{vacancy.salary}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{vacancy.city} · {vacancy.date}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-1.5 rounded-lg hover:bg-muted"><MoreVertical size={18} className="text-muted-foreground" /></button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="rounded-xl">
            <DropdownMenuItem className="gap-2"><Pencil size={16} /> Редактировать</DropdownMenuItem>
            <DropdownMenuItem className="gap-2"><ArrowUp size={16} /> Поднять в топ</DropdownMenuItem>
            <DropdownMenuItem className="gap-2"><XCircle size={16} /> Закрыть вакансию</DropdownMenuItem>
            <DropdownMenuItem className="gap-2 text-destructive"><Trash2 size={16} /> Удалить</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {vacancy.status === "rejected" && vacancy.rejectionReason && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700">
          <span className="font-medium">Причина отклонения:</span> {vacancy.rejectionReason}
        </div>
      )}

      {vacancy.status === "active" && (
        <>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><Eye size={14} /> {vacancy.views}</span>
            <span className="flex items-center gap-1"><Heart size={14} /> {vacancy.favorites}</span>
            <span className="flex items-center gap-1"><Users size={14} /> {vacancy.applications}</span>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => navigate(`/employer/applicants/${vacancy.id}`)} className="rounded-xl flex-1" size="sm">
              Посмотреть кандидатов
            </Button>
            <Button variant="outline" className="rounded-xl flex-1" size="sm">
              {vacancy.applications} подходящих резюме
            </Button>
          </div>
        </>
      )}

      {vacancy.status === "rejected" && (
        <Button variant="outline" className="rounded-xl w-full" size="sm">Исправить и отправить</Button>
      )}

      {vacancy.status === "archived" && (
        <Button variant="outline" className="rounded-xl w-full" size="sm">Восстановить</Button>
      )}

      {vacancy.status === "moderation" && (
        <p className="text-xs text-muted-foreground">⏳ Обычно модерация занимает до 2 часов</p>
      )}
    </div>
  );
}
