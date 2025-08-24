import NavBar from '@/components/NavBar';
import ContactForm from '@/components/ContactForm';

export default function ContactPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <NavBar />
      <div className="relative flex-grow">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-teal-900/20"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-[length:60px_60px] bg-[position:0_0,30px_30px] bg-repeat" style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(255,255,255,0.05) 2px, transparent 2px),
              radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 2px, transparent 2px)
            `
          }}></div>
        </div>
        <section className="px-6 md:px-10 lg:px-16 py-16 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-semibold text-[var(--text-primary)] mb-3">Contact</h1>
            <p className="text-[var(--text-secondary)] mb-12">
                Let&apos;s connect! I&apos;m always open to discussing new opportunities, collaborations, or just having a chat about technology.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Information */}
              <div>
                <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-6">Get In Touch</h2>
                
                {/* Email */}
                <div className="glass-card p-6 mb-4 group hover:scale-[1.02] transition-transform">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-teal-500/20 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-[var(--accent-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-[var(--text-primary)]">Email</h3>
                      <a 
                        className="text-[var(--accent-primary)] hover:text-[var(--accent-primary-hover)] transition-colors" 
                        href="mailto:tnaydnov@gmail.com"
                      >
                        tnaydnov@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                {/* LinkedIn */}
                <div className="glass-card p-6 mb-4 group hover:scale-[1.02] transition-transform">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-[var(--accent-primary)]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-[var(--text-primary)]">LinkedIn</h3>
                      <a 
                        className="text-[var(--accent-primary)] hover:text-[var(--accent-primary-hover)] transition-colors" 
                        href="https://www.linkedin.com/in/tomer-naydnov"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        /in/tomer-naydnov
                      </a>
                    </div>
                  </div>
                </div>

                {/* Response Time */}
                <div className="glass-card p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-[var(--accent-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-[var(--text-primary)]">Response Time</h3>
                      <p className="text-[var(--text-secondary)] text-sm">Usually within 24 hours</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-6">Send a Message</h2>
                <div className="glass-card p-6">
                  <ContactForm />
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-12 glass-card p-6">
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3">Let&apos;s Talk About</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
                    <svg className="w-4 h-4 text-[var(--accent-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                    </svg>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)]">Job Opportunities</p>
                </div>
                <div className="text-center p-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-teal-500/20 to-green-500/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
                    <svg className="w-4 h-4 text-[var(--accent-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)]">Collaborations</p>
                </div>
                <div className="text-center p-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
                    <svg className="w-4 h-4 text-[var(--accent-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)]">Tech Discussions</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
