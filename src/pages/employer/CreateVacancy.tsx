import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const steps = ["Основная информация", "Описание", "Условия оплаты"];

const scheduleOptions = ["Полный день", "Неполный день", "Сменный график"];
const experienceOptions = ["Нет опыта", "До 1 года", "1–3 года", "3–6 лет", "Более 6 лет"];
const paymentPeriods = ["За месяц", "За смену", "За день", "За час"];
const responseOptions = ["Через сайт", "По телефону", "В WhatsApp"];

export default function CreateVacancy() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

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

  const toggleSchedule = (s: string) => setSchedule(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  const toggleResponse = (s: string) => setResponseMethod(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

  const canProceed1 = title && category && city;
  const canProceed2 = duties && requirements && experience && schedule.length > 0;
  const canProceed3 = paymentPeriod && contactPhone && responseMethod.length > 0;

  const salaryError = salaryFrom && salaryTo && Number(salaryFrom) > Number(salaryTo);

  const handlePublish = () => {
    toast.success("Вакансия отправлена на модерацию. Обычно до 2 часов");
    navigate("/employer/vacancies");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center gap-3 px-4 lg:px-6 py-4 border-b border-border bg-background sticky top-0 z-20">
        <button onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)} className="p-1.5 rounded-lg hover:bg-muted">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-bold flex-1">Создание вакансии</h1>
        <span className="text-sm text-muted-foreground">Шаг {step} из 3</span>
      </header>

      {/* Progress bar */}
      <div className="flex gap-1 px-4 lg:px-6 pt-4">
        {[1, 2, 3].map(s => (
          <div key={s} className={`h-1.5 flex-1 rounded-full transition-colors ${s <= step ? "bg-primary" : "bg-muted"}`} />
        ))}
      </div>

      <div className="px-4 lg:px-6 py-4 max-w-xl mx-auto space-y-4">
        <h2 className="text-base font-semibold text-foreground">{steps[step - 1]}</h2>

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
              <Textarea value={conditions} onChange={e => setConditions(e.target.value)} placeholder="Дополнительные условия, льготы..." className="mt-1 rounded-xl min-h-[80px]" />
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

      {/* Bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 flex gap-3 z-30 lg:pl-[276px]">
        {step > 1 && (
          <Button variant="outline" onClick={() => setStep(step - 1)} className="rounded-xl flex-1">Назад</Button>
        )}
        {step < 3 ? (
          <Button onClick={() => setStep(step + 1)} disabled={step === 1 ? !canProceed1 : !canProceed2} className="rounded-xl flex-1">Продолжить</Button>
        ) : (
          <Button onClick={handlePublish} disabled={!canProceed3 || !!salaryError} className="rounded-xl flex-1 gap-2">
            <Check size={18} /> Опубликовать
          </Button>
        )}
      </div>
    </div>
  );
}
