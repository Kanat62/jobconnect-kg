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
  category?: string;
  experience?: string;
  schedule?: string[];
  description?: string;
  requirements?: string;
  duties?: string;
  conditions?: string;
  address?: string;
  remote?: boolean;
  salaryFrom?: string;
  salaryTo?: string;
  paymentPeriod?: string;
  contactPhone?: string;
  whatsapp?: string;
  responseMethod?: string[];
}

export interface Applicant {
  id: string;
  candidateId: string;
  name: string;
  position: string;
  city: string;
  experience: string;
  age: number;
  date: string;
  status: "new" | "viewed" | "invited" | "rejected";
  avatar?: string;
  vacancyId: string;
  vacancyTitle: string;
}

export interface Candidate {
  id: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  position: string;
  city: string;
  age: number;
  experience: string;
  salary?: string;
  skills: string[];
  about?: string;
  phone?: string;
  phoneVisible: boolean;
  education: string;
  gender: "male" | "female";
  schedule: string;
  updatedAt: string;
  invited: boolean;
  rejected: boolean;
}

export interface EmployerNotification {
  id: string;
  type: "application" | "approved" | "rejected" | "message";
  title: string;
  description: string;
  time: string;
  read: boolean;
  link?: string;
}

export const mockCandidates: Candidate[] = [
  { id: "c1", firstName: "Айбек", lastName: "Асанов", position: "Продавец-консультант", city: "Бишкек", age: 24, experience: "2 года", salary: "25 000 сом", skills: ["Продажи", "Кассовое оборудование", "1С", "Работа с клиентами"], about: "Имею опыт работы в розничной торговле. Коммуникабельный, ответственный.", phone: "+996 700 111 222", phoneVisible: true, education: "Среднее-специальное", gender: "male", schedule: "Полный день", updatedAt: "сегодня", invited: false, rejected: false },
  { id: "c2", firstName: "Мария", lastName: "Ким", position: "Бухгалтер", city: "Бишкек", age: 28, experience: "3 года", salary: "40 000 сом", skills: ["1С:Бухгалтерия", "Налоговый учёт", "Excel", "Финансовая отчётность", "Аудит"], about: "Опытный бухгалтер со знанием налогового законодательства КР.", phone: "+996 555 222 333", phoneVisible: true, education: "Высшее", gender: "female", schedule: "Полный день", updatedAt: "вчера", invited: false, rejected: false },
  { id: "c3", firstName: "Нурлан", lastName: "Токтоев", position: "Водитель категории B", city: "Бишкек", age: 32, experience: "5 лет", salary: "30 000 сом", skills: ["Категория B", "Знание города", "Грузоперевозки"], about: "Безаварийный стаж 5 лет. Есть личный автомобиль.", phone: "+996 700 333 444", phoneVisible: true, education: "Среднее", gender: "male", schedule: "Сменный график", updatedAt: "сегодня", invited: false, rejected: false },
  { id: "c4", firstName: "Алия", lastName: "Сатарова", position: "SMM-менеджер", city: "Бишкек", age: 22, experience: "1 год", salary: "20 000 сом", skills: ["Instagram", "TikTok", "Canva", "Контент-план", "Копирайтинг"], about: "Веду соцсети для малого бизнеса. Портфолио по запросу.", phoneVisible: false, education: "Высшее", gender: "female", schedule: "Неполный день", updatedAt: "2 дня назад", invited: false, rejected: false },
  { id: "c5", firstName: "Бакыт", lastName: "Жумабеков", position: "Повар", city: "Ош", age: 35, experience: "8 лет", salary: "35 000 сом", skills: ["Восточная кухня", "Европейская кухня", "Кондитерское дело", "ХАССП"], about: "Шеф-повар с опытом работы в ресторанах Бишкека и Оша.", phone: "+996 770 444 555", phoneVisible: true, education: "Среднее-специальное", gender: "male", schedule: "Сменный график", updatedAt: "3 дня назад", invited: false, rejected: false },
  { id: "c6", firstName: "Динара", lastName: "Эсенова", position: "Учитель английского", city: "Бишкек", age: 26, experience: "3 года", salary: "30 000 сом", skills: ["IELTS", "TOEFL", "Методика преподавания", "Cambridge", "Детская группа"], about: "Преподаю английский для всех уровней. Сертификат CELTA.", phone: "+996 555 555 666", phoneVisible: true, education: "Высшее", gender: "female", schedule: "Неполный день", updatedAt: "сегодня", invited: false, rejected: false },
  { id: "c7", firstName: "Эрлан", lastName: "Мамытов", position: "Frontend-разработчик", city: "Бишкек", age: 25, experience: "2 года", salary: "80 000 сом", skills: ["React", "TypeScript", "CSS", "Git", "REST API", "Next.js"], about: "Разрабатываю веб-приложения на React. Опыт с коммерческими проектами.", phone: "+996 700 666 777", phoneVisible: true, education: "Высшее", gender: "male", schedule: "Полный день", updatedAt: "вчера", invited: false, rejected: false },
  { id: "c8", firstName: "Жанна", lastName: "Абдыкадырова", position: "Администратор", city: "Бишкек", age: 29, experience: "4 года", skills: ["Документооборот", "CRM", "Делопроизводство", "Организация мероприятий"], about: "Организованная, пунктуальная. Опыт управления офисом.", phoneVisible: false, education: "Высшее", gender: "female", schedule: "Полный день", updatedAt: "4 дня назад", invited: false, rejected: false },
  { id: "c9", firstName: "Тимур", lastName: "Султанов", position: "Электрик", city: "Бишкек", age: 40, experience: "12 лет", salary: "45 000 сом", skills: ["Электромонтаж", "ПУЭ", "КИПиА", "Слаботочные системы"], about: "Сертифицированный электрик. Допуск до 1000В.", phone: "+996 770 777 888", phoneVisible: true, education: "Среднее-специальное", gender: "male", schedule: "Полный день", updatedAt: "5 дней назад", invited: false, rejected: false },
  { id: "c10", firstName: "Айжан", lastName: "Калыкова", position: "Дизайнер интерьеров", city: "Бишкек", age: 27, experience: "3 года", salary: "50 000 сом", skills: ["AutoCAD", "3ds Max", "SketchUp", "Adobe Photoshop"], about: "Создаю дизайн-проекты квартир и коммерческих помещений.", phoneVisible: false, education: "Высшее", gender: "female", schedule: "Полный день", updatedAt: "вчера", invited: false, rejected: false },
  { id: "c11", firstName: "Данияр", lastName: "Касымов", position: "Охранник", city: "Бишкек", age: 38, experience: "6 лет", salary: "20 000 сом", skills: ["Физическая охрана", "Видеонаблюдение", "Первая помощь"], about: "Опыт работы в ТРЦ и бизнес-центрах.", phone: "+996 700 888 999", phoneVisible: true, education: "Среднее", gender: "male", schedule: "Сменный график", updatedAt: "3 дня назад", invited: false, rejected: false },
  { id: "c12", firstName: "Гулзат", lastName: "Тургунова", position: "Продавец-кассир", city: "Ош", age: 21, experience: "Без опыта", skills: ["Общение с клиентами", "Работа с деньгами"], about: "Ищу свою первую работу. Быстро учусь.", phoneVisible: true, phone: "+996 555 999 000", education: "Среднее", gender: "female", schedule: "Сменный график", updatedAt: "сегодня", invited: false, rejected: false },
  { id: "c13", firstName: "Азамат", lastName: "Бектуров", position: "Сварщик", city: "Каракол", age: 34, experience: "7 лет", salary: "40 000 сом", skills: ["Аргонная сварка", "Полуавтомат", "Чтение чертежей", "Резка металла"], about: "Сварщик 5-го разряда. Опыт работы на стройках.", phone: "+996 770 000 111", phoneVisible: true, education: "Среднее-специальное", gender: "male", schedule: "Полный день", updatedAt: "6 дней назад", invited: false, rejected: false },
  { id: "c14", firstName: "Назгуль", lastName: "Омурбекова", position: "Медсестра", city: "Бишкек", age: 30, experience: "5 лет", salary: "25 000 сом", skills: ["Процедурный кабинет", "Инъекции", "Уход за пациентами", "Медицинская документация"], about: "Опыт работы в поликлинике и частной клинике.", phone: "+996 555 111 222", phoneVisible: true, education: "Среднее-специальное", gender: "female", schedule: "Сменный график", updatedAt: "2 дня назад", invited: false, rejected: false },
  { id: "c15", firstName: "Руслан", lastName: "Абаев", position: "Менеджер по продажам", city: "Бишкек", age: 27, experience: "3 года", salary: "35 000 сом", skills: ["B2B продажи", "CRM", "Переговоры", "Презентации", "Холодные звонки"], about: "Имею опыт в B2B продажах строительных материалов.", phone: "+996 700 222 333", phoneVisible: true, education: "Высшее", gender: "male", schedule: "Полный день", updatedAt: "вчера", invited: false, rejected: false },
  { id: "c16", firstName: "Чолпон", lastName: "Маматова", position: "Швея", city: "Ош", age: 33, experience: "10 лет", salary: "22 000 сом", skills: ["Пошив одежды", "Оверлок", "Промышленные машины", "Раскрой"], about: "Опыт работы на швейном производстве. Знаю все виды тканей.", phone: "+996 770 333 444", phoneVisible: true, education: "Среднее-специальное", gender: "female", schedule: "Полный день", updatedAt: "4 дня назад", invited: false, rejected: false },
  { id: "c17", firstName: "Кубат", lastName: "Орозов", position: "Автомеханик", city: "Бишкек", age: 31, experience: "6 лет", salary: "35 000 сом", skills: ["Диагностика", "Ходовая часть", "Двигатель", "Электрика авто"], about: "Специализируюсь на японских автомобилях.", phone: "+996 555 444 555", phoneVisible: true, education: "Среднее-специальное", gender: "male", schedule: "Полный день", updatedAt: "сегодня", invited: false, rejected: false },
  { id: "c18", firstName: "Сезим", lastName: "Асанбекова", position: "Маркетолог", city: "Бишкек", age: 25, experience: "2 года", salary: "45 000 сом", skills: ["Google Ads", "Facebook Ads", "Аналитика", "SEO", "Стратегия"], about: "Опыт в digital-маркетинге. Работала с бюджетами от 100 000 сом/мес.", phoneVisible: false, education: "Высшее", gender: "female", schedule: "Полный день", updatedAt: "3 дня назад", invited: false, rejected: false },
  { id: "c19", firstName: "Арген", lastName: "Усубалиев", position: "Курьер", city: "Бишкек", age: 20, experience: "Без опыта", skills: ["Знание города", "Пунктуальность"], about: "Ищу работу курьером. Есть велосипед.", phone: "+996 700 555 666", phoneVisible: true, education: "Среднее", gender: "male", schedule: "Сменный график", updatedAt: "сегодня", invited: false, rejected: false },
  { id: "c20", firstName: "Бегимай", lastName: "Джолдошева", position: "Воспитатель", city: "Бишкек", age: 36, experience: "8 лет", salary: "18 000 сом", skills: ["Дошкольное образование", "Развивающие занятия", "Методики Монтессори"], about: "Люблю работу с детьми. 8 лет в детском саду.", phone: "+996 555 666 777", phoneVisible: true, education: "Высшее", gender: "female", schedule: "Полный день", updatedAt: "5 дней назад", invited: false, rejected: false },
  { id: "c21", firstName: "Нурбек", lastName: "Алиев", position: "Backend-разработчик", city: "Бишкек", age: 28, experience: "4 года", salary: "100 000 сом", skills: ["Python", "Django", "PostgreSQL", "Docker", "AWS", "REST API"], about: "Full-stack разработчик с упором на backend. Опыт с высоконагруженными системами.", phone: "+996 770 777 000", phoneVisible: true, education: "Высшее", gender: "male", schedule: "Полный день", updatedAt: "вчера", invited: false, rejected: false },
  { id: "c22", firstName: "Жылдыз", lastName: "Турсунбаева", position: "HR-менеджер", city: "Бишкек", age: 29, experience: "4 года", salary: "40 000 сом", skills: ["Подбор персонала", "1С:ЗУП", "КДП", "Адаптация персонала", "Корпоративная культура"], about: "Опыт подбора от массовых позиций до топ-менеджмента.", phoneVisible: false, education: "Высшее", gender: "female", schedule: "Полный день", updatedAt: "2 дня назад", invited: false, rejected: false },
  { id: "c23", firstName: "Улан", lastName: "Жээнбеков", position: "Грузчик", city: "Ош", age: 23, experience: "1 год", salary: "15 000 сом", skills: ["Физическая выносливость", "Работа в команде"], about: "Готов работать на складе или в доставке.", phone: "+996 700 888 000", phoneVisible: true, education: "Среднее", gender: "male", schedule: "Сменный график", updatedAt: "6 дней назад", invited: false, rejected: false },
  { id: "c24", firstName: "Анара", lastName: "Исмаилова", position: "Фармацевт", city: "Бишкек", age: 31, experience: "6 лет", salary: "28 000 сом", skills: ["Фармакология", "Рецептурный отпуск", "Работа с кассой", "Консультирование"], about: "Опыт работы в аптечных сетях Бишкека.", phone: "+996 555 000 111", phoneVisible: true, education: "Высшее", gender: "female", schedule: "Сменный график", updatedAt: "сегодня", invited: false, rejected: false },
  { id: "c25", firstName: "Мирлан", lastName: "Сатыбалдиев", position: "Строитель-отделочник", city: "Бишкек", age: 37, experience: "10 лет", salary: "50 000 сом", skills: ["Штукатурка", "Плитка", "Гипсокартон", "Покраска", "Электрика"], about: "Выполняю все виды отделочных работ. Портфолио по запросу.", phone: "+996 770 111 000", phoneVisible: true, education: "Среднее-специальное", gender: "male", schedule: "Полный день", updatedAt: "вчера", invited: false, rejected: false },
];

export const mockEmployerVacancies: EmployerVacancy[] = [
  { id: "ev1", title: "Продавец-консультант", salary: "25 000 сом", city: "Бишкек", date: "сегодня", status: "active", views: 142, favorites: 12, applications: 8, category: "Торговля", experience: "Без опыта", schedule: ["Сменный график"], duties: "Консультирование покупателей, работа с кассой", requirements: "Коммуникабельность, ответственность", salaryFrom: "20000", salaryTo: "30000", paymentPeriod: "За месяц", contactPhone: "+996 700 123 456", responseMethod: ["Через сайт"] },
  { id: "ev2", title: "Водитель категории B", salary: "30 000 сом", city: "Бишкек", date: "вчера", status: "active", views: 89, favorites: 5, applications: 3, category: "Транспорт", experience: "До 1 года", schedule: ["Полный день"], duties: "Доставка товаров по городу", requirements: "Права кат. B, стаж от 1 года", salaryFrom: "25000", salaryTo: "35000", paymentPeriod: "За месяц", contactPhone: "+996 700 123 456", responseMethod: ["Через сайт", "По телефону"] },
  { id: "ev3", title: "Повар", salary: "20 000 сом", city: "Ош", date: "2 дня назад", status: "moderation", views: 0, favorites: 0, applications: 0, category: "Еда и напитки", experience: "1–3 года", schedule: ["Сменный график"], duties: "Приготовление блюд национальной кухни", requirements: "Опыт от 1 года", salaryFrom: "18000", salaryTo: "25000", paymentPeriod: "За месяц", contactPhone: "+996 700 123 456", responseMethod: ["Через сайт"] },
  { id: "ev4", title: "Охранник", salary: "18 000 сом", city: "Бишкек", date: "5 дней назад", status: "archived", views: 230, favorites: 15, applications: 12, category: "Охрана", experience: "Без опыта", schedule: ["Сменный график"] },
  { id: "ev5", title: "Менеджер по продажам", salary: "35 000 сом", city: "Бишкек", date: "3 дня назад", status: "rejected", views: 0, favorites: 0, applications: 0, rejectionReason: "Описание вакансии не соответствует правилам платформы", category: "Торговля", experience: "1–3 года", schedule: ["Полный день"], duties: "Активные продажи, ведение клиентской базы", requirements: "Опыт в продажах от 1 года", salaryFrom: "30000", salaryTo: "45000", paymentPeriod: "За месяц", contactPhone: "+996 700 123 456", responseMethod: ["Через сайт"] },
];

export const mockApplicants: Applicant[] = [
  { id: "a1", candidateId: "c1", name: "Айбек Асанов", position: "Продавец", city: "Бишкек", experience: "2 года", age: 24, date: "сегодня", status: "new", vacancyId: "ev1", vacancyTitle: "Продавец-консультант" },
  { id: "a2", candidateId: "c2", name: "Мария Ким", position: "Консультант", city: "Бишкек", experience: "3 года", age: 28, date: "вчера", status: "viewed", vacancyId: "ev1", vacancyTitle: "Продавец-консультант" },
  { id: "a3", candidateId: "c3", name: "Нурлан Токтоев", position: "Водитель", city: "Бишкек", experience: "5 лет", age: 32, date: "2 дня назад", status: "invited", vacancyId: "ev2", vacancyTitle: "Водитель категории B" },
  { id: "a4", candidateId: "c4", name: "Алия Сатарова", position: "Менеджер", city: "Ош", experience: "1 год", age: 22, date: "3 дня назад", status: "rejected", vacancyId: "ev1", vacancyTitle: "Продавец-консультант" },
  { id: "a5", candidateId: "c15", name: "Руслан Абаев", position: "Менеджер по продажам", city: "Бишкек", experience: "3 года", age: 27, date: "сегодня", status: "new", vacancyId: "ev1", vacancyTitle: "Продавец-консультант" },
  { id: "a6", candidateId: "c11", name: "Данияр Касымов", position: "Охранник", city: "Бишкек", experience: "6 лет", age: 38, date: "вчера", status: "new", vacancyId: "ev2", vacancyTitle: "Водитель категории B" },
  { id: "a7", candidateId: "c12", name: "Гулзат Тургунова", position: "Продавец-кассир", city: "Ош", experience: "Без опыта", age: 21, date: "4 дня назад", status: "viewed", vacancyId: "ev1", vacancyTitle: "Продавец-консультант" },
  { id: "a8", candidateId: "c5", name: "Бакыт Жумабеков", position: "Повар", city: "Ош", experience: "8 лет", age: 35, date: "2 дня назад", status: "new", vacancyId: "ev2", vacancyTitle: "Водитель категории B" },
];

export const mockEmployerNotifications: EmployerNotification[] = [
  { id: "en1", type: "application", title: "Новый отклик", description: "Айбек Асанов откликнулся на Продавец-консультант", time: "10 мин назад", read: false, link: "/employer/applicants/ev1" },
  { id: "en2", type: "application", title: "Новый отклик", description: "Руслан Абаев откликнулся на Продавец-консультант", time: "1 час назад", read: false, link: "/employer/applicants/ev1" },
  { id: "en3", type: "approved", title: "Вакансия опубликована", description: "Ваша вакансия Продавец-консультант опубликована", time: "3 часа назад", read: true, link: "/employer/vacancies" },
  { id: "en4", type: "rejected", title: "Вакансия отклонена", description: "Вакансия Менеджер по продажам отклонена. Причина: Описание не соответствует правилам", time: "1 день назад", read: true, link: "/employer/vacancies" },
  { id: "en5", type: "message", title: "Новое сообщение", description: "Нурлан Токтоев: Спасибо за приглашение! Когда...", time: "2 часа назад", read: false, link: "/chat/ec1" },
];

export const mockEmployerChats = [
  { id: "ec1", candidateId: "c3", candidateName: "Нурлан Токтоев", candidatePosition: "Водитель", lastMessage: "Спасибо за приглашение! Когда удобно прийти?", time: "14:30", unread: 1, online: true },
  { id: "ec2", candidateId: "c1", candidateName: "Айбек Асанов", candidatePosition: "Продавец", lastMessage: "Здравствуйте! Заинтересовала ваша вакансия", time: "вчера", unread: 0, online: false },
  { id: "ec3", candidateId: "c2", candidateName: "Мария Ким", candidatePosition: "Бухгалтер", lastMessage: "Добрый день, подскажите по графику работы", time: "2 дня назад", unread: 0, online: true },
];

export const pricingPlans = [
  { name: "Бесплатно", vacancies: "3 вакансии", price: "0 сом", current: true },
  { name: "Базовый", vacancies: "10 вакансий", price: "990 сом/мес", current: false },
  { name: "Стандарт", vacancies: "25 вакансий", price: "1 990 сом/мес", current: false, popular: true },
  { name: "Про", vacancies: "Безлимит", price: "4 990 сом/мес", current: false },
];
