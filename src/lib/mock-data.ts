export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  city: string;
  salary?: string;
  salaryPeriod?: string;
  date: string;
  views: number;
  likes: number;
  category: string;
  experience: string;
  schedule: string;
  remote: boolean;
  description?: string;
  responsibilities?: string[];
  requirements?: string[];
  conditions?: string[];
  address?: string;
  isFavorite?: boolean;
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  companyLogo?: string;
  city: string;
  date: string;
  status: "sent" | "viewed" | "invited" | "rejected";
}

export interface ChatDialog {
  id: string;
  company: string;
  companyAvatar?: string;
  jobTitle: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
}

export interface Notification {
  id: string;
  type: "viewed" | "invited" | "rejected" | "message" | "system";
  title: string;
  description: string;
  time: string;
  read: boolean;
  link?: string;
}

export const categories = [
  { id: "all", label: "Все", icon: "LayoutGrid" },
  { id: "construction", label: "Строительство", icon: "Hammer" },
  { id: "transport", label: "Транспорт", icon: "Car" },
  { id: "it", label: "IT", icon: "Monitor" },
  { id: "food", label: "Еда и напитки", icon: "UtensilsCrossed" },
  { id: "education", label: "Образование", icon: "GraduationCap" },
  { id: "beauty", label: "Красота", icon: "Sparkles" },
  { id: "services", label: "Услуги", icon: "Wrench" },
  { id: "trade", label: "Торговля", icon: "ShoppingBag" },
  { id: "manufacturing", label: "Производство", icon: "Factory" },
  { id: "security", label: "Охрана", icon: "Shield" },
];

export const featuredCompanies = [
  { id: "1", name: "Бета Сторес", badge: "Стабильный доход", logo: "🏪" },
  { id: "2", name: "Шоро", badge: "Большая команда", logo: "🍶" },
  { id: "3", name: "Дордой Плаза", badge: "Карьерный рост", logo: "🏬" },
  { id: "4", name: "Мегаком", badge: "Соц. пакет", logo: "📱" },
  { id: "5", name: "Газпром Нефть", badge: "Высокий оклад", logo: "⛽" },
];

export const mockJobs: Job[] = [
  {
    id: "1",
    title: "Frontend-разработчик",
    company: "Мегаком",
    city: "Бишкек",
    salary: "80 000 сом",
    salaryPeriod: "в месяц",
    date: "сегодня",
    views: 234,
    likes: 45,
    category: "it",
    experience: "1–3 года",
    schedule: "Полный день",
    remote: true,
    description: "Мы ищем Frontend-разработчика для работы над внутренними продуктами компании.",
    responsibilities: [
      "Разработка пользовательских интерфейсов на React",
      "Взаимодействие с дизайнерами и бэкенд-командой",
      "Код-ревью и написание тестов",
      "Оптимизация производительности приложений",
    ],
    requirements: [
      "Опыт работы с React от 1 года",
      "Знание TypeScript",
      "Понимание REST API",
      "Опыт с Git",
    ],
    conditions: [
      "Официальное оформление",
      "Гибкий график",
      "Возможность удалённой работы",
      "ДМС после испытательного срока",
    ],
    address: "ул. Киевская, 114",
  },
  {
    id: "2",
    title: "Продавец-консультант",
    company: "Бета Сторес",
    city: "Бишкек",
    salary: "25 000 сом",
    salaryPeriod: "в месяц",
    date: "вчера",
    views: 567,
    likes: 89,
    category: "trade",
    experience: "Без опыта",
    schedule: "Сменный график",
    remote: false,
    responsibilities: ["Консультирование покупателей", "Выкладка товара", "Работа с кассой"],
    requirements: ["Коммуникабельность", "Ответственность", "Возраст от 18 лет"],
    conditions: ["Бесплатное обучение", "Скидка на продукцию 30%"],
  },
  {
    id: "3",
    title: "Водитель категории B",
    company: "Яндекс Go",
    city: "Бишкек",
    salary: "1 500 сом",
    salaryPeriod: "в день",
    date: "сегодня",
    views: 1023,
    likes: 156,
    category: "transport",
    experience: "Менее 1 года",
    schedule: "Свободный график",
    remote: false,
    responsibilities: ["Перевозка пассажиров", "Поддержание автомобиля в чистоте"],
    requirements: ["Водительские права кат. B", "Стаж вождения от 1 года", "Личный автомобиль"],
  },
  {
    id: "4",
    title: "Повар-универсал",
    company: "Шоро",
    city: "Ош",
    salary: "30 000 сом",
    salaryPeriod: "в месяц",
    date: "2 дня назад",
    views: 345,
    likes: 67,
    category: "food",
    experience: "1–3 года",
    schedule: "Полный день",
    remote: false,
  },
  {
    id: "5",
    title: "Охранник",
    company: "Дордой Плаза",
    city: "Бишкек",
    salary: "20 000 сом",
    salaryPeriod: "в месяц",
    date: "3 дня назад",
    views: 198,
    likes: 23,
    category: "security",
    experience: "Без опыта",
    schedule: "Сменный график",
    remote: false,
  },
  {
    id: "6",
    title: "Учитель английского языка",
    company: "Oxford School",
    city: "Бишкек",
    salary: "35 000 сом",
    salaryPeriod: "в месяц",
    date: "сегодня",
    views: 412,
    likes: 78,
    category: "education",
    experience: "1–3 года",
    schedule: "Неполный день",
    remote: true,
  },
];

export const mockApplications: Application[] = [
  { id: "1", jobId: "1", jobTitle: "Frontend-разработчик", company: "Мегаком", city: "Бишкек", date: "2 дня назад", status: "invited" },
  { id: "2", jobId: "2", jobTitle: "Продавец-консультант", company: "Бета Сторес", city: "Бишкек", date: "3 дня назад", status: "viewed" },
  { id: "3", jobId: "4", jobTitle: "Повар-универсал", company: "Шоро", city: "Ош", date: "5 дней назад", status: "sent" },
  { id: "4", jobId: "5", jobTitle: "Охранник", company: "Дордой Плаза", city: "Бишкек", date: "1 неделю назад", status: "rejected" },
];

export const mockChats: ChatDialog[] = [
  { id: "1", company: "Мегаком", jobTitle: "Frontend-разработчик", lastMessage: "Здравствуйте! Мы рассмотрели ваше резюме...", time: "10:30", unread: 2, online: true },
  { id: "2", company: "Бета Сторес", jobTitle: "Продавец-консультант", lastMessage: "Когда вы сможете прийти на собеседование?", time: "вчера", unread: 0, online: false },
  { id: "3", company: "Oxford School", jobTitle: "Учитель английского", lastMessage: "Спасибо за отклик!", time: "2 дня назад", unread: 0, online: true },
];

export const mockNotifications: Notification[] = [
  { id: "1", type: "invited", title: "Приглашение!", description: "Вас приглашают на Frontend-разработчик в Мегаком", time: "10 мин назад", read: false },
  { id: "2", type: "viewed", title: "Отклик просмотрен", description: "Ваш отклик на Продавец-консультант просмотрен", time: "2 часа назад", read: false },
  { id: "3", type: "message", title: "Новое сообщение", description: "Мегаком: Здравствуйте! Мы рассмотрели...", time: "3 часа назад", read: true },
  { id: "4", type: "system", title: "Заполните резюме", description: "Резюме заполнено на 60%. Добавьте фото для лучших результатов", time: "1 день назад", read: true },
  { id: "5", type: "rejected", title: "Отказ", description: "К сожалению, по вакансии Охранник — отказ", time: "3 дня назад", read: true },
];
