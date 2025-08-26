'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 navbar-aurora">
      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16 h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors">
          Tomer Naydnov
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-[var(--text-secondary)]">
          <Link className="hover:text-[var(--accent-primary)] transition-colors" href="/projects">Projects</Link>
          <Link className="hover:text-[var(--accent-primary)] transition-colors" href="/about">About</Link>
          <Link className="hover:text-[var(--accent-primary)] transition-colors" href="/contact">Contact</Link>
          <div className="relative group">
            <button className="hover:text-[var(--accent-primary)] transition-colors focus:outline-none">Resume ▾</button>
            <div className="absolute left-0 mt-2 w-40 bg-[var(--surface)] border border-[var(--border)] rounded shadow-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity z-50">
              <a className="block px-4 py-2 hover:bg-[var(--surface-hover)] text-[var(--text-secondary)]" href="/resume.docx" download>Download DOCX</a>
              <a className="block px-4 py-2 hover:bg-[var(--surface-hover)] text-[var(--text-secondary)]" href="/resume.pdf" download>Download PDF</a>
            </div>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col gap-1 p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`w-5 h-0.5 bg-[var(--text-primary)] transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
          <span className={`w-5 h-0.5 bg-[var(--text-primary)] transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-5 h-0.5 bg-[var(--text-primary)] transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 navbar-aurora border-t border-[var(--border)]">
          <nav className="flex flex-col py-4 px-6 gap-4">
            <Link 
              className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors py-2"
              href="/projects"
              onClick={() => setIsMenuOpen(false)}
            >
              Projects
            </Link>
            <Link 
              className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors py-2"
              href="/about"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors py-2"
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="relative">
              <button
                className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors py-2 w-full text-left"
                onClick={e => {
                  e.stopPropagation();
                  setIsMenuOpen(is => !is);
                }}
              >
                Resume ▾
              </button>
              <div className="absolute left-0 mt-2 w-40 bg-[var(--surface)] border border-[var(--border)] rounded shadow-lg z-50">
                <a className="block px-4 py-2 hover:bg-[var(--surface-hover)] text-[var(--text-secondary)]" href="/resume.docx" download onClick={() => setIsMenuOpen(false)}>Download DOCX</a>
                <a className="block px-4 py-2 hover:bg-[var(--surface-hover)] text-[var(--text-secondary)]" href="/resume.pdf" download onClick={() => setIsMenuOpen(false)}>Download PDF</a>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
