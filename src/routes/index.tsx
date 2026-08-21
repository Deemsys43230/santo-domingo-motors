import { createFileRoute } from "@tanstack/react-router";
import { Home } from "@/pages/Home";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "JMMB Bank | Servicios Bancarios Para Tus Metas" },
      {
        name: "description",
        content:
          "Banca cercana e inteligente en República Dominicana. Ahorra, crece, protege lo que importa y avanza con confianza hacia tus metas con JMMB Bank.",
      },
      { property: "og:title", content: "JMMB Bank | Servicios Bancarios Para Tus Metas" },
      {
        property: "og:description",
        content:
          "Banca personal y empresarial, soluciones digitales y acompañamiento financiero diseñados alrededor de las metas de cada cliente.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "es_DO" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});
