import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useEmployer } from "@/context/EmployerContext";
import { useNavigate } from "react-router-dom";

interface InviteModalProps {
  open: boolean;
  onClose: () => void;
  candidateId: string;
  candidateName: string;
}

export default function InviteModal({ open, onClose, candidateId, candidateName }: InviteModalProps) {
  const { vacancies, inviteCandidate } = useEmployer();
  const navigate = useNavigate();
  const [selectedVacancy, setSelectedVacancy] = useState("");
  const [message, setMessage] = useState("");

  const activeVacancies = vacancies.filter(v => v.status === "active");

  const handleInvite = () => {
    if (!selectedVacancy) return;
    inviteCandidate(candidateId, selectedVacancy, message || undefined);
    setSelectedVacancy("");
    setMessage("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="rounded-2xl max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg">Пригласить на вакансию</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <p className="text-sm text-muted-foreground">
            Пригласить <span className="font-medium text-foreground">{candidateName}</span> на одну из ваших вакансий
          </p>

          {activeVacancies.length === 0 ? (
            <div className="bg-muted rounded-xl p-4 text-center space-y-2">
              <p className="text-sm text-muted-foreground">У вас нет активных вакансий</p>
              <Button
                variant="link"
                className="text-primary p-0 h-auto"
                onClick={() => { onClose(); navigate("/employer/create-vacancy"); }}
              >
                Создать вакансию?
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              {activeVacancies.map(v => (
                <label
                  key={v.id}
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                    selectedVacancy === v.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <input
                    type="radio"
                    name="vacancy"
                    value={v.id}
                    checked={selectedVacancy === v.id}
                    onChange={() => setSelectedVacancy(v.id)}
                    className="accent-primary"
                  />
                  <div>
                    <p className="text-sm font-medium text-foreground">{v.title}</p>
                    <p className="text-xs text-muted-foreground">{v.city} · {v.salary}</p>
                  </div>
                </label>
              ))}
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-foreground">Персональное сообщение</label>
            <Textarea
              value={message}
              onChange={e => setMessage(e.target.value.slice(0, 300))}
              placeholder="Добавьте персональное сообщение..."
              className="mt-1 rounded-xl min-h-[80px]"
            />
            <p className="text-xs text-muted-foreground mt-1 text-right">{message.length}/300</p>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-2">
          <Button variant="outline" onClick={onClose} className="rounded-xl">Отмена</Button>
          <Button onClick={handleInvite} disabled={!selectedVacancy || activeVacancies.length === 0} className="rounded-xl">
            Пригласить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
