import { Heart, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEmployer } from "@/context/EmployerContext";
import type { Candidate } from "@/lib/mock-employer-data";

interface CandidateCardProps {
  candidate: Candidate;
  onInvite: (candidateId: string) => void;
  listIndex?: number;
  totalCount?: number;
}

export default function CandidateCard({ candidate, onInvite }: CandidateCardProps) {
  const navigate = useNavigate();
  const { savedCandidateIds, toggleSaved } = useEmployer();
  const isSaved = savedCandidateIds.includes(candidate.id);

  const initials = `${candidate.firstName[0]}${candidate.lastName[0]}`;
  const fullName = `${candidate.firstName} ${candidate.lastName}`;
  const visibleSkills = candidate.skills.slice(0, 4);
  const hiddenCount = candidate.skills.length - 4;

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking on buttons or favorite
    if ((e.target as HTMLElement).closest('button')) return;
    navigate(`/employer/candidate/${candidate.id}`);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="bg-card border border-border rounded-2xl p-4 space-y-3 animate-fade-in cursor-pointer hover:border-primary/30 transition-colors shadow-sm"
    >
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
             style={{ backgroundColor: "#F0F0FD" }}>
          {candidate.avatar ? (
            <img src={candidate.avatar} alt={fullName} className="w-12 h-12 rounded-full object-cover" />
          ) : (
            <span className="text-sm font-semibold" style={{ color: "#4848C0" }}>{initials}</span>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-[15px] text-foreground truncate">{fullName}</h3>
            {candidate.invited && (
              <Badge className="bg-green-100 text-green-700 border-green-200 text-xs rounded-lg">Приглашён ✓</Badge>
            )}
            {candidate.rejected && (
              <Badge className="bg-muted text-muted-foreground border-border text-xs rounded-lg">Отказ</Badge>
            )}
          </div>
          <p className="text-sm text-gray-600 truncate">{candidate.position}</p>
          <div className="flex items-center gap-1 text-[13px] text-gray-500 mt-0.5 flex-wrap">
            <span className="flex items-center gap-0.5">
              <MapPin size={10} style={{ color: "#4848C0" }} />
              <span className="px-1.5 py-0.5 rounded-md text-xs" style={{ backgroundColor: "#F0F0FD", color: "#4848C0" }}>{candidate.city}</span>
            </span>
            <span>·</span>
            <span>{candidate.age} лет</span>
            <span>·</span>
            <span>{candidate.experience}</span>
          </div>
        </div>

        {/* Favorite */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            toggleSaved(candidate.id);
          }} 
          className="p-1.5 rounded-lg hover:bg-muted transition-colors flex-shrink-0"
        >
          <Heart size={20} className={isSaved ? "fill-red-500 text-red-500" : "text-muted-foreground"} />
        </button>
      </div>

      {/* Salary */}
      <p className={`text-sm font-medium ${candidate.salary ? "text-green-700" : "text-gray-400"}`}>
        {candidate.salary || "По договорённости"}
      </p>

      {/* Skills */}
      {candidate.skills.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {visibleSkills.map(skill => (
            <span key={skill} className="px-2.5 py-1 bg-muted rounded-lg text-xs font-medium text-muted-foreground">{skill}</span>
          ))}
          {hiddenCount > 0 && (
            <span className="px-2.5 py-1 bg-muted rounded-lg text-xs font-medium text-muted-foreground">+{hiddenCount}</span>
          )}
        </div>
      )}

      {/* Updated at label on top-right of footer area or similar could be better but let's keep it clean */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">Обновлено {candidate.updatedAt}</span>
      </div>

      {/* Actions */}
      {!candidate.rejected && (
        <div className="flex gap-2">
          {!candidate.invited ? (
            <>
              <Button
                size="sm"
                className="rounded-xl flex-1"
                onClick={(e) => {
                  e.stopPropagation();
                  onInvite(candidate.id);
                }}
              >
                Пригласить
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl flex-1"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/chat`);
                }}
              >
                Связаться
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl w-full"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/chat`);
              }}
            >
              Написать (чат)
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
