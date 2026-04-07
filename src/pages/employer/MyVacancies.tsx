import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import ConfirmModal from "@/components/ConfirmModal";
import { Plus, Eye, Heart, Users, MoreVertical, Pencil, ArrowUp, XCircle, Trash2, Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useEmployer } from "@/context/EmployerContext";
import { toast } from "sonner";
import type { EmployerVacancy } from "@/lib/mock-employer-data";

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
  const { vacancies, updateVacancyStatus, removeVacancy } = useEmployer();

  const filtered = vacancies.filter((v) => {
    if (activeTab === "active") return v.status === "active" || v.status === "rejected";
    if (activeTab === "moderation") return v.status === "moderation";
    return v.status === "archived";
  });

  const freeUsed = vacancies.filter(v => v.status === "active" || v.status === "moderation").length;

  return (
    <AppLayout>
      <div className="px-4 lg:px-6 py-4 lg:py-8 space-y-6 max-w-4xl mx-auto w-full">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Мои вакансии</h1>
            <p className="text-base text-muted-foreground mt-0.5">Использовано {freeUsed} из 3 бесплатных</p>
          </div>
          <Button onClick={() => navigate("/employer/create-vacancy")} className="rounded-2xl gap-2 h-11 text-base px-6">
            <Plus size={20} /> Создать вакансию
          </Button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-2.5 rounded-2xl text-base font-medium transition-all whitespace-nowrap border ${
                activeTab === tab.key
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-muted/50 text-muted-foreground border-transparent hover:border-border"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-muted/30 rounded-3xl border border-dashed border-border/50 max-w-2xl mx-auto w-full">
            <Briefcase size={48} className="mx-auto text-muted-foreground mb-4 opacity-40" />
            <p className="font-semibold text-foreground text-xl">
              {activeTab === "active" ? "Создайте первую вакансию" : activeTab === "moderation" ? "Нет вакансий на модерации" : "Архив пуст"}
            </p>
            {activeTab === "active" && (
              <Button onClick={() => navigate("/employer/create-vacancy")} className="mt-6 rounded-2xl h-11 text-base px-6">
                Создать вакансию
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
  const { updateVacancyStatus, removeVacancy } = useEmployer();
  const sc = statusConfig[vacancy.status];

  const [closeConfirm, setCloseConfirm] = useState(false);
  const [deleteStep, setDeleteStep] = useState<0 | 1 | 2>(0);

  const handleClose = () => {
    updateVacancyStatus(vacancy.id, "archived");
    toast.success("Вакансия перемещена в архив");
    setCloseConfirm(false);
  };

  const handleDelete = () => {
    if (deleteStep === 1) {
      setDeleteStep(2);
    } else if (deleteStep === 2) {
      removeVacancy(vacancy.id);
      toast.success("Вакансия удалена");
      setDeleteStep(0);
    }
  };

  const isOnModeration = vacancy.status === "moderation";

  return (
    <>
      <div className="bg-card border border-border rounded-2xl p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-foreground text-lg">{vacancy.title}</h3>
              <Badge variant="outline" className={`text-xs rounded-xl border ${sc.className}`}>{sc.label}</Badge>
            </div>
            <p className="text-base text-green-600 font-bold mt-1">{vacancy.salary}</p>
            <p className="text-sm text-muted-foreground mt-0.5">{vacancy.city} · {vacancy.date}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-1.5 rounded-lg hover:bg-muted"><MoreVertical size={18} className="text-muted-foreground" /></button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-2xl p-1.5 shadow-xl border-border/50" style={{ zIndex: 300 }}>
              <DropdownMenuItem
                className="gap-2.5 rounded-xl py-2.5 text-base"
                disabled={isOnModeration}
                onClick={() => navigate(`/employer/edit-vacancy/${vacancy.id}`)}
              >
                <Pencil size={18} /> Редактировать
                {isOnModeration && <span className="text-xs text-muted-foreground ml-auto">Дождитесь проверки</span>}
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2.5 rounded-xl py-2.5 text-base" onClick={() => navigate("/employer/pricing")}>
                <ArrowUp size={18} /> Поднять в топ
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2.5 rounded-xl py-2.5 text-base" onClick={() => setCloseConfirm(true)}>
                <XCircle size={18} /> Закрыть вакансию
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2.5 rounded-xl py-2.5 text-base text-destructive" onClick={() => setDeleteStep(1)}>
                <Trash2 size={18} /> Удалить
              </DropdownMenuItem>
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
            <div className="flex items-center gap-4 text-base text-muted-foreground">
              <span className="flex items-center gap-1.5"><Eye size={16} /> {vacancy.views}</span>
              <span className="flex items-center gap-1.5"><Heart size={16} /> {vacancy.favorites}</span>
              <span className="flex items-center gap-1.5"><Users size={16} /> {vacancy.applications}</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button onClick={() => navigate(`/employer/applicants/${vacancy.id}`)} className="rounded-2xl flex-1 h-11 text-base shadow-sm" size="sm">
                Посмотреть кандидатов
              </Button>
              <Button variant="outline" className="rounded-2xl flex-1 h-11 text-base" size="sm" onClick={() => navigate("/employer/candidates")}>
                {vacancy.applications} подходящих резюме
              </Button>
            </div>
          </>
        )}

        {vacancy.status === "rejected" && (
          <Button variant="outline" className="rounded-2xl w-full h-11 text-base border-primary text-primary" size="sm" onClick={() => navigate(`/employer/edit-vacancy/${vacancy.id}`)}>
            Исправить и отправить повторно
          </Button>
        )}

        {vacancy.status === "archived" && (
          <Button variant="outline" className="rounded-2xl w-full h-11 text-base" size="sm" onClick={() => updateVacancyStatus(vacancy.id, "active")}>
            Восстановить
          </Button>
        )}

        {vacancy.status === "moderation" && (
          <p className="text-xs text-muted-foreground">⏳ Обычно модерация занимает до 2 часов</p>
        )}
      </div>

      {/* Close confirmation */}
      <ConfirmModal
        open={closeConfirm}
        onClose={() => setCloseConfirm(false)}
        onConfirm={handleClose}
        title="Закрыть вакансию?"
        description="Вакансия будет перемещена в архив. Продолжить?"
        confirmText="Закрыть вакансию"
      />

      {/* Delete - step 1 */}
      <ConfirmModal
        open={deleteStep === 1}
        onClose={() => setDeleteStep(0)}
        onConfirm={() => setDeleteStep(2)}
        title="Удалить вакансию?"
        description="Вакансия будет полностью удалена."
        confirmText="Удалить"
        destructive
      />

      {/* Delete - step 2 (double confirmation) */}
      <ConfirmModal
        open={deleteStep === 2}
        onClose={() => setDeleteStep(0)}
        onConfirm={() => { removeVacancy(vacancy.id); toast.success("Вакансия удалена"); setDeleteStep(0); }}
        title="Это действие нельзя отменить"
        description="Вакансия и все данные о ней будут полностью удалены. Всё равно удалить?"
        confirmText="Всё равно удалить"
        destructive
      />
    </>
  );
}
