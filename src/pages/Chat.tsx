import AppLayout from "@/components/AppLayout";
import { mockChats as seekerChats } from "@/lib/mock-data";
import { Link } from "react-router-dom";
import { MessageCircle, Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRole } from "@/context/RoleContext";
import { useEmployer } from "@/context/EmployerContext";

export default function Chat() {
  const [search, setSearch] = useState("");
  const { role } = useRole();
  const { chats: employerChats } = useEmployer();

  const isEmployer = role === "employer";
  const chats = isEmployer ? employerChats : seekerChats;

  const filtered = chats.filter((c) => {
    if (isEmployer) {
      const ec = c as any;
      return (
        ec.candidateName.toLowerCase().includes(search.toLowerCase()) ||
        ec.candidatePosition.toLowerCase().includes(search.toLowerCase())
      );
    } else {
      const sc = c as any;
      return (
        sc.company.toLowerCase().includes(search.toLowerCase()) ||
        sc.jobTitle.toLowerCase().includes(search.toLowerCase())
      );
    }
  });

  return (
    <AppLayout>
      <div className="px-4 lg:px-6 py-4 lg:py-6">
        <h1 className="text-xl font-bold text-foreground mb-4">Чат</h1>

        <div className="relative mb-4">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Поиск по диалогам..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-muted border-0 rounded-xl"
          />
        </div>

        {filtered.length > 0 ? (
          <div className="space-y-1">
            {filtered.map((chat) => {
              const id = chat.id;
              const title = isEmployer ? (chat as any).candidateName : (chat as any).company;
              const subtitle = isEmployer ? (chat as any).candidatePosition : (chat as any).jobTitle;
              const initials = title[0];

              return (
                <Link
                  key={id}
                  to={`/chat/${id}`}
                  className="flex items-center gap-3 p-3 rounded-2xl hover:bg-muted transition-colors"
                >
                  <div className="relative flex-shrink-0">
                    <div className="w-11 h-11 rounded-full bg-primary-light flex items-center justify-center text-primary font-bold text-base">
                      {isEmployer ? <User size={20} /> : initials}
                    </div>
                    {chat.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-background" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-base text-foreground truncate">{title}</span>
                      <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">{chat.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">{subtitle}</p>
                    <p className="text-base text-muted-foreground truncate mt-0.5">{chat.lastMessage}</p>
                  </div>
                  {chat.unread > 0 && (
                    <span className="w-5 h-5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center flex-shrink-0">
                      {chat.unread}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <MessageCircle size={48} className="mx-auto text-muted-foreground mb-4 opacity-20" />
            <p className="font-semibold text-foreground">Пока нет сообщений</p>
            {isEmployer ? (
              <p className="text-base text-muted-foreground mt-1">Приглашайте кандидатов и обсуждайте вакансии</p>
            ) : (
              <p className="text-base text-muted-foreground mt-1">Откликайтесь на вакансии и общайтесь с работодателями</p>
            )}
            {!isEmployer && (
              <Button asChild className="mt-6 rounded-xl">
                <Link to="/">Найти вакансии</Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
