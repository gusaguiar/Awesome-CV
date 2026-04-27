---
id: "agentes-rag-juridico"
title: "Agentes RAG no Contexto Jurídico: Lições Práticas"
description: "Como combinar LLMs (GPT-4o), OCR com Tesseract e RAG para automatizar a análise de documentos jurídicos em produção na Ambev Tech."
publishedAt: 2026-01-20
tags: ["llm", "rag", "ocr", "python", "jurídico"]
locale: "pt-br"
draft: false
relatedIds: ["data-lakehouse-govtech"]
---

## Contexto

Durante meu trabalho na Ambev Tech, desenvolvi agentes inteligentes para o departamento Jurídico. O desafio central era extrair informações estruturadas de documentos legais não padronizados — contratos, procurações, certidões — com alta confiabilidade e em escala.

## Arquitetura adotada

A solução combinou três camadas:

1. **Ingestão e OCR**: documentos chegam via Azure Service Bus. O agente baixa do Azure Blob Storage e aplica TesseractOCR com configurações customizadas para fontes jurídicas (PSM 6, OEM 3).

2. **Chunking e indexação**: o texto extraído é segmentado em chunks semânticos, vetorizado com `text-embedding-3-small` da OpenAI e armazenado em um índice vetorial.

3. **Geração com RAG**: o agente recupera os chunks mais relevantes e passa para GPT-4o com um prompt estruturado que força resposta em JSON com campos obrigatórios validados por Pydantic.

```python
from openai import OpenAI
from pydantic import BaseModel

class ExtracaoContrato(BaseModel):
    partes: list[str]
    objeto: str
    valor: float | None
    vigencia: str | None

client = OpenAI()

def extrair_dados(texto_relevante: str) -> ExtracaoContrato:
    response = client.beta.chat.completions.parse(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "Extraia dados estruturados do trecho de contrato."},
            {"role": "user", "content": texto_relevante},
        ],
        response_format=ExtracaoContrato,
    )
    return response.choices[0].message.parsed
```

## Desafios e aprendizados

- **Qualidade do OCR** é o gargalo mais crítico. Documentos escaneados em baixa resolução geram erros em cascata.  
- **Chunking semântico** supera chunking por tamanho fixo quando o contexto cruza parágrafos.  
- **Validação com Pydantic** reduz alucinações porque o modelo sabe exatamente o schema esperado.  
- **Monitoramento com DataDog** foi essencial para identificar documentos problemáticos em produção sem parar o fluxo.

## Resultados

O agente reduziu em mais de 80% o tempo de triagem inicial de contratos, com taxa de erro abaixo de 3% nos campos críticos após calibração do pipeline de OCR.
