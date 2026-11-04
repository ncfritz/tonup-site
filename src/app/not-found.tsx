import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import u from "@/components/ui.module.css";
import { comingSoon } from "@/lib/mode";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  // Before launch, production has no other pages, so skip the site's nav.
  return (
    <>
      {!comingSoon && <SiteHeader />}
      <main id="main" className={`${u.wrap} ${u.notFound}`}>
        <p className={u.kicker}>Bust.</p>
        <p className={u.notFoundScore} aria-hidden="true">
          404
        </p>
        <h1 className={u.h2}>Nothing on this number.</h1>
        <p className={u.lede}>{comingSoon ? "This page doesn’t exist yet." : "That page isn’t here. Step back to the line and try again."}</p>
        <Link href="/" className={u.btnDark}>
          Back to home
        </Link>
      </main>
      {!comingSoon && <SiteFooter />}
    </>
  );
}
