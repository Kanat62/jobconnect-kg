export interface EmployerVacancy {
  id: string;
  title: string;
  salary: string;
  city: string;
  date: string;
  status: "active" | "moderation" | "rejected" | "archived";
  views: number;
  favorites: number;
  applications: number;
  rejectionReason?: string;
}

export interface Applicant {
  id: string;
  name: string;
  position: string;
  city: string;
  experience: string;
  age: number;
  date: string;
  status: "new" | "viewed" | "invited" | "rejected";
  avatar?: string;
}

export const mockEmployerVacancies: EmployerVacancy[] = [
  { id: "ev1", title: "Продавец-консультант", salary: "25 000 сом", city: "Бишкек", date: "сегодня", status: "active", views: 142, favorites: 12, applications: 8 },
  { id: "ev2", title: "Водитель категории B", salary: "30 000 сом", city: "Бишкек", date: "вчера", status: "active", views: 89, favorites: 5, applications: 3 },
  { id: "ev3", title: "Повар", salary: "20 000 сом", city: "Ош", date: "2 дня назад", status: "moderation", views: 0, favorites: 0, applications: 0 },
  { id: "ev4", title: "Охранник", salary: "18 000 сом", city: "Бишкек", date: "5 дней назад", status: "archived", views: 230, favorites: 15, applications: 12 },
  { id: "ev5", title: "Менеджер по продажам", salary: "35 000 сом", city: "Бишкек", date: "3 дня назад", status: "rejected", views: 0, favorites: 0, applications: 0, rejectionReason: "Описание вакансии не соответствует правилам платформы" },
];

export const mockApplicants: Applicant[] = [
  { id: "a1", name: "Айбек Асанов", position: "Продавец", city: "Бишкек", experience: "2 года", age: 24, date: "сегодня", status: "new" },
  { id: "a2", name: "Мария Ким", position: "Консультант", city: "Бишкек", experience: "3 года", age: 28, date: "вчера", status: "viewed" },
  { id: "a3", name: "Нурлан Токтоев", position: "Продавец-кассир", city: "Бишкек", experience: "1 год", age: 22, date: "2 дня назад", status: "invited" },
  { id: "a4", name: "Алия Сатарова", position: "Менеджер", city: "Ош", experience: "Без опыта", age: 20, date: "3 дня назад", status: "rejected" },
];

export const pricingPlans = [
  { name: "Бесплатно", vacancies: "3 вакансии", price: "0 сом", current: true },
  { name: "Базовый", vacancies: "10 вакансий", price: "990 сом/мес", current: false },
  { name: "Стандарт", vacancies: "25 вакансий", price: "1 990 сом/мес", current: false, popular: true },
  { name: "Про", vacancies: "Безлимит", price: "4 990 сом/мес", current: false },
];
