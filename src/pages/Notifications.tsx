import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bell, Check } from "lucide-react";
import { mockNotifications } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const typeIcon: Record<string, string> = {
  invited: "🎉",
  viewed: "👁",
  rejected: "😔",
  message: "💬",
  system: "⚙️",
};

export default function Notifications() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(mockNotifications);

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 bg-background border-b border-border px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-1.5 rounded-xl hover:bg-muted">
          <ArrowLeft size={22} />
        </button>
        <span className="flex-1 font-semibold">Уведомления</span>
        <Button size="sm" variant="ghost" className="rounded-xl text-xs" onClick={markAllRead}>
          <Check size={14} className="mr-1" /> Прочитать все
        </Button>
      </header>

      <div className="max-w-2xl mx-auto p-4 space-y-1">
        {notifications.length > 0 ? (
          notifications.map((n) => (
            <div
              key={n.id}
              className={`flex items-start gap-3 p-3 rounded-2xl transition-colors cursor-pointer hover:bg-muted ${
                !n.read ? "bg-primary-light/50" : ""
              }`}
            >
              <span className="text-xl flex-shrink-0 mt-0.5">{typeIcon[n.type]}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">{n.title}</p>
                <p className="text-sm text-muted-foreground mt-0.5">{n.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
              </div>
              {!n.read && <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />}
            </div>
          ))
        ) : (
          <div className="text-center py-20">
            <Bell size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="font-semibold">Уведомлений пока нет</p>
          </div>
        )}
      </div>
    </div>
  );
}
