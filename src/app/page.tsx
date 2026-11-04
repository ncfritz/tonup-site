// The home page is chosen at build time: "@site-home" is aliased in
// next.config.ts to src/home/FullHome.tsx or src/home/ComingSoonHome.tsx
// (see src/lib/mode.ts), so a production build never ships the full site.
export { default } from "@site-home";
