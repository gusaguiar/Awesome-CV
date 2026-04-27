// Strings de interface para cada locale.
// Ao adicionar um novo locale, preencher todos os campos aqui.

export const locales = ['pt-br', 'en-us'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'pt-br';

export const ui = {
  'pt-br': {
    // Navegação
    'nav.resume':    'Currículo',
    'nav.articles':  'Artigos',
    'nav.projects':  'Projetos',
    'nav.darkMode':  'Modo escuro',
    'nav.lightMode': 'Modo claro',
    'nav.langSwitch': 'English',

    // Hero
    'hero.downloadPdf': 'Baixar PDF',
    'hero.location':    'Rio de Janeiro, Brasil',

    // Seções do currículo
    'section.about':          'Sobre',
    'section.experience':     'Experiência Profissional',
    'section.education':      'Formação Acadêmica',
    'section.certificates':   'Certificados',
    'section.honors':         'Honrarias e Prêmios',
    'section.committees':     'Comissões e Publicações',
    'section.extracurricular':'Atividades Extracurriculares',

    // Artigos
    'articles.title':       'Artigos',
    'articles.description': 'Notas técnicas, reflexões e tutoriais sobre dados, ML e engenharia de software.',
    'articles.readMore':    'Ler artigo',
    'articles.back':        'Voltar para artigos',
    'articles.related':     'Artigos relacionados',
    'articles.updatedAt':   'Atualizado em',
    'articles.publishedAt': 'Publicado em',
    'articles.tags':        'Tags',
    'articles.empty':       'Nenhum artigo publicado ainda.',
    'articles.minutes':     'min de leitura',

    // Projetos
    'projects.title':       'Projetos',
    'projects.description': 'Portfólio de projetos de código aberto, pesquisa e trabalhos pessoais.',
    'projects.viewRepo':    'Ver repositório',
    'projects.viewDemo':    'Ver demo',
    'projects.back':        'Voltar para projetos',
    'projects.stack':       'Stack',
    'projects.role':        'Papel',
    'projects.period':      'Período',
    'projects.featured':    'Destaque',
    'projects.empty':       'Nenhum projeto publicado ainda.',

    // Geral
    'meta.author': 'Gustavo Aguiar',
    'footer.rights': 'Todos os direitos reservados.',
    'present': 'Presente',
  },

  'en-us': {
    // Navigation
    'nav.resume':    'Resume',
    'nav.articles':  'Articles',
    'nav.projects':  'Projects',
    'nav.darkMode':  'Dark mode',
    'nav.lightMode': 'Light mode',
    'nav.langSwitch': 'Português',

    // Hero
    'hero.downloadPdf': 'Download PDF',
    'hero.location':    'Rio de Janeiro, Brazil',

    // Resume sections
    'section.about':          'About',
    'section.experience':     'Professional Experience',
    'section.education':      'Education',
    'section.certificates':   'Certificates',
    'section.honors':         'Honors & Awards',
    'section.committees':     'Committees & Publications',
    'section.extracurricular':'Extracurricular Activities',

    // Articles
    'articles.title':       'Articles',
    'articles.description': 'Technical notes, reflections and tutorials on data, ML and software engineering.',
    'articles.readMore':    'Read article',
    'articles.back':        'Back to articles',
    'articles.related':     'Related articles',
    'articles.updatedAt':   'Updated on',
    'articles.publishedAt': 'Published on',
    'articles.tags':        'Tags',
    'articles.empty':       'No articles published yet.',
    'articles.minutes':     'min read',

    // Projects
    'projects.title':       'Projects',
    'projects.description': 'Portfolio of open-source, research and personal projects.',
    'projects.viewRepo':    'View repository',
    'projects.viewDemo':    'View demo',
    'projects.back':        'Back to projects',
    'projects.stack':       'Stack',
    'projects.role':        'Role',
    'projects.period':      'Period',
    'projects.featured':    'Featured',
    'projects.empty':       'No projects published yet.',

    // General
    'meta.author': 'Gustavo Aguiar',
    'footer.rights': 'All rights reserved.',
    'present': 'Present',
  },
} as const;

export type UiKey = keyof (typeof ui)['pt-br'];

/** Retorna a string de UI para o locale e chave indicados. */
export function t(locale: Locale, key: UiKey): string {
  return ui[locale][key] ?? ui[defaultLocale][key] ?? key;
}
