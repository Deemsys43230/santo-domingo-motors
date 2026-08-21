import { GoalCard } from "@/components/common/GoalCard";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { goals } from "@/data/bankingData";
import { useLanguage } from "@/i18n/LanguageContext";

export function FinancialGoals() {
  const { t } = useLanguage();

  return (
    <section id="goals" className="section-y bg-sand">
      <div className="container-page">
        <SectionHeading
          eyebrow={t("goals.eyebrow")}
          titleLines={[t("goals.titleLine1"), t("goals.titleLine2")]}
          description={t("goals.description")}
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {goals.map((goal, index) => (
            <Reveal key={goal.id} delay={index * 90}>
              <GoalCard
                title={t(`${goal.key}.title`)}
                subtitle={t(`${goal.key}.subtitle`)}
                alt={t(`${goal.key}.alt`)}
                image={goal.image}
                cta={t("goals.cardCta")}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
