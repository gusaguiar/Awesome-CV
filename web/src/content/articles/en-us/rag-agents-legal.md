---
id: "rag-agents-legal"
title: "RAG Agents in Legal Contexts: Practical Lessons"
description: "How to combine LLMs (GPT-4o), OCR with Tesseract and RAG to automate legal document analysis in production at Ambev Tech."
publishedAt: 2026-01-20
tags: ["llm", "rag", "ocr", "python", "legal"]
locale: "en-us"
draft: false
relatedIds: []
---

## Context

During my work at Ambev Tech, I developed intelligent agents for the Legal department. The central challenge was extracting structured information from non-standardized legal documents — contracts, power of attorney, certificates — with high reliability and at scale.

## Adopted architecture

The solution combined three layers:

1. **Ingestion and OCR**: documents arrive via Azure Service Bus. The agent downloads from Azure Blob Storage and applies TesseractOCR with custom configurations for legal fonts (PSM 6, OEM 3).

2. **Chunking and indexing**: the extracted text is segmented into semantic chunks, vectorized with OpenAI's `text-embedding-3-small` and stored in a vector index.

3. **RAG generation**: the agent retrieves the most relevant chunks and passes them to GPT-4o with a structured prompt that forces a JSON response with required fields validated by Pydantic.

## Challenges and lessons learned

- **OCR quality** is the most critical bottleneck. Documents scanned at low resolution generate cascading errors.
- **Semantic chunking** outperforms fixed-size chunking when context crosses paragraphs.
- **Pydantic validation** reduces hallucinations because the model knows exactly the expected schema.
- **DataDog monitoring** was essential for identifying problematic documents in production without stopping the flow.

## Results

The agent reduced initial contract triage time by more than 80%, with an error rate below 3% on critical fields after OCR pipeline calibration.
