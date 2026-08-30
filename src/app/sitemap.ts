import type { MetadataRoute } from "next";
import { getPopularProcedures } from "@/lib/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://maprocedure.cm";
  const locales = ["fr", "en"];
  const staticPaths = ["", "/procedures", "/experts", "/tarifs", "/suivi", "/a-propos", "/contact"];

  const procedures = await getPopularProcedures();

  const staticEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    staticPaths.map((path) => ({
      url: `${baseUrl}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    }))
  );

  const procedureEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    procedures.map((p) => ({
      url: `${baseUrl}/${locale}/procedures/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    }))
  );

  return [...staticEntries, ...procedureEntries];
}

