import goalPersonal from "@/assets/images/goal-personal.jpg";
import goalHome from "@/assets/images/goal-home.jpg";
import goalFamily from "@/assets/images/goal-family.jpg";
import goalRetirement from "@/assets/images/goal-retirement.jpg";
import insightHome from "@/assets/images/insight-home.jpg";
import insightFund from "@/assets/images/insight-fund.jpg";
import insightFuture from "@/assets/images/insight-future.jpg";

export type GoalItem = {
  id: string;
  key: string;
  image: string;
};

export const goals: GoalItem[] = [
  { id: "personal", key: "goals.items.personal", image: goalPersonal },
  { id: "home", key: "goals.items.home", image: goalHome },
  { id: "family", key: "goals.items.family", image: goalFamily },
  { id: "retirement", key: "goals.items.retirement", image: goalRetirement },
];

export type ProductItem = {
  id: string;
  key: string;
  icon: "PiggyBank" | "Wallet" | "LineChart" | "HandCoins" | "CreditCard";
  featured?: boolean;
};

export const personalProducts: ProductItem[] = [
  { id: "bonusSaver", key: "personal.products.bonusSaver", icon: "PiggyBank", featured: true },
  { id: "ezAccess", key: "personal.products.ezAccess", icon: "Wallet" },
  { id: "certificates", key: "personal.products.certificates", icon: "LineChart" },
  { id: "loans", key: "personal.products.loans", icon: "HandCoins" },
  { id: "visa", key: "personal.products.visa", icon: "CreditCard" },
];

export const moneylineFeatures = [
  { id: "bills", key: "moneyline.features.bills", icon: "Receipt" },
  { id: "recurring", key: "moneyline.features.recurring", icon: "CalendarClock" },
  { id: "transfer", key: "moneyline.features.transfer", icon: "ArrowLeftRight" },
  { id: "card", key: "moneyline.features.card", icon: "CreditCard" },
  { id: "accounts", key: "moneyline.features.accounts", icon: "Layers" },
  { id: "digital", key: "moneyline.features.digital", icon: "Smartphone" },
] as const;

export const businessSolutions = [
  { id: "accounts", key: "business.cards.accounts", icon: "Building2" },
  { id: "loans", key: "business.cards.loans", icon: "Coins" },
  { id: "solutions", key: "business.cards.solutions", icon: "Compass" },
] as const;

export type InsightItem = {
  id: string;
  key: string;
  image: string;
};

export const insights: InsightItem[] = [
  { id: "home", key: "insights.articles.home", image: insightHome },
  { id: "fund", key: "insights.articles.fund", image: insightFund },
  { id: "future", key: "insights.articles.future", image: insightFuture },
];

export const navLinks = [
  { id: "personal", key: "navigation.personal", href: "#personal" },
  { id: "business", key: "navigation.business", href: "#business" },
  { id: "goals", key: "navigation.financialGoals", href: "#goals" },
  { id: "products", key: "navigation.products", href: "#personal" },
  { id: "moneyline", key: "navigation.moneyline", href: "#moneyline" },
  { id: "resources", key: "navigation.resources", href: "#insights" },
];

export const footerGroups = [
  {
    id: "personal",
    titleKey: "footer.personal.title",
    links: [
      "footer.personal.accounts",
      "footer.personal.loans",
      "footer.personal.cards",
      "footer.personal.investments",
    ],
  },
  {
    id: "business",
    titleKey: "footer.business.title",
    links: ["footer.business.accounts", "footer.business.loans", "footer.business.solutions"],
  },
  {
    id: "digital",
    titleKey: "footer.digital.title",
    links: ["footer.digital.moneyline", "footer.digital.mobile", "footer.digital.security"],
  },
  {
    id: "resources",
    titleKey: "footer.resources.title",
    links: [
      "footer.resources.goals",
      "footer.resources.blog",
      "footer.resources.faqs",
      "footer.resources.contact",
    ],
  },
];
