import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { FinancialGoals } from "@/components/sections/FinancialGoals";
import { PersonalBanking } from "@/components/sections/PersonalBanking";
import { Moneyline } from "@/components/sections/Moneyline";
import { BusinessBanking } from "@/components/sections/BusinessBanking";
import { FinancialInsights } from "@/components/sections/FinancialInsights";
import { TrustSection } from "@/components/sections/TrustSection";
import { CTASection } from "@/components/sections/CTASection";
import { LanguageProvider } from "@/i18n/LanguageContext";

export function Home() {
  return (
    <LanguageProvider>
      <Header />
      <main>
        <Hero />
        <FinancialGoals />
        <PersonalBanking />
        <Moneyline />
        <BusinessBanking />
        <FinancialInsights />
        <TrustSection />
        <CTASection />
      </main>
      <Footer />
    </LanguageProvider>
  );
}
