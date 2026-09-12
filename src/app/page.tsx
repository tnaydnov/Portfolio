import type { Viewport } from "next";
import { WelcomeHome } from "@/components/welcome/WelcomeHome";
import { HomeDetails } from "@/components/welcome/HomeDetails";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata = pageMetadata({ description: site.description });
export const viewport: Viewport = { themeColor: "#f6f3eb" };

export default function HomePage() {
  return <div data-home-theme="warm"><WelcomeHome /><HomeDetails /></div>;
}
