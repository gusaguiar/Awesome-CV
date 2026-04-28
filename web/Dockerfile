# syntax=docker/dockerfile:1.7
#
# Imagem de producao do site (Astro estatico servido por Nginx).
#
# Estrategia multi-stage:
#   1) builder  -> instala dependencias e gera /app/dist com `astro build`
#   2) runner   -> imagem enxuta com Nginx servindo somente os artefatos
#
# Resultado final: imagem com poucas dezenas de MB, sem Node em runtime.

# ---------------------------------------------------------------------------
# Estagio 1: build do site estatico
# ---------------------------------------------------------------------------
FROM node:20-alpine AS builder

WORKDIR /app

# Copia somente os manifests primeiro para aproveitar o cache de camadas:
# se package.json/lock nao mudarem, o `npm ci` nao e re-executado.
COPY package.json package-lock.json ./

# `npm ci` garante instalacao reprodutivel a partir do lockfile
RUN npm ci

# Copia o restante do codigo-fonte e gera o build estatico em /app/dist
COPY . .
RUN npm run build

# ---------------------------------------------------------------------------
# Estagio 2: servidor estatico com Nginx
# ---------------------------------------------------------------------------
FROM nginx:1.27-alpine AS runner

# Substitui a configuracao default por uma otimizada para sites estaticos
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia apenas os artefatos estaticos do estagio de build
COPY --from=builder /app/dist /usr/share/nginx/html

# Porta padrao do Nginx
EXPOSE 80

# Healthcheck simples para orquestradores (Compose, Kubernetes, etc.)
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget -q --spider http://localhost/ || exit 1

# Mantem o Nginx em foreground para que o container nao termine
CMD ["nginx", "-g", "daemon off;"]
