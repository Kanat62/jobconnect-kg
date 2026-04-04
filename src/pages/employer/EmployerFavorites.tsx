import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import CandidateCard from "@/components/CandidateCard";
import InviteModal from "@/components/InviteModal";
import { useEmployer } from "@/context/EmployerContext";
import { Heart } from "lucide-react";

export default function EmployerFavorites() {
  const { candidates, savedCandidateIds } = useEmployer();
  const savedCandidates = candidates.filter(c => savedCandidateIds.includes(c.id));

  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteCandidateId, setInviteCandidateId] = useState("");
  const [inviteCandidateName, setInviteCandidateName] = useState("");

  const handleInvite = (candidateId: string) => {
    const c = candidates.find(c => c.id === candidateId);
    if (c) {
      setInviteCandidateId(candidateId);
      setInviteCandidateName(`${c.firstName} ${c.lastName}`);
      setInviteOpen(true);
    }
  };

  return (
    <AppLayout>
      <div className="px-4 lg:px-6 py-4 lg:py-6 space-y-4 max-w-3xl">
        <h1 className="text-xl font-bold text-foreground">Избранные кандидаты</h1>

        {savedCandidates.length === 0 ? (
          <div className="text-center py-16">
            <Heart size={48} className="mx-auto text-muted-foreground mb-4 opacity-40" />
            <p className="font-semibold text-foreground">Пока пусто</p>
            <p className="text-sm text-muted-foreground mt-1">Сохраняйте кандидатов чтобы вернуться к ним позже</p>
          </div>
        ) : (
          <div className="space-y-3">
            {savedCandidates.map(candidate => (
              <CandidateCard key={candidate.id} candidate={candidate} onInvite={handleInvite} />
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
