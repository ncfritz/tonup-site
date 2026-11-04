import type { Tier } from "@/lib/catalog";
import { Lock } from "./Logo";
import u from "./ui.module.css";

export function TierBadge({ tier }: { tier: Tier }) {
  if (tier === "pro") {
    return (
      <span className={u.badgePro}>
        <Lock color="#ffffff" />
        PRO
      </span>
    );
  }
  return <span className={u.badge}>INCLUDED</span>;
}
