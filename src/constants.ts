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

export const RESUME_DATA = {
  name: "Felipe Gustavo Hoffmann",
  title: "Analista de Tecnologia | Dados | Automação",
  location: "Sumaré, São Paulo",
  email: "fg.hoffmann2@gmail.com",
  phone: "(19) 9 8251-5435",
  summary: "Profissional em formação em Análise e Desenvolvimento de Sistemas com experiência prática em dados, automação e desenvolvimento de soluções tecnológicas. Atuação no desenvolvimento de aplicações, integração com banco de dados e criação de automações para otimização de processos. Experiência com JavaScript e Firebase, além de participação em projetos de impacto nacional.",
  experience: [
    {
      company: "Enactus Brasil",
      role: "Estagiário de Dados e Tecnologia",
      period: "2024 — Atual",
      description: "Desenvolvimento de automações para redução de tarefas operacionais manuais. Criação de SaaS para gestão de times utilizando Firebase e Google AI Studio. Coleta, tratamento e análise de dados para geração de insights estratégicos.",
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
      company: "De Santa Transporte Rodoviário",
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
  ] as Experience[],
  education: [
    {
      institution: "Faculdade de Tecnologia (ADS)",
      degree: "Tecnólogo em Análise e Desenvolvimento de Sistemas",
      period: "2023 — 2026"
    }
  ] as Education[],
  skills: [
    { name: "JavaScript", category: "Technical" },
    { name: "C#", category: "Technical" },
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
    { name: "Inglês Avançado", category: "Languages" }
  ] as Skill[],
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
      tags: ["Data Analysis", "BI", "ETL"]
    }
  ] as Project[]
};
