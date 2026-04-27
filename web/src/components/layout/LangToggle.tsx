import { switchLocalePath } from '@/i18n/utils';
import type { Locale } from '@/i18n/ui';

interface Props {
  currentLocale: Locale;
  currentPath: string;
  label: string;
}

export default function LangToggle({ currentLocale, currentPath, label }: Props) {
  const targetLocale: Locale = currentLocale === 'pt-br' ? 'en-us' : 'pt-br';
  const targetPath = switchLocalePath(currentPath, targetLocale);

  return (
    <a
      href={targetPath}
      aria-label={label}
      title={label}
      class="flex h-9 items-center gap-1.5 rounded-xl px-3
             text-sm font-medium
             text-slate-600 dark:text-slate-300
             hover:bg-slate-100 dark:hover:bg-slate-800
             transition-colors duration-150"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
      </svg>
      {label}
    </a>
  );
}
