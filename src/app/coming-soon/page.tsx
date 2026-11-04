import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

// Preview of production's pre-launch home page, for dev, staging and feature
// Previews. A production build removes this route (scripts/postbuild.ts).
export const metadata: Metadata = { title: "Coming soon", robots: { index: false } };

export default function ComingSoonPreview() {
  return <ComingSoon />;
}
