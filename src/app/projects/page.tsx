import NavBar from '@/components/NavBar';
import ProjectCard from '@/components/ProjectCard';
import { projects } from '@/data/projects';

export default function ProjectsPage() {
  const featuredProjects = projects.filter(p => p.featured);

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
        
        {/* Floating code elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10 select-none">
          <div className="absolute top-20 left-10 text-[var(--accent-primary)] text-sm font-mono animate-pulse">
            &lt;Portfolio /&gt;
          </div>
          <div className="absolute top-40 right-20 text-purple-400 text-sm font-mono animate-pulse delay-1000">
            &#123; projects.map() &#125;
          </div>
          <div className="absolute bottom-40 left-20 text-blue-400 text-sm font-mono animate-pulse delay-2000">
            git commit -m &quot;awesome&quot;
          </div>
        </div>

        <section className="px-6 md:px-10 lg:px-16 py-16 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Header with stats */}
            <div className="mb-12">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-semibold mb-4 text-[var(--text-primary)]">
                    All Projects
                  </h1>
                  <p className="text-[var(--text-secondary)] max-w-2xl">
                    A collection of projects showcasing my journey in software development, 
                    from backend systems to teaching resources.
                  </p>
                </div>
                
                {/* Project stats */}
                <div className="flex gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[var(--accent-primary)]">{projects.length}</div>
                    <div className="text-xs text-[var(--text-muted)]">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[var(--accent-primary)]">
                      {Array.from(new Set(projects.flatMap(p => p.tech))).length}
                    </div>
                    <div className="text-xs text-[var(--text-muted)]">Technologies</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[var(--accent-primary)]">
                      {new Date().getFullYear() - 2021}+
                    </div>
                    <div className="text-xs text-[var(--text-muted)]">Years</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Projects */}
            {featuredProjects.length > 0 && (
              <div className="mb-16">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-2 h-8 bg-gradient-to-b from-[var(--accent-primary)] to-purple-500 rounded-full"></div>
                  <h2 className="text-xl font-semibold text-[var(--text-primary)]">Featured Projects</h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-[var(--border)] to-transparent"></div>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  {featuredProjects.map((project, index) => (
                    <div 
                      key={project.id} 
                      className="animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.2}s` }}
                    >
                      <ProjectCard project={project} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* All Projects Grid */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-teal-500 rounded-full"></div>
                <h2 className="text-xl font-semibold text-[var(--text-primary)]">All Projects</h2>
                <div className="flex-1 h-px bg-gradient-to-r from-[var(--border)] to-transparent"></div>
              </div>
              
              {/* Masonry-style grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                  <div 
                    key={project.id}
                    className="animate-fade-in-up"
                    style={{ 
                      animationDelay: `${(index + featuredProjects.length) * 0.1}s`,
                      animationFillMode: 'both'
                    }}
                  >
                    <ProjectCard project={project} />
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Cloud */}
            <div className="mt-16 glass-card p-8">
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-6 text-center">
                Technologies I Work With
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                {Array.from(new Set(projects.flatMap(p => p.tech))).map((tech, index) => (
                  <span 
                    key={tech}
                    className="text-sm rounded-full border border-[var(--border)] bg-[var(--surface-hover)] px-4 py-2 text-[var(--text-secondary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-all duration-300 cursor-default"
                    style={{ 
                      animationDelay: `${index * 0.05}s`,
                      animationFillMode: 'both'
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
