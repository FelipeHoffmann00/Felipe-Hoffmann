/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { 
  Briefcase, 
  GraduationCap, 
  Mail, 
  MapPin, 
  Linkedin, 
  Github, 
  Twitter, 
  ChevronRight,
  Download,
  Send
} from "lucide-react";
import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./lib/firebase";
import { RESUME_DATA } from "./constants";

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
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      await addDoc(collection(db, "leads"), {
        ...formData,
        createdAt: serverTimestamp()
      });
      setStatus({ type: 'success', msg: 'Mensagem enviada com sucesso!' });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      setStatus({ type: 'error', msg: 'Erro ao enviar mensagem. Tente novamente.' });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen selection:bg-brand-ink selection:text-brand-bg">
      {/* Navigation Rail / Header */}
      <nav className="fixed top-0 left-0 w-full h-16 border-b border-brand-line bg-brand-bg/80 backdrop-blur-md z-50 px-6 flex items-center justify-between">
        <div className="font-mono text-xs font-medium tracking-tighter uppercase">
          {RESUME_DATA.name.split(' ').map(n => n[0]).join('.')} / PORTFOLIO
        </div>
        <div className="flex gap-6 items-center">
          <a href="#experience" className="text-[11px] font-mono uppercase tracking-widest text-brand-muted hover:text-brand-ink transition-colors">Experiência</a>
          <a href="#skills" className="text-[11px] font-mono uppercase tracking-widest text-brand-muted hover:text-brand-ink transition-colors">Habilidades</a>
          <button className="flex items-center gap-2 px-4 py-2 bg-brand-ink text-brand-bg rounded-none text-[11px] font-mono uppercase tracking-widest hover:invert transition-all">
            <Download size={14} /> CV PDF
          </button>
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
            <div className="flex items-center gap-2 text-brand-muted font-mono text-xs uppercase tracking-widest">
              <span className="w-8 h-px bg-brand-line"></span>
              Disponível para novos desafios
            </div>
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

        {/* EXPERIENCE & EDUCATION */}
        <section id="experience" className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-12">
            <div className="flex items-center gap-4">
              <Briefcase className="text-brand-ink" size={24} />
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
                <motion.div key={i} variants={fadeIn} className="group relative pl-8 border-l border-brand-line space-y-3 hover:border-brand-ink transition-colors">
                  <div className="absolute -left-[5px] top-1.5 w-2 h-2 bg-brand-line group-hover:bg-brand-ink transition-colors" />
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <h3 className="text-xl font-bold tracking-tight">{exp.role}</h3>
                    <span className="font-mono text-xs text-brand-muted uppercase tracking-tighter bg-brand-line/30 px-2 py-1">
                      {exp.period}
                    </span>
                  </div>
                  <div className="text-brand-ink font-medium">{exp.company}</div>
                  <p className="text-brand-muted leading-relaxed max-w-3xl">
                    {exp.description}
                  </p>
                  {exp.technologies && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {exp.technologies.map(tech => (
                        <span key={tech} className="text-[10px] font-mono uppercase tracking-widest text-brand-ink bg-brand-line/50 px-2 py-0.5">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
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

        {/* SKILLS SECTION */}
        <section id="skills" className="space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-brand-line pb-8">
            <div className="space-y-4">
              <h2 className="text-5xl font-bold tracking-tighter">Habilidades</h2>
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
              
              <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
                <div className="grid grid-cols-1 gap-4">
                  <input 
                    type="text" 
                    placeholder="Nome"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-brand-line/20 border border-brand-line p-4 text-sm font-mono focus:outline-none focus:border-brand-ink transition-colors"
                  />
                  <input 
                    type="email" 
                    placeholder="E-mail"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-brand-line/20 border border-brand-line p-4 text-sm font-mono focus:outline-none focus:border-brand-ink transition-colors"
                  />
                  <textarea 
                    placeholder="Sua mensagem"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-brand-line/20 border border-brand-line p-4 text-sm font-mono focus:outline-none focus:border-brand-ink transition-colors resize-none"
                  />
                </div>
                
                {status && (
                  <div className={`text-xs font-mono uppercase tracking-widest ${status.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                    {status.msg}
                  </div>
                )}

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-8 py-4 bg-brand-ink text-brand-bg rounded-none text-xs font-mono uppercase tracking-[0.2em] hover:invert transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Enviando..." : <><Send size={16} /> Enviar Mensagem</>}
                </button>
              </form>

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

            <div className="flex flex-col justify-end space-y-4">
              <p className="text-brand-muted text-sm font-mono leading-relaxed">
                Desenvolva seu futuro elevando sua presença digital. Projetado com foco em tipografia e clareza.
              </p>
              <div className="text-[10px] font-mono text-brand-muted uppercase tracking-widest pt-4">
                © {new Date().getFullYear()} {RESUME_DATA.name} — All Rights Reserved
              </div>
            </div>
          </div>
        </footer>

      </main>

      {/* Decorative Grid Overlay (Subtle) */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] overflow-hidden -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#141414_1px,transparent_1px),linear-gradient(to_bottom,#141414_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>
    </div>
  );
}
