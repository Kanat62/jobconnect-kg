import AppLayout from "@/components/AppLayout";
import { mockChats as seekerChats } from "@/lib/mock-data";
import { Link, useParams, useNavigate } from "react-router-dom";
import { MessageCircle, Search, User, ChevronLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useRole } from "@/context/RoleContext";
import { useEmployer } from "@/context/EmployerContext";
import ChatDetailView from "@/components/ChatDetailView";
import CompanyIcon from "@/components/CompanyIcon";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Chat() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const { role } = useRole();
  const { chats: employerChats } = useEmployer();

  const isEmployer = role === "employer";
  const chats = isEmployer ? employerChats : seekerChats;

  const filtered = chats.filter((c) => {
    const matchesSearch = isEmployer
      ? (c as any).candidateName.toLowerCase().includes(search.toLowerCase()) || (c as any).candidatePosition.toLowerCase().includes(search.toLowerCase())
      : (c as any).company.toLowerCase().includes(search.toLowerCase()) || (c as any).jobTitle.toLowerCase().includes(search.toLowerCase());

    return matchesSearch;
  });

  // On mobile, if an ID is present, we show only the detail view.
  // On desktop, we show both.
  const showDetailOnlyOnMobile = !!id;

  return (
    <AppLayout hideMainPadding={true}>
      <div className="flex h-[calc(100vh-64px)] lg:h-screen overflow-hidden">
        {/* Left Side: Chat List */}
        <div 
          className={`w-full lg:w-1/2 border-r border-border flex flex-col bg-background ${
            showDetailOnlyOnMobile ? "hidden lg:flex" : "flex"
          }`}
        >
          <div className="p-4 lg:p-6 border-b border-border">
            <h1 className="text-xl font-bold text-foreground mb-4">Чаты</h1>
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Поиск..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 bg-muted border-0 rounded-2xl h-11"
                />
              </div>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-[100px] bg-muted border-0 rounded-2xl h-11">
                  <SelectValue placeholder="Все" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl">
                  <SelectItem value="all">Все</SelectItem>
                  <SelectItem value="unread">Непрочитанные</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-2 lg:p-3 space-y-1">
            {filtered.length > 0 ? (
              filtered.map((chat) => {
                const chatId = chat.id;
                const title = isEmployer ? (chat as any).candidateName : (chat as any).company;
                const subtitle = isEmployer ? (chat as any).candidatePosition : (chat as any).jobTitle;
                const isActive = id === chatId;

                return (
                  <Link
                    key={chatId}
                    to={`/chat/${chatId}`}
                    className={`flex items-center gap-3 p-3 rounded-2xl transition-all ${
                      isActive ? "bg-primary/10 text-primary" : "hover:bg-muted"
                    }`}
                  >
                    <div className="relative flex-shrink-0">
                      <CompanyIcon 
                        company={title} 
                        className="h-12 w-12 text-base rounded-full" 
                      />
                      {chat.online && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-background" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className={`font-semibold text-base truncate ${isActive ? "text-primary" : "text-foreground"}`}>
                          {subtitle}
                        </span>
                        <span className="text-xs text-muted-foreground ml-2">{chat.time}</span>
                      </div>
                      <div className="flex items-center justify-between mt-0.5">
                        <p className="text-base text-muted-foreground truncate">{title}</p>
                        {chat.unread > 0 && !isActive && (
                          <span className="w-5 h-5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center flex-shrink-0">
                            {chat.unread}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate mt-0.5">{chat.lastMessage}</p>
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className="text-center py-10 opacity-50">
                <MessageCircle size={32} className="mx-auto mb-2" />
                <p>Нет сообщений</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Chat Detail */}
        <div className={`flex-1 bg-muted/10 ${!showDetailOnlyOnMobile ? "hidden lg:block" : "block"}`}>
          {id ? (
            <ChatDetailView 
              chatId={id} 
              onBack={() => navigate("/chat")} 
            />
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <MessageCircle size={32} />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Выберите чат</h3>
              <p className="text-sm">Чтобы начать общение, выберите диалог из списка слева</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}

