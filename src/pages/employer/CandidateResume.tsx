import { useState, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import InviteModal from "@/components/InviteModal";
import ConfirmModal from "@/components/ConfirmModal";
import { useEmployer } from "@/context/EmployerContext";
import { ArrowLeft, ChevronLeft, ChevronRight, MapPin, Phone, Calendar, GraduationCap, Briefcase, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function CandidateResume() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { candidates, rejectCandidate } = useEmployer();

  const [inviteOpen, setInviteOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);

  const candidate = candidates.find(c => c.id === id);
  const currentIndex = candidates.findIndex(c => c.id === id);
  const prevId = currentIndex > 0 ? candidates[currentIndex - 1].id : null;
  const nextId = currentIndex < candidates.length - 1 ? candidates[currentIndex + 1].id : null;

  if (!candidate) {
    return (
      <AppLayout>
        <div className="text-center py-16">
          <p className="text-muted-foreground">Кандидат не найден</p>
          <Button variant="outline" className="mt-4 rounded-xl" onClick={() => navigate(-1)}>Назад</Button>
        </div>
      </AppLayout>
    );
  }

  const fullName = `${candidate.firstName} ${candidate.lastName}`;
  const initials = `${candidate.firstName[0]}${candidate.lastName[0]}`;

  const handleReject = () => {
    rejectCandidate(candidate.id);
    setRejectOpen(false);
  };

  return (
    <AppLayout>
      <div className="pb-24">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background border-b border-border px-4 lg:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-1.5 rounded-lg hover:bg-muted">
              <ArrowLeft size={20} />
            </button>
            <span className="text-sm text-muted-foreground">
              {currentIndex + 1} из {candidates.length}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => prevId && navigate(`/employer/candidate/${prevId}`, { replace: true })}
              disabled={!prevId}
              className="p-2 rounded-lg hover:bg-muted disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => nextId && navigate(`/employer/candidate/${nextId}`, { replace: true })}
              disabled={!nextId}
              className="p-2 rounded-lg hover:bg-muted disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Resume content */}
        <div className="px-4 lg:px-6 py-6 max-w-2xl space-y-6">
          {/* Profile header */}
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0"
                 style={{ backgroundColor: "#F0F0FD" }}>
              {candidate.avatar ? (
                <img src={candidate.avatar} alt={fullName} className="w-20 h-20 rounded-full object-cover" />
              ) : (
                <span className="text-xl font-semibold" style={{ color: "#4848C0" }}>{initials}</span>
              )}
            </div>
            <div>
              <h1 className="text-[22px] font-medium text-foreground">{fullName}</h1>
              <p className="text-base text-gray-600">{candidate.position}</p>
              {candidate.invited && (
                <Badge className="bg-green-100 text-green-700 border-green-200 text-xs rounded-lg mt-1">Приглашён ✓</Badge>
              )}
              {candidate.rejected && (
                <Badge className="bg-muted text-muted-foreground border-border text-xs rounded-lg mt-1">Отказ</Badge>
              )}
            </div>
          </div>

          {/* Salary */}
          <div className={`text-lg font-medium ${candidate.salary ? "text-green-700" : "text-muted-foreground"}`}>
            {candidate.salary || "По договорённости"}
          </div>

          {/* Info row */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <MapPin size={14} style={{ color: "#4848C0" }} />
              {candidate.city}
            </span>
            <span>·</span>
            <span>{candidate.age} лет</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <GraduationCap size={14} />
              {candidate.education}
            </span>
          </div>

          {/* Experience */}
          <div className="bg-card border border-border rounded-2xl p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-1">
              <Briefcase size={16} className="text-muted-foreground" />
              Опыт работы
            </div>
            <p className="text-sm text-muted-foreground">{candidate.experience === "Без опыта" ? "Нет опыта" : candidate.experience}</p>
          </div>

          {/* Skills */}
          {candidate.skills.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-foreground mb-2">Навыки и качества</h3>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map(skill => (
                  <span key={skill} className="px-3 py-1.5 bg-muted rounded-xl text-sm font-medium text-muted-foreground">{skill}</span>
                ))}
              </div>
            </div>
          )}

          {/* About */}
          {candidate.about && (
            <div>
              <h3 className="text-sm font-medium text-foreground mb-2">О себе</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{candidate.about}</p>
            </div>
          )}

          {/* Phone */}
          {candidate.phoneVisible && candidate.phone && (
            <div className="bg-card border border-border rounded-2xl p-4">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Phone size={16} className="text-muted-foreground" />
                {candidate.phone}
              </div>
            </div>
          )}

          {/* Updated date */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar size={14} />
            Обновлено {candidate.updatedAt}
          </div>
        </div>
      </div>

      {/* Fixed bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 lg:left-[260px] bg-background border-t border-border p-4 flex gap-3 z-30">
        {!candidate.invited && !candidate.rejected ? (
          <>
            <Button className="rounded-xl flex-1" onClick={() => setInviteOpen(true)}>
              Пригласить
            </Button>
            <Button variant="outline" className="rounded-xl flex-1" onClick={() => navigate("/chat")}>
              Написать
            </Button>
            <Button variant="ghost" className="rounded-xl text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => setRejectOpen(true)}>
              Отказать
            </Button>
          </>
        ) : candidate.invited ? (
          <>
            <Badge className="bg-green-100 text-green-700 border-green-200 rounded-lg px-4 py-2 text-sm">Приглашён ✓</Badge>
            <Button variant="outline" className="rounded-xl flex-1" onClick={() => navigate("/chat")}>
              Написать
            </Button>
          </>
        ) : null}
      </div>

      {/* Invite Modal */}
      <InviteModal
        open={inviteOpen}
        onClose={() => setInviteOpen(false)}
        candidateId={candidate.id}
        candidateName={fullName}
      />

      {/* Reject Confirmation */}
      <ConfirmModal
        open={rejectOpen}
        onClose={() => setRejectOpen(false)}
        onConfirm={handleReject}
        title="Отказать кандидату?"
        description="Кандидат получит уведомление об отказе. Это действие необратимо в текущей версии."
        confirmText="Отказать"
        destructive
      />
    </AppLayout>
  );
}
