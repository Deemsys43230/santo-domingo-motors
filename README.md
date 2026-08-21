# JMMB Vision

Build a premium, modern, bilingual banking landing page inspired by the official JMMB Bank Dominican Republic website:

https://do.jmmb.com/bank

IMPORTANT:

Do NOT create a pixel-by-pixel clone of the reference website. Use the reference only for JMMB's brand direction, banking categories, information hierarchy and overall visual identity.

Create a significantly more polished, premium and modern interpretation while maintaining the trusted, human-centered character of JMMB Bank.

==================================================

1. TECH STACK

   ==================================================

Use:

* React

* Vite

* TypeScript

* React Router

* Tailwind CSS or well-organized CSS/SCSS

* Lucide React for icons

Do NOT use:

* Next.js

* Angular

* unnecessary backend services

* unnecessary dependencies

The project must run with:

npm install

npm run dev

==================================================

2. BILINGUAL LANGUAGE SYSTEM

============================

The entire website MUST support two languages:

* English

* Spanish

Default language:

Spanish

The language selector should allow users to switch between:

ES | EN

or:

Español | English

IMPORTANT:

The language switcher must translate the ENTIRE website, not just the navigation.

Everything visible to the user must support both languages:

* Header navigation

* Hero

* Buttons

* Financial goals

* Product cards

* Moneyline section

* Business banking

* Financial insights

* CTA sections

* Footer

* Form labels

* Error messages

* Accessibility labels

* Tooltips

* Mobile menu

DO NOT leave English text visible when Spanish is selected or vice versa.

---

## LANGUAGE IMPLEMENTATION

Do NOT duplicate entire React components for each language.

Instead, create centralized translation data.

Example structure:

src/

├── locales/

│   ├── en.ts

│   └── es.ts

├── i18n/

│   ├── LanguageContext.tsx

│   └── translations.ts

Create a reusable language system such as:

LanguageContext

with:

* language

* setLanguage

* translate()

Example:

const { language, setLanguage, t } = useLanguage();

Use:

t("hero.title")

t("hero.description")

t("navigation.personal")

etc.

All UI text should come from the translation files.

---

## TRANSLATION FILE STRUCTURE

Create structured translation objects.

Example:

en.ts

{

navigation: {

personal: "Personal",

business: "Business",

financialGoals: "Financial Goals",

products: "Products & Services",

moneyline: "Moneyline",

resources: "Resources"

},

hero: {

eyebrow: "JMMB BANK",

title: "Your goals. Our commitment.",

description: "...",

primaryButton: "Open an Account",

secondaryButton: "Explore Banking"

}

}

es.ts

{

navigation: {

personal: "Personal",

business: "Empresas",

financialGoals: "Metas Financieras",

products: "Productos y Servicios",

moneyline: "Moneyline",

resources: "Recursos"

},

hero: {

eyebrow: "JMMB BANK",

title: "Tus metas. Nuestro compromiso.",

description: "...",

primaryButton: "Abrir una cuenta",

secondaryButton: "Explorar servicios bancarios"

}

}

Use natural, professional Spanish suitable for a Dominican/Caribbean banking audience.

Do NOT use literal machine-style translations.

==================================================

3. LANGUAGE SWITCHER UX

=======================

Desktop:

Place the language switcher in the top-right/header area.

Example:

ES | EN

or a compact selector:

🌐 ES

When clicked:

English

Español

The currently active language should be visually highlighted.

Mobile:

Place the language selector inside the mobile navigation.

Example:

Language

Español

English

The switch should happen immediately without page reload.

Persist the selected language using:

localStorage

Example key:

jmmb-language

When the user returns to the website, restore the previously selected language.

If no language is saved:

Default to Spanish.

==================================================

4. OPTIONAL LANGUAGE URL SUPPORT

================================

Structure the application so it can later support language-aware routes such as:

/es

/en

and:

/es/personal

/en/personal

However, do not make the routing unnecessarily complex for the landing page.

The current implementation may use a single route with language state/localStorage, but the architecture should make future localization routing easy.

==================================================

5. PROJECT STRUCTURE

====================

Create a clean production-ready architecture:

src/

├── assets/

│   ├── images/

│   ├── icons/

│   └── logos/

│

├── components/

│   ├── layout/

│   │   ├── Header.tsx

│   │   ├── Footer.tsx

│   │   ├── MobileMenu.tsx

│   │   └── LanguageSwitcher.tsx

│   │

│   ├── common/

│   │   ├── Button.tsx

│   │   ├── SectionHeading.tsx

│   │   ├── ProductCard.tsx

│   │   ├── GoalCard.tsx

│   │   └── IconButton.tsx

│   │

│   └── sections/

│       ├── Hero.tsx

│       ├── FinancialGoals.tsx

│       ├── PersonalBanking.tsx

│       ├── Moneyline.tsx

│       ├── BusinessBanking.tsx

│       ├── FinancialInsights.tsx

│       ├── TrustSection.tsx

│       └── CTASection.tsx

│

├── pages/

│   └── Home.tsx

│

├── data/

│   └── bankingData.ts

│

├── locales/

│   ├── en.ts

│   └── es.ts

│

├── i18n/

│   ├── LanguageContext.tsx

│   └── translations.ts

│

├── hooks/

│

├── utils/

│

├── styles/

│   ├── globals.css

│   └── variables.css

│

├── App.tsx

└── main.tsx

Root:

├── index.html

├── package.json

├── tsconfig.json

├── vite.config.ts

└── README.md

==================================================

6. DESIGN DIRECTION

===================

Create a high-end banking experience that feels:

* Premium

* Trustworthy

* Human

* Modern

* Warm

* Financially sophisticated

* Editorial

* Clean

* Accessible

Use JMMB-inspired branding:

Primary:

* Deep burgundy

* Rich JMMB red

Supporting:

* White

* Warm off-white

* Very dark charcoal

* Soft neutral gray

Use red strategically.

DO NOT make the entire website red.

==================================================

7. VISUAL STYLE

===============

Think:

"Premium Caribbean banking + modern financial editorial website"

The quality should feel closer to a premium international financial institution than a generic banking template.

Use:

* Large editorial typography

* Spacious layouts

* High-quality lifestyle photography

* Rounded 20–28px cards

* Subtle borders

* Very soft shadows

* Large section spacing

* Smooth hover states

* Scroll reveal animations

* Elegant image cropping

* Layered image/card compositions

Avoid:

* Excessive glassmorphism

* Neon colors

* Excessive gradients

* Generic dashboard UI

* Overly futuristic fintech styling

* Too many floating elements

* Excessive animations

* Cheap stock-template appearance

==================================================

8. HEADER

=========

Create a premium sticky navigation.

Desktop:

JMMB logo on the left.

Navigation:

* Personal

* Business

* Financial Goals

* Products & Services

* Moneyline

* Resources

Right side:

* Search icon

* Contact

* Language Switcher: ES | EN

* Login

* Open an Account

Primary CTA:

"Open an Account"

Secondary action:

"Login"

Create a subtle top utility bar containing:

* Exchange Rates

* Contact

* Locations

* Language Switcher

The header should become slightly more compact after scrolling.

==================================================

9. HERO SECTION

===============

Create a visually striking hero.

Use a large lifestyle image showing a confident person, family or entrepreneur in a warm Caribbean environment.

Hero composition:

LEFT:

Small eyebrow:

English:

"JMMB BANK"

Spanish:

"JMMB BANK"

Large headline:

English:

"Your goals.

Our commitment."

Spanish:

"Tus metas.

Nuestro compromiso."

Supporting text:

English:

"Smart financial solutions designed to help you save, grow, protect what matters and move confidently toward the future."

Spanish:

"Soluciones financieras diseñadas para ayudarte a ahorrar, crecer, proteger lo que importa y avanzar con confianza hacia el futuro."

Primary CTA:

English:

"Open an Account"

Spanish:

"Abrir una cuenta"

Secondary CTA:

English:

"Explore Banking"

Spanish:

"Explorar servicios bancarios"

RIGHT:

Large editorial lifestyle image with rounded corners.

Add a small floating financial card:

English:

"Plan with confidence"

"Personal banking solutions built around your goals."

Spanish:

"Planifica con confianza"

"Soluciones bancarias diseñadas alrededor de tus metas."

Add subtle entrance animation.

The hero should communicate:

TRUST + PEOPLE + FINANCIAL GROWTH.

==================================================

10. FINANCIAL GOALS

===================

Create an editorial section based on the concept of helping customers achieve different life goals.

English:

"Wherever life takes you,

we're here to help."

Spanish:

"Dondequiera que te lleve la vida,

estamos aquí para ayudarte."

Create 4 large interactive cards.

CARD 1:

English:

"Personal"

"Make your next move"

Spanish:

"Personal"

"Da el siguiente paso"

CARD 2:

English:

"Home & Vehicle"

"Build the life you imagine"

Spanish:

"Vivienda y Vehículo"

"Construye la vida que imaginas"

CARD 3:

English:

"Family"

"Plan for what matters"

Spanish:

"Familia"

"Planifica lo que importa"

CARD 4:

English:

"Retirement"

"Prepare for what's next"

Spanish:

"Retiro"

"Prepárate para lo que viene"

Use large photography and subtle hover animations.

==================================================

11. PERSONAL BANKING

====================

Heading:

English:

"Banking built around your life."

Spanish:

"Servicios bancarios pensados para tu vida."

Create a premium asymmetric card layout.

Products:

* Bonus Saver

* EzAccess

* Certificates of Deposit

* Personal Loans

* Visa Debit Card

Each card must have translated:

* Product name

* Description

* Learn more CTA

* Accessibility labels

English CTA:

"Learn more"

Spanish CTA:

"Conoce más"

Add:

English:

"Find the right solution for you"

Spanish:

"Encuentra la solución adecuada para ti"

==================================================

12. MONEYLINE

=============

Create a large premium feature section for JMMB Moneyline.

Use a dark burgundy or deep charcoal background.

English:

"Your bank.

Wherever you are."

Spanish:

"Tu banco.

Dondequiera que estés."

Description should be fully translated.

Features:

English:

* Pay bills

* Schedule recurring payments

* Transfer money

* Manage your Visa Debit Card

* View your accounts

* Manage your finances digitally

Spanish:

* Paga tus facturas

* Programa pagos recurrentes

* Transfiere dinero

* Administra tu tarjeta Visa Débito

* Consulta tus cuentas

* Administra tus finanzas digitalmente

Right side:

Create a premium smartphone mockup showing a fictional Moneyline interface.

IMPORTANT:

The interface inside the phone is only a visual concept.

Do not use real financial information.

CTA:

English:

"Discover Moneyline"

Spanish:

"Descubre Moneyline"

Use subtle phone floating animation.

==================================================

13. BUSINESS BANKING

====================

Create a separate business section.

English:

"Built for businesses

ready to grow."

Spanish:

"Diseñado para empresas

listas para crecer."

Create 3 solution cards:

English:

* Business Accounts

* Business Loans

* Financial Solutions

Spanish:

* Cuentas Empresariales

* Préstamos Empresariales

* Soluciones Financieras

CTA:

English:

"Explore Business Banking"

Spanish:

"Explorar Banca Empresarial"

==================================================

14. FINANCIAL INSIGHTS

======================

Create an editorial financial content section.

English:

"Financial knowledge

for every stage of life."

Spanish:

"Conocimiento financiero

para cada etapa de la vida."

Create 3 article cards:

1.

English:

"Buying a home"

Spanish:

"Comprar una vivienda"

2.

English:

"Building an emergency fund"

Spanish:

"Crear un fondo de emergencia"

3.

English:

"Planning for your future"

Spanish:

"Planificar tu futuro"

Every article must have translated:

* Category

* Title

* Description

* Read more

English:

"Read more"

Spanish:

"Leer más"

==================================================

15. TRUST / BRAND SECTION

=========================

Create a minimal emotional section.

English:

"Banking is more than transactions.

It's about helping people move forward."

Spanish:

"La banca es más que transacciones.

Se trata de ayudar a las personas a avanzar."

Use an elegant full-width lifestyle image.

==================================================

16. FINAL CTA

=============

Create a premium full-width CTA.

English:

"Ready to make your next financial move?"

Spanish:

"¿Listo para dar tu próximo paso financiero?"

Supporting text should be fully translated.

Buttons:

English:

"Open an Account"

"Talk to JMMB"

Spanish:

"Abrir una cuenta"

"Hablar con JMMB"

==================================================

17. FOOTER

==========

Create a large professional banking footer.

Personal Banking:

* Accounts

* Loans

* Debit Cards

* Investments

Business Banking:

* Business Accounts

* Loans

* Business Solutions

Digital Banking:

* Moneyline

* Mobile Banking

* Security

Resources:

* Financial Goals

* Blog

* FAQs

* Contact

Every footer item must have English and Spanish translations.

Bottom:

* Privacy

* Terms

* Accessibility

* Security

* Copyright

Spanish versions:

* Privacidad

* Términos

* Accesibilidad

* Seguridad

* Derechos de autor

==================================================

18. RESPONSIVE DESIGN

=====================

Desktop:

1440px+

Tablet:

768px–1199px

Mobile:

320px–767px

Mobile requirements:

* Sticky compact header

* Hamburger navigation

* Language selector inside mobile menu

* Full-width hero

* Cards become stacked

* Phone mockup scales correctly

* Typography scales smoothly

* CTAs become full-width where appropriate

* No horizontal overflow

* Maintain generous spacing

* Preserve visual hierarchy

Language switcher must remain easy to access on mobile.

==================================================

19. ANIMATIONS

==============

Use subtle premium animations.

Implement:

* Fade-up on section entrance

* Image reveal

* Card hover elevation

* Arrow movement

* Header transition on scroll

* Gentle image parallax

* Moneyline phone floating animation

* Language switch transition

Do NOT animate the entire page excessively.

Animations should feel sophisticated and fast.

Respect:

prefers-reduced-motion

==================================================

20. ACCESSIBILITY

=================

Implement:

* Semantic HTML

* Proper heading hierarchy

* Keyboard navigation

* Accessible buttons

* Accessible navigation

* Alt text

* Good color contrast

* Visible focus states

* Screen-reader-friendly language switcher

* Reduced-motion support

When the language changes, update the document language attribute:

English:

<html lang="en">

Spanish:

<html lang="es">

Also update page metadata accordingly.

==================================================

21. SEO

=======

Create language-aware:

* Page title

* Meta description

* Open Graph metadata

* Semantic headings

* Descriptive image alt text

English metadata and Spanish metadata should be different.

Example:

English title:

"JMMB Bank | Banking Built Around Your Goals"

Spanish title:

"JMMB Bank | Servicios Bancarios Para Tus Metas"

==================================================

22. DATA ARCHITECTURE

=====================

Keep banking content separate from UI.

Use:

src/data/bankingData.ts

for product and section data.

Use:

src/locales/en.ts

src/locales/es.ts

for all translated interface text.

Do not hardcode visible UI strings directly inside components.

==================================================

23. VITE CONFIGURATION

======================

This MUST be React + Vite.

Root index.html must exist.

It must contain:

<div id="root"></div>

main.tsx must be the application entry point.

The application must work with:

npm run dev

Also ensure:

npm run build

works successfully.

==================================================

24. CODE QUALITY

================

Use reusable components.

Do NOT put the entire website inside App.tsx.

Keep:

* Content separate from UI

* Translation separate from UI

* Components modular

* Sections reusable

* Styling organized

* No duplicated JSX

* No unnecessary dependencies

==================================================

25. IMAGE DIRECTION

===================

Use premium lifestyle photography.

Themes:

* Caribbean people

* Families

* Entrepreneurs

* Professional adults

* Homes

* Business environments

* Financial planning

* Mobile banking

Images should feel:

* Authentic

* Warm

* Sophisticated

* Human

* Premium

Avoid:

* Generic corporate handshakes

* Overused stock-photo poses

* Low-quality images

* Excessive technology imagery

==================================================

26. FINAL QUALITY BAR

=====================

The final website should look like a premium 2026 banking website.

It should NOT look like:

* Bootstrap template

* Generic AI-generated landing page

* Dashboard

* SaaS website

* Direct clone of JMMB's current website

It should feel like:

"JMMB's trusted human-centered banking identity redesigned as a premium modern bilingual digital experience."

==================================================

27. FINAL VERIFICATION

======================

Before finishing, verify:

1. npm run dev works

2. npm run build works

3. No TypeScript errors

4. No broken imports

5. No broken images

6. No horizontal scrolling

7. Mobile navigation works

8. Language switch works

9. Spanish translates the entire website

10. English translates the entire website

11. Selected language persists after refresh

12. Language defaults to Spanish

13. Document lang attribute changes

14. SEO metadata changes with language

15. All buttons have clear interactions

16. All sections are responsive

17. Header works on desktop and mobile

18. Language selector works on desktop and mobile

19. Accessibility is implemented

20. Final UI looks polished at:

* 1440px

* 1024px

* 768px

* 390px

Do not stop at a functional implementation.

Polish the spacing, typography, imagery, animations, responsive behavior and visual hierarchy until the result feels like a real premium banking product designed by a professional product/design team.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/6e9f578c-218e-4da2-b2c7-1dc2c7f55ef7).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
