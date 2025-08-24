import Image from 'next/image';
import { projects } from '@/data/projects';
import NavBar from '@/components/NavBar';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return projects.map(p => ({ slug: p.id }));
}

export default function ProjectCaseStudy({ params }: { params: { slug: string } }) {
  const p = projects.find(x => x.id === params.slug);
  if (!p) return notFound();

  return (
    <main>
      <NavBar />
      <section className="px-6 md:px-10 lg:px-16 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-semibold text-[var(--text-primary)]">{p.title}</h1>
          <p className="mt-3 text-[var(--text-secondary)]">{p.description}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {p.tech.map(t => <li key={t} className="text-xs rounded-full border border-[var(--border)] bg-[var(--surface-hover)] px-2 py-1 text-[var(--text-secondary)]">{t}</li>)}
          </ul>

          {p.image && (
            <div className="mt-6 overflow-hidden rounded-xl border border-[var(--border)]">
              <Image src={p.image} alt="Project screenshot" width={1200} height={700} />
            </div>
          )}

          <div className="mt-8 flex gap-3">
            {p.repo && <a href={p.repo} target="_blank" className="rounded-xl px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition">Code</a>}
          </div>

          <hr className="my-10 border-[var(--border)]" />
          <h2 className="text-xl font-semibold text-[var(--text-primary)]">What I did</h2>
          <ul className="list-disc pl-5 mt-3 text-[var(--text-secondary)] space-y-2">
            <li>Designed microservices and message flows.</li>
            <li>Implemented detection & OCR pipelines.</li>
            <li>Deployed with Docker Compose and remote Linux servers.</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
