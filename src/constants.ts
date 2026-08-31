/**
 * Personalizar os dados abaixo com as informações do seu currículo.
 */

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  technologies?: string[];
  url?: string;
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
}

export interface Skill {
  name: string;
  category: 'Technical' | 'Soft Skills' | 'Languages';
}

export interface Project {
  title: string;
  description: string;
  link?: string;
  tags: string[];
}

export interface ResumeData {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  summary: string;
  statusBadge: string;
  emailTooltip: {
    clickToCopy: string;
    copied: string;
  };
  nav: {
    projects: string;
    experience: string;
    skills: string;
  };
  sections: {
    projects: string;
    experience: string;
    education: string;
    skills: string;
    skillsSubtitle: string;
    skillsCategories: {
      technical: string;
      softSkills: string;
      languages: string;
    };
    contactTitle: string;
    contactDescription: string;
    viewDetails: string;
    projectPrefix: string;
    modal: {
      description: string;
      technologies: string;
      close: string;
      website: string;
    };
  };
  contactForm: {
    title: string;
    subtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    sendButton: string;
    sendingButton: string;
    successMessage: string;
    errorMessage: string;
    connectionErrorMessage: string;
  };
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  social: {
    linkedin: string;
    github: string;
    twitter: string;
  };
  projects: Project[];
}

export const RESUME_DATA_BY_LANG: Record<'pt' | 'en', ResumeData> = {
  pt: {
    name: "Felipe Hoffmann",
    title: "Líder de Projetos de Dados e Tecnologia",
    location: "Sumaré, São Paulo",
    email: "fg.hoffmann2@gmail.com",
    phone: "(19) 9 8251-5435",
    summary: "Líder de Projetos graduado em Análise e Desenvolvimento de Sistemas com experiência prática em dados, automação e desenvolvimento de soluções tecnológicas. Atuação na liderança e desenvolvimento de aplicações, integração com banco de dados e criação de automações para otimização de processos.",
    statusBadge: "Disponível para novos projetos",
    emailTooltip: {
      clickToCopy: "clique para copiar",
      copied: "copiado para a área de transferência!"
    },
    nav: {
      projects: "Projetos",
      experience: "Experiência",
      skills: "Habilidades"
    },
    sections: {
      projects: "Projetos",
      experience: "Experiência Profissional",
      education: "Formação",
      skills: "Habilidades",
      skillsSubtitle: "Competências técnicas e linguísticas",
      skillsCategories: {
        technical: "Técnicas",
        softSkills: "Interpessoais",
        languages: "Idiomas"
      },
      contactTitle: "Vamos construir algo juntos?",
      contactDescription: "Estou sempre aberto a novos projetos, oportunidades e parcerias. Preencha o formulário ao lado para me enviar uma mensagem diretamente.",
      viewDetails: "Ver detalhes",
      projectPrefix: "Projeto",
      modal: {
        description: "Descrição",
        technologies: "Tecnologias",
        close: "Fechar Detalhes",
        website: "Website"
      }
    },
    contactForm: {
      title: "Envie uma Mensagem",
      subtitle: "Preencha o formulário abaixo",
      nameLabel: "Nome",
      namePlaceholder: "Seu nome completo",
      emailLabel: "E-mail",
      emailPlaceholder: "seu@email.com",
      phoneLabel: "Telefone",
      phonePlaceholder: "(19) 99999-9999",
      messageLabel: "Mensagem",
      messagePlaceholder: "Vamos iniciar nossa conversa!",
      sendButton: "Enviar Mensagem",
      sendingButton: "Enviando...",
      successMessage: "Mensagem enviada com sucesso! Em breve entrarei em contato.",
      errorMessage: "Ocorreu um erro ao enviar a mensagem. Tente novamente.",
      connectionErrorMessage: "Falha de conexão. Por favor, tente novamente mais tarde."
    },
    experience: [
      {
        company: "Enactus Brasil",
        role: "Líder de Projetos de Dados e Tecnologia",
        period: "2024 — Atual",
        description: "Liderança e desenvolvimento de automações para redução de tarefas operacionais manuais. Criação de SaaS para gestão de times utilizando Firebase e Google AI Studio. Coleta, tratamento e análise de dados para geração de insights estratégicos.",
        technologies: ["JavaScript", "Firebase", "Google AI Studio", "Python", "SQL"],
        url: "https://enactus.org.br/"
      },
      {
        company: "Arppen",
        role: "Estagiário de Design",
        period: "2023 — 2024",
        description: "Criação de materiais visuais para redes sociais e apresentações comerciais, contribuindo para um aumento de 20% no engajamento digital. Suporte em processos internos com organização de dados.",
        technologies: ["Design Digital", "Excel", "Marketing Visual"],
        url: "https://www.arppen.com/"
      },
      {
        company: "De Santa Transporte Rodoviário de Cargas ltda.",
        role: "Auxiliar Administrativo",
        period: "2020 — 2021",
        description: "Otimização de relatórios com Excel avançado, automação de processos administrativos e gestão de dados internos.",
        technologies: ["Excel Avançado", "Automação", "Gestão de Dados"],
        url: "https://www.desantalog.com.br/"
      },
      {
        company: "3M do Brasil",
        role: "Auxiliar Administrativo",
        period: "2016 — 2018",
        description: "Digitalização e organização de dados corporativos. Foco na melhoria de processos internos com uso de ferramentas de análise.",
        technologies: ["Processos", "Excel", "Data Cleaning"],
        url: "https://www.3m.com.br/3M/pt_BR/3m-do-brasil/"
      }
    ],
    education: [
      {
        institution: "FATEC Americana",
        degree: "Tecnólogo em Análise e Desenvolvimento de Sistemas",
        period: "2023 — 2026"
      },
      {
        institution: "Escola Municipal Dr. Leandro Franceschini",
        degree: "Técnico em Informática",
        period: "2016 — 2019"
      },
      {
        institution: "SENAI de Sumaré",
        degree: "Técnico em Eletromecânica",
        period: "2018 — 2019"
      }
    ],
    skills: [
      { name: "JavaScript", category: "Technical" },
      { name: "Python", category: "Technical" },
      { name: "C", category: "Technical" },
      { name: "SQL", category: "Technical" },
      { name: "Firebase", category: "Technical" },
      { name: "Google AI Studio", category: "Technical" },
      { name: "HTML5/CSS3", category: "Technical" },
      { name: "Git", category: "Technical" },
      { name: "Excel Avançado", category: "Technical" },
      { name: "Design Responsivo", category: "Technical" },
      { name: "Pensamento Analítico", category: "Soft Skills" },
      { name: "Resolução de Problemas", category: "Soft Skills" },
      { name: "Trabalho em Equipe", category: "Soft Skills" },
      { name: "Comunicação Assertiva", category: "Soft Skills" },
      { name: "Inglês Avançado", category: "Languages" }
    ],
    social: {
      linkedin: "https://www.linkedIn.com/in/felipe-hoffmann-9bb7361a4/",
      github: "https://github.com/FelipeHoffmann00",
      twitter: ""
    },
    projects: [
      {
        title: "Desenvolvimento de sistema SaaS para gestão de times (Firebase + IA)",
        description: "Criação de plataforma completa para gerenciamento de equipes, integrando banco de dados em tempo real e inteligência artificial para otimização de fluxos.",
        tags: ["Firebase", "AI", "SaaS"]
      },
      {
        title: "Automação de processos e criação de planilhas inteligentes",
        description: "Desenvolvimento de soluções personalizadas para automação de tarefas manuais e construção de dashboards dinâmicos para visualização de indicadores.",
        tags: ["Automação", "Excel", "Dashboards"]
      },
      {
        title: "Integração de dados para análise e tomada de decisão",
        description: "Pipeline de dados estruturado para coletar informações de múltiplas fontes, transformá-las e gerar relatórios estratégicos para o negócio.",
        tags: ["Análise de Dados", "ETL"]
      }
    ]
  },
  en: {
    name: "Felipe Hoffmann",
    title: "Data & Technology Project Lead",
    location: "Sumaré, São Paulo - Brazil",
    email: "fg.hoffmann2@gmail.com",
    phone: "+55 (19) 9 8251-5435",
    summary: "Project Lead with a degree in Systems Analysis and Development, holding hands-on experience in data, automation, and tech solution engineering. Skilled in leading application development, database integrations, and architecting workflow automations for process optimization.",
    statusBadge: "Available for new projects",
    emailTooltip: {
      clickToCopy: "click to copy",
      copied: "copied to clipboard!"
    },
    nav: {
      projects: "Projects",
      experience: "Experience",
      skills: "Skills"
    },
    sections: {
      projects: "Projects",
      experience: "Professional Experience",
      education: "Education",
      skills: "Skills",
      skillsSubtitle: "Technical and linguistic competencies",
      skillsCategories: {
        technical: "Technical",
        softSkills: "Soft Skills",
        languages: "Languages"
      },
      contactTitle: "Let's build something together?",
      contactDescription: "I am always open to new projects, opportunities, and partnerships. Fill out the form to send me a direct message.",
      viewDetails: "View details",
      projectPrefix: "Project",
      modal: {
        description: "Description",
        technologies: "Technologies",
        close: "Close Details",
        website: "Website"
      }
    },
    contactForm: {
      title: "Send a Message",
      subtitle: "Fill in the form below",
      nameLabel: "Name",
      namePlaceholder: "Your full name",
      emailLabel: "Email",
      emailPlaceholder: "your@email.com",
      phoneLabel: "Phone",
      phonePlaceholder: "+1 (555) 000-0000",
      messageLabel: "Message",
      messagePlaceholder: "Let's start our conversation!",
      sendButton: "Send Message",
      sendingButton: "Sending...",
      successMessage: "Message sent successfully! I will get back to you soon.",
      errorMessage: "An error occurred while sending the message. Please try again.",
      connectionErrorMessage: "Connection error. Please try again later."
    },
    experience: [
      {
        company: "Enactus Brasil",
        role: "Data & Technology Project Lead",
        period: "2024 — Present",
        description: "Leadership and development of automations to eliminate repetitive manual workflows. Created a SaaS system for team management using Firebase and Google AI Studio. Collected, processed, and analyzed data to deliver strategic insights.",
        technologies: ["JavaScript", "Firebase", "Google AI Studio", "Python", "SQL"],
        url: "https://enactus.org.br/"
      },
      {
        company: "Arppen",
        role: "Design Intern",
        period: "2023 — 2024",
        description: "Created visual assets for social media and commercial presentations, contributing to a 20% increase in digital engagement. Assisted in internal processes and structured data organization.",
        technologies: ["Digital Design", "Excel", "Visual Marketing"],
        url: "https://www.arppen.com/"
      },
      {
        company: "De Santa Transporte Rodoviário de Cargas ltda.",
        role: "Administrative Assistant",
        period: "2020 — 2021",
        description: "Report optimization leveraging advanced Excel, administrative process automation, and internal data governance.",
        technologies: ["Advanced Excel", "Automation", "Data Governance"],
        url: "https://www.desantalog.com.br/"
      },
      {
        company: "3M do Brasil",
        role: "Administrative Assistant",
        period: "2016 — 2018",
        description: "Corporate data digitization and organization. Focused on continuous internal process improvement using analytical toolkits.",
        technologies: ["Processes", "Excel", "Data Cleaning"],
        url: "https://www.3m.com.br/3M/pt_BR/3m-do-brasil/"
      }
    ],
    education: [
      {
        institution: "FATEC Americana",
        degree: "Associate Degree in Systems Analysis & Development",
        period: "2023 — 2026"
      },
      {
        institution: "Escola Municipal Dr. Leandro Franceschini",
        degree: "Vocational Technical Degree in Information Technology",
        period: "2016 — 2019"
      },
      {
        institution: "SENAI de Sumaré",
        degree: "Vocational Technical Degree in Electromechanics",
        period: "2018 — 2019"
      }
    ],
    skills: [
      { name: "JavaScript", category: "Technical" },
      { name: "Python", category: "Technical" },
      { name: "C", category: "Technical" },
      { name: "SQL", category: "Technical" },
      { name: "Firebase", category: "Technical" },
      { name: "Google AI Studio", category: "Technical" },
      { name: "HTML5/CSS3", category: "Technical" },
      { name: "Git", category: "Technical" },
      { name: "Advanced Excel", category: "Technical" },
      { name: "Responsive Design", category: "Technical" },
      { name: "Analytical Thinking", category: "Soft Skills" },
      { name: "Problem Solving", category: "Soft Skills" },
      { name: "Teamwork", category: "Soft Skills" },
      { name: "Assertive Communication", category: "Soft Skills" },
      { name: "Advanced English", category: "Languages" }
    ],
    social: {
      linkedin: "https://www.linkedIn.com/in/felipe-hoffmann-9bb7361a4/",
      github: "https://github.com/FelipeHoffmann00",
      twitter: ""
    },
    projects: [
      {
        title: "SaaS Platform Development for Team Management (Firebase + AI)",
        description: "End-to-end team management platform development, integrating real-time databases and artificial intelligence for workflow optimization.",
        tags: ["Firebase", "AI", "SaaS"]
      },
      {
        title: "Process Automation & Smart Spreadsheets Architecture",
        description: "Custom solutions for manual task automation and dynamic dashboard creation for key performance indicators (KPIs).",
        tags: ["Automation", "Excel", "Dashboards"]
      },
      {
        title: "Data Integration for Analytics & Decision-Making",
        description: "Structured data pipeline to aggregate information from multiple sources, transform datasets, and generate strategic business reports.",
        tags: ["Data Analytics", "ETL"]
      }
    ]
  }
};

export const RESUME_DATA = RESUME_DATA_BY_LANG.pt;

