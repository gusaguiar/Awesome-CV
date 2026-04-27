import { useState, useEffect } from 'react';

// Ícones SVG inline para evitar dependência de biblioteca de ícones
function SunIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

interface Props {
  labelDark: string;
  labelLight: string;
}

export default function ThemeToggle({ labelDark, labelLight }: Props) {
  const [isDark, setIsDark] = useState(false);

  // Sincroniza com o estado atual do DOM ao montar o componente
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  function toggle() {
    const root = document.documentElement;
    const next = !isDark;
    root.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
    setIsDark(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? labelLight : labelDark}
      title={isDark ? labelLight : labelDark}
      class="flex h-9 w-9 items-center justify-center rounded-xl
             text-slate-600 dark:text-slate-300
             hover:bg-slate-100 dark:hover:bg-slate-800
             transition-colors duration-150"
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
