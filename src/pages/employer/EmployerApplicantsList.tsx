import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import { User, MessageCircle, Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockApplicants, type Applicant } from "@/lib/mock-employer-data";

const statusConfig: Record<string, { label: string; className: string }> = {
  new: { label: "Новый", className: "bg-yellow-100 text-yellow-700 border-yellow-200" },
  viewed: { label: "Просмотрен", className: "bg-muted text-muted-foreground border-border" },
  invited: { label: "Приглашён", className: "bg-green-100 text-green-700 border-green-200" },
  rejected: { label: "Отказ", className: "bg-red-100 text-red-700 border-red-200" },
};

const tabs = [
  { key: "all", label: "Все" },
  { key: "new", label: "Новые" },
  { key: "invited", label: "Приглашены" },
  { key: "rejected", label: "Отказ" },
];

export default function EmployerApplicantsList() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");

  const filtered = activeTab === "all" ? mockApplicants : mockApplicants.filter(a => a.status === activeTab);

  return (
    <AppLayout>
      <div className="px-4 lg:px-6 py-4 lg:py-6 space-y-4">
        <h1 className="text-xl font-bold text-foreground">Все отклики</h1>

        <div className="flex gap-2 overflow-x-auto pb-1">
          {tabs.map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${activeTab === tab.key ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}>
              {tab.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-4xl mb-4">📭</p>
            <p className="font-semibold text-foreground">Нет откликов</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(applicant => (
              <div key={applicant.id} className="bg-card border border-border rounded-2xl p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center flex-shrink-0">
                    <User size={20} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-foreground">{applicant.name}</h3>
                      <Badge variant="outline" className={`text-xs rounded-lg border ${statusConfig[applicant.status].className}`}>
                        {statusConfig[applicant.status].label}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{applicant.position}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{applicant.city} · {applicant.experience} · {applicant.age} лет · {applicant.date}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {(applicant.status === "new" || applicant.status === "viewed") && (
                    <>
                      <Button size="sm" className="rounded-xl flex-1 gap-1 bg-green-600 hover:bg-green-700"><Check size={16} /> Пригласить</Button>
                      <Button size="sm" variant="outline" className="rounded-xl flex-1 gap-1 text-destructive hover:text-destructive"><X size={16} /> Отказать</Button>
                    </>
                  )}
                  {applicant.status === "invited" && (
                    <Button size="sm" variant="outline" className="rounded-xl flex-1 gap-1"><MessageCircle size={16} /> Написать</Button>
                  )}
                  <Button size="sm" variant="ghost" className="rounded-xl">Открыть резюме</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
