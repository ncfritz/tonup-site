import { site } from "@/lib/site";
import u from "./ui.module.css";

/**
 * The App Store link. Until `site.appStoreUrl` is set it renders a plain
 * "Coming soon" label instead, so no dead link ever ships.
 * (Swap in Apple's official badge artwork once the app has a listing.)
 */
export function AppStoreButton({ variant = "primary" }: { variant?: "primary" | "dark" | "nav" }) {
  if (!site.appStoreUrl) {
    if (variant === "nav") return null;
    return <span className={u.btnSoon}>Coming soon to the App Store</span>;
  }
  const cls = variant === "nav" ? u.navCta : variant === "dark" ? u.btnDark : u.btn;
  return (
    <a href={site.appStoreUrl} className={cls}>
      {variant === "nav" ? "Get the app" : "Download on the App Store"}
    </a>
  );
}
