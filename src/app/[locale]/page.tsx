
import { setRequestLocale } from "next-intl/server";
import { getPopularProcedures, getFeaturedExperts, getPlatformStats, getCategories } from "@/lib/api";
import { ServicesJsonLd } from "@/components/seo/JsonLd";
import Header from "@/components/home/Header";
import Hero from "@/components/home/Hero";
import ServicesScroll from "@/components/home/ServicesScroll";
import LexiDemo from "@/components/home/LexiDemo";
import DelegationFlow from "@/components/home/DelegationFlow";
import ExpertsTeaser from "@/components/home/ExpertsTeaser";
import WhyUs from "@/components/home/WhyUs";
import Newsletter from "@/components/home/Newsletter";
import Footer from "@/components/home/Footer";
import WhatsAppFloat from "@/components/home/WhatsAppFloat";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [procedures, experts, stats, categories] = await Promise.all([
    getPopularProcedures(),
    getFeaturedExperts(),
    getPlatformStats(),
    getCategories(),
  ]);

  const serviceLinks = procedures.slice(0, 10).map((p) => ({
    name: p.title,
    url: `https://maprocedure.cm/fr/procedures/${p.slug}`,
  }));

  return (
    <main className="min-h-screen">
      <ServicesJsonLd items={serviceLinks} />
      <Header />
      <Hero stats={stats} />
      <ServicesScroll procedures={procedures} />
      <LexiDemo />
      <DelegationFlow />
      <ExpertsTeaser experts={experts} />
      <WhyUs stats={stats} categoriesCount={categories.length} />
      <Newsletter />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}


// import { setRequestLocale } from "next-intl/server";
// import { getPopularProcedures, getFeaturedExperts, getPlatformStats } from "@/lib/api";
// import { ServicesJsonLd } from "@/components/seo/JsonLd";
// import Header from "@/components/home/Header";
// import Hero from "@/components/home/Hero";
// // import HeroMarquees from "@/components/home/HeroMarquees";
// import ServicesScroll from "@/components/home/ServicesScroll";
// import WhyUs from "@/components/home/WhyUs";
// import Features from "@/components/home/Features";
// import ExpertsTeaser from "@/components/home/ExpertsTeaser";
// import Newsletter from "@/components/home/Newsletter";
// import Footer from "@/components/home/Footer";
// import WhatsAppFloat from "@/components/home/WhatsAppFloat";

// export default async function HomePage({
//   params,
// }: {
//   params: Promise<{ locale: string }>;
// }) {
//   const { locale } = await params;
//   setRequestLocale(locale);

//   const [procedures, experts, stats] = await Promise.all([
//     getPopularProcedures(),
//     getFeaturedExperts(),
//     getPlatformStats(),
//   ]);

//   const serviceLinks = procedures.slice(0, 10).map((p) => ({
//     name: p.title,
//     url: `https://maprocedure.cm/fr/procedures/${p.slug}`,
//   }));

//   return (
//     <main className="min-h-screen">
//       <ServicesJsonLd items={serviceLinks} />
//       <Header />
//       <Hero stats={stats} />
//       {/* <HeroMarquees /> */}
//       <ServicesScroll procedures={procedures} />
//       <WhyUs stats={stats} />
//       <Features />
//       <ExpertsTeaser experts={experts} />
//       <Newsletter />
//       <Footer />
//       <WhatsAppFloat />
//     </main>
//   );
// }