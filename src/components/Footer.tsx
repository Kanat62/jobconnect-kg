import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import iconLogo from '@/assets/logo/Logo.svg';
import instaLogo from '@/assets/logo/insta.png';
import whatsappLogo from '@/assets/logo/whatsapp.png';
import telegramLogo from '@/assets/logo/telegram.png';

interface FooterLinkProps {
  to: string;
  label: string;
  protected?: boolean;
}

// Mock auth check
const isLoggedIn = false; // Set to false to show lock icons as per requirement for "unlogged"

const FooterLink = ({ to, label, protected: isProtected }: FooterLinkProps) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    if (isProtected && !isLoggedIn) {
      e.preventDefault();
      navigate(`/auth?redirect=${to}`);
    }
  };

  return (
    <Link
      to={to}
      onClick={handleClick}
      className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm font-medium h-9"
    >
      {label}
    </Link>
  );
};

const SocialIcon = ({ href, src, alt }: { href: string; src: string; alt: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-[36px] h-[36px] flex items-center justify-center transition-transform hover:scale-105"
  >
    <img src={src} alt={alt} className="w-[36px] h-[36px] object-contain" />
  </a>
);

export default function Footer() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? null : id);
  };

  const sections = [
    {
      id: "seeker",
      title: "Соискателям",
      links: [
        { to: "/", label: "Найти работу" },
        { to: "/resume", label: "Создать резюме" },
        { to: "/applications", label: "Мои отклики", protected: true },
        { to: "/favorites", label: "Избранное", protected: true },
      ],
    },
    {
      id: "employer",
      title: "Работодателям",
      links: [
        { to: "/employer/create-vacancy", label: "Разместить вакансию" },
        { to: "/employer/pricing", label: "Тарифы" },
        { to: "/employer/vacancies", label: "Кабинет работодателя", protected: true },
      ],
    },
    {
      id: "company",
      title: "Компания",
      links: [
        { to: "/about", label: "О нас" },
        { to: "/contacts", label: "Контакты" },
        { to: "/help", label: "Помощь / FAQ" },
        { to: "mailto:support@jomush.kg", label: "Написать в поддержку" },
      ],
    },
  ];

  return (
    <footer className="w-full bg-card border-t border-border mt-12 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1: Brand */}
          <div className="space-y-6">
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="text-[28px] flex items-center font-bold">
                Ж
                <img src={iconLogo} alt="logo" className="w-[20px] mx-[1px]" />
                муш.kg
              </div>
            </Link>
            <p className="text-sm text-muted-foreground font-medium max-w-[200px]">
              Работа в Кыргызстане
            </p>
            <div className="flex items-center gap-4">
              <SocialIcon
                href="https://instagram.com"
                src={instaLogo}
                alt="Instagram"
              />
              <SocialIcon
                href="https://wa.me/996"
                src={whatsappLogo}
                alt="WhatsApp"
              />
              <SocialIcon
                href="https://t.me/"
                src={telegramLogo}
                alt="Telegram"
              />
            </div>
          </div>

          {/* Columns 2-4: Menu Sections */}
          {sections.map((section) => (
            <div key={section.id} className="lg:block">
              {/* Desktop/Tablet Header */}
              <h3 className="hidden lg:block text-sm font-bold uppercase tracking-wider text-foreground mb-2">
                {section.title}
              </h3>

              {/* Mobile Header (Accordion) */}
              <button
                onClick={() => toggleSection(section.id)}
                className="lg:hidden w-full flex items-center justify-between py-4 border-b border-border/50"
              >
                <span className="text-sm font-bold uppercase tracking-wider text-foreground">
                  {section.title}
                </span>
                <ChevronDown
                  size={18}
                  className={`text-muted-foreground transition-transform duration-300 ${openSection === section.id ? "rotate-180" : ""}`}
                />
              </button>

              {/* Link List */}
              <div
                className={`lg:flex flex-col space-y-1 mt-2 lg:mt-0 transition-all duration-300 overflow-hidden ${openSection === section.id ? "max-h-[300px] mb-4" : "max-h-0 lg:max-h-none"}`}
              >
                {section.links.map((link) => (
                  <FooterLink key={link.to} {...link} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Subfooter */}
        <div className="mt-6 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-muted-foreground">
            © 2026 Жумуш.kg. Все права защищены.
          </p>
          <div className="flex items-center gap-10 mr-24">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Политика конфиденциальности
            </Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Пользовательское соглашение
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
