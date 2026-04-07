import AppLayout from "@/components/AppLayout";
import { Link } from "react-router-dom";
import { Building2, Briefcase, CreditCard, Receipt, ChevronRight, LogOut, FileQuestion, Bell, Heart, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useEmployer } from "@/context/EmployerContext";

export default function EmployerProfile() {
  const { vacancies, applications, savedCandidateIds } = useEmployer();
  const activeCount = vacancies.filter(v => v.status === "active").length;
  const totalApplications = applications.length;
  const invitedCount = applications.filter(a => a.status === "invited").length;

  return (
    <AppLayout>
      <h1 className="px-4 lg:px-6 pt-4 lg:pt-6 text-xl font-bold text-foreground">Кабинет</h1>

      <div className="px-4 lg:px-6 py-4 lg:py-6 max-w-2xl mx-auto">
        {/* Company info */}
        <div className="flex items-center gap-4 mb-4 p-4 bg-card border border-border rounded-2xl">
          <div className="w-14 h-14 rounded-2xl bg-primary-light flex items-center justify-center">
            <Building2 size={26} className="text-primary" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-lg text-foreground">ООО «Пример»</p>
            <p className="text-base text-muted-foreground">Бишкек · Торговля</p>
          </div>
          <Link to="/employer/company-profile">
            <Button variant="outline" size="sm" className="rounded-2xl h-10 text-base border-primary text-primary">Редактировать</Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: "Активных", value: String(activeCount) },
            { label: "Откликов", value: String(totalApplications) },
            { label: "Приглашено", value: String(invitedCount) },
          ].map(s => (
            <div key={s.label} className="bg-card border border-border rounded-2xl p-3 text-center">
              <p className="text-xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Menu */}
        <div className="space-y-1 mb-6">
          {[
            { icon: Users, label: "Поиск кандидатов", path: "/employer/candidates" },
            { icon: Briefcase, label: "Мои вакансии", path: "/employer/vacancies" },
            { icon: Heart, label: `Избранные кандидаты${savedCandidateIds.length > 0 ? ` (${savedCandidateIds.length})` : ""}`, path: "/employer/favorites" },
            { icon: CreditCard, label: "Тарифы и оплата", path: "/employer/pricing" },
            { icon: Receipt, label: "История платежей", path: "#" },
          ].map(item => (
            <Link key={item.label} to={item.path} className="flex items-center gap-3 p-3 rounded-2xl hover:bg-muted transition-colors">
              <item.icon size={22} className="text-muted-foreground" />
              <span className="flex-1 text-base font-medium text-foreground">{item.label}</span>
              <ChevronRight size={18} className="text-muted-foreground" />
            </Link>
          ))}
        </div>

        {/* Settings */}
        <div className="border-t border-border pt-4 space-y-1">
          <h3 className="text-sm font-semibold text-muted-foreground px-3 mb-2 uppercase tracking-wider">Настройки</h3>
          <div className="flex items-center gap-3 p-3 rounded-2xl">
            <Bell size={22} className="text-muted-foreground" />
            <span className="flex-1 text-base font-medium">Уведомления</span>
            <Switch defaultChecked />
          </div>
          <a href="#" className="flex items-center gap-3 p-3 rounded-2xl hover:bg-muted transition-colors">
            <FileQuestion size={22} className="text-muted-foreground" />
            <span className="flex-1 text-base font-medium">Связаться с поддержкой</span>
            <ChevronRight size={18} className="text-muted-foreground" />
          </a>
        </div>

        <div className="border-t border-border pt-4 mt-4">
          <Button variant="outline" className="w-full justify-start rounded-2xl text-destructive hover:text-destructive h-12 text-base shadow-sm">
            <LogOut size={22} className="mr-3" /> Выйти из аккаунта
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
