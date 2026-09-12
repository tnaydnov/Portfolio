import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <main className="shell flex min-h-svh flex-col items-start justify-center gap-6 py-16">
          <p className="label text-signal">404 / Page not found</p>
          <h1 className="t-section max-w-[18ch]">No page at these coordinates.</h1>
          <p className="max-w-[44ch] text-muted">Head back to the portfolio to explore the work and the person behind it.</p>
          <Link href="/en" className="inline-flex min-h-12 items-center gap-5 bg-signal px-6 text-signal-ink">Back to the portfolio <span aria-hidden="true">→</span></Link>
        </main>
      </body>
    </html>
  );
}
