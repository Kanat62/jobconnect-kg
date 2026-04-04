import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import {
  mockCandidates,
  mockEmployerVacancies,
  mockApplicants,
  mockEmployerNotifications,
  mockEmployerChats,
  type Candidate,
  type EmployerVacancy,
  type Applicant,
  type EmployerNotification,
} from "@/lib/mock-employer-data";
import { toast } from "sonner";

interface EmployerContextType {
  candidates: Candidate[];
  vacancies: EmployerVacancy[];
  applications: Applicant[];
  savedCandidateIds: string[];
  notifications: EmployerNotification[];
  chats: typeof mockEmployerChats;

  inviteCandidate: (candidateId: string, vacancyId: string, message?: string) => void;
  rejectCandidate: (candidateId: string) => void;
  toggleSaved: (candidateId: string) => void;
  addVacancy: (vacancy: EmployerVacancy) => void;
  updateVacancyStatus: (vacancyId: string, status: EmployerVacancy["status"]) => void;
  removeVacancy: (vacancyId: string) => void;
  updateApplicationStatus: (applicationId: string, status: Applicant["status"]) => void;

  draftVacancy: Record<string, unknown> | null;
  saveDraft: (data: Record<string, unknown>) => void;
  clearDraft: () => void;
}

const EmployerContext = createContext<EmployerContextType | undefined>(undefined);

export const EmployerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates);
  const [vacancies, setVacancies] = useState<EmployerVacancy[]>(mockEmployerVacancies);
  const [applications, setApplications] = useState<Applicant[]>(mockApplicants);
  const [savedCandidateIds, setSavedCandidateIds] = useState<string[]>([]);
  const [notifications] = useState<EmployerNotification[]>(mockEmployerNotifications);
  const [chats, setChats] = useState(mockEmployerChats);
  const [draftVacancy, setDraftVacancy] = useState<Record<string, unknown> | null>(() => {
    try {
      const stored = localStorage.getItem("draft_vacancy");
      return stored ? JSON.parse(stored) : null;
    } catch { return null; }
  });

  const inviteCandidate = useCallback((candidateId: string, vacancyId: string, message?: string) => {
    setCandidates(prev => prev.map(c => c.id === candidateId ? { ...c, invited: true } : c));
    setApplications(prev => prev.map(a => a.candidateId === candidateId ? { ...a, status: "invited" as const } : a));

    const candidate = candidates.find(c => c.id === candidateId);
    if (candidate) {
      const exists = chats.find(ch => ch.candidateId === candidateId);
      if (!exists) {
        setChats(prev => [{
          id: `ec${Date.now()}`,
          candidateId,
          candidateName: `${candidate.firstName} ${candidate.lastName}`,
          candidatePosition: candidate.position,
          lastMessage: message || "Приглашение на вакансию",
          time: "сейчас",
          unread: 0,
          online: false,
        }, ...prev]);
      }
    }
    toast.success("Приглашение отправлено");
  }, [candidates, chats]);

  const rejectCandidate = useCallback((candidateId: string) => {
    setCandidates(prev => prev.map(c => c.id === candidateId ? { ...c, rejected: true } : c));
    setApplications(prev => prev.map(a => a.candidateId === candidateId ? { ...a, status: "rejected" as const } : a));
  }, []);

  const toggleSaved = useCallback((candidateId: string) => {
    setSavedCandidateIds(prev => {
      const isSaved = prev.includes(candidateId);
      if (isSaved) {
        toast("Убран из избранного");
        return prev.filter(id => id !== candidateId);
      } else {
        toast.success("Кандидат сохранён в избранное");
        return [...prev, candidateId];
      }
    });
  }, []);

  const addVacancy = useCallback((vacancy: EmployerVacancy) => {
    setVacancies(prev => [vacancy, ...prev]);
  }, []);

  const updateVacancyStatus = useCallback((vacancyId: string, status: EmployerVacancy["status"]) => {
    setVacancies(prev => prev.map(v => v.id === vacancyId ? { ...v, status } : v));
  }, []);

  const removeVacancy = useCallback((vacancyId: string) => {
    setVacancies(prev => prev.filter(v => v.id !== vacancyId));
  }, []);

  const updateApplicationStatus = useCallback((applicationId: string, status: Applicant["status"]) => {
    setApplications(prev => prev.map(a => a.id === applicationId ? { ...a, status } : a));
  }, []);

  const saveDraft = useCallback((data: Record<string, unknown>) => {
    setDraftVacancy(data);
    localStorage.setItem("draft_vacancy", JSON.stringify(data));
  }, []);

  const clearDraft = useCallback(() => {
    setDraftVacancy(null);
    localStorage.removeItem("draft_vacancy");
  }, []);

  return (
    <EmployerContext.Provider value={{
      candidates, vacancies, applications, savedCandidateIds, notifications, chats,
      inviteCandidate, rejectCandidate, toggleSaved, addVacancy, updateVacancyStatus, removeVacancy, updateApplicationStatus,
      draftVacancy, saveDraft, clearDraft,
    }}>
      {children}
    </EmployerContext.Provider>
  );
};

export const useEmployer = () => {
  const context = useContext(EmployerContext);
  if (!context) throw new Error("useEmployer must be used within EmployerProvider");
  return context;
};
