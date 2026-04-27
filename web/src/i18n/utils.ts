import { locales, defaultLocale, type Locale } from './ui';

/** Determina se uma string é um locale válido. */
export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Extrai o locale do pathname da URL. */
export function getLocaleFromUrl(url: URL): Locale {
  const [, first] = url.pathname.split('/');
  if (isLocale(first)) return first;
  return defaultLocale;
}

/** Retorna o prefixo do locale na URL. */
export function localePath(locale: Locale, path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `/${locale}${clean}`;
}

/**
 * Dado o pathname atual, retorna o pathname equivalente no outro locale.
 * Ex.: /pt-br/artigos/foo -> /en-us/articles/foo
 */
export function switchLocalePath(pathname: string, targetLocale: Locale): string {
  const [, _currentLocale, ...rest] = pathname.split('/');

  // Mapeamento de segmentos de rota por locale
  const segmentMap: Record<string, Record<Locale, string>> = {
    artigos:  { 'pt-br': 'artigos',  'en-us': 'articles' },
    articles: { 'pt-br': 'artigos',  'en-us': 'articles' },
    projetos: { 'pt-br': 'projetos', 'en-us': 'projects' },
    projects: { 'pt-br': 'projetos', 'en-us': 'projects' },
  };

  const mappedRest = rest.map((seg) => segmentMap[seg]?.[targetLocale] ?? seg);
  return `/${targetLocale}/${mappedRest.join('/')}`;
}

/** Formata uma data respeitando o locale. */
export function formatDate(date: Date, locale: Locale): string {
  const tag = locale === 'pt-br' ? 'pt-BR' : 'en-US';
  return new Intl.DateTimeFormat(tag, {
    year:  'numeric',
    month: 'long',
    day:   'numeric',
  }).format(date);
}

/** Estima minutos de leitura a partir de um texto bruto. */
export function readingTime(text: string): number {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / wordsPerMinute));
}
