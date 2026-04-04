import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import { ArrowLeft, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const experienceOptions = ["Нет опыта", "До 1 года", "1–3 года", "3–6 лет", "6+"];
const scheduleOptions = ["Полный день", "Неполный день", "Сменный график"];
const educationOptions = ["Среднее", "Среднее-специальное", "Высшее"];
const genderOptions = [
  { value: "any", label: "Любой" },
  { value: "male", label: "М" },
  { value: "female", label: "Ж" },
];
const cities = ["Бишкек", "Ош", "Каракол", "Джалал-Абад", "Токмок", "Нарын"];

export default function CandidateFilters() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [filterCities, setFilterCities] = useState<string[]>(searchParams.getAll("city"));
  const [filterPosition, setFilterPosition] = useState(searchParams.get("position") || "");
  const [filterExperience, setFilterExperience] = useState(searchParams.get("experience") || "");
  const [filterSchedule, setFilterSchedule] = useState<string[]>(searchParams.getAll("schedule"));
  const [filterEducation, setFilterEducation] = useState(searchParams.get("education") || "");
  const [filterGender, setFilterGender] = useState(searchParams.get("gender") || "any");
  const [filterSalaryFrom, setFilterSalaryFrom] = useState(searchParams.get("salary_from") || "");
  const [filterSalaryTo, setFilterSalaryTo] = useState(searchParams.get("salary_to") || "");
  const [filterAgeFrom, setFilterAgeFrom] = useState(searchParams.get("age_from") || "");
  const [filterAgeTo, setFilterAgeTo] = useState(searchParams.get("age_to") || "");

  const toggleCity = (city: string) => {
    setFilterCities(prev => prev.includes(city) ? prev.filter(c => c !== city) : [...prev, city]);
  };

  const toggleScheduleFilter = (s: string) => {
    setFilterSchedule(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  };

  const clearAllFilters = () => {
    setFilterCities([]);
    setFilterPosition("");
    setFilterExperience("");
    setFilterSchedule([]);
    setFilterEducation("");
    setFilterGender("any");
    setFilterSalaryFrom("");
    setFilterSalaryTo("");
    setFilterAgeFrom("");
    setFilterAgeTo("");
  };

  const applyFilters = () => {
    const params = new URLSearchParams();
    const q = searchParams.get("q");
    if (q) params.set("q", q);
    
    filterCities.forEach(c => params.append("city", c));
    if (filterPosition) params.set("position", filterPosition);
    if (filterExperience) params.set("experience", filterExperience);
    filterSchedule.forEach(s => params.append("schedule", s));
    if (filterEducation) params.set("education", filterEducation);
    if (filterGender !== "any") params.set("gender", filterGender);
    if (filterSalaryFrom) params.set("salary_from", filterSalaryFrom);
    if (filterSalaryTo) params.set("salary_to", filterSalaryTo);
    if (filterAgeFrom) params.set("age_from", filterAgeFrom);
    if (filterAgeTo) params.set("age_to", filterAgeTo);
    
    navigate(`/employer/candidates?${params.toString()}`);
  };

  return (
    <AppLayout>
      <div className="pb-24">
        {/* Sticky Header */}
        <div className="sticky top-0 z-20 bg-background border-b border-border flex items-center justify-between px-4 lg:px-6 py-4">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
              <ArrowLeft size={20} className="text-foreground" />
            </button>
            <h1 className="text-lg font-bold text-foreground">Фильтры</h1>
          </div>
          <button 
            onClick={clearAllFilters} 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Сбросить всё
          </button>
        </div>

        <div className="px-4 lg:px-6 py-6 max-w-xl mx-auto space-y-8">
          {/* City */}
          <section className="space-y-3">
            <Label className="text-[15px] font-semibold text-foreground">Город</Label>
            <div className="flex flex-wrap gap-2">
              {cities.map(city => (
                <button
                  key={city}
                  onClick={() => toggleCity(city)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                    filterCities.includes(city) 
                      ? "bg-primary text-white border-primary shadow-sm" 
                      : "bg-muted text-muted-foreground border-transparent hover:border-border"
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </section>

          {/* Position */}
          <section className="space-y-3">
            <Label className="text-[15px] font-semibold text-foreground">Желаемая должность</Label>
            <Input
              value={filterPosition}
              onChange={e => setFilterPosition(e.target.value)}
              placeholder="Введите должность (напр. Продавец-консультант)"
              className="mt-1 rounded-xl h-11"
            />
          </section>

          {/* Experience */}
          <section className="space-y-3">
            <Label className="text-[15px] font-semibold text-foreground">Опыт работы</Label>
            <div className="flex flex-wrap gap-2">
              {experienceOptions.map(exp => (
                <button
                  key={exp}
                  onClick={() => setFilterExperience(filterExperience === exp ? "" : exp)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                    filterExperience === exp 
                      ? "bg-primary text-white border-primary shadow-sm" 
                      : "bg-muted text-muted-foreground border-transparent hover:border-border"
                  }`}
                >
                  {exp}
                </button>
              ))}
            </div>
          </section>

          {/* Salary range */}
          <section className="space-y-3">
            <Label className="text-[15px] font-semibold text-foreground">Желаемая зарплата (сом)</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Input type="number" placeholder="От" value={filterSalaryFrom} onChange={e => setFilterSalaryFrom(e.target.value)} className="rounded-xl h-11" />
              </div>
              <div className="space-y-1.5">
                <Input type="number" placeholder="До" value={filterSalaryTo} onChange={e => setFilterSalaryTo(e.target.value)} className="rounded-xl h-11" />
              </div>
            </div>
          </section>

          {/* Schedule */}
          <section className="space-y-3">
            <Label className="text-[15px] font-semibold text-foreground">График работы</Label>
            <div className="flex flex-wrap gap-2">
              {scheduleOptions.map(s => (
                <button
                  key={s}
                  onClick={() => toggleScheduleFilter(s)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                    filterSchedule.includes(s) 
                      ? "bg-primary text-white border-primary shadow-sm" 
                      : "bg-muted text-muted-foreground border-transparent hover:border-border"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="space-y-3">
            <Label className="text-[15px] font-semibold text-foreground">Образование</Label>
            <div className="flex flex-wrap gap-2">
              {educationOptions.map(edu => (
                <button
                  key={edu}
                  onClick={() => setFilterEducation(filterEducation === edu ? "" : edu)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                    filterEducation === edu 
                      ? "bg-primary text-white border-primary shadow-sm" 
                      : "bg-muted text-muted-foreground border-transparent hover:border-border"
                  }`}
                >
                  {edu}
                </button>
              ))}
            </div>
          </section>

          {/* Gender */}
          <section className="space-y-3">
            <Label className="text-[15px] font-semibold text-foreground">Пол</Label>
            <div className="flex flex-wrap gap-2">
              {genderOptions.map(g => (
                <button
                  key={g.value}
                  onClick={() => setFilterGender(g.value)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                    filterGender === g.value 
                      ? "bg-primary text-white border-primary shadow-sm" 
                      : "bg-muted text-muted-foreground border-transparent hover:border-border"
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </section>

          {/* Age range */}
          <section className="space-y-3">
            <Label className="text-[15px] font-semibold text-foreground">Возраст (лет)</Label>
            <div className="grid grid-cols-2 gap-4">
              <Input type="number" placeholder="От" value={filterAgeFrom} onChange={e => setFilterAgeFrom(e.target.value)} className="rounded-xl h-11" />
              <Input type="number" placeholder="До" value={filterAgeTo} onChange={e => setFilterAgeTo(e.target.value)} className="rounded-xl h-11" />
            </div>
          </section>
        </div>
      </div>

      {/* Fixed bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 lg:left-[260px] bg-background border-t border-border p-4 z-30">
        <div className="max-w-xl mx-auto">
          <Button onClick={applyFilters} className="w-full h-12 rounded-xl text-base font-semibold shadow-md">
            Показать результаты
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
