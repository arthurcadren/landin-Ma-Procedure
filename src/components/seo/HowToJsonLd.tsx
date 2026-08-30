import type { ProcedureDetail } from "@/lib/api";

export function HowToJsonLd({ procedure, url }: { procedure: ProcedureDetail; url: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: procedure.title,
    description: procedure.summary ?? procedure.overview ?? "",
    totalTime: procedure.estimated_delay ?? undefined,
    estimatedCost: procedure.estimated_cost
      ? { "@type": "MonetaryAmount", currency: "XAF", value: procedure.estimated_cost }
      : undefined,
    step: procedure.steps.map((step) => ({
      "@type": "HowToStep",
      position: step.position,
      name: step.title,
      text: step.description ?? step.title,
    })),
    supply: procedure.documents.map((doc) => ({
      "@type": "HowToSupply",
      name: doc.name,
    })),
    url,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function FaqJsonLd({ faq }: { faq: { question: string; answer: string }[] }) {
  if (!faq || faq.length === 0) return null;

  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
