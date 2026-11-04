/*
 * Theme choice: "system" follows the device; "light" and "dark" force one.
 * The pick is kept in localStorage and applied as <html data-theme> before
 * first paint by THEME_SCRIPT (inlined in the layout), so there's no flash.
 */
export type ThemeChoice = "system" | "light" | "dark";

export const THEME_KEY = "tonup-theme";

export const THEME_SCRIPT = `try{var t=localStorage.getItem("${THEME_KEY}");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

export function readTheme(): ThemeChoice {
  try {
    const t = localStorage.getItem(THEME_KEY);
    return t === "light" || t === "dark" ? t : "system";
  } catch {
    return "system";
  }
}

export function applyTheme(choice: ThemeChoice) {
  const root = document.documentElement;
  if (choice === "system") delete root.dataset.theme;
  else root.dataset.theme = choice;
  try {
    if (choice === "system") localStorage.removeItem(THEME_KEY);
    else localStorage.setItem(THEME_KEY, choice);
  } catch {
    // Private mode or storage blocked: the choice still applies to this page.
  }
}
