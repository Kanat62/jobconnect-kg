import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import InviteModal from "@/components/InviteModal";
import { ArrowLeft, User, MessageCircle, Check, X, Inbox } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

export default function Applicants() {
  const { vacancyId } = useParams();
  const navigate = useNavigate();
  const { applications, vacancies, updateApplicationStatus } = useEmployer();
  const [activeTab, setActiveTab] = useState("all");

  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteCandidateId, setInviteCandidateId] = useState("");
  const [inviteCandidateName, setInviteCandidateName] = useState("");

  const vacancy = vacancies.find(v => v.id === vacancyId);
  const vacancyApplicants = applications.filter(a => a.vacancyId === vacancyId);
  const filtered = activeTab === "all" ? vacancyApplicants : vacancyApplicants.filter(a => a.status === activeTab);

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
        <div className="flex items-center gap-4">
          <button onClick={() => navigate("/employer/vacancies")} className="p-2 rounded-xl hover:bg-muted transition-colors border border-transparent hover:border-border">
            <ArrowLeft size={20} className="text-foreground" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground">Отклики</h1>
            {vacancy && (
              <p className="text-sm font-medium text-primary mt-0.5">
                {vacancy.title} · <span className="text-muted-foreground">{vacancyApplicants.length} откликов</span>
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {tabs.map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap border ${
                activeTab === tab.key 
                  ? "bg-primary text-primary-foreground border-primary shadow-sm" 
                  : "bg-muted/50 text-muted-foreground border-transparent hover:border-border"
              }`}>
              {tab.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-muted/20 border border-dashed border-border/50 rounded-3xl">
            <Inbox size={48} className="mx-auto text-muted-foreground mb-4 opacity-30" />
            <p className="font-semibold text-foreground text-lg">Пока нет откликов</p>
            <p className="text-sm text-muted-foreground mt-1">Как только появятся новые отклики, они отобразятся здесь</p>
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
                  </div>
                </div>
                
                <div className="flex gap-2 pt-1">
                  {(applicant.status === "new" || applicant.status === "viewed") && (
                    <>
                      <Button size="sm" className="rounded-xl flex-1 gap-2 bg-green-600 hover:bg-green-700 h-10" onClick={(e) => { e.stopPropagation(); handleInvite(applicant.candidateId, applicant.name); }}>
                        <Check size={16} /> Приглашить
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
