# Gustavo Aguiar — Site Pessoal

Site estático construído com **Astro 5 + TypeScript + Tailwind CSS v4**, com design glassmorphism, suporte a PT-BR/EN-US e modo claro/escuro.

## Estrutura

```
web/
  src/
    content/
      resume/       # Dados do currículo (pt-br.json, en-us.json)
      articles/     # Artigos/wiki em Markdown
        pt-br/
        en-us/
      projects/     # Projetos do portfólio em Markdown
        pt-br/
        en-us/
    components/     # Componentes Astro e React
    i18n/           # Strings de UI e utilitários de locale
    layouts/        # Layouts base e de conteúdo
    pages/          # Páginas por locale
    styles/         # CSS global com design tokens
  public/
    resume.pdf      # Currículo PT-BR para download
    resume-en.pdf   # Currículo EN-US para download
    favicon.svg
    robots.txt
```

## Desenvolvimento

```bash
cd web
npm install
npm run dev        # Servidor de desenvolvimento em http://localhost:4321
npm run build      # Build de produção em web/dist/
npm run preview    # Preview do build de produção
```

## Execução com Docker

A pasta `web/` contém uma stack Docker pronta com dois modos de execução através de [profiles do Compose](https://docs.docker.com/compose/profiles/):

- **dev** — Node + Astro com hot reload (porta `4321`)
- **prod** — build estático servido por Nginx (porta `8080` do host → `80` do container)

Em Windows é recomendado executar via **WSL** para melhor performance de I/O e compatibilidade do HMR.

```bash
cd web

# Desenvolvimento com hot reload
docker compose --profile dev up --build
# Acesse http://localhost:4321

# Produção (build estático otimizado servido por Nginx)
docker compose --profile prod up --build -d
# Acesse http://localhost:8080

# Encerrar e remover containers
docker compose down
```

Arquivos relevantes:

- `Dockerfile` — imagem de produção multi-stage (Node 20 → Nginx alpine)
- `Dockerfile.dev` — imagem de desenvolvimento com `astro dev`
- `nginx.conf` — configuração com gzip e cache de assets versionados
- `docker-compose.yml` — orquestração dos perfis dev/prod
- `.dockerignore` — reduz o contexto de build

## Como adicionar um artigo

1. Crie um arquivo `.md` em `src/content/articles/pt-br/` (ou `en-us/`):

```md
---
id: "meu-artigo"
title: "Título do Artigo"
description: "Resumo em uma frase"
publishedAt: 2026-05-01
tags: ["python", "ml"]
locale: "pt-br"
draft: false
relatedIds: []   # IDs de outros artigos relacionados
---

Conteúdo em Markdown aqui.
```

2. O artigo aparece automaticamente em `/pt-br/artigos/meu-artigo`.

O nome do arquivo não importa — o `id` no frontmatter define a URL.

## Como adicionar um projeto

1. Crie um arquivo `.md` em `src/content/projects/pt-br/` (ou `en-us/`):

```md
---
id: "meu-projeto"
title: "Nome do Projeto"
description: "O que o projeto faz"
repository: "https://github.com/gusaguiar/meu-projeto"
demo: "https://demo.exemplo.com"     # opcional
stack: ["Python", "FastAPI", "Docker"]
role: "Arquiteto / Desenvolvedor"
period: "Jan. 2025 - Presente"
featured: true
locale: "pt-br"
---

Conteúdo descritivo do projeto em Markdown.
```

2. O projeto aparece automaticamente em `/pt-br/projetos/meu-projeto`.

## Atualizar o currículo

Edite diretamente os arquivos JSON:

- `src/content/resume/pt-br.json` — versão em português
- `src/content/resume/en-us.json` — versão em inglês

Para atualizar os PDFs para download, compile os arquivos LaTeX na raiz do repositório (`resume.tex` e `resume-en.tex`) com `xelatex` e copie os PDFs gerados para `web/public/`.

## Deploy

### Vercel / Netlify / Cloudflare Pages

- Raiz do projeto: `web/`
- Comando de build: `npm run build`
- Diretório de saída: `dist/`

### GitHub Pages

Adicione ao `.github/workflows/`:

```yaml
- name: Build site
  run: |
    cd web
    npm install
    npm run build

- name: Deploy to Pages
  uses: actions/deploy-pages@v4
  with:
    path: web/dist
```

### URL base personalizada

Para publicar em um subdiretório (ex.: `usuario.github.io/repositorio/`), adicione ao `astro.config.mjs`:

```js
export default defineConfig({
  site: 'https://usuario.github.io',
  base: '/repositorio',
  // ...resto da config
});
```

## Modo claro/escuro

O tema é controlado pela classe `dark` no elemento `<html>`. A preferência é salva em `localStorage` e inicializada antes do primeiro render para evitar piscada (FOUC).
