import Link from "next/link";
import { notFound } from "next/navigation";
import { Timeline } from "@/components/Timeline";
import { CopyEmail } from "@/components/CopyEmail";
import { alsoOnGithub, contact, me, now, projects, skills } from "@/content/cv";
import { isLocale, t, type Locale } from "@/lib/i18n";
import { href } from "@/lib/site";

const HEAD = {
  skills: { en: "What I work with", he: "עם מה אני עובד" },
  timeline: { en: "Work & study", he: "עבודה ולימודים" },
  projects: { en: "Things I built", he: "דברים שבניתי" },
  contact: { en: "Say hello", he: "נעים להכיר" },
  more: { en: "More on this", he: "עוד על זה" },
  cv: { en: "CV (PDF)", he: "קורות חיים (PDF)" },
} as const;

function Section({
  title,
  children,
  delay = 0,
}: {
  title: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <section
      className="lift mt-16 sm:mt-20"
      style={{ ["--d" as string]: `${delay}ms` }}
    >
      <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-faint">
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  return (
    <main className="wrap pb-24 pt-10 sm:pt-14">
      {/* ---------------------------------------------------------- hello --- */}
      <header className="lift">
        <h1 className="font-display text-[clamp(2.1rem,8vw,3.25rem)] font-bold leading-[1.05]">
          {t(me.greeting, locale)}
        </h1>

        <p className="mt-5 max-w-[34ch] text-[clamp(1.05rem,4vw,1.25rem)] leading-snug">
          {t(me.what, locale)}
        </p>

        <p className="mt-3 text-[0.97rem] text-soft">{t(me.degree, locale)}</p>
      </header>

      {/* ------------------------------------------------------------ now --- */}
      <section
        className="lift mt-9 rounded-[var(--radius-card)] bg-card p-5 ring-1 ring-line sm:p-6"
        style={{ ["--d" as string]: "70ms" }}
      >
        <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-faint">
          {t(now.label, locale)}
        </h2>

        <div className="mt-4 space-y-2.5 text-[0.99rem] leading-relaxed text-soft">
          {t(now.lines, locale).map((line) => (
            <p key={line.slice(0, 30)}>{line}</p>
          ))}
        </div>

        <p className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 font-display text-[1.05rem] font-semibold text-ink">
          <span aria-hidden className="text-accent">
            →
          </span>
          {t(now.wanted, locale)}
        </p>
      </section>

      {/* --------------------------------------------------------- skills --- */}
      <Section title={t(HEAD.skills, locale)} delay={110}>
        <dl className="space-y-4">
          {skills.map((group) => (
            <div
              key={t(group.label, locale)}
              className="sm:flex sm:items-baseline sm:gap-4"
            >
              <dt className="shrink-0 text-[0.95rem] text-faint sm:w-32">
                {t(group.label, locale)}
              </dt>
              <dd className="mt-1.5 flex flex-wrap gap-1.5 sm:mt-0">
                {group.items.map((s) => (
                  <span key={s} className="pill" dir="ltr">
                    {s}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* ------------------------------------------------------- timeline --- */}
      <Section title={t(HEAD.timeline, locale)} delay={150}>
        <Timeline locale={locale} />
      </Section>

      {/* ------------------------------------------------------- projects --- */}
      <Section title={t(HEAD.projects, locale)} delay={190}>
        <ul className="space-y-2">
          {projects.map((p) => (
            <li key={p.slug}>
              <Link
                href={href(`/work/${p.slug}`, locale)}
                className="group block rounded-[var(--radius-card)] p-3 transition-colors hover:bg-card"
              >
                <span className="flex items-baseline gap-2">
                  <span className="font-display text-lg font-semibold">
                    {p.name}
                  </span>
                  <span
                    aria-hidden
                    className="text-accent transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                  >
                    →
                  </span>
                </span>
                <span className="mt-1 block text-[0.97rem] leading-relaxed text-soft">
                  {t(p.blurb, locale)}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-6 px-3 text-[0.92rem] leading-relaxed text-faint">
          {t(alsoOnGithub, locale)}
        </p>
      </Section>

      {/* -------------------------------------------------------- contact --- */}
      <Section title={t(HEAD.contact, locale)} delay={230}>
        <p className="text-[0.99rem] text-soft">{t(contact.line, locale)}</p>

        <p className="mt-3">
          <CopyEmail email={contact.email} locale={locale} />
        </p>

        <p className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[0.97rem]">
          <a href={contact.github} className="link" rel="me noreferrer" target="_blank">
            GitHub
          </a>
          <a href={contact.linkedin} className="link" rel="me noreferrer" target="_blank">
            LinkedIn
          </a>
          <a href={contact.cv} className="link" download>
            {t(HEAD.cv, locale)}
          </a>
        </p>
      </Section>
    </main>
  );
}
