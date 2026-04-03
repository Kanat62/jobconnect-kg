import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Onboarding from "./pages/Onboarding";
import Auth from "./pages/Auth";
import JobDetail from "./pages/JobDetail";
import Favorites from "./pages/Favorites";
import Applications from "./pages/Applications";
import Chat from "./pages/Chat";
import ChatDialog from "./pages/ChatDialog";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import Resume from "./pages/Resume";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/job/:id" element={<JobDetail />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/chat/:id" element={<ChatDialog />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
