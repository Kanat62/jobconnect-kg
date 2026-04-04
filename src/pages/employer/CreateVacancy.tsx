import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import { ArrowLeft, Check, Save, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useEmployer } from "@/context/EmployerContext";

const stepLabels = ["Основное", "Описание", "Условия"];

const scheduleOptions = ["Полный день", "Неполный день", "Сменный график"];
const experienceOptions = ["Нет опыта", "До 1 года", "1–3 года", "3–6 лет", "Более 6 лет"];
const paymentPeriods = ["За месяц", "За смену", "За день", "За час"];
const responseOptions = ["Через сайт", "По телефону", "В WhatsApp"];

export default function CreateVacancy() {
  const navigate = useNavigate();
  const { id: editId } = useParams<{ id: string }>();
  const { vacancies, addVacancy, updateVacancyStatus, draftVacancy, saveDraft, clearDraft } = useEmployer();

  const isEditing = !!editId;
  const editVacancy = isEditing ? vacancies.find(v => v.id === editId) : null;

  const [step, setStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDraftBanner, setShowDraftBanner] = useState(false);

  // Step 1
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

  // Step 2
  const [duties, setDuties] = useState("");
  const [requirements, setRequirements] = useState("");
  const [conditions, setConditions] = useState("");
  const [experience, setExperience] = useState("");
  const [schedule, setSchedule] = useState<string[]>([]);
  const [remote, setRemote] = useState(false);

  // Step 3
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [paymentPeriod, setPaymentPeriod] = useState("");
  const [contactPhone, setContactPhone] = useState("+996 700 123 456");
  const [whatsapp, setWhatsapp] = useState("");
  const [responseMethod, setResponseMethod] = useState<string[]>(["Через сайт"]);

  // Load edit data
  useEffect(() => {
    if (editVacancy) {
      setTitle(editVacancy.title || "");
      setCategory(editVacancy.category || "");
      setCity(editVacancy.city || "");
      setAddress(editVacancy.address || "");
      setDuties(editVacancy.duties || "");
      setRequirements(editVacancy.requirements || "");
      setConditions(editVacancy.conditions || "");
      setExperience(editVacancy.experience || "");
      setSchedule(editVacancy.schedule || []);
      setRemote(editVacancy.remote || false);
      setSalaryFrom(editVacancy.salaryFrom || "");
      setSalaryTo(editVacancy.salaryTo || "");
      setPaymentPeriod(editVacancy.paymentPeriod || "");
      setContactPhone(editVacancy.contactPhone || "+996 700 123 456");
      setWhatsapp(editVacancy.whatsapp || "");
      setResponseMethod(editVacancy.responseMethod || ["Через сайт"]);
    } else if (draftVacancy && !isEditing) {
      setShowDraftBanner(true);
    }
  }, [editVacancy]);

  const loadDraft = () => {
    if (draftVacancy) {
      setTitle((draftVacancy.title as string) || "");
      setCategory((draftVacancy.category as string) || "");
      setCity((draftVacancy.city as string) || "");
      setAddress((draftVacancy.address as string) || "");
      setDuties((draftVacancy.duties as string) || "");
      setRequirements((draftVacancy.requirements as string) || "");
      setConditions((draftVacancy.conditions as string) || "");
      setExperience((draftVacancy.experience as string) || "");
      setSchedule((draftVacancy.schedule as string[]) || []);
      setRemote((draftVacancy.remote as boolean) || false);
      setSalaryFrom((draftVacancy.salaryFrom as string) || "");
      setSalaryTo((draftVacancy.salaryTo as string) || "");
      setPaymentPeriod((draftVacancy.paymentPeriod as string) || "");
      setContactPhone((draftVacancy.contactPhone as string) || "+996 700 123 456");
      setWhatsapp((draftVacancy.whatsapp as string) || "");
      setResponseMethod((draftVacancy.responseMethod as string[]) || ["Через сайт"]);
      setStep((draftVacancy.step as number) || 1);
    }
    setShowDraftBanner(false);
  };

  const handleSaveDraft = useCallback(() => {
    saveDraft({ title, category, city, address, duties, requirements, conditions, experience, schedule, remote, salaryFrom, salaryTo, paymentPeriod, contactPhone, whatsapp, responseMethod, step });
    toast.success("Черновик сохранён");
  }, [title, category, city, address, duties, requirements, conditions, experience, schedule, remote, salaryFrom, salaryTo, paymentPeriod, contactPhone, whatsapp, responseMethod, step, saveDraft]);

  // Auto-save every 30s
  useEffect(() => {
    if (isEditing) return;
    const interval = setInterval(() => {
      if (title) {
        saveDraft({ title, category, city, address, duties, requirements, conditions, experience, schedule, remote, salaryFrom, salaryTo, paymentPeriod, contactPhone, whatsapp, responseMethod, step });
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [title, category, city, address, duties, requirements, conditions, experience, schedule, remote, salaryFrom, salaryTo, paymentPeriod, contactPhone, whatsapp, responseMethod, step, saveDraft, isEditing]);

  const toggleSchedule = (s: string) => setSchedule(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  const toggleResponse = (s: string) => setResponseMethod(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

  const canProceed1 = title && category && city;
  const canProceed2 = duties && requirements && experience && schedule.length > 0;
  const canProceed3 = paymentPeriod && contactPhone && responseMethod.length > 0;

  const salaryError = salaryFrom && salaryTo && Number(salaryFrom) > Number(salaryTo);

  const handlePublish = () => {
    if (isEditing && editVacancy) {
      updateVacancyStatus(editVacancy.id, "moderation");
      toast.success("Изменения сохранены. Вакансия отправлена на модерацию");
      navigate("/employer/vacancies");
    } else {
      const newVacancy = {
        id: `ev${Date.now()}`,
        title, salary: salaryFrom && salaryTo ? `${Number(salaryFrom).toLocaleString()} – ${Number(salaryTo).toLocaleString()} сом` : salaryFrom ? `от ${Number(salaryFrom).toLocaleString()} сом` : "По договорённости",
        city, date: "сегодня", status: "moderation" as const, views: 0, favorites: 0, applications: 0,
        category, experience, schedule, duties, requirements, conditions, address, remote,
        salaryFrom, salaryTo, paymentPeriod, contactPhone, whatsapp, responseMethod,
      };
      addVacancy(newVacancy);
      clearDraft();
      setShowSuccess(true);
    }
  };

  // Success screen
  if (showSuccess) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
            <Check size={40} className="text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Вакансия отправлена на модерацию</h1>
          <p className="text-muted-foreground mb-8 max-w-sm">
            Обычно до 2 часов. Мы уведомим вас когда она будет опубликована
          </p>
          <div className="flex gap-3">
            <Button variant="outline" className="rounded-xl" onClick={() => navigate("/employer/vacancies")}>
              Перейти к моим вакансиям
            </Button>
            <Button className="rounded-xl" onClick={() => { setShowSuccess(false); setStep(1); setTitle(""); setCategory(""); setCity(""); setAddress(""); setDuties(""); setRequirements(""); setConditions(""); setExperience(""); setSchedule([]); setRemote(false); setSalaryFrom(""); setSalaryTo(""); setPaymentPeriod(""); setContactPhone("+996 700 123 456"); setWhatsapp(""); setResponseMethod(["Через сайт"]); }}>
              Создать ещё одну
            </Button>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="pb-24">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background border-b border-border">
          <div className="flex items-center gap-3 px-4 lg:px-6 py-3">
            <button onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)} className="p-1.5 rounded-lg hover:bg-muted">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-lg font-bold flex-1">
              {isEditing ? "Редактирование вакансии" : "Создание вакансии"}
            </h1>
            {!isEditing && (
              <Button variant="ghost" size="sm" className="rounded-xl gap-1 text-muted-foreground" onClick={handleSaveDraft}>
                <Save size={16} /> Черновик
              </Button>
            )}
          </div>

          {/* Progress bar with clickable steps */}
          <div className="flex items-center gap-0 px-4 lg:px-6 pb-3">
            {stepLabels.map((label, i) => {
              const sIdx = i + 1;
              const isCompleted = sIdx < step;
              const isActive = sIdx === step;
              const isFuture = sIdx > step;
              const canClick = isCompleted;

              return (
                <div key={label} className="flex-1 flex items-center">
                  <button
                    disabled={!canClick}
                    onClick={() => canClick && setStep(sIdx)}
                    className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                      isActive ? "text-primary" : isCompleted ? "text-green-600 cursor-pointer hover:text-green-700" : "text-muted-foreground"
                    } disabled:cursor-default`}
                  >
                    {isCompleted ? (
                      <span className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                        <Check size={14} className="text-green-600" />
                      </span>
                    ) : (
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      }`}>{sIdx}</span>
                    )}
                    <span className="hidden sm:inline">{label}</span>
                  </button>
                  {i < stepLabels.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-2 rounded-full ${isCompleted ? "bg-green-400" : isActive ? "bg-primary" : "bg-muted"}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Draft recovery banner */}
        {showDraftBanner && (
          <div className="mx-4 lg:mx-6 mt-4 bg-yellow-50 border border-yellow-200 rounded-xl p-3 flex items-center gap-3">
            <AlertCircle size={18} className="text-yellow-600 flex-shrink-0" />
            <p className="text-sm text-yellow-800 flex-1">У вас есть несохранённый черновик</p>
            <Button size="sm" variant="outline" className="rounded-xl text-xs" onClick={loadDraft}>Продолжить</Button>
            <Button size="sm" variant="ghost" className="rounded-xl text-xs" onClick={() => { setShowDraftBanner(false); clearDraft(); }}>Начать заново</Button>
          </div>
        )}

        <div className="px-4 lg:px-6 py-4 max-w-xl space-y-4">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <Label>Название вакансии *</Label>
                <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Продавец-консультант" maxLength={100} className="mt-1 rounded-xl" />
                <p className="text-xs text-muted-foreground mt-1 text-right">{title.length}/100</p>
              </div>
              <div>
                <Label>Категория / Профессия *</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="mt-1 rounded-xl"><SelectValue placeholder="Выберите категорию" /></SelectTrigger>
                  <SelectContent>
                    {["Строительство", "Транспорт", "IT", "Еда и напитки", "Образование", "Красота и здоровье", "Услуги", "Торговля", "Производство", "Охрана"].map(c => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Город работы *</Label>
                <Select value={city} onValueChange={setCity}>
                  <SelectTrigger className="mt-1 rounded-xl"><SelectValue placeholder="Выберите город" /></SelectTrigger>
                  <SelectContent>
                    {["Бишкек", "Ош", "Джалал-Абад", "Каракол", "Токмок", "Нарын"].map(c => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Рабочий адрес</Label>
                <Input value={address} onChange={e => setAddress(e.target.value)} placeholder="Район или адрес" className="mt-1 rounded-xl" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <Label>Обязанности *</Label>
                <Textarea value={duties} onChange={e => setDuties(e.target.value)} placeholder="Опишите обязанности..." className="mt-1 rounded-xl min-h-[100px]" />
              </div>
              <div>
                <Label>Требования *</Label>
                <Textarea value={requirements} onChange={e => setRequirements(e.target.value)} placeholder="Опишите требования..." className="mt-1 rounded-xl min-h-[100px]" />
              </div>
              <div>
                <Label>Условия работы</Label>
                <Textarea value={conditions} onChange={e => setConditions(e.target.value)} placeholder="Дополнительные условия..." className="mt-1 rounded-xl min-h-[80px]" />
              </div>
              <div>
                <Label>Требуемый опыт *</Label>
                <Select value={experience} onValueChange={setExperience}>
                  <SelectTrigger className="mt-1 rounded-xl"><SelectValue placeholder="Выберите" /></SelectTrigger>
                  <SelectContent>
                    {experienceOptions.map(e => <SelectItem key={e} value={e}>{e}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>График работы *</Label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {scheduleOptions.map(s => (
                    <button key={s} onClick={() => toggleSchedule(s)} className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${schedule.includes(s) ? "bg-primary text-primary-foreground border-primary" : "bg-muted text-muted-foreground border-transparent hover:border-border"}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-xl">
                <Label>Удалённая работа</Label>
                <Switch checked={remote} onCheckedChange={setRemote} />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Зарплата от</Label>
                  <Input type="number" value={salaryFrom} onChange={e => setSalaryFrom(e.target.value)} placeholder="15 000" className={`mt-1 rounded-xl ${salaryError ? "border-destructive" : ""}`} />
                </div>
                <div>
                  <Label>Зарплата до</Label>
                  <Input type="number" value={salaryTo} onChange={e => setSalaryTo(e.target.value)} placeholder="30 000" className={`mt-1 rounded-xl ${salaryError ? "border-destructive" : ""}`} />
                </div>
              </div>
              {salaryError && <p className="text-xs text-destructive">Укажите корректный диапазон</p>}

              <div>
                <Label>Период оплаты *</Label>
                <Select value={paymentPeriod} onValueChange={setPaymentPeriod}>
                  <SelectTrigger className="mt-1 rounded-xl"><SelectValue placeholder="Выберите" /></SelectTrigger>
                  <SelectContent>
                    {paymentPeriods.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Контактный телефон *</Label>
                <Input value={contactPhone} onChange={e => setContactPhone(e.target.value)} className="mt-1 rounded-xl" />
              </div>
              <div>
                <Label>WhatsApp</Label>
                <Input value={whatsapp} onChange={e => setWhatsapp(e.target.value)} placeholder="+996 700 000 000" className="mt-1 rounded-xl" />
              </div>

              <div>
                <Label>Способ отклика *</Label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {responseOptions.map(r => (
                    <button key={r} onClick={() => toggleResponse(r)} className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${responseMethod.includes(r) ? "bg-primary text-primary-foreground border-primary" : "bg-muted text-muted-foreground border-transparent hover:border-border"}`}>
                      {r}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 flex gap-3 z-30 lg:pl-[276px]">
        {step > 1 && (
          <Button variant="outline" onClick={() => setStep(step - 1)} className="rounded-xl flex-1">Назад</Button>
        )}
        {step < 3 ? (
          <Button onClick={() => setStep(step + 1)} disabled={step === 1 ? !canProceed1 : !canProceed2} className="rounded-xl flex-1">Продолжить</Button>
        ) : (
          <Button onClick={handlePublish} disabled={!canProceed3 || !!salaryError} className="rounded-xl flex-1 gap-2">
            <Check size={18} /> {isEditing ? "Сохранить изменения" : "Опубликовать"}
          </Button>
        )}
      </div>
    </AppLayout>
  );
}
