import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Search, Briefcase, X, Check, Wifi } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useFilters } from "@/context/FilterContext";

const popularCities = ["Бишкек", "Чуй", "Ош", "Джалал-Абад", "Кант", "Токмок", "Кемин", "Нарын"];
const popularProfessions = [
  { name: "Водитель", count: "1 204" },
  { name: "Кассир", count: "856" },
  { name: "Повар", count: "642" },
  { name: "Официант", count: "531" },
  { name: "Администратор", count: "420" },
  { name: "Охранник", count: "315" },
  { name: "Продавец", count: "982" },
  { name: "Программист", count: "245" },
];

const schedules = ["Полный день", "Неполный день", "Сменный график"];
const experiences = ["Нет опыта", "Менее 1 года", "От 1 до 3 лет", "От 3 до 6 лет", "Более 6 лет"];
const periods = ["За месяц", "За смену", "За день", "За час"];

export default function Filters() {
  const navigate = useNavigate();
  const { 
    draftFilters, 
    setDraftCities, 
    setDraftProfession, 
    setDraftSalaryFrom, 
    setDraftSalaryTo, 
    setDraftSchedule, 
    setDraftRemote, 
    setDraftExperience, 
    setDraftPaymentPeriod, 
    applyFilters,
    resetAll,
    cancelDraft
  } = useFilters();
  
  const [cityInput, setCityInput] = useState("");
  const [cityFocus, setCityFocus] = useState(false);
  const [profInput, setProfInput] = useState(draftFilters.profession);
  const [profFocus, setProfFocus] = useState(false);
  const [resultCount, setResultCount] = useState(8032);
  const [isCounting, setIsCounting] = useState(false);

  const cityRef = useRef<HTMLDivElement>(null);
  const profRef = useRef<HTMLDivElement>(null);

  // Salary validation
  const salaryError = draftFilters.salaryFrom && draftFilters.salaryTo && parseInt(draftFilters.salaryFrom) > parseInt(draftFilters.salaryTo);

  // Initialize profInput if profession exists in draft
  useEffect(() => {
    setProfInput(draftFilters.profession);
  }, [draftFilters.profession]);

  // Mock result count update
  useEffect(() => {
    setIsCounting(true);
    const timer = setTimeout(() => {
      setResultCount(Math.floor(Math.random() * 10000));
      setIsCounting(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [draftFilters]);

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (cityRef.current && !cityRef.current.contains(e.target as Node)) setCityFocus(false);
      if (profRef.current && !profRef.current.contains(e.target as Node)) setProfFocus(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleCitySelect = (city: string) => {
    if (draftFilters.cities.includes(city)) {
      setDraftCities(draftFilters.cities.filter(c => c !== city));
    } else {
      setDraftCities([...draftFilters.cities, city]);
      setCityInput("");
    }
  };

  const handleProfSelect = (name: string) => {
    setDraftProfession(name);
    setProfInput(name);
    setProfFocus(false);
  };

  const handleApply = () => {
    applyFilters();
    navigate("/");
  };

  const handleBack = () => {
    cancelDraft();
    navigate(-1);
  };

  const FilterSection = ({ title, children, className = "" }: { title: string, children: React.ReactNode, className?: string }) => (
    <div className={`mb-6 pb-6 border-b border-[#EBEBEB] ${className}`}>
      <h3 className="text-[13px] font-medium text-[#111] mb-3">{title}</h3>
      {children}
    </div>
  );

  const Chip = ({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full border text-base transition-all ${
        active
          ? "border-primary bg-primary/5 text-primary font-medium"
          : "border-[#EBEBEB] bg-background text-foreground hover:border-muted-foreground/30"
      }`}
    >
      {label}
    </button>
  );

  return (
    <AppLayout hideMainPadding>
      <div className="min-h-screen bg-background flex flex-col pt-safe">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-background border-b border-border flex items-center px-4 py-4">
          <button onClick={handleBack} className="p-1 rounded-full hover:bg-muted">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold flex-1 text-center mr-8">Фильтры</h1>
        </header>

        <div className="flex-1 overflow-y-auto px-4 lg:px-6 py-6 max-w-2xl mx-auto w-full pb-32">
          {/* City */}
          <FilterSection title="Город">
            <div className="relative" ref={cityRef}>
              <div className="relative mb-2">
                <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Например, Бишкек"
                  value={cityInput}
                  onChange={(e) => setCityInput(e.target.value)}
                  onFocus={() => setCityFocus(true)}
                  className="pl-9 pr-9 bg-muted border-0 rounded-xl h-12 text-base focus-visible:ring-1 focus-visible:ring-primary"
                />
                <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              </div>

              {cityFocus && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto overflow-x-hidden">
                  {popularCities.filter(c => c.toLowerCase().includes(cityInput.toLowerCase())).length > 0 ? (
                    popularCities
                    .filter(c => c.toLowerCase().includes(cityInput.toLowerCase()))
                    .map(city => (
                      <button
                        key={city}
                        onClick={() => handleCitySelect(city)}
                        className="w-full px-4 py-3 text-left hover:bg-muted flex items-center justify-between transition-colors border-b border-border last:border-0"
                      >
                        <span className="text-base">{city}</span>
                        {draftFilters.cities.includes(city) && <Check size={16} className="text-primary" />}
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-4 text-center text-muted-foreground text-sm">Город не найден</div>
                  )}
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {draftFilters.cities.map(city => (
                  <div key={city} className="flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    {city}
                    <button onClick={() => setDraftCities(draftFilters.cities.filter(c => c !== city))}>
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </FilterSection>

          {/* Profession */}
          <FilterSection title="Должность / Профессия">
            <div className="relative" ref={profRef}>
              <div className="relative">
                <Briefcase size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Например, водитель, повар"
                  value={profInput}
                  onChange={(e) => {
                    setProfInput(e.target.value);
                    if (!e.target.value) setDraftProfession("");
                  }}
                  onFocus={() => setProfFocus(true)}
                  className="pl-9 pr-9 bg-muted border-0 rounded-xl h-12 text-base focus-visible:ring-1 focus-visible:ring-primary"
                />
                {profInput && (
                  <button 
                    onClick={() => { setProfInput(""); setDraftProfession(""); }} 
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {profFocus && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
                  {popularProfessions.filter(p => p.name.toLowerCase().includes(profInput.toLowerCase())).length > 0 ? (
                    popularProfessions
                    .filter(p => p.name.toLowerCase().includes(profInput.toLowerCase()))
                    .map(p => (
                      <button
                        key={p.name}
                        onClick={() => handleProfSelect(p.name)}
                        className="w-full px-4 py-3 text-left hover:bg-muted flex items-center justify-between transition-colors border-b border-border last:border-0"
                      >
                        <span className="text-base">{p.name}</span>
                        <span className="text-sm text-muted-foreground">{p.count}</span>
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-4 text-center text-muted-foreground text-sm">Профессия не найдена</div>
                  )}
                </div>
              )}
            </div>
          </FilterSection>

          {/* Salary */}
          <FilterSection title="Зарплата">
            <div className="grid grid-cols-2 gap-3 mb-1">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">|</span>
                <Input 
                  placeholder="От" 
                  type="number"
                  value={draftFilters.salaryFrom}
                  onChange={(e) => setDraftSalaryFrom(e.target.value)}
                  className={`pl-6 bg-muted border-0 rounded-xl h-12 text-base focus-visible:ring-1 focus-visible:ring-primary ${salaryError ? "border-2 border-[#E24B4A] bg-red-50" : ""}`} 
                />
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">|</span>
                <Input 
                  placeholder="До" 
                  type="number"
                  value={draftFilters.salaryTo}
                  onChange={(e) => setDraftSalaryTo(e.target.value)}
                  className={`pl-6 bg-muted border-0 rounded-xl h-12 text-base focus-visible:ring-1 focus-visible:ring-primary ${salaryError ? "border-2 border-[#E24B4A] bg-red-50" : ""}`} 
                />
              </div>
            </div>
            <p className="text-[12px] text-[#999]">сом в месяц</p>
            {salaryError && <p className="text-[12px] text-[#E24B4A] mt-1">Укажите корректный диапазон</p>}
          </FilterSection>

          {/* Schedule */}
          <FilterSection title="График работы">
            <div className="flex flex-wrap gap-2">
              {schedules.map((s) => (
                <Chip
                  key={s}
                  label={s}
                  active={draftFilters.schedule.includes(s)}
                  onClick={() => {
                    if (draftFilters.schedule.includes(s)) {
                      setDraftSchedule(draftFilters.schedule.filter(i => i !== s));
                    } else {
                      setDraftSchedule([...draftFilters.schedule, s]);
                    }
                  }}
                />
              ))}
            </div>
          </FilterSection>

          {/* Remote */}
          <div className="mb-6 pb-6 border-b border-[#EBEBEB] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wifi size={16} className="text-muted-foreground" />
              <h3 className="text-[13px] font-medium text-[#111]">Удалённая работа</h3>
            </div>
            <Switch 
              checked={draftFilters.remote} 
              onCheckedChange={setDraftRemote}
              className="data-[state=checked]:bg-primary"
            />
          </div>

          {/* Experience */}
          <FilterSection title="Опыт работы">
            <div className="flex flex-wrap gap-2">
              {experiences.map((e) => (
                <Chip
                  key={e}
                  label={e}
                  active={draftFilters.experience === e}
                  onClick={() => setDraftExperience(draftFilters.experience === e ? "" : e)}
                />
              ))}
            </div>
          </FilterSection>

          {/* Payment Period */}
          <FilterSection title="Период оплаты">
            <div className="flex flex-wrap gap-2">
              {periods.map((p) => (
                <Chip
                  key={p}
                  label={p}
                  active={draftFilters.paymentPeriod.includes(p)}
                  onClick={() => {
                    if (draftFilters.paymentPeriod.includes(p)) {
                      setDraftPaymentPeriod(draftFilters.paymentPeriod.filter(i => i !== p));
                    } else {
                      setDraftPaymentPeriod([...draftFilters.paymentPeriod, p]);
                    }
                  }}
                />
              ))}
            </div>
          </FilterSection>
        </div>

        {/* Action Buttons */}
        <div className="fixed bottom-0 left-0 right-0 lg:left-[260px] p-4 bg-background border-t border-[#EBEBEB] z-40">
          <div className="flex items-center justify-center gap-3">
            <button 
              disabled={salaryError || (resultCount === 0 && !isCounting)}
              className={`w-full max-w-[220px] h-14 rounded-2xl text-lg font-bold transition-all flex items-center justify-center ${
                salaryError || (resultCount === 0 && !isCounting)
                  ? "bg-muted text-muted-foreground cursor-not-allowed"
                  : "bg-gradient-to-r from-[#B1B6F0] to-[#989EE7] text-white shadow-lg active:scale-[0.98]"
              }`}
              onClick={handleApply}
            >
              {isCounting ? (
                <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : resultCount === 0 ? (
                "Нет вакансий"
              ) : (
                `Показать ${resultCount.toLocaleString()}`
              )}
            </button>
            <button
              onClick={resetAll}
              className="px-6 h-14 rounded-2xl text-lg font-bold border-2 border-[#EBEBEB] hover:bg-muted transition-colors text-foreground active:scale-[0.98]"
            >
              Сбросить
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
