import { Link, useLocation } from "react-router-dom";
import { LayoutGrid, Heart, MessageCircle, User, Bell, Search, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const navItems = [
  { path: "/", label: "Вакансии", icon: LayoutGrid },
  { path: "/favorites", label: "Избранное", icon: Heart },
  { path: "/chat", label: "Чат", icon: MessageCircle, badge: 2 },
  { path: "/profile", label: "Кабинет", icon: User },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar - desktop */}
      <aside className="hidden lg:flex flex-col w-[260px] border-r border-sidebar-border bg-sidebar fixed h-full z-30">
        <div className="p-6 pb-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">Ж</span>
            </div>
            <span className="text-xl font-bold text-foreground">Жомуш.kg</span>
          </Link>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-muted"
                }`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
                {item.badge && item.badge > 0 && (
                  <Badge className="ml-auto bg-primary text-primary-foreground text-xs h-5 min-w-[20px] flex items-center justify-center rounded-full">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-full px-4 py-2 rounded-xl hover:bg-muted">
            <span>Ищу работу</span>
            <ChevronDown size={16} />
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 lg:ml-[260px] flex flex-col min-h-screen">
        {/* Top header - desktop */}
        <header className="hidden lg:flex items-center gap-4 px-6 py-4 border-b border-border bg-background sticky top-0 z-20">
          <div className="flex-1 max-w-xl relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Поиск вакансий..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-muted border-0 rounded-xl h-11"
            />
          </div>
          <Link to="/notifications" className="relative p-2 rounded-xl hover:bg-muted transition-colors">
            <Bell size={22} className="text-muted-foreground" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-destructive rounded-full" />
          </Link>
          <div className="flex items-center gap-3 pl-2">
            <div className="w-9 h-9 rounded-full bg-primary-light flex items-center justify-center">
              <User size={18} className="text-primary" />
            </div>
          </div>
        </header>

        {/* Mobile header */}
        <header className="lg:hidden flex items-center gap-3 px-4 py-3 border-b border-border bg-background sticky top-0 z-20">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">Ж</span>
          </div>
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Поиск..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-muted border-0 rounded-xl h-9 text-sm"
            />
          </div>
          <Link to="/notifications" className="relative p-1.5">
            <Bell size={20} className="text-muted-foreground" />
            <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-destructive rounded-full" />
          </Link>
        </header>

        {/* Page content */}
        <main className="flex-1 pb-20 lg:pb-8">
          {children}
        </main>

        {/* Footer - desktop only, inside content area */}
        <footer className="hidden lg:block px-6 py-6 border-t border-border text-sm text-muted-foreground">
          <div className="flex items-center justify-between">
            <span>© 2026 Жомуш.kg — Поиск работы в Кыргызстане</span>
            <div className="flex gap-4">
              <a href="#" className="hover:text-foreground transition-colors">Политика конфиденциальности</a>
              <a href="#" className="hover:text-foreground transition-colors">Пользовательское соглашение</a>
            </div>
          </div>
        </footer>
      </div>

      {/* Bottom navigation - mobile */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border z-30 px-2 pb-[env(safe-area-inset-bottom)]">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors relative ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <item.icon size={22} />
                <span className="text-[10px] font-medium">{item.label}</span>
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-0.5 right-1 w-4 h-4 bg-primary text-primary-foreground text-[9px] font-bold rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
