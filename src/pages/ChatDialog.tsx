import { useParams, useNavigate } from "react-router-dom";
import { mockChats } from "@/lib/mock-data";
import { ArrowLeft, Phone, MoreVertical, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import AppLayout from "@/components/AppLayout";

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
  const chat = mockChats.find((c) => c.id === id);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(mockMessages);

  if (!chat) return null;

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
        {/* Header - shown only on mobile or as a sub-header */}
        <header className="flex items-center gap-3 px-4 py-3 border-b border-border bg-background">
          <button onClick={() => navigate("/chat")} className="p-1.5 rounded-xl hover:bg-muted">
            <ArrowLeft size={22} />
          </button>
          <div className="relative flex-shrink-0">
            <div className="w-9 h-9 rounded-full bg-primary-light flex items-center justify-center text-primary font-bold text-base">
              {chat.company[0]}
            </div>
            {chat.online && (
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-success rounded-full border-2 border-background" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-base text-foreground truncate">{chat.company}</p>
            <p className="text-xs text-muted-foreground truncate">{chat.jobTitle}</p>
          </div>
          <button className="p-1.5 rounded-xl hover:bg-muted"><Phone size={18} className="text-muted-foreground" /></button>
          <button className="p-1.5 rounded-xl hover:bg-muted"><MoreVertical size={18} className="text-muted-foreground" /></button>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {/* Vacancy context card */}
        

          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.mine ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-base ${
                  msg.mine
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-muted text-foreground rounded-bl-md"
                }`}
              >
                <p>{msg.text}</p>
                <p className={`text-[10px] mt-1 text-right ${msg.mine ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  {msg.time} {msg.mine && <span className={msg.status === "read" ? "text-info" : ""}>{statusIcon(msg.status)}</span>}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-2.5 px-4 border-t border-border bg-background pb-[calc(env(safe-area-inset-bottom)+0.5rem)]">
          <div className="flex gap-2 items-center ">
            <Input
              placeholder="Написать сообщение..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="bg-muted border-0 rounded-xl flex-1 h-12 outline-none ring-none border-none"
            />
            <button
              onClick={handleSend}
              disabled={!message.trim()}
              className="p-4 rounded-xl bg-primary text-primary-foreground disabled:opacity-50 transition-colors"
            >
              <Send size={24} className="mr-0.5"/>
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
