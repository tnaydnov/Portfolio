import Image from "next/image";
import { StudentField } from "@/components/bio/StudentField";
import { t, type Locale } from "@/lib/i18n";
import { ui } from "@/lib/ui";
import { site } from "@/lib/site";
import { TheLine } from "./TheLine";

/**
 * Who this is, resolved before any scroll.
 *
 * The portrait cell renders a photograph when one exists and the 650-dot
 * cohort field when one does not. The fallback is a designed state, not a
 * placeholder — it is still an image, still specific, and still his.
 */
export function Identity({ locale }: { locale: Locale }) {
  return (
    <div className="grid gap-px bg-rule lg:grid-cols-[minmax(0,17rem)_1fr]">
      <figure className="flex flex-col justify-between bg-ink p-5 md:p-6">
        {site.photo ? (
          <Image
            src={site.photo}
            alt={t(site.portraitAlt, locale)}
            width={640}
            height={800}
            priority
            sizes="(min-width: 1024px) 17rem, 100vw"
            className="w-full object-cover"
          />
        ) : (
          <StudentField locale={locale} caption={false} className="w-full" />
        )}
        <figcaption className="label mt-5 leading-relaxed">
          {site.photo
            ? `${t(site.name, locale)} · ${t(site.location, locale)}`
            : t(ui.home.cohortCaption, locale)}
        </figcaption>
      </figure>

      <div className="flex flex-col justify-center gap-7 bg-ink p-5 md:p-8">
        <div>
          <p className="label mb-4">{t(ui.home.trajectoryLabel, locale)}</p>
          <TheLine locale={locale} />
        </div>

        <p className="max-w-[64ch] text-[clamp(0.95rem,1.15vw,1.0625rem)] leading-[1.65] text-muted">
          {t(ui.home.abstract, locale)}
        </p>
      </div>
    </div>
  );
}
