---
id: "govtech-lakehouse"
title: "GovTech Data Lakehouse - Espírito Santo"
description: "Data Lakehouse completo para múltiplas secretarias estaduais do Espírito Santo com Cloudera Data Platform, PySpark, Airflow, modelos de IA e agentes RAG."
repository: "https://github.com/gusaguiar"
stack: ["Cloudera", "PySpark", "Airflow", "MLflow", "SAS Viya", "FastAPI", "Docker", "Kubernetes", "PostgreSQL", "Python"]
role: "Arquiteto de Soluções / Cientista de Dados Sênior"
period: "Jul. 2022 - Presente"
featured: true
locale: "pt-br"
---

## Escopo

Projeto de transformação analítica de longa duração para o Governo do Estado do Espírito Santo, abrangendo múltiplas secretarias: SEGER, SESA, SEDU, SEJUS, SESP, SECONT, Polícia Civil e SEPOL.

## Arquitetura

O Data Lakehouse opera sobre Cloudera Data Platform com arquitetura medalhão (Bronze/Silver/Gold), orquestrado por Airflow e com modelos de ML gerenciados via MLflow. As aplicações são containerizadas com Docker e orquestradas em Kubernetes (Rancher e OpenShift).

## Principais entregas

- Mais de 300 fontes de dados integradas com atualização diária automatizada
- Modelos de IA para detecção de anomalias em preços públicos, classificação de documentos e forecasting de demandas
- Agentes RAG para suprimentos e assessoria jurídica da SEGER
- Ferramenta de análise de rede para detecção de fraudes em frota de veículos
- Data Mart jurídico integrado em SAS Viya para o Grupo Eletrobrás
- Mais de 50 painéis analíticos e produtos de dados entregues
