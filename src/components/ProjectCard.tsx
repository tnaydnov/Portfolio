import type { Project } from '@/data/projects';
import Image from 'next/image';

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <a 
      href={project.repo} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block group"
    >
      <article className="glass-card overflow-hidden hover:scale-[1.02] group transition-all duration-500 relative">
        {/* Hover glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-primary)]/0 to-purple-500/0 group-hover:from-[var(--accent-primary)]/10 group-hover:to-purple-500/10 transition-all duration-500 rounded-2xl"></div>
        
        {/* Image Section */}
        <div className="relative h-48 bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
          {project.image ? (
            <Image
              src={project.image}
              alt={`${project.title} preview`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            // Fallback tech-inspired pattern
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900">
              <div className="absolute inset-0 opacity-20">
                <div className="w-full h-full bg-[length:20px_20px] bg-[position:0_0,10px_10px] bg-repeat" style={{
                  backgroundImage: `
                    radial-gradient(circle at 25% 25%, rgba(45, 212, 191, 0.3) 1px, transparent 1px),
                    radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
                  `
                }}></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[var(--accent-primary)] to-purple-500 rounded-lg flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
              </div>
            </div>
          )}
          
          {/* Featured badge */}
          {project.featured && (
            <div className="absolute top-3 left-3">
              <span className="bg-gradient-to-r from-[var(--accent-primary)] to-blue-500 text-white text-xs font-medium px-2 py-1 rounded-full shadow-lg">
                Featured
              </span>
            </div>
          )}
          
          {/* Year badge */}
          {project.year && (
            <div className="absolute top-3 right-3">
              <span className="bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full">
                {project.year}
              </span>
            </div>
          )}
          
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <div className="bg-white/10 backdrop-blur-sm rounded-full p-3 border border-white/20">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5 relative z-10">
          <div className="flex items-start justify-between gap-3 mb-3">
            <h3 className="text-lg font-semibold leading-tight text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
              {project.title}
            </h3>
          </div>
          
          <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-4 line-clamp-3">
            {project.description}
          </p>
          
          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {project.tech.slice(0, 4).map((tech, index) => (
              <span 
                key={tech} 
                className="text-xs rounded-full border border-[var(--border)] bg-[var(--surface-hover)] px-2 py-1 text-[var(--text-secondary)] group-hover:border-[var(--accent-primary)]/30 transition-colors"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                {tech}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="text-xs rounded-full border border-[var(--border)] bg-[var(--surface-hover)] px-2 py-1 text-[var(--text-secondary)] opacity-60">
                +{project.tech.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Bottom gradient accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--accent-primary)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </article>
    </a>
  );
}
