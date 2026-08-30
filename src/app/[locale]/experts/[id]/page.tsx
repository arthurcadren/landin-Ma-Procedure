import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getExpertById, getExpertRatings } from "@/lib/api";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import WhatsAppFloat from "@/components/home/WhatsAppFloat";
import Image from "next/image";
import { BadgeCheck, Star, ShieldCheck } from "lucide-react";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const expert = await getExpertById(id);

  if (!expert) return { title: "Expert introuvable" };

  return {
    title: `${expert.user?.name ?? expert.company_name} — Expert certifié Ma Procédure`,
    description: expert.bio?.slice(0, 155) ?? `Profil de ${expert.company_name}, expert vérifié sur Ma Procédure.`,
  };
}

export default async function ExpertProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [expert, reviews] = await Promise.all([getExpertById(id), getExpertRatings(id)]);

  if (!expert) notFound();

  const t = await getTranslations("expertProfile");

  const distribution = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => r.score === star).length;
    return { star, percent: reviews.length ? Math.round((count / reviews.length) * 100) : 0 };
  });

  return (
    <>
      <Header />
      <main className="max-w-2xl mx-auto px-4 md:px-8 py-10">
        <div className="text-center mb-8">
          <div className="relative w-28 h-28 rounded-full mx-auto mb-4 overflow-hidden bg-primary-container/20">
            {expert.photo && <Image src={expert.photo} alt="" fill className="object-cover" />}
          </div>
          {expert.status === "approved" && (
            <span className="inline-flex items-center gap-1 bg-primary-container/15 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-3">
              <BadgeCheck size={14} /> {t("verifiedBadge")}
            </span>
          )}
          <h1 className="text-2xl font-bold text-on-surface">{expert.user?.name ?? expert.company_name}</h1>
          <p className="text-on-surface-variant">{expert.services?.[0] ?? expert.company_name}</p>
        </div>

        {expert.bio && (
          <section className="mb-8">
            <h2 className="font-bold text-on-surface mb-2">{t("aboutTitle")}</h2>
            <p className="text-on-surface-variant leading-relaxed">{expert.bio}</p>
          </section>
        )}

        {expert.services && expert.services.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {expert.services.map((s) => (
              <span key={s} className="bg-surface-container-low text-on-surface-variant text-sm px-3 py-1.5 rounded-full">
                {s}
              </span>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 mb-8">
          <div className="bg-surface-container-low rounded-xl p-4">
            <p className="text-xs text-on-surface-variant mb-1">{t("indicativeRate")}</p>
            <p className="font-bold text-on-surface">
              {expert.commission_rate ? `${expert.commission_rate}%` : "—"}
            </p>
          </div>
          <div className="bg-surface-container-low rounded-xl p-4">
            <p className="text-xs text-on-surface-variant mb-1">{t("responseTime")}</p>
            <p className="font-bold text-on-surface">~2h</p>
          </div>
        </div>

        <section className="flex flex-wrap items-start gap-8 mb-8">
          <div>
            <p className="text-4xl font-black text-on-surface">{expert.rating?.toFixed(1) ?? "—"}</p>
            <div className="flex gap-0.5 my-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={i < Math.round(expert.rating ?? 0) ? "fill-secondary-container text-secondary-container" : "text-outline-variant"}
                />
              ))}
            </div>
            <p className="text-sm text-on-surface-variant">{t("basedOnReviews", { count: reviews.length })}</p>
          </div>

          <div className="flex-1 min-w-[180px] space-y-1.5">
            {distribution.map(({ star, percent }) => (
              <div key={star} className="flex items-center gap-2 text-xs">
                <span className="w-2">{star}</span>
                <div className="flex-1 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${percent}%` }} />
                </div>
                <span className="w-8 text-right text-on-surface-variant">{percent}%</span>
              </div>
            ))}
          </div>
        </section>

        <div className="bg-primary-container/10 rounded-xl p-4 flex items-center gap-3 mb-8">
          <ShieldCheck size={20} className="text-primary flex-shrink-0" />
          <div>
            <p className="font-semibold text-sm text-on-surface">{t("securePayment")}</p>
            <p className="text-xs text-on-surface-variant">{t("securePaymentDesc")}</p>
          </div>
        </div>

        {reviews.length > 0 && (
          <section>
            <h2 className="font-bold text-on-surface mb-4">{t("reviewsTitle")}</h2>
            <div className="space-y-4">
              {reviews.slice(0, 3).map((review) => (
                <div key={review.id} className="border-b border-outline-variant pb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-8 h-8 rounded-full bg-primary-container/20 flex items-center justify-center text-xs font-bold text-primary">
                      {review.user_name?.[0] ?? "?"}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-on-surface">{review.user_name ?? "Utilisateur"}</p>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={11} className={i < review.score ? "fill-secondary-container text-secondary-container" : "text-outline-variant"} />
                        ))}
                      </div>
                    </div>
                  </div>
                  {review.review && <p className="text-sm text-on-surface-variant italic">&quot;{review.review}&quot;</p>}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <div className="sticky bottom-0 bg-surface-container-lowest border-t border-outline-variant p-4">
        <a
          href="https://wa.me/237600000000"
          target="_blank"
          rel="noopener noreferrer"
          className="max-w-2xl mx-auto flex items-center justify-center gap-2 bg-primary text-on-primary font-semibold py-3.5 rounded-lg"
        >
          {t("contactCta")}
        </a>
      </div>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
