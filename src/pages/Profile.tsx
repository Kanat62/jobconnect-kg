import AppLayout from "@/components/AppLayout";
import { Link } from "react-router-dom";
import { FileText, ClipboardList, Heart, Bell, Globe, Shield, FileQuestion, LogOut, Trash2, ChevronRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const menuItems = [
  { icon: FileText, label: "Моё резюме", path: "/resume", chevron: true },
  { icon: ClipboardList, label: "Мои отклики", path: "/applications", chevron: true },
  { icon: Heart, label: "Избранное", path: "/favorites", chevron: true },
];

export default function Profile() {
  return (
    <AppLayout>
      <div className="px-4 lg:px-6 py-4 lg:py-6 max-w-2xl">
        <h1 className="text-xl font-bold text-foreground mb-6">Кабинет</h1>

        {/* User info */}
        <div className="flex items-center gap-4 mb-6 p-4 bg-card border border-border rounded-2xl">
          <div className="w-14 h-14 rounded-full bg-primary-light flex items-center justify-center">
            <User size={24} className="text-primary" />
          </div>
          <div>
            <p className="font-semibold text-foreground">Иван Иванов</p>
            <p className="text-sm text-muted-foreground">+996 700 123 456</p>
          </div>
        </div>

        {/* Menu */}
        <div className="space-y-1 mb-6">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors"
            >
              <item.icon size={20} className="text-muted-foreground" />
              <span className="flex-1 text-sm font-medium text-foreground">{item.label}</span>
              {item.chevron && <ChevronRight size={16} className="text-muted-foreground" />}
            </Link>
          ))}
        </div>

        {/* Settings */}
        <div className="border-t border-border pt-4 space-y-1">
          <h3 className="text-sm font-semibold text-muted-foreground px-3 mb-2">Настройки</h3>

          <div className="flex items-center gap-3 p-3 rounded-xl">
            <Bell size={20} className="text-muted-foreground" />
            <span className="flex-1 text-sm font-medium">Уведомления</span>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl">
            <Globe size={20} className="text-muted-foreground" />
            <span className="flex-1 text-sm font-medium">Язык</span>
            <span className="text-sm text-muted-foreground">Русский</span>
          </div>

          <a href="#" className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors">
            <Shield size={20} className="text-muted-foreground" />
            <span className="flex-1 text-sm font-medium">Политика конфиденциальности</span>
            <ChevronRight size={16} className="text-muted-foreground" />
          </a>

          <a href="#" className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors">
            <FileQuestion size={20} className="text-muted-foreground" />
            <span className="flex-1 text-sm font-medium">Связаться с поддержкой</span>
            <ChevronRight size={16} className="text-muted-foreground" />
          </a>
        </div>

        {/* Danger zone */}
        <div className="border-t border-border pt-4 mt-4 space-y-2">
          <Button variant="outline" className="w-full justify-start rounded-xl text-destructive hover:text-destructive">
            <LogOut size={18} className="mr-2" /> Выйти из аккаунта
          </Button>
          <Button variant="ghost" className="w-full justify-start rounded-xl text-destructive/60 hover:text-destructive text-sm">
            <Trash2 size={16} className="mr-2" /> Удалить аккаунт
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
