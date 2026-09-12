import { WelcomeHome } from "@/components/welcome/WelcomeHome";
import { HomeDetails } from "@/components/welcome/HomeDetails";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata = pageMetadata({ description: site.description });

export default function HomePage() {
  return <><WelcomeHome /><HomeDetails /></>;
}
