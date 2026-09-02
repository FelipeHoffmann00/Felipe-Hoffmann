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
  ChevronDown,
  ExternalLink,
  X,
  Link as LinkIcon,
  Code2,
  Activity,
  Zap,
  Sun,
  Moon,
  Check,
  Copy,
  Globe,
  Home
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { RESUME_DATA_BY_LANG, Experience, Project } from "./constants";
import { ContactForm } from "./components/ContactForm";
import felipePhoto from "./assets/images/Felipe.png";

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

const getTagColorClass = (tag: string) => {
  const t = tag.toUpperCase().trim();
  if (t.includes("SUPABASE")) {
    return "group-hover:border-emerald-400 group-hover:text-emerald-400 group-hover:bg-emerald-400/10 dark:group-hover:border-emerald-700 dark:group-hover:text-emerald-900 dark:group-hover:bg-emerald-700/15";
  }
  if (t.includes("STUDIO") || t.includes("GOOGLE AI")) {
    return "group-hover:border-blue-400 group-hover:text-blue-400 group-hover:bg-blue-400/10 dark:group-hover:border-blue-700 dark:group-hover:text-blue-900 dark:group-hover:bg-blue-700/15";
  }
  if (t.includes("FIREBASE")) {
    return "group-hover:border-amber-400 group-hover:text-amber-400 group-hover:bg-amber-400/10 dark:group-hover:border-amber-700 dark:group-hover:text-amber-900 dark:group-hover:bg-amber-700/15";
  }
  if (t.includes("RBAC") || t.includes("ACESSO") || t.includes("ACCESS")) {
    return "group-hover:border-violet-400 group-hover:text-violet-400 group-hover:bg-violet-400/10 dark:group-hover:border-violet-700 dark:group-hover:text-violet-900 dark:group-hover:bg-violet-700/15";
  }
  if (t.includes("AI") || t.includes("IA")) {
    return "group-hover:border-cyan-400 group-hover:text-cyan-400 group-hover:bg-cyan-400/10 dark:group-hover:border-cyan-700 dark:group-hover:text-cyan-900 dark:group-hover:bg-cyan-700/15";
  }
  if (t.includes("SAAS") || t.includes("CMS") || t.includes("ADMIN")) {
    return "group-hover:border-indigo-400 group-hover:text-indigo-400 group-hover:bg-indigo-400/10 dark:group-hover:border-indigo-700 dark:group-hover:text-indigo-900 dark:group-hover:bg-indigo-700/15";
  }
  if (t.includes("AUTOMAÇÃO") || t.includes("AUTOMACAO") || t.includes("AUTOMATION")) {
    return "group-hover:border-purple-400 group-hover:text-purple-400 group-hover:bg-purple-400/10 dark:group-hover:border-purple-700 dark:group-hover:text-purple-900 dark:group-hover:bg-purple-700/15";
  }
  if (t.includes("EXCEL")) {
    return "group-hover:border-emerald-400 group-hover:text-emerald-400 group-hover:bg-emerald-400/10 dark:group-hover:border-emerald-700 dark:group-hover:text-emerald-900 dark:group-hover:bg-emerald-700/15";
  }
  if (t.includes("REGISTRO")) {
    return "group-hover:border-teal-400 group-hover:text-teal-400 group-hover:bg-teal-400/10 dark:group-hover:border-teal-700 dark:group-hover:text-teal-900 dark:group-hover:bg-teal-700/15";
  }
  if (t.includes("JAVASCRIPT") || t.includes("JS")) {
    return "group-hover:border-yellow-400 group-hover:text-yellow-400 group-hover:bg-yellow-400/10 dark:group-hover:border-amber-700 dark:group-hover:text-amber-900 dark:group-hover:bg-amber-600/15";
  }
  if (t.includes("DASHBOARD")) {
    return "group-hover:border-rose-400 group-hover:text-rose-400 group-hover:bg-rose-400/10 dark:group-hover:border-rose-700 dark:group-hover:text-rose-900 dark:group-hover:bg-rose-700/15";
  }
  if (t.includes("ANÁLISE") || t.includes("ANALISE") || t.includes("ANALYTICS") || t.includes("DATA")) {
    return "group-hover:border-sky-400 group-hover:text-sky-400 group-hover:bg-sky-400/10 dark:group-hover:border-sky-700 dark:group-hover:text-sky-900 dark:group-hover:bg-sky-700/15";
  }
  if (t.includes("ETL")) {
    return "group-hover:border-fuchsia-400 group-hover:text-fuchsia-400 group-hover:bg-fuchsia-400/10 dark:group-hover:border-fuchsia-700 dark:group-hover:text-fuchsia-900 dark:group-hover:bg-fuchsia-700/15";
  }
  return "group-hover:border-teal-400 group-hover:text-teal-400 group-hover:bg-teal-400/10 dark:group-hover:border-zinc-700 dark:group-hover:text-zinc-900 dark:group-hover:bg-zinc-700/15";
};

export default function App() {
  const [lang, setLang] = useState<'pt' | 'en'>(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('lang');
      if (savedLang === 'en' || savedLang === 'pt') return savedLang;
    }
    return 'pt';
  });

  const resumeData = RESUME_DATA_BY_LANG[lang];

  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [selectedEducation, setSelectedEducation] = useState<number | null>(null);
  const [expandedProjects, setExpandedProjects] = useState<number[]>([]);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Detect desktop view for hover displacement effects (disabled on mobile)
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 768;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleProject = (index: number) => {
    setExpandedProjects(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(resumeData.email);
    setCopiedEmail(true);
    setTimeout(() => {
      setCopiedEmail(false);
    }, 2000);
  };
  
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    document.documentElement.lang = lang;
    localStorage.setItem('lang', lang);
  }, [lang]);

  const toggleTheme = () => setIsDark(prev => !prev);
  const toggleLanguage = () => setLang(prev => (prev === 'pt' ? 'en' : 'pt'));

  // Active section tracking for navigation highlighting
  const [activeSection, setActiveSection] = useState<'home' | 'projects' | 'experience' | 'skills' | 'contact'>('home');
  const isProgrammaticScroll = useRef(false);
  const scrollTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Do not recalculate active section while smooth scrolling programmatically to prevent jitter
      if (isProgrammaticScroll.current) return;

      const scrollPos = window.scrollY + 200;
      const sections: ('contact' | 'skills' | 'experience' | 'projects')[] = [
        'contact',
        'skills',
        'experience',
        'projects',
      ];

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(id);
          return;
        }
      }
      setActiveSection('home');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const scrollToSection = (id: 'home' | 'projects' | 'experience' | 'skills' | 'contact') => {
    // Immediately set the target section to trigger smooth, direct indicator motion
    setActiveSection(id);
    isProgrammaticScroll.current = true;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = window.setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 850);

    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -70;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Close modal on escape key & prevent body scrolling when modal is open
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedExperience(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  useEffect(() => {
    if (selectedExperience) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedExperience]);

  return (
    <div className="min-h-screen selection:bg-brand-ink selection:text-brand-bg transition-colors duration-300">
      {/* DESKTOP NAVIGATION BAR (TOP) */}
      <nav className="hidden md:block fixed top-0 left-0 w-full h-16 border-b border-brand-line bg-brand-bg/80 backdrop-blur-md z-50 transition-colors duration-300">
        <div className="max-w-6xl mx-auto w-full h-full px-4 md:px-6 flex items-center justify-between">
          <button 
            onClick={() => scrollToSection('home')}
            className="font-mono text-xs font-semibold tracking-wider uppercase text-brand-ink hover:opacity-70 transition-opacity cursor-pointer flex items-center gap-2"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 dark:bg-[#00FF66]"></span>
            </span>
            <span>FELIPE HOFFMANN</span>
          </button>
          <div className="flex gap-4 lg:gap-6 items-center">
            <button 
              onClick={() => scrollToSection('projects')} 
              className={`text-[11px] font-mono uppercase tracking-widest transition-colors cursor-pointer ${
                activeSection === 'projects' ? 'text-brand-ink font-bold' : 'text-brand-muted hover:text-brand-ink'
              }`}
            >
              {resumeData.nav.projects}
            </button>
            <button 
              onClick={() => scrollToSection('experience')} 
              className={`text-[11px] font-mono uppercase tracking-widest transition-colors cursor-pointer ${
                activeSection === 'experience' ? 'text-brand-ink font-bold' : 'text-brand-muted hover:text-brand-ink'
              }`}
            >
              {resumeData.nav.experience}
            </button>
            <button 
              onClick={() => scrollToSection('skills')} 
              className={`text-[11px] font-mono uppercase tracking-widest transition-colors cursor-pointer ${
                activeSection === 'skills' ? 'text-brand-ink font-bold' : 'text-brand-muted hover:text-brand-ink'
              }`}
            >
              {resumeData.nav.skills}
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className={`text-[11px] font-mono uppercase tracking-widest transition-colors cursor-pointer ${
                activeSection === 'contact' ? 'text-brand-ink font-bold' : 'text-brand-muted hover:text-brand-ink'
              }`}
            >
              {resumeData.nav.contact}
            </button>

            {/* Language Switch Toggle */}
            <div className="flex items-center border border-brand-line p-0.5 ml-2 bg-brand-bg/50">
              <button
                onClick={() => setLang('pt')}
                className={`px-2 py-1 text-[10px] font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  lang === 'pt'
                    ? 'bg-brand-ink text-brand-bg font-bold shadow-sm'
                    : 'text-brand-muted hover:text-brand-ink'
                }`}
                aria-label="Mudar para Português"
                title="Português (PT)"
              >
                PT
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2 py-1 text-[10px] font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  lang === 'en'
                    ? 'bg-brand-ink text-brand-bg font-bold shadow-sm'
                    : 'text-brand-muted hover:text-brand-ink'
                }`}
                aria-label="Switch to English"
                title="English (EN)"
              >
                EN
              </button>
            </div>
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`p-2 border border-brand-line transition-all flex items-center justify-center rounded-none group cursor-pointer ${
                isDark 
                  ? "hover:border-amber-500/50 hover:bg-amber-500/10" 
                  : "hover:border-purple-500/50 hover:bg-purple-500/10"
              }`}
              aria-label={isDark ? "Ativar Modo Claro" : "Ativar Modo Escuro"}
              title={isDark ? "Modo Claro" : "Modo Escuro"}
            >
              {isDark ? (
                <Sun size={15} className="text-amber-400 group-hover:rotate-45 transition-transform duration-300" />
              ) : (
                <Moon size={15} className="text-purple-700 dark:text-purple-400 group-hover:-rotate-12 transition-transform duration-300" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE TOP BRAND & SETTINGS BAR */}
      <header className="md:hidden fixed top-0 left-0 w-full h-14 border-b border-brand-line bg-brand-bg/90 backdrop-blur-md z-40 transition-colors duration-300">
        <div className="w-full h-full px-4 flex items-center justify-between">
          <button 
            onClick={() => scrollToSection('home')}
            className="font-mono text-xs font-semibold tracking-wider uppercase text-brand-ink flex items-center gap-2 cursor-pointer active:opacity-70"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 dark:bg-[#00FF66]"></span>
            </span>
            <span>FELIPE HOFFMANN</span>
          </button>

          <div className="flex items-center gap-2">
            {/* Mobile Language Switcher */}
            <div className="flex items-center border border-brand-line p-0.5 bg-brand-bg/50">
              <button
                onClick={() => setLang('pt')}
                className={`px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  lang === 'pt'
                    ? 'bg-brand-ink text-brand-bg font-bold shadow-sm'
                    : 'text-brand-muted hover:text-brand-ink'
                }`}
                aria-label="Português"
              >
                PT
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  lang === 'en'
                    ? 'bg-brand-ink text-brand-bg font-bold shadow-sm'
                    : 'text-brand-muted hover:text-brand-ink'
                }`}
                aria-label="English"
              >
                EN
              </button>
            </div>

            {/* Mobile Theme Switcher */}
            <button
              onClick={toggleTheme}
              className={`p-1.5 border border-brand-line transition-all flex items-center justify-center cursor-pointer ${
                isDark 
                  ? "hover:border-amber-500/50 hover:bg-amber-500/10 text-amber-400" 
                  : "hover:border-purple-500/50 hover:bg-purple-500/10 text-purple-700 dark:text-purple-400"
              }`}
              aria-label={isDark ? "Ativar Modo Claro" : "Ativar Modo Escuro"}
            >
              {isDark ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE BOTTOM NAVIGATION BAR (ERGONOMIC THUMB DOCK) */}
      <nav 
        aria-label="Navegação móvel"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-brand-bg/95 backdrop-blur-xl border-t border-brand-line px-1 sm:px-2 pt-1 pb-[max(0.55rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_-8px_24px_rgba(0,0,0,0.45)] transition-colors duration-300"
      >
        <div className="grid grid-cols-5 items-center justify-around max-w-md mx-auto w-full">
          {[
            { id: 'home', label: resumeData.nav.home, icon: Home },
            { id: 'projects', label: resumeData.nav.projects, icon: Code2 },
            { id: 'experience', label: resumeData.nav.experience, icon: Activity },
            { id: 'skills', label: resumeData.nav.skills, icon: Zap },
            { id: 'contact', label: resumeData.nav.contact, icon: Mail },
          ].map(item => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id as any)}
                className={`flex flex-col items-center justify-center py-1 px-0.5 min-h-[48px] rounded-lg transition-colors duration-150 cursor-pointer relative ${
                  isActive 
                    ? 'text-emerald-600 dark:text-[#00FF66]' 
                    : 'text-brand-muted hover:text-brand-ink'
                }`}
                aria-label={item.label}
              >
                {isActive && (
                  <motion.div
                    layoutId="mobileNavActiveIndicator"
                    className="absolute inset-x-0.5 inset-y-0.5 bg-emerald-500/10 dark:bg-[#00FF66]/10 border border-emerald-500/20 dark:border-[#00FF66]/20 rounded-md -z-10"
                    transition={{ type: "tween", duration: 0.22, ease: [0.25, 1, 0.5, 1] }}
                  />
                )}
                <div className="h-[20px] flex items-center justify-center">
                  <Icon 
                    size={isActive ? 19 : 17} 
                    className={`transition-colors duration-150 ${
                      isActive 
                        ? 'stroke-[2.2] text-emerald-600 dark:text-[#00FF66]' 
                        : 'stroke-[1.6] text-brand-muted'
                    }`} 
                  />
                </div>
                <span 
                  className={`tracking-tight whitespace-nowrap mt-0.5 text-center leading-none transition-colors duration-150 ${
                    isActive 
                      ? 'text-[9.5px] font-sans font-bold text-emerald-600 dark:text-[#00FF66]' 
                      : 'text-[9px] font-sans font-medium text-brand-muted'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      <AnimatePresence mode="wait">
        <motion.div
          key={lang}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <main className="max-w-6xl mx-auto px-4 md:px-6 pt-18 md:pt-32 pb-28 md:pb-24 space-y-16 md:space-y-32">
            
            {/* HERO SECTION */}
            <motion.section 
              variants={fadeIn}
              initial="initial"
              animate="animate"
              className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center"
            >
              <div className="md:col-span-8 space-y-6 md:space-y-8">
                <div className="space-y-4">
                  <h1 className="font-display text-4xl sm:text-7xl md:text-8xl font-bold tracking-tighter leading-[1.05] sm:leading-[1] md:leading-[0.9] text-brand-ink">
                    {resumeData.name}
                  </h1>
                  <p className="font-display text-xl sm:text-2xl md:text-3xl text-brand-muted font-light tracking-tight max-w-2xl">
                    {resumeData.title}
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 sm:gap-6 items-center text-sm font-mono text-brand-muted">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-rose-500 dark:text-rose-400 shrink-0" /> {resumeData.location}
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="group inline-flex items-center gap-2 py-1 px-2 -mx-2 rounded hover:bg-brand-line/20 transition-all cursor-pointer text-left"
                    aria-label="Copiar e-mail"
                    title={copiedEmail ? resumeData.emailTooltip.copied : "Copiar e-mail"}
                  >
                    <Mail size={16} className="text-sky-500 dark:text-sky-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 shrink-0 transition-colors" />
                    <span className="text-brand-muted group-hover:text-brand-ink transition-colors">
                      {resumeData.email}
                    </span>
                    <span className="inline-flex items-center ml-0.5">
                      {copiedEmail ? (
                        <span className="inline-flex items-center gap-1 font-mono text-[11px] text-emerald-600 dark:text-[#00FF66] font-semibold animate-in fade-in zoom-in-95 duration-150">
                          <Check size={14} className="stroke-[2.5]" />
                          <span>{resumeData.emailTooltip.copied}</span>
                        </span>
                      ) : (
                        <Copy 
                          size={14} 
                          className="text-brand-muted/60 group-hover:text-brand-ink transition-colors shrink-0" 
                        />
                      )}
                    </span>
                  </button>
                </div>

                <div className="font-display max-w-2xl text-base md:text-lg text-brand-muted leading-relaxed">
                  {resumeData.summary}
                </div>
              </div>

              <div className="md:col-span-4 flex justify-center md:justify-end">
                <div className="max-w-[220px] sm:max-w-[280px] w-full space-y-3">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-none border border-transparent bg-brand-bg">
                    <img 
                      src={felipePhoto} 
                      alt={resumeData.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  </div>

                  <button
                    onClick={() => scrollToSection('contact')}
                    className="w-full py-3 px-3 rounded-none border border-brand-ink/60 dark:border-white/40 hover:border-green-500 dark:hover:border-[#00FF66] hover:bg-green-500/10 dark:hover:bg-[#00FF66]/10 active:scale-[0.98] transition-all flex items-center justify-center gap-2 font-mono text-xs text-brand-ink group cursor-pointer"
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 dark:bg-[#00FF66]"></span>
                    </span>
                    <span className="font-normal text-brand-ink group-hover:text-green-600 dark:group-hover:text-[#00FF66] transition-colors tracking-tight">
                      {resumeData.statusBadge}
                    </span>
                  </button>
                </div>
              </div>
            </motion.section>

            {/* PROJECTS SECTION */}
            <section id="projects" className="space-y-12">
              <div className="flex items-center gap-4">
                <Code2 className="text-indigo-500 dark:text-indigo-400" size={24} />
                <h2 className="font-display text-3xl font-bold tracking-tight">
                  {resumeData.sections.projects}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {resumeData.projects.map((project: Project, i: number) => {
                  const isExpanded = expandedProjects.includes(i);
                  return (
                    <motion.div
                      key={i}
                      variants={fadeIn}
                      initial="initial"
                      whileInView="animate"
                      whileHover={isDesktop ? { y: -6, x: 6 } : undefined}
                      transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                      viewport={{ once: true }}
                      onClick={() => toggleProject(i)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          toggleProject(i);
                        }
                      }}
                      tabIndex={0}
                      role="button"
                      aria-expanded={isExpanded}
                      aria-label={`${project.title} - ${isExpanded ? resumeData.sections.hideDescription : resumeData.sections.viewDescription}`}
                      className="group p-6 md:p-7 border-2 border-brand-ink transition-all duration-300 flex flex-col justify-between cursor-pointer bg-brand-bg hover:bg-brand-ink h-full select-none"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-muted group-hover:text-brand-bg/50 transition-colors">
                            {resumeData.sections.projectPrefix} 0{i + 1}
                          </div>
                          {project.link && (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-[11px] font-mono font-medium text-emerald-600 dark:text-[#00FF66] group-hover:text-brand-bg hover:underline transition-colors cursor-pointer"
                              onClick={(e) => e.stopPropagation()}
                              title={resumeData.sections.visitWebsite}
                            >
                              <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 dark:bg-[#00FF66]"></span>
                              </span>
                              <span>Live</span>
                              <ExternalLink size={12} />
                            </a>
                          )}
                        </div>

                        <h3 className="text-xl font-bold tracking-tight group-hover:text-brand-bg transition-colors">
                          {project.title}
                        </h3>

                        {/* Interactive Toggle Affordance */}
                        <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-600 dark:text-[#00FF66] group-hover:text-brand-bg transition-colors pt-0.5">
                          <span className="font-medium tracking-tight">
                            {isExpanded ? resumeData.sections.hideDescription : resumeData.sections.viewDescription}
                          </span>
                          <ChevronDown size={14} className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                        </div>

                        {/* Expandable Description */}
                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              key="description"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                              className="overflow-hidden"
                            >
                              <p className="text-sm text-brand-muted group-hover:text-brand-bg/85 leading-relaxed pt-2 pb-1 border-t border-brand-line/40 group-hover:border-brand-bg/20 transition-colors">
                                {project.description}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <div className="mt-auto space-y-4 pt-4">
                        {project.tags && (
                          <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag: string) => (
                              <span key={tag} className={`text-[9px] font-mono font-semibold uppercase tracking-widest px-2 py-1 border border-brand-line text-brand-muted dark:text-zinc-400 bg-brand-bg/50 transition-all ${getTagColorClass(tag)}`}>
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {project.link && (
                          <div className="pt-3 border-t border-brand-line/50 group-hover:border-brand-bg/20">
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-between w-full text-xs font-mono tracking-wider font-semibold text-brand-ink group-hover:text-brand-bg hover:text-emerald-600 dark:hover:text-[#00FF66] transition-colors cursor-pointer"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <span className="flex items-center gap-2">
                                <span>{resumeData.sections.visitWebsite}</span>
                              </span>
                              <ExternalLink size={14} className="shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </a>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            {/* EXPERIENCE & EDUCATION */}
            <section id="experience" className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              <div className="lg:col-span-8 space-y-12">
                <div className="flex items-center gap-4">
                  <Activity className="text-green-500 dark:text-[#00FF66]" size={24} />
                  <h2 className="font-display text-3xl font-bold tracking-tight">
                    {resumeData.sections.experience}
                  </h2>
                </div>
                
                <motion.div 
                  variants={staggerContainer}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  className="space-y-12"
                >
                  {resumeData.experience.map((exp, i) => (
                    <motion.div 
                      key={i} 
                      variants={fadeIn} 
                      whileHover={isDesktop ? { x: 10 } : undefined}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      onClick={() => setSelectedExperience(exp)}
                      className="group relative pl-6 sm:pl-8 py-1 border-l border-brand-line space-y-3 hover:border-green-500 dark:hover:border-[#00FF66] active:opacity-80 transition-all cursor-pointer"
                    >
                      <div className="absolute -left-[5px] top-2.5 w-2 h-2 bg-brand-line group-hover:bg-green-500 dark:group-hover:bg-[#00FF66] transition-colors" />
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <h3 className="font-display text-xl font-bold tracking-tight">{exp.role}</h3>
                        <span className="font-mono text-xs text-brand-muted uppercase tracking-tighter bg-brand-line/30 px-2 py-1 self-start md:self-auto">
                          {exp.period}
                        </span>
                      </div>
                      <div className="text-brand-ink font-medium">{exp.company}</div>
                      <p className="text-brand-muted leading-relaxed max-w-3xl line-clamp-2 text-sm sm:text-base">
                        {exp.description}
                      </p>
                      <div className="flex items-center gap-2 text-[11px] sm:text-[10px] font-mono text-green-600 dark:text-[#00FF66] uppercase tracking-widest opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity pt-1">
                        {resumeData.sections.viewDetails} <ChevronRight size={12} />
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              <div className="lg:col-span-4 space-y-12">
                <div className="flex items-center gap-4">
                  <GraduationCap className="text-amber-500 dark:text-amber-400" size={24} />
                  <h2 className="font-display text-3xl font-bold tracking-tight">
                    {resumeData.sections.education}
                  </h2>
                </div>
                <div className="space-y-3">
                  {resumeData.education.map((edu, i) => {
                    const isSelected = selectedEducation === i;
                    return (
                      <motion.div 
                        key={i} 
                        whileHover={isDesktop ? { x: 6 } : undefined}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        onClick={() => setSelectedEducation(prev => prev === i ? null : i)}
                        className={`group p-4 mx-0 sm:-mx-3 border rounded-none transition-all cursor-pointer ${
                          isSelected
                            ? 'border-amber-500/60 bg-amber-500/10 shadow-sm'
                            : 'border-transparent hover:border-amber-500/50 hover:bg-amber-500/10 active:border-amber-500/50 active:bg-amber-500/10'
                        }`}
                      >
                        <div className={`font-mono text-[10px] uppercase tracking-widest transition-colors ${
                          isSelected
                            ? 'text-amber-600 dark:text-amber-400 font-semibold'
                            : 'text-brand-muted group-hover:text-amber-600 dark:group-hover:text-amber-400'
                        }`}>
                          {edu.period}
                        </div>
                        <h3 className={`font-display font-bold tracking-tight leading-tight mt-1.5 transition-colors ${
                          isSelected
                            ? 'text-amber-600 dark:text-amber-400'
                            : 'group-hover:text-amber-600 dark:group-hover:text-amber-400'
                        }`}>
                          {edu.degree}
                        </h3>
                        <p className="text-sm text-brand-muted mt-1">{edu.institution}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* SKILLS SECTION */}
            <section id="skills" className="space-y-12 md:space-y-16">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-brand-line pb-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Zap className="text-violet-500 dark:text-violet-400" size={24} />
                    <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tighter">
                      {resumeData.sections.skills}
                    </h2>
                  </div>
                  <p className="text-brand-muted font-mono text-sm">
                    {resumeData.sections.skillsSubtitle}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {(['Technical', 'Soft Skills', 'Languages'] as const).map(category => (
                  <div key={category} className="space-y-6">
                    <h3 className="font-mono text-xs uppercase tracking-widest text-brand-muted border-b border-brand-line pb-2">
                      {category === 'Technical' 
                        ? resumeData.sections.skillsCategories.technical 
                        : category === 'Soft Skills' 
                        ? resumeData.sections.skillsCategories.softSkills 
                        : resumeData.sections.skillsCategories.languages}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {resumeData.skills
                        .filter(s => s.category === category)
                        .map(skill => (
                          <div 
                            key={skill.name}
                            className="group flex items-center gap-2 px-3 py-2 border border-brand-line hover:border-violet-500/50 hover:bg-violet-500/10 transition-all cursor-default"
                          >
                            <ChevronRight size={12} className="text-brand-muted group-hover:text-violet-500 dark:group-hover:text-violet-400 group-hover:translate-x-1 transition-all" />
                            <span className="text-sm font-medium tracking-tight group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors">{skill.name}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FOOTER / CONTACT */}
            <footer id="contact" className="pt-20 md:pt-32 border-t border-brand-line">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
                <div className="space-y-8">
                  <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tighter">
                    {resumeData.sections.contactTitle}
                  </h2>
                  
                  <div className="space-y-6 max-w-md">
                    <p className="text-brand-muted leading-relaxed">
                      {resumeData.sections.contactDescription}
                    </p>
                  </div>

                  <div className="flex gap-4 pt-2">
                    <a 
                      href={resumeData.social.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="relative p-4 border border-brand-line hover:border-blue-500/50 hover:bg-blue-500/10 transition-all group"
                      aria-label="LinkedIn"
                    >
                      <Linkedin size={20} className="text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-[1200ms] pointer-events-none text-[10px] font-mono tracking-wider text-brand-muted dark:text-zinc-400 bg-brand-bg/90 border border-brand-line px-2 py-0.5 rounded shadow-sm whitespace-nowrap">
                        LinkedIn
                      </span>
                    </a>
                    {resumeData.social.github && (
                      <a 
                        href={resumeData.social.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="relative p-4 border border-brand-line hover:border-purple-500/50 hover:bg-purple-500/10 transition-all group"
                        aria-label="GitHub"
                      >
                        <Github size={20} className="text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform" />
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-[1200ms] pointer-events-none text-[10px] font-mono tracking-wider text-brand-muted dark:text-zinc-400 bg-brand-bg/90 border border-brand-line px-2 py-0.5 rounded shadow-sm whitespace-nowrap">
                          GitHub
                        </span>
                      </a>
                    )}
                    {resumeData.social.twitter && (
                      <a 
                        href={resumeData.social.twitter} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="relative p-4 border border-brand-line hover:border-sky-500/50 hover:bg-sky-500/10 transition-all group"
                        aria-label="Twitter"
                      >
                        <Twitter size={20} className="text-sky-500 dark:text-sky-400 group-hover:scale-110 transition-transform" />
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-[1200ms] pointer-events-none text-[10px] font-mono tracking-wider text-brand-muted dark:text-zinc-400 bg-brand-bg/90 border border-brand-line px-2 py-0.5 rounded shadow-sm whitespace-nowrap">
                          Twitter
                        </span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Contact Form */}
                <div>
                  <ContactForm content={resumeData.contactForm} />
                </div>
              </div>
              
              <div className="mt-16 pt-8 border-t border-brand-line text-center">
                <div className="text-[10px] font-mono text-brand-muted uppercase tracking-widest">
                  © {new Date().getFullYear()} <a href={resumeData.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-brand-ink transition-colors">{resumeData.name}</a>
                </div>
              </div>
            </footer>

          </main>
        </motion.div>
      </AnimatePresence>

      {/* Experience Modal */}
      <AnimatePresence>
        {selectedExperience && (
          <div 
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6 overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-exp-title"
          >
            {/* Backdrop: click outside card to close */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedExperience(null)}
              className="fixed inset-0 bg-black/75 dark:bg-black/85 backdrop-blur-sm cursor-pointer"
              title={resumeData.sections.modal.close}
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-xl max-h-[85vh] flex flex-col bg-brand-bg border-2 border-brand-ink dark:border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.5)] z-10 overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 p-5 sm:p-6 border-b border-brand-line bg-brand-bg/95 shrink-0">
                <div className="space-y-1.5 pr-2">
                  <div className="font-mono text-xs text-brand-muted uppercase tracking-widest flex items-center gap-2">
                    <span className="w-3 h-px bg-brand-line"></span>
                    <span>{selectedExperience.period}</span>
                  </div>
                  <h3 id="modal-exp-title" className="text-xl sm:text-2xl font-bold tracking-tight text-brand-ink leading-snug">
                    {selectedExperience.role}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-brand-muted">
                    <span className="font-medium text-brand-ink">{selectedExperience.company}</span>
                    {selectedExperience.url && (
                      <a 
                        href={selectedExperience.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-[#00FF66] hover:underline"
                        title={resumeData.sections.modal.website}
                      >
                        <LinkIcon size={12} /> {resumeData.sections.modal.website}
                      </a>
                    )}
                  </div>
                </div>

                {/* 'X' Close button */}
                <button 
                  onClick={() => setSelectedExperience(null)}
                  className="p-2 border border-brand-line hover:border-brand-ink hover:bg-brand-ink hover:text-brand-bg text-brand-ink transition-colors cursor-pointer shrink-0 rounded-none active:scale-95"
                  aria-label={resumeData.sections.modal.close}
                  title={resumeData.sections.modal.close}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Scrollable Body (Scroll up and down) */}
              <div className="overflow-y-auto overscroll-contain p-5 sm:p-6 space-y-6 flex-1 text-brand-ink">
                {/* Description */}
                <div className="space-y-2">
                  <h4 className="font-mono text-[10px] uppercase tracking-widest text-brand-muted">
                    {resumeData.sections.modal.description}
                  </h4>
                  <p className="text-sm sm:text-base leading-relaxed text-brand-muted font-sans whitespace-pre-line">
                    {selectedExperience.description}
                  </p>
                </div>

                {/* Technologies */}
                {selectedExperience.technologies && selectedExperience.technologies.length > 0 && (
                  <div className="space-y-2.5 pt-4 border-t border-brand-line/50">
                    <h4 className="font-mono text-[10px] uppercase tracking-widest text-brand-muted">
                      {resumeData.sections.modal.technologies}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedExperience.technologies.map(tech => (
                        <span 
                          key={tech} 
                          className="px-2.5 py-1 bg-brand-line/30 text-brand-ink text-[11px] font-mono uppercase tracking-tight border border-brand-line/50"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer with Close Button */}
              <div className="p-4 sm:p-5 border-t border-brand-line bg-brand-bg shrink-0">
                <button 
                  onClick={() => setSelectedExperience(null)}
                  className="w-full py-3 border border-brand-ink bg-brand-ink text-brand-bg font-mono text-xs uppercase tracking-widest hover:bg-brand-bg hover:text-brand-ink active:scale-[0.99] transition-all cursor-pointer font-semibold"
                >
                  {resumeData.sections.modal.close}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

