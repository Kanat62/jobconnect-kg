import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import { FilterProvider } from "@/context/FilterContext";
import { RoleProvider } from "@/context/RoleContext";
import { EmployerProvider } from "@/context/EmployerContext";
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
import Filters from "./pages/Filters";
import MyVacancies from "./pages/employer/MyVacancies";
import CreateVacancy from "./pages/employer/CreateVacancy";
import Applicants from "./pages/employer/Applicants";
import EmployerApplicantsList from "./pages/employer/EmployerApplicantsList";
import Pricing from "./pages/employer/Pricing";
import EmployerProfile from "./pages/employer/EmployerProfile";
import CompanyProfile from "./pages/employer/CompanyProfile";
import CandidateSearch from "./pages/employer/CandidateSearch";
import CandidateFilters from "./pages/employer/CandidateFilters";
import CandidateResume from "./pages/employer/CandidateResume";
import EmployerFavorites from "./pages/employer/EmployerFavorites";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <RoleProvider>
          <FilterProvider>
            <EmployerProvider>
              <Routes>
                {/* Seeker routes */}
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
                <Route path="/filters" element={<Filters />} />
                {/* Employer routes */}
                <Route path="/employer/candidates" element={<CandidateSearch />} />
                <Route path="/employer/filters" element={<CandidateFilters />} />
                <Route path="/employer/candidate/:id" element={<CandidateResume />} />
                <Route path="/employer/vacancies" element={<MyVacancies />} />
                <Route path="/employer/create-vacancy" element={<CreateVacancy />} />
                <Route path="/employer/edit-vacancy/:id" element={<CreateVacancy />} />
                <Route path="/employer/applicants/:vacancyId" element={<Applicants />} />
                <Route path="/employer/applicants" element={<EmployerApplicantsList />} />
                <Route path="/employer/pricing" element={<Pricing />} />
                <Route path="/employer/profile" element={<EmployerProfile />} />
                <Route path="/employer/company-profile" element={<CompanyProfile />} />
                <Route path="/employer/favorites" element={<EmployerFavorites />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </EmployerProvider>
          </FilterProvider>
        </RoleProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
