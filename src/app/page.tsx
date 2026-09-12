import { IdentityHome } from "@/components/identity/IdentityHome";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata = pageMetadata({ description: site.description });

export default function HomePage() { return <IdentityHome />; }
