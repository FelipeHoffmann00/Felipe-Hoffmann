/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { 
  GraduationCap, 
  Mail, 
  MapPin, 
  Linkedin, 
  Github, 
  Twitter, 
  ChevronRight,
  ExternalLink,
  X,
  Link as LinkIcon,
  Code2,
  Activity,
  Zap
} from "lucide-react";
import { useState, useEffect } from "react";
import { RESUME_DATA, Experience, Project } from "./constants";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function App() {
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);

  // Close modal on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedExperience(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div className="min-h-screen selection:bg-brand-ink selection:text-brand-bg">
      {/* Navigation Rail / Header */}
      <nav className="fixed top-0 left-0 w-full h-16 border-b border-brand-line bg-brand-bg/80 backdrop-blur-md z-50 px-6 flex items-center justify-between">
        <div className="font-mono text-xs font-medium tracking-tighter uppercase">
          {(() => {
            const parts = RESUME_DATA.name.split(' ');
            return `${parts[0][0]}.${parts[parts.length - 1][0]}`;
          })()} / PORTFOLIO
        </div>
        <div className="flex gap-6 items-center">
          <a href="#projects" className="text-[11px] font-mono uppercase tracking-widest text-brand-muted hover:text-brand-ink transition-colors">Projetos</a>
          <a href="#experience" className="text-[11px] font-mono uppercase tracking-widest text-brand-muted hover:text-brand-ink transition-colors">Experiência</a>
          <a href="#skills" className="text-[11px] font-mono uppercase tracking-widest text-brand-muted hover:text-brand-ink transition-colors">Habilidades</a>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pt-32 pb-24 space-y-32">
        
        {/* HERO SECTION */}
        <motion.section 
          variants={fadeIn}
          initial="initial"
          animate="animate"
          className="space-y-8"
        >
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] text-brand-ink">
              {RESUME_DATA.name}
            </h1>
            <p className="text-2xl md:text-3xl text-brand-muted font-light tracking-tight max-w-2xl">
              {RESUME_DATA.title}
            </p>
          </div>

          <div className="flex flex-wrap gap-6 items-center text-sm font-mono text-brand-muted">
            <div className="flex items-center gap-2">
              <MapPin size={16} /> {RESUME_DATA.location}
            </div>
            <div className="flex items-center gap-2">
              <Mail size={16} /> {RESUME_DATA.email}
            </div>
          </div>

          <div className="max-w-2xl text-lg text-brand-muted leading-relaxed">
            {RESUME_DATA.summary}
          </div>
        </motion.section>

        <section id="projects" className="space-y-12">
          <div className="flex items-center gap-4">
            <Code2 className="text-brand-ink" size={24} />
            <h2 className="text-3xl font-bold tracking-tight">Projetos</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(RESUME_DATA as any).projects.map((project: any, i: number) => (
              <motion.div
                key={i}
                variants={fadeIn}
                initial="initial"
                whileInView="animate"
                whileHover={{ y: -8, x: 8 }}
                transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                viewport={{ once: true }}
                className="group p-8 border-2 border-brand-ink transition-colors duration-300 space-y-6 cursor-default bg-brand-bg hover:bg-brand-ink"
              >
                <div className="space-y-3">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-muted group-hover:text-brand-bg/50 transition-colors">
                    Project 0{i + 1}
                  </div>
                  <h3 className="text-xl font-bold tracking-tight group-hover:text-brand-bg transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-brand-muted group-hover:text-brand-bg/70 leading-relaxed transition-colors">
                    {project.description}
                  </p>
                </div>
                {project.tags && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.map((tag: string) => (
                      <span key={tag} className="text-[9px] font-mono uppercase tracking-widest px-2 py-1 border border-brand-line group-hover:border-brand-bg/30 group-hover:text-brand-bg transition-all">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* EXPERIENCE & EDUCATION */}
        <section id="experience" className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-12">
            <div className="flex items-center gap-4">
              <Activity className="text-brand-ink" size={24} />
              <h2 className="text-3xl font-bold tracking-tight">Experiência Profissional</h2>
            </div>
            
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="space-y-12"
            >
              {RESUME_DATA.experience.map((exp, i) => (
                <motion.div 
                  key={i} 
                  variants={fadeIn} 
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  onClick={() => setSelectedExperience(exp)}
                  className="group relative pl-8 border-l border-brand-line space-y-3 hover:border-brand-ink transition-colors cursor-pointer"
                >
                  <div className="absolute -left-[5px] top-1.5 w-2 h-2 bg-brand-line group-hover:bg-brand-ink transition-colors" />
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <h3 className="text-xl font-bold tracking-tight">{exp.role}</h3>
                    <span className="font-mono text-xs text-brand-muted uppercase tracking-tighter bg-brand-line/30 px-2 py-1">
                      {exp.period}
                    </span>
                  </div>
                  <div className="text-brand-ink font-medium">{exp.company}</div>
                  <p className="text-brand-muted leading-relaxed max-w-3xl line-clamp-2">
                    {exp.description}
                  </p>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-brand-muted uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                    Ver detalhes <ChevronRight size={10} />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="lg:col-span-4 space-y-12">
            <div className="flex items-center gap-4">
              <GraduationCap className="text-brand-ink" size={24} />
              <h2 className="text-3xl font-bold tracking-tight">Formação</h2>
            </div>
            <div className="space-y-8">
              {RESUME_DATA.education.map((edu, i) => (
                <div key={i} className="space-y-2">
                  <div className="font-mono text-[10px] text-brand-muted uppercase tracking-widest">
                    {edu.period}
                  </div>
                  <h3 className="font-bold tracking-tight leading-tight">{edu.degree}</h3>
                  <p className="text-sm text-brand-muted">{edu.institution}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-brand-line pb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Zap className="text-brand-ink" size={24} />
                <h2 className="text-5xl font-bold tracking-tighter">Habilidades</h2>
              </div>
              <p className="text-brand-muted font-mono text-sm">Competências técnicas e linguísticas</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-brand-muted opacity-50">Expertise / 2026</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {(['Technical', 'Soft Skills', 'Languages'] as const).map(category => (
              <div key={category} className="space-y-6">
                <h3 className="font-mono text-xs uppercase tracking-widest text-brand-muted border-b border-brand-line pb-2">
                  {category === 'Technical' ? 'Técnicas' : category === 'Soft Skills' ? 'Interpessoais' : 'Idiomas'}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {RESUME_DATA.skills
                    .filter(s => s.category === category)
                    .map(skill => (
                      <div 
                        key={skill.name}
                        className="group flex items-center gap-2 px-3 py-2 border border-brand-line hover:border-brand-ink transition-all cursor-default"
                      >
                        <ChevronRight size={12} className="text-brand-muted group-hover:text-brand-ink group-hover:translate-x-1 transition-all" />
                        <span className="text-sm font-medium tracking-tight">{skill.name}</span>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER / CONTACT */}
        <footer className="pt-32 border-t border-brand-line">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-8">
              <h2 className="text-4xl font-bold tracking-tighter">Vamos construir algo juntos?</h2>
              
              <div className="space-y-6 max-w-md">
                <p className="text-brand-muted leading-relaxed">
                  Estou sempre aberto a novos projetos e parcerias. Clique no botão abaixo para me enviar um e-mail diretamente.
                </p>
                <a 
                  href="mailto:fg.hoffmann2@gmail.com"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-brand-ink text-brand-bg rounded-none text-xs font-mono uppercase tracking-[0.2em] hover:invert transition-all"
                >
                  <ExternalLink size={16} /> Entrar em Contato
                </a>
              </div>

              <div className="flex gap-4 pt-4">
                <a 
                  href={RESUME_DATA.social.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-4 border border-brand-line hover:bg-brand-ink hover:text-brand-bg transition-all"
                >
                  <Linkedin size={20} />
                </a>
                {RESUME_DATA.social.github && (
                  <a 
                    href={RESUME_DATA.social.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-4 border border-brand-line hover:bg-brand-ink hover:text-brand-bg transition-all"
                  >
                    <Github size={20} />
                  </a>
                )}
                {RESUME_DATA.social.twitter && (
                  <a 
                    href={RESUME_DATA.social.twitter} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-4 border border-brand-line hover:bg-brand-ink hover:text-brand-bg transition-all"
                  >
                    <Twitter size={20} />
                  </a>
                )}
              </div>
            </div>
          </div>
          
          <div className="mt-16 pt-8 border-t border-brand-line text-center">
            <div className="text-[10px] font-mono text-brand-muted uppercase tracking-widest">
              © {new Date().getFullYear()} <a href={RESUME_DATA.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-brand-ink transition-colors">{RESUME_DATA.name}</a>
            </div>
          </div>
        </footer>

      </main>

      {/* Decorative Grid Overlay (Subtle) */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] overflow-hidden -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#141414_1px,transparent_1px),linear-gradient(to_bottom,#141414_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      {/* Experience Modal */}
      <AnimatePresence>
        {selectedExperience && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedExperience(null)}
              className="fixed inset-0 bg-brand-bg/90 backdrop-blur-sm z-[60] cursor-crosshair"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl bg-brand-bg border border-brand-line p-8 md:p-12 z-[70] shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <button 
                onClick={() => setSelectedExperience(null)}
                className="absolute top-6 right-6 p-2 hover:bg-brand-line/20 transition-colors"
                aria-label="Fecar modal"
              >
                <X size={20} />
              </button>

              <div className="space-y-8">
                <div className="space-y-2">
                  <div className="font-mono text-xs text-brand-muted uppercase tracking-widest flex items-center gap-2">
                    <span className="w-4 h-px bg-brand-line"></span>
                    {selectedExperience.period}
                  </div>
                  <h3 className="text-4xl font-bold tracking-tighter text-brand-ink">
                    {selectedExperience.role}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="text-xl text-brand-muted">{selectedExperience.company}</div>
                    {selectedExperience.url && (
                      <a 
                        href={selectedExperience.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-brand-ink hover:underline"
                      >
                        <LinkIcon size={14} /> Website
                      </a>
                    )}
                  </div>
                </div>

                <div className="h-px bg-brand-line w-full" />

                <div className="space-y-4">
                  <h4 className="font-mono text-[10px] uppercase tracking-widest text-brand-muted">Descrição</h4>
                  <p className="text-lg leading-relaxed text-brand-muted">
                    {selectedExperience.description}
                  </p>
                </div>

                {selectedExperience.technologies && (
                  <div className="space-y-4">
                    <h4 className="font-mono text-[10px] uppercase tracking-widest text-brand-muted">Tecnologias</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedExperience.technologies.map(tech => (
                        <span key={tech} className="px-3 py-1 bg-brand-line/30 text-brand-ink text-xs font-mono uppercase tracking-tighter">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-8">
                   <button 
                    onClick={() => setSelectedExperience(null)}
                    className="w-full py-4 border border-brand-ink bg-brand-ink text-brand-bg font-mono text-xs uppercase tracking-widest hover:bg-brand-bg hover:text-brand-ink transition-all"
                  >
                    Fechar Detalhes
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
