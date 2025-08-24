import NavBar from '@/components/NavBar';

export default function ContactPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <NavBar />
      <div className="relative flex-grow">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-teal-900/20"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-[length:60px_60px] bg-[position:0_0,30px_30px] bg-repeat" style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(255,255,255,0.05) 2px, transparent 2px),
              radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 2px, transparent 2px)
            `
          }}></div>
        </div>
        <section className="px-6 md:px-10 lg:px-16 py-24 flex flex-col items-center justify-center min-h-[80vh]">
          <div className="max-w-2xl w-full mx-auto text-center relative z-10">
            <div className="glass-card p-10 md:p-14 rounded-3xl shadow-2xl backdrop-blur-lg bg-white/10 border border-[var(--border)] mb-10 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-6">Let&apos;s Connect</h1>
              <p className="text-lg text-[var(--text-secondary)] mb-8">I&apos;m always open to new opportunities, collaborations, and tech discussions. Reach out anytime!</p>
              <div className="mb-8">
                  <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">Why connect?</h2>
                  <p className="text-base text-[var(--text-secondary)]">I&apos;m actively seeking new job opportunities! If you&apos;re hiring, want to collaborate, or just want to connect, I&apos;d love to hear from you.</p>
              </div>
              <div className="flex flex-col md:flex-row items-center justify-center gap-10 mb-8">
                {/* Email */}
                <a href="mailto:tnaydnov@gmail.com" className="group flex flex-col items-center gap-3 hover:scale-110 transition-transform">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-full p-6 shadow-lg group-hover:shadow-[var(--accent-primary)]/40 animate-bounce">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-base font-medium text-[var(--text-primary)]">Email</span>
                  <span className="text-sm text-[var(--text-secondary)]">tnaydnov@gmail.com</span>
                </a>
                {/* LinkedIn */}
                <a href="https://www.linkedin.com/in/tomer-naydnov" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-3 hover:scale-110 transition-transform">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-full p-6 shadow-lg group-hover:shadow-blue-500/40 animate-bounce delay-100">
                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <span className="text-base font-medium text-[var(--text-primary)]">LinkedIn</span>
                  <span className="text-sm text-[var(--text-secondary)]">/in/tomer-naydnov</span>
                </a>
                {/* GitHub */}
                <a href="https://github.com/tnaydnov" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-3 hover:scale-110 transition-transform">
                  <div className="bg-gradient-to-br from-gray-800 to-purple-500 rounded-full p-6 shadow-lg group-hover:shadow-purple-500/40 animate-bounce delay-200">
                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.484 2 12.012c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.833.09-.646.35-1.088.636-1.34-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.254-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 7.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.396.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.579.688.481C19.138 20.175 22 16.427 22 12.012 22 6.484 17.523 2 12 2z"/>
                    </svg>
                  </div>
                  <span className="text-base font-medium text-[var(--text-primary)]">GitHub</span>
                  <span className="text-sm text-[var(--text-secondary)]">tnaydnov</span>
                </a>
              </div>
              <div className="mt-8 flex flex-col items-center gap-2">
                <div className="flex items-center gap-2 justify-center">
                  <svg className="w-6 h-6 text-[var(--accent-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657A8 8 0 113.343 2.343a8 8 0 0114.314 14.314z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-base font-medium text-[var(--text-primary)]">Israel</span>
                  <span className="text-sm text-[var(--text-secondary)]">(GMT+3)</span>
                </div>
                <span className="text-sm text-[var(--text-secondary)]">Available: Sunday–Thursday, 08:00–18:00 (local time)</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
