import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import InviteModal from "@/components/InviteModal";
import { User, MessageCircle, Check, X, Inbox, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEmployer } from "@/context/EmployerContext";

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
  const { applications, vacancies, updateApplicationStatus } = useEmployer();
  const [activeTab, setActiveTab] = useState("all");
  const [vacancyFilter, setVacancyFilter] = useState("all");

  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteCandidateId, setInviteCandidateId] = useState("");
  const [inviteCandidateName, setInviteCandidateName] = useState("");

  let filtered = activeTab === "all" ? applications : applications.filter(a => a.status === activeTab);
  if (vacancyFilter !== "all") {
    filtered = filtered.filter(a => a.vacancyId === vacancyFilter);
  }

  const newCount = applications.filter(a => a.status === "new").length;
  const activeVacancies = vacancies.filter(v => v.status === "active");

  const handleInvite = (candidateId: string, name: string) => {
    setInviteCandidateId(candidateId);
    setInviteCandidateName(name);
    setInviteOpen(true);
  };

  const handleCardClick = (id: string, e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    navigate(`/employer/candidate/${id}`);
  };

  return (
    <AppLayout>
      <div className="px-4 lg:px-6 py-4 lg:py-6 space-y-6">
        <h1 className="text-2xl font-bold text-foreground">Все отклики</h1>
        
        {/* Header Layout: [Select | 60px gap | Tabs] */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-0">
          <div className="w-full sm:w-[220px]">
            <Select value={vacancyFilter} onValueChange={setVacancyFilter}>
              <SelectTrigger className="w-full rounded-xl text-sm h-11 bg-muted border-0 shadow-sm">
                <SelectValue placeholder="Все вакансии" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все вакансии</SelectItem>
                {activeVacancies.map(v => (
                  <SelectItem key={v.id} value={v.id}>{v.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="hidden sm:block" style={{ width: '60px' }} />

          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {tabs.map(tab => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap relative border ${
                  activeTab === tab.key 
                    ? "bg-primary text-primary-foreground border-primary shadow-sm" 
                    : "bg-muted/50 text-muted-foreground border-transparent hover:border-border"
                }`}>
                {tab.label}
                {tab.key === "new" && newCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-background">
                    {newCount}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-muted/20 border border-dashed border-border/50 rounded-3xl">
            <Inbox size={48} className="mx-auto text-muted-foreground mb-4 opacity-30" />
            <p className="font-semibold text-foreground text-lg">
              {activeTab === "all" ? "Нет откликов" : "Нет откликов в этой категории"}
            </p>
            <p className="text-sm text-muted-foreground mt-1">Ожидайте новых откликов от кандидатов</p>
          </div>
        ) : (
          <div className="grid gap-3">
            {filtered.map(applicant => (
              <div 
                key={applicant.id} 
                onClick={(e) => handleCardClick(applicant.candidateId, e)}
                className="bg-card border border-border rounded-2xl p-4 space-y-4 hover:border-primary/30 transition-all cursor-pointer shadow-sm group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full bg-primary/5 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors">
                    <User size={24} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="font-bold text-foreground text-base group-hover:text-primary transition-colors">{applicant.name}</h3>
                      <Badge variant="outline" className={`text-xs rounded-lg border px-2 py-0.5 ${statusConfig[applicant.status].className}`}>
                        {statusConfig[applicant.status].label}
                      </Badge>
                    </div>
                    <p className="text-sm font-medium text-gray-700">{applicant.position}</p>
                    <p className="text-[13px] text-muted-foreground mt-1 flex items-center gap-1.5">
                      {applicant.city} · {applicant.experience} · {applicant.age} лет · <span className="text-muted-foreground/60">{applicant.date}</span>
                    </p>
                    <div className="mt-2 text-xs text-primary font-semibold bg-primary/5 px-2.5 py-1 rounded-lg inline-flex items-center gap-1.5">
                      <Search size={12} /> {applicant.vacancyTitle}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 pt-1">
                  {(applicant.status === "new" || applicant.status === "viewed") && (
                    <>
                      <Button size="sm" className="rounded-xl flex-1 gap-2 bg-green-600 hover:bg-green-700 h-10" onClick={(e) => { e.stopPropagation(); handleInvite(applicant.candidateId, applicant.name); }}>
                        <Check size={16} /> Пригласить
                      </Button>
                      <Button size="sm" variant="outline" className="rounded-xl flex-1 gap-2 text-destructive hover:bg-red-50 hover:border-red-200 h-10" onClick={(e) => { e.stopPropagation(); updateApplicationStatus(applicant.id, "rejected"); }}>
                        <X size={16} /> Отказать
                      </Button>
                    </>
                  )}
                  {applicant.status === "invited" && (
                    <Button size="sm" variant="outline" className="rounded-xl flex-1 gap-2 h-10 border-primary text-primary hover:bg-primary/5" onClick={(e) => { e.stopPropagation(); navigate("/chat"); }}>
                      <MessageCircle size={16} /> Написать (чат)
                    </Button>
                  )}
                  {applicant.status === "rejected" && (
                     <Button size="sm" variant="ghost" className="rounded-xl flex-1 h-10 text-muted-foreground" disabled>
                        Заявка отклонена
                     </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <InviteModal
        open={inviteOpen}
        onClose={() => setInviteOpen(false)}
        candidateId={inviteCandidateId}
        candidateName={inviteCandidateName}
      />
    </AppLayout>
  );
}
