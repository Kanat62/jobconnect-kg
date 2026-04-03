import AppLayout from "@/components/AppLayout";
import { mockApplications } from "@/lib/mock-data";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageCircle, ExternalLink, FileText } from "lucide-react";

const statusConfig = {
  sent: { label: "Отправлен", class: "bg-muted text-muted-foreground" },
  viewed: { label: "Просмотрен", class: "bg-info/10 text-info" },
  invited: { label: "Приглашён ✓", class: "bg-success/10 text-success" },
  rejected: { label: "Отказ", class: "bg-destructive/10 text-destructive" },
};

const tabs = [
  { id: "all", label: "Все" },
  { id: "sent", label: "Новые" },
  { id: "invited", label: "Приглашены" },
  { id: "rejected", label: "Отказ" },
];

export default function Applications() {
  const [activeTab, setActiveTab] = useState("all");

  const filtered = activeTab === "all"
    ? mockApplications
    : mockApplications.filter((a) => a.status === activeTab);

  return (
    <AppLayout>
      <div className="px-4 lg:px-6 py-4 lg:py-6">
        <h1 className="text-xl font-bold text-foreground mb-4">Мои отклики</h1>

        {/* Tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-accent"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {filtered.length > 0 ? (
          <div className="space-y-3">
            {filtered.map((app) => {
              const status = statusConfig[app.status];
              return (
                <div key={app.id} className="bg-card border border-border rounded-2xl p-4 animate-fade-in">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{app.jobTitle}</h3>
                      <p className="text-sm text-muted-foreground mt-0.5">{app.company} · {app.city}</p>
                      <p className="text-xs text-muted-foreground mt-1">Откликнулся {app.date}</p>
                    </div>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${status.class}`}>
                      {status.label}
                    </span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    {app.status === "invited" && (
                      <Button size="sm" className="rounded-xl text-xs" asChild>
                        <Link to="/chat"><MessageCircle size={14} className="mr-1" /> Открыть чат</Link>
                      </Button>
                    )}
                    <Button size="sm" variant="outline" className="rounded-xl text-xs" asChild>
                      <Link to={`/job/${app.jobId}`}><ExternalLink size={14} className="mr-1" /> Вакансия</Link>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <FileText size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="font-semibold text-foreground">Вы ещё не откликались</p>
            <p className="text-sm text-muted-foreground mt-1">на вакансии</p>
            <Button asChild className="mt-6 rounded-xl">
              <Link to="/">Найти вакансии</Link>
            </Button>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
