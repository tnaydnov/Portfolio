import { PlaygroundHome } from "@/components/experience/PlaygroundHome";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata = pageMetadata({ description: site.description });

export default function HomePage() { return <PlaygroundHome />; }
