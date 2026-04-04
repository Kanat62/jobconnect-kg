import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRole } from "@/context/RoleContext";
import { toast } from "sonner";

export default function CompanyProfile() {
  const navigate = useNavigate();
  const { setHasCompanyProfile } = useRole();

  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("+996 700 123 456");
  const [whatsapp, setWhatsapp] = useState("");
  const [website, setWebsite] = useState("");

  const canSubmit = name && industry && city && phone;

  const handleSubmit = () => {
    setHasCompanyProfile(true);
    toast.success("Профиль компании создан!");
    navigate("/employer/candidates");
  };

  return (
    <AppLayout>
      <div className="px-4 lg:px-6 py-6 max-w-xl space-y-4">
        <h1 className="text-xl font-bold text-foreground">Профиль компании</h1>
        <p className="text-sm text-muted-foreground">Заполните профиль компании, чтобы начать размещать вакансии</p>

        <div>
          <Label>Название компании *</Label>
          <Input value={name} onChange={e => setName(e.target.value)} placeholder="ООО «Название»" className="mt-1 rounded-xl" />
        </div>

        <div>
          <Label>Сфера деятельности *</Label>
          <Select value={industry} onValueChange={setIndustry}>
            <SelectTrigger className="mt-1 rounded-xl"><SelectValue placeholder="Выберите" /></SelectTrigger>
            <SelectContent>
              {["Строительство", "Транспорт", "IT", "Еда и напитки", "Образование", "Красота и здоровье", "Услуги", "Торговля", "Производство", "Охрана"].map(c => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Город *</Label>
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
          <Label>Описание компании</Label>
          <Textarea value={description} onChange={e => setDescription(e.target.value.slice(0, 500))} placeholder="Коротко о компании..." className="mt-1 rounded-xl min-h-[80px]" />
          <p className="text-xs text-muted-foreground mt-1 text-right">{description.length}/500</p>
        </div>

        <div>
          <Label>Логотип компании</Label>
          <div className="mt-1 border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
            <Upload size={24} className="mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">JPG или PNG, макс 5MB</p>
          </div>
        </div>

        <div>
          <Label>Контактный телефон *</Label>
          <Input value={phone} onChange={e => setPhone(e.target.value)} className="mt-1 rounded-xl" />
        </div>

        <div>
          <Label>WhatsApp для связи</Label>
          <Input value={whatsapp} onChange={e => setWhatsapp(e.target.value)} placeholder="+996 700 000 000" className="mt-1 rounded-xl" />
        </div>

        <div>
          <Label>Сайт компании</Label>
          <Input value={website} onChange={e => setWebsite(e.target.value)} placeholder="https://example.com" className="mt-1 rounded-xl" />
        </div>

        <Button onClick={handleSubmit} disabled={!canSubmit} className="w-full rounded-xl mt-4">Продолжить</Button>
      </div>
    </AppLayout>
  );
}
