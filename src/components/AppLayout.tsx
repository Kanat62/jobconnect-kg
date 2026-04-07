import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutGrid, Heart, MessageCircle, User, Search, ChevronDown, SlidersHorizontal, Briefcase, Inbox, Building2, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useFilters } from "@/context/FilterContext";
import { useRole } from "@/context/RoleContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import iconLogo from '@/assets/logo/Logo.svg'
const seekerNavItems = [
  { path: "/", label: "Вакансии", icon: LayoutGrid },
  { path: "/favorites", label: "Избранное", icon: Heart },
  { path: "/chat", label: "Чат", icon: MessageCircle, badge: 2 },
  { path: "/profile", label: "Кабинет", icon: User },
];

const employerNavItems = [
  { path: "/employer/candidates", label: "Кандидаты", icon: Users },
  { path: "/employer/vacancies", label: "Мои вакансии", icon: Briefcase },
  { path: "/employer/applicants", label: "Отклики", icon: Inbox },
  { path: "/chat", label: "Чат", icon: MessageCircle, badge: 2 },
  { path: "/employer/profile", label: "Кабинет", icon: Building2 },
];

export default function AppLayout({ children, hideMainPadding }: { children: React.ReactNode, hideMainPadding?: boolean }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { activeFilterGroupsCount } = useFilters();
  const { role, switchRole, hasCompanyProfile } = useRole();
  const [searchQuery, setSearchQuery] = useState("");

  const navItems = role === "employer" ? employerNavItems : seekerNavItems;
  const isMainPage = location.pathname === "/" || location.pathname === "/employer/candidates";

  const handleRoleSwitch = (newRole: "seeker" | "employer") => {
    if (newRole === "employer" && !hasCompanyProfile) {
      switchRole("employer");
      navigate("/employer/company-profile");
      return;
    }
    switchRole(newRole);
    navigate(newRole === "employer" ? "/employer/candidates" : "/");
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar - desktop */}
      <aside className="hidden lg:flex flex-col w-[260px] border-r border-sidebar-border bg-sidebar fixed h-full z-30">
        <div className="p-6 pb-4">
          <Link to={role === "employer" ? "/employer/candidates" : "/"} className="w-full flex justify-center items-center gap-2">
            <div className={'text-[30px] flex items-center font-bold'}>
              Ж
              <img
                src={iconLogo}
                alt="logo"
                className="w-[22px] mt-[1px]"
              />
              муш.kg
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-3 space-y-1 pt-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors ${isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-muted"
                  }`}
              >
                <item.icon size={22} />
                <span>{item.label}</span>
                {item.badge && item.badge > 0 && (
                  <Badge className="ml-auto bg-primary text-primary-foreground text-xs h-[21px] w-[21px] flex items-center justify-center rounded-full">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center justify-center outline-none border-[2px] gap-2 text-base font-medium text-muted-foreground hover:text-foreground transition-colors w-full px-4 py-[10px] rounded-2xl hover:bg-muted">
                <span>{role === "employer" ? "Ищу сотрудника" : "Ищу работу"}</span>
                <ChevronDown size={16} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[220px] rounded-2xl p-2 flex flex-col gap-1">
              <DropdownMenuItem
                onClick={() => handleRoleSwitch("seeker")}
                className={`rounded-2xl ${role === "seeker" ? "py-2 text-base bg-primary-light text-primary font-medium" : "py-2"}`}
              >
                Ищу работу
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleRoleSwitch("employer")}
                className={`rounded-2xl ${role === "employer" ? "py-2 text-base bg-primary-light text-primary font-medium" : "py-2"}`}
              >
                Ищу сотрудника
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

      </aside>

      {/* Main content */}
      <div className="flex-1 lg:ml-[260px] flex flex-col min-h-screen max-w-full overflow-x-hidden">
        {/* Top header - desktop (seeker main page) */}
        {isMainPage && role === "seeker" && (
          <header className="hidden lg:flex items-center gap-4 px-6 py-4 border-b border-border bg-background sticky top-0 z-20 h-[73px]">
            <div className="flex-1 max-w-xl flex items-center gap-2">
              <div className="relative flex-1">
                <Search size={21} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Поиск вакансий..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="text-sm font-medium focus:shadow pl-10 bg-muted border-0 rounded-xl h-11 outline-none "
                />
              </div>
              <button
                onClick={() => navigate("/filters")}
                className="p-2.5 px-4 rounded-2xl focus:shadow bg-muted hover:bg-muted/80 transition-colors flex items-center gap-2 text-muted-foreground hover:text-foreground border border-transparent hover:border-border"
              >
                <SlidersHorizontal size={20} />
                <span className="text-sm font-medium">
                  Фильтры {activeFilterGroupsCount > 0 && `· ${activeFilterGroupsCount}`}
                </span>
              </button>
            </div>
          </header>
        )}

        {/* Mobile header */}
        {isMainPage && role === "seeker" && (
          <header className="lg:hidden flex items-center gap-3 px-4 py-3 border-b border-border bg-background sticky top-0 z-20 h-[64px]">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
              <span className="text-primary-foreground font-bold text-base">Ж</span>
            </div>
            <div className="flex-1 flex items-center gap-2">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Поиск..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-muted border-0 rounded-xl h-9 text-base"
                />
              </div>
              <button
                onClick={() => navigate("/filters")}
                className="p-1.5 rounded-lg bg-muted flex items-center justify-center text-muted-foreground relative"
              >
                <SlidersHorizontal size={18} />
                {activeFilterGroupsCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center border border-background">
                    {activeFilterGroupsCount}
                  </span>
                )}
              </button>
            </div>
          </header>
        )}

        {/* Page content */}
        <main className={`flex-1 min-w-0 ${hideMainPadding ? "" : ""}`}>
          {children}
        </main>
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
                className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors relative ${isActive ? "text-primary" : "text-muted-foreground"
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
