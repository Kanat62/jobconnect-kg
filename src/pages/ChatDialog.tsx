import { useParams, useNavigate } from "react-router-dom";
import { mockChats as seekerChats } from "@/lib/mock-data";
import { ArrowLeft, Phone, MoreVertical, Send, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { useRole } from "@/context/RoleContext";
import { useEmployer } from "@/context/EmployerContext";

interface Message {
  id: string;
  text: string;
  mine: boolean;
  time: string;
  status: "sent" | "delivered" | "read";
}

const mockMessages: Message[] = [
  { id: "1", text: "Здравствуйте! Я откликнулся на вакансию Frontend-разработчик", mine: true, time: "10:15", status: "read" },
  { id: "2", text: "Здравствуйте! Мы рассмотрели ваше резюме и хотели бы пригласить вас на собеседование.", mine: false, time: "10:30", status: "read" },
  { id: "3", text: "Когда вам будет удобно?", mine: false, time: "10:30", status: "read" },
];

export default function ChatDialog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { role } = useRole();
  const { chats: employerChats } = useEmployer();

  const isEmployer = role === "employer";
  const chats = isEmployer ? employerChats : seekerChats;
  const chat = chats.find((c) => c.id === id);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(mockMessages);

  if (!chat) return null;

  const title = isEmployer ? (chat as any).candidateName : (chat as any).company;
  const subtitle = isEmployer ? (chat as any).candidatePosition : (chat as any).jobTitle;

  const handleSend = () => {
    if (!message.trim()) return;
    setMessages([
      ...messages,
      { id: Date.now().toString(), text: message, mine: true, time: "сейчас", status: "sent" },
    ]);
    setMessage("");
  };

  const statusIcon = (s: string) => {
    if (s === "read") return "✓✓";
    if (s === "delivered") return "✓✓";
    return "✓";
  };

  return (
    <AppLayout hideMainPadding={true}>
      <div className="flex flex-col h-[calc(100dvh-64px)] lg:h-[100dvh] bg-background">
        {/* Header */}
        <header className="flex items-center gap-3 px-4 py-3 border-b border-border bg-background">
          <button onClick={() => navigate("/chat")} className="p-1.5 rounded-xl hover:bg-muted transition-colors">
            <ArrowLeft size={22} />
          </button>
          <div className="relative flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary font-bold text-base">
              {isEmployer ? <User size={20} /> : title[0]}
            </div>
            {chat.online && (
              <span className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 bg-success rounded-full border-2 border-background" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-base text-foreground truncate">{title}</p>
            <p className="text-xs text-muted-foreground truncate">{subtitle}</p>
          </div>
          <button className="p-2 rounded-xl hover:bg-muted"><Phone size={18} className="text-muted-foreground" /></button>
          <button className="p-2 rounded-xl hover:bg-muted"><MoreVertical size={18} className="text-muted-foreground" /></button>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.mine ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] sm:max-w-[70%] px-4 py-2.5 rounded-2xl text-[15px] shadow-sm ${
                  msg.mine
                    ? "bg-primary text-primary-foreground rounded-br-none"
                    : "bg-muted/50 text-foreground rounded-bl-none border border-border/30"
                }`}
              >
                <p className="leading-relaxed">{msg.text}</p>
                <div className={`flex items-center justify-end gap-1 mt-1 ${msg.mine ? "text-primary-foreground/70" : "text-muted-foreground/60"}`}>
                  <span className="text-[10px]">{msg.time}</span>
                  {msg.mine && <span className="text-[10px] font-medium leading-none">{statusIcon(msg.status)}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border bg-background pb-[calc(env(safe-area-inset-bottom)+1rem)]">
          <div className="flex gap-2 items-center bg-muted rounded-2xl p-1 pr-1.5 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
            <Input
              placeholder="Написать сообщение..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="bg-transparent border-0 rounded-xl flex-1 h-11 focus-visible:ring-0 shadow-none text-[15px]"
            />
            <button
              onClick={handleSend}
              disabled={!message.trim()}
              className="p-2.5 rounded-xl bg-primary text-primary-foreground disabled:opacity-50 transition-all shadow-sm active:scale-95"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
