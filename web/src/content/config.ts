import { defineCollection, z } from 'astro:content';

// ── Schema do currículo (data file: .json) ──────────────────────────────────

const contactSchema = z.object({
  email:         z.string().email(),
  phone:         z.string(),
  location:      z.string(),
  github:        z.string().url(),
  linkedin:      z.string().url(),
  lattes:        z.string().url().optional(),
  researchGate:  z.string().url().optional(),
  orcid:         z.string().url().optional(),
});

const bulletSchema = z.object({
  text: z.string(),
});

const experienceItemSchema = z.object({
  id:           z.string(),
  title:        z.string(),
  organization: z.string(),
  location:     z.string(),
  period:       z.string(),
  bullets:      z.array(z.string()).default([]),
});

const educationItemSchema = z.object({
  id:          z.string(),
  degree:      z.string(),
  institution: z.string(),
  location:    z.string(),
  period:      z.string(),
  bullets:     z.array(z.string()).default([]),
});

const certificateItemSchema = z.object({
  id:           z.string(),
  title:        z.string(),
  issuer:       z.string(),
  date:         z.string(),
  credential:   z.string().url().optional(),
});

const honorItemSchema = z.object({
  id:       z.string(),
  position: z.string(),
  title:    z.string(),
  location: z.string(),
  date:     z.string(),
});

const committeeItemSchema = z.object({
  id:             z.string(),
  position:       z.string(),
  title:          z.string(),
  location:       z.string(),
  date:           z.string(),
  // Texto integral da recomendacao, exibido como blockquote na pagina
  recommendation: z.string().optional(),
});

const extracurricularItemSchema = z.object({
  id:           z.string(),
  title:        z.string(),
  organization: z.string().optional(),
  period:       z.string().optional(),
  description:  z.string().optional(),
  // Bullets granulares (substitui description quando presentes)
  bullets:      z.array(z.string()).default([]),
});

const resumeSchema = z.object({
  personal: z.object({
    name:      z.string(),
    title:     z.string(),
    contact:   contactSchema,
    quote:     z.object({ text: z.string(), attribution: z.string() }).array().optional(),
  }),
  summary:           z.string(),
  // Paragrafos adicionais do resumo (exibidos apos o paragrafo principal)
  summaryParagraphs: z.array(z.string()).default([]),
  summaryBullets:    z.array(z.object({ label: z.string(), text: z.string() })).default([]),
  stack:             z.string().optional(),
  experience:        z.array(experienceItemSchema).default([]),
  education:         z.array(educationItemSchema).default([]),
  certificates:      z.array(certificateItemSchema).default([]),
  // Paragrafo introdutorio sobre revisao por pares, exibido antes da tabela
  honorsIntro:       z.string().optional(),
  honors:            z.array(honorItemSchema).default([]),
  committees:        z.array(committeeItemSchema).default([]),
  extracurricular:   z.array(extracurricularItemSchema).default([]),
});

// ── Schema de artigos (wiki) ─────────────────────────────────────────────────

const articlesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    id:          z.string(),
    title:       z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt:   z.coerce.date().optional(),
    tags:        z.array(z.string()).default([]),
    locale:      z.enum(['pt-br', 'en-us']),
    draft:       z.boolean().default(false),
    relatedIds:  z.array(z.string()).default([]),
  }),
});

// ── Schema de projetos (portfólio) ───────────────────────────────────────────

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    id:          z.string(),
    title:       z.string(),
    description: z.string(),
    repository:  z.string().url(),
    demo:        z.string().url().optional(),
    stack:       z.array(z.string()).default([]),
    role:        z.string().optional(),
    period:      z.string().optional(),
    featured:    z.boolean().default(false),
    locale:      z.enum(['pt-br', 'en-us']),
    coverImage:  z.string().optional(),
  }),
});

// ── Schema do currículo como data collection ──────────────────────────────────

const resumeCollection = defineCollection({
  type: 'data',
  schema: resumeSchema,
});

export const collections = {
  articles: articlesCollection,
  projects: projectsCollection,
  resume:   resumeCollection,
};
