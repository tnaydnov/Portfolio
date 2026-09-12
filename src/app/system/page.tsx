import { permanentRedirect } from "next/navigation";

export default function LegacySystemPage() {
  permanentRedirect("/about");
}
