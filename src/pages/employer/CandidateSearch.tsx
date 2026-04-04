import { useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import CandidateCard from "@/components/CandidateCard";
import InviteModal from "@/components/InviteModal";
import { useEmployer } from "@/context/EmployerContext";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type SortOption = "date" | "salary_asc" | "salary_desc";

export default function CandidateSearch() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { candidates } = useEmployer();

  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [sortBy, setSortBy] = useState<SortOption>("date");

  // Invite modal
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [inviteCandidateId, setInviteCandidateId] = useState("");
  const [inviteCandidateName, setInviteCandidateName] = useState("");

  const handleInvite = (candidateId: string) => {
    const c = candidates.find(c => c.id === candidateId);
    if (c) {
      setInviteCandidateId(candidateId);
      setInviteCandidateName(`${c.firstName} ${c.lastName}`);
      setInviteModalOpen(true);
    }
  };

  // Extract filter counts for badge
  const filterCities = searchParams.getAll("city");
  const filterPosition = searchParams.get("position");
  const filterExperience = searchParams.get("experience");
  const filterSchedule = searchParams.getAll("schedule");
  const filterEducation = searchParams.get("education");
  const filterGender = searchParams.get("gender");
  const filterSalaryFrom = searchParams.get("salary_from");
  const filterSalaryTo = searchParams.get("salary_to");
  const filterAgeFrom = searchParams.get("age_from");
  const filterAgeTo = searchParams.get("age_to");

  // Active filter tags
  const activeFilters: { key: string; label: string; clear: () => void }[] = [];
  
  const removeParam = (key: string, value?: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      const values = newParams.getAll(key).filter(v => v !== value);
      newParams.delete(key);
      values.forEach(v => newParams.append(key, v));
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  filterCities.forEach(city => activeFilters.push({ 
    key: `city-${city}`, label: city, clear: () => removeParam("city", city) 
  }));
  if (filterPosition) activeFilters.push({ 
    key: "position", label: filterPosition, clear: () => removeParam("position") 
  });
  if (filterExperience) activeFilters.push({ 
    key: "experience", label: filterExperience, clear: () => removeParam("experience") 
  });
  filterSchedule.forEach(s => activeFilters.push({ 
    key: `schedule-${s}`, label: s, clear: () => removeParam("schedule", s) 
  }));
  if (filterEducation) activeFilters.push({ 
    key: "education", label: filterEducation, clear: () => removeParam("education") 
  });
  if (filterGender && filterGender !== "any") activeFilters.push({ 
    key: "gender", label: filterGender === "male" ? "Мужской" : "Женский", clear: () => removeParam("gender") 
  });
  if (filterSalaryFrom) activeFilters.push({ 
    key: "salary_from", label: `от ${filterSalaryFrom} сом`, clear: () => removeParam("salary_from") 
  });
  if (filterSalaryTo) activeFilters.push({ 
    key: "salary_to", label: `до ${filterSalaryTo} сом`, clear: () => removeParam("salary_to") 
  });
  if (filterAgeFrom) activeFilters.push({ 
    key: "age_from", label: `от ${filterAgeFrom} лет`, clear: () => removeParam("age_from") 
  });
  if (filterAgeTo) activeFilters.push({ 
    key: "age_to", label: `до ${filterAgeTo} лет`, clear: () => removeParam("age_to") 
  });

  const clearAllFilters = () => {
    setSearchParams(new URLSearchParams());
    setSearchQuery("");
  };

  // Parse salary number from string like "30 000 сом"
  const parseSalary = (s?: string): number => {
    if (!s) return 0;
    return parseInt(s.replace(/[^0-9]/g, ""), 10) || 0;
  };

  // Filtering logic
  const filtered = useMemo(() => {
    let result = [...candidates];

    // Build filters from URL
    const q = searchParams.get("q") || searchQuery;
    if (q.trim()) {
      const lowQ = q.toLowerCase();
      result = result.filter(c =>
        `${c.firstName} ${c.lastName}`.toLowerCase().includes(lowQ) ||
        c.position.toLowerCase().includes(lowQ) ||
        c.skills.some(s => s.toLowerCase().includes(lowQ))
      );
    }

    if (filterCities.length > 0) result = result.filter(c => filterCities.includes(c.city));
    if (filterPosition) result = result.filter(c => c.position.toLowerCase().includes(filterPosition.toLowerCase()));
    if (filterExperience) result = result.filter(c => c.experience === filterExperience || c.experience.includes(filterExperience));
    if (filterSchedule.length > 0) result = result.filter(c => filterSchedule.includes(c.schedule));
    if (filterEducation) result = result.filter(c => c.education === filterEducation);
    if (filterGender && filterGender !== "any") result = result.filter(c => c.gender === filterGender);
    
    if (filterSalaryFrom) {
      const from = parseInt(filterSalaryFrom, 10);
      result = result.filter(c => parseSalary(c.salary) >= from);
    }
    if (filterSalaryTo) {
      const to = parseInt(filterSalaryTo, 10);
      result = result.filter(c => parseSalary(c.salary) <= to || !c.salary);
    }

    if (filterAgeFrom) result = result.filter(c => c.age >= parseInt(filterAgeFrom, 10));
    if (filterAgeTo) result = result.filter(c => c.age <= parseInt(filterAgeTo, 10));

    // Sort
    if (sortBy === "salary_asc") {
      result.sort((a, b) => parseSalary(a.salary) - parseSalary(b.salary));
    } else if (sortBy === "salary_desc") {
      result.sort((a, b) => parseSalary(b.salary) - parseSalary(a.salary));
    }

    return result;
  }, [candidates, searchQuery, searchParams, sortBy]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams);
    if (searchQuery) newParams.set("q", searchQuery);
    else newParams.delete("q");
    setSearchParams(newParams);
  };

  return (
    <AppLayout>
      <div className="px-4 lg:px-6 py-4 lg:py-6 space-y-4 max-w-3xl">
        {/* Search header */}
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Поиск по должности, навыкам, ключевым словам"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-10 bg-muted border-0 rounded-xl h-11 focus-visible:ring-primary shadow-sm"
            />
          </div>
          <button
            type="button"
            onClick={() => navigate("/employer/filters")}
            className="p-2.5 px-4 rounded-xl bg-muted hover:bg-muted/80 transition-colors flex items-center gap-2 text-muted-foreground hover:text-foreground border border-transparent hover:border-border relative shadow-sm"
          >
            <SlidersHorizontal size={20} />
            <span className="text-sm font-medium hidden sm:inline">Фильтры</span>
            {activeFilters.length > 0 && (
              <Badge className="ml-1 bg-primary text-primary-foreground text-[10px] h-5 min-w-[20px] flex items-center justify-center rounded-full p-0 px-1.5">
                {activeFilters.length}
              </Badge>
            )}
          </button>
        </form>

        {/* Active filter tags */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 items-center animate-fade-in">
            {activeFilters.map(f => (
              <span key={f.key} className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-xs font-medium border border-primary/20">
                {f.label}
                <button onClick={f.clear} className="hover:text-primary transition-colors">
                  <X size={12} />
                </button>
              </span>
            ))}
            <button onClick={clearAllFilters} className="text-xs text-muted-foreground hover:text-primary transition-colors underline underline-offset-2">
              Сбросить всё
            </button>
          </div>
        )}

        {/* Results bar */}
        <div className="flex items-center justify-between pb-2 border-b border-border/50">
          <p className="text-sm text-muted-foreground">
            Найдено <span className="font-semibold text-foreground">{filtered.length}</span> резюме
          </p>
          <div className="flex items-center gap-2">
            <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
              <SelectTrigger className="w-[180px] rounded-xl text-sm h-9 bg-card">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">По дате обновления</SelectItem>
                <SelectItem value="salary_asc">По зарплате (возр.)</SelectItem>
                <SelectItem value="salary_desc">По зарплате (убыв.)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Candidate list */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-muted/30 rounded-3xl border border-dashed border-border/50">
            <Search size={48} className="mx-auto text-muted-foreground mb-4 opacity-30" />
            <p className="font-semibold text-foreground text-lg">Нет кандидатов по вашему запросу</p>
            <p className="text-sm text-muted-foreground mt-1">Попробуйте изменить поисковой запрос или фильтры</p>
            {activeFilters.length > 0 && (
              <Button onClick={clearAllFilters} variant="outline" className="mt-6 rounded-xl border-primary text-primary hover:bg-primary/5">
                Сбросить фильтры
              </Button>
            )}
          </div>
        ) : (
          <div className="grid gap-3">
            {filtered.map((candidate, index) => (
              <CandidateCard
                key={candidate.id}
                candidate={candidate}
                onInvite={handleInvite}
                listIndex={index}
                totalCount={filtered.length}
              />
            ))}
          </div>
        )}
      </div>

      {/* Invite Modal */}
      <InviteModal
        open={inviteModalOpen}
        onClose={() => setInviteModalOpen(false)}
        candidateId={inviteCandidateId}
        candidateName={inviteCandidateName}
      />
    </AppLayout>
  );
}
