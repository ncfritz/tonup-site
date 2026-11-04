import Link from "next/link";
import { site } from "@/lib/site";
import { AppStoreButton } from "./AppStoreButton";
import { Mark } from "./Logo";
import { ThemeSwitch } from "./ThemeSwitch";
import u from "./ui.module.css";

type Page = "home" | "games" | "pricing";

const NAV: { href: string; label: string; page: Page }[] = [
  { href: "/games", label: "Games & practice", page: "games" },
  { href: "/pricing", label: "Pricing", page: "pricing" },
];

export function SiteHeader({ current }: { current?: Page }) {
  return (
    <header className={u.header}>
      <div className={`${u.wrap} ${u.headerInner}`}>
        <Link href="/" className={u.brand} aria-current={current === "home" ? "page" : undefined}>
          <Mark />
          Ton Up
        </Link>
        <nav className={u.nav} aria-label="Main">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className={u.navLink} aria-current={current === n.page ? "page" : undefined}>
              {n.label}
            </Link>
          ))}
          <AppStoreButton variant="nav" />
        </nav>
        <div className={u.headerTheme}>
          <ThemeSwitch />
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className={u.footer}>
      <div className={`${u.wrap} ${u.footerInner}`}>
        <span className={u.footerBrand}>
          <Mark size={20} />
          <span className={u.mono}>tonup.app</span>
          {site.company && <span>© {new Date().getFullYear()} {site.company}</span>}
        </span>
        <nav className={u.footerNav} aria-label="Footer">
          <Link href="/games">Games & practice</Link>
          <Link href="/pricing">Pricing</Link>
          {site.supportEmail && <a href={`mailto:${site.supportEmail}`}>Support</a>}
        </nav>
      </div>
    </footer>
  );
}
