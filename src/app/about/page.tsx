import NavBar from '@/components/NavBar';

export default function AboutPage() {
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
            <h1 className="text-3xl font-semibold text-[var(--text-primary)]">About</h1>
            
            {/* About Me */}
            <div className="mt-8">
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Software Engineering graduate passionate about building innovative solutions and teaching the next generation of developers. 
                Currently working as a Python Instructor and Content Developer in the Nitzanim program, where I design curriculum and teach high school students programming fundamentals.
              </p>
              <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
                I have experience in technical support, full-stack development, and AI-powered systems. My background includes help desk support roles where I developed strong problem-solving skills and customer service expertise, 
                which now complement my technical development work. I enjoy tackling complex challenges and turning ideas into practical solutions.
              </p>
            </div>

            {/* Skills */}
            <div className="mt-12">
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4 tracking-wide">Tech Stack & Skills</h2>
              <div className="glass-card p-10 md:p-14 rounded-3xl shadow-2xl backdrop-blur-lg bg-white/10 border border-[var(--border)] mb-10 animate-fade-in w-full flex flex-col items-center justify-center">
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                    <h3 className="text-lg font-bold text-[var(--accent-primary)] mb-4 tracking-wide">Core Technologies</h3>
                    <div className="flex flex-wrap gap-3 mb-6">
                      {['Python', 'Java', 'SQL', 'FastAPI', 'Flask', 'Spring Boot', 'Docker', 'Kubernetes', 'Git', 'GitHub'].map(skill => (
                        <span key={skill} className="text-xs font-semibold rounded-full border border-[var(--accent-primary)] bg-gradient-to-r from-purple-900/40 to-blue-900/40 px-3 py-1 text-[var(--accent-primary)] shadow">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-lg font-bold text-blue-400 mb-4 tracking-wide">Web & Backend</h3>
                    <div className="flex flex-wrap gap-3 mb-6">
                      {['REST APIs', 'WebSockets', 'Authentication', 'Redis', 'Docker Compose'].map(skill => (
                        <span key={skill} className="text-xs font-semibold rounded-full border border-blue-400 bg-gradient-to-r from-blue-900/40 to-teal-900/40 px-3 py-1 text-blue-400 shadow">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-purple-400 mb-4 tracking-wide">Software Engineering & AI</h3>
                    <div className="flex flex-wrap gap-3 mb-6">
                      {['OOP', 'Algorithms', 'Data Structures', 'System Design', 'Multithreading', 'Unit Testing', 'Integration Testing', 'JUnit', 'Mockito', 'PyTest', 'YOLO', 'OpenCV', 'OCR (PaddleOCR, Tesseract)', 'Godot (GDScript)'].map(skill => (
                        <span key={skill} className="text-xs font-semibold rounded-full border border-purple-400 bg-gradient-to-r from-purple-900/40 to-blue-900/40 px-3 py-1 text-purple-300 shadow">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-lg font-bold text-yellow-400 mb-4 tracking-wide">Python Instruction & Development</h3>
                    <div className="flex flex-wrap gap-3 mb-6">
                      {['Curriculum Development', 'Content Design', 'Classroom & Online Instruction'].map(skill => (
                        <span key={skill} className="text-xs font-semibold rounded-full border border-yellow-400 bg-gradient-to-r from-yellow-900/40 to-purple-900/40 px-3 py-1 text-yellow-300 shadow">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Professional Journey */}
            <div className="mt-12">
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-6">Professional Journey</h2>
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[var(--border)]"></div>
                
                <div className="space-y-8">
                  {/* Current Position - Content Developer */}
                  <div className="relative flex items-start gap-6">
                    <div className="w-8 h-8 bg-gradient-to-br from-[var(--accent-primary)] to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 relative z-10 shadow-lg">
                      <div className="w-3 h-3 bg-[var(--bg)] rounded-full"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="glass-card p-6 border-l-4 border-[var(--accent-primary)] bg-gradient-to-r from-[var(--accent-primary)]/5 to-transparent">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-[var(--accent-primary)] text-[var(--bg)] text-xs font-medium px-2 py-1 rounded-full">
                            Current
                          </span>
                          <span className="text-xs text-[var(--text-muted)] bg-[var(--surface-hover)] px-2 py-1 rounded-full">
                            Aug 2024 - Present
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-[var(--text-primary)]">Content Developer</h3>
                        <p className="text-sm text-[var(--accent-primary)] mt-1 font-medium">Nitzanim Program</p>
                        <p className="text-sm text-[var(--text-secondary)] mt-3 leading-relaxed">
                          Developing comprehensive educational content and curriculum for programming courses. Creating engaging learning materials, 
                          assessment tools, and hands-on projects to enhance student understanding of software development concepts.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Python Instructor */}
                  <div className="relative flex items-start gap-6">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 relative z-10 shadow-lg">
                      <div className="w-3 h-3 bg-[var(--bg)] rounded-full"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="glass-card p-6 border-l-4 border-purple-500 bg-gradient-to-r from-purple-500/5 to-transparent">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-purple-500 text-[var(--bg)] text-xs font-medium px-2 py-1 rounded-full">
                            Current
                          </span>
                          <span className="text-xs text-[var(--text-muted)] bg-[var(--surface-hover)] px-2 py-1 rounded-full">
                            Jan 2023 - Present
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-[var(--text-primary)]">Python Instructor</h3>
                        <p className="text-sm text-purple-400 mt-1 font-medium">Nitzanim Program</p>
                        <p className="text-sm text-[var(--text-secondary)] mt-3 leading-relaxed">
                          Teaching Python programming fundamentals to advanced topics including algorithms, data structures, and object-oriented programming. 
                          Training over 650 students in Python programming, preparing them for technological units in the IDF.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* High School CS Teacher */}
                  <div className="relative flex items-start gap-6">
                    <div className="w-8 h-8 bg-[var(--surface)] border-2 border-[var(--border)] rounded-full flex items-center justify-center flex-shrink-0 relative z-10">
                      <div className="w-2 h-2 bg-[var(--text-muted)] rounded-full"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="glass-card p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <h3 className="font-semibold text-[var(--text-primary)]">High School Computer Science Teacher</h3>
                          <span className="text-xs text-[var(--text-muted)] bg-[var(--surface-hover)] px-2 py-1 rounded-full w-fit">
                            2024
                          </span>
                        </div>
                        <p className="text-sm text-[var(--accent-primary)] mt-1">Leyman High School</p>
                        <p className="text-sm text-[var(--text-secondary)] mt-2">
                          Taught Java programming concepts including recursion, data structures, and object-oriented programming (OOP). 
                          Prepared over 50 students for national Bagrut exams, focusing on practical programming skills and theoretical foundations.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Help Desk Technician - Isracard */}
                  <div className="relative flex items-start gap-6">
                    <div className="w-8 h-8 bg-[var(--surface)] border-2 border-[var(--border)] rounded-full flex items-center justify-center flex-shrink-0 relative z-10">
                      <div className="w-2 h-2 bg-[var(--text-muted)] rounded-full"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="glass-card p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <h3 className="font-semibold text-[var(--text-primary)]">Help Desk Technician</h3>
                          <span className="text-xs text-[var(--text-muted)] bg-[var(--surface-hover)] px-2 py-1 rounded-full w-fit">
                            Aug 2023 - Sep 2023
                          </span>
                        </div>
                        <p className="text-sm text-[var(--accent-primary)] mt-1">Isracard • Bnei Brak, Tel Aviv District, Israel</p>
                        <p className="text-sm text-[var(--text-secondary)] mt-2">
                          Provided comprehensive technical support for hardware and software issues. Specialized in troubleshooting 
                          and resolving complex technical problems for internal users.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Help Desk Technician - IEC Electronics Corp */}
                  <div className="relative flex items-start gap-6">
                    <div className="w-8 h-8 bg-[var(--surface)] border-2 border-[var(--border)] rounded-full flex items-center justify-center flex-shrink-0 relative z-10">
                      <div className="w-2 h-2 bg-[var(--text-muted)] rounded-full"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="glass-card p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <h3 className="font-semibold text-[var(--text-primary)]">Help Desk Technician</h3>
                          <span className="text-xs text-[var(--text-muted)] bg-[var(--surface-hover)] px-2 py-1 rounded-full w-fit">
                            Jul 2022 - Sep 2022
                          </span>
                        </div>
                        <p className="text-sm text-[var(--accent-primary)] mt-1">IEC Electronics Corp.</p>
                        <p className="text-sm text-[var(--text-secondary)] mt-2">
                          Delivered Tier 2 technical support for over 1,000 employees, resolving complex issues involving Active Directory, 
                          Citrix, and network troubleshooting. Enhanced system performance by optimizing remote connection configurations and reducing ticket resolution times.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Previous Help Desk Role - IEC Electronics Corp */}
                  <div className="relative flex items-start gap-6">
                    <div className="w-8 h-8 bg-[var(--surface)] border-2 border-[var(--border)] rounded-full flex items-center justify-center flex-shrink-0 relative z-10">
                      <div className="w-2 h-2 bg-[var(--text-muted)] rounded-full"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="glass-card p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <h3 className="font-semibold text-[var(--text-primary)]">Help Desk Technician</h3>
                          <span className="text-xs text-[var(--text-muted)] bg-[var(--surface-hover)] px-2 py-1 rounded-full w-fit">
                            Apr 2021 - Aug 2021
                          </span>
                        </div>
                        <p className="text-sm text-[var(--accent-primary)] mt-1">IEC Electronics Corp.</p>
                        <p className="text-sm text-[var(--text-secondary)] mt-2">
                          Provided technical support for Active Directory, Network Administration, and general IT troubleshooting. 
                          Gained foundational experience in enterprise IT support and system administration.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Network Support Technician - Israel Defense Forces */}
                  <div className="relative flex items-start gap-6">
                    <div className="w-8 h-8 bg-[var(--surface)] border-2 border-[var(--border)] rounded-full flex items-center justify-center flex-shrink-0 relative z-10">
                      <div className="w-2 h-2 bg-[var(--text-muted)] rounded-full"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="glass-card p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <h3 className="font-semibold text-[var(--text-primary)]">Network Support Technician</h3>
                          <span className="text-xs text-[var(--text-muted)] bg-[var(--surface-hover)] px-2 py-1 rounded-full w-fit">
                            Feb 2020 - Apr 2021
                          </span>
                        </div>
                        <p className="text-sm text-[var(--accent-primary)] mt-1">Israel Defense Forces</p>
                        <p className="text-sm text-[var(--text-secondary)] mt-2">
                          Provided network support and technical assistance in a military environment. 
                          Developed strong problem-solving skills and gained experience in network administration and system troubleshooting.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="mt-12">
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">Education</h2>
              <div className="glass-card p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-[var(--text-primary)]">B.Sc. Software Engineering</h3>
                    <span className="text-xs bg-gradient-to-r from-[var(--accent-primary)] to-blue-500 text-white px-2 py-1 rounded-full font-medium">
                      Grade: 82
                    </span>
                  </div>
                  <span className="text-xs text-[var(--text-muted)] bg-[var(--surface-hover)] px-2 py-1 rounded-full w-fit">
                    2021 - 2025
                  </span>
                </div>
                <p className="text-sm text-[var(--accent-primary)] mt-1">Ben-Gurion University of the Negev</p>
                <p className="text-sm text-[var(--text-secondary)] mt-2">
                  Completed comprehensive studies in software engineering fundamentals, algorithms, data structures, computer vision, AI/ML, 
                  and enterprise software development. Gained hands-on experience through multiple projects and practical application of theoretical concepts.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
