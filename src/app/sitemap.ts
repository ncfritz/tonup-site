import type { MetadataRoute } from "next";
import { comingSoon } from "@/lib/mode";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  if (comingSoon) return [{ url: site.url, changeFrequency: "monthly", priority: 1 }];
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/games`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/pricing`, changeFrequency: "monthly", priority: 0.8 },
  ];
}
