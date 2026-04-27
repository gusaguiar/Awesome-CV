---
id: "bop-digital-twin"
title: "BOP Digital Twin & BOP Data Universe"
description: "Simulador Digital Twin de alta fidelidade para equipamentos Blowout Preventer e ambiente BI integrado para análise de dados de sensores em parceria com Petrobras, Constellation e Transocean."
repository: "https://github.com/gusaguiar"
stack: ["Matlab", "Simulink", "Python", "PySpark", "Power BI", "NLTK", "Scikit-Learn"]
role: "Cientista de Dados Pleno"
period: "2018 - 2023"
featured: true
locale: "pt-br"
---

## Sobre o projeto

O Blowout Preventer (BOP) é o equipamento de segurança mais crítico em operações de perfuração de petróleo. Falhas neste equipamento podem causar catástrofes ambientais de grande escala. O projeto desenvolveu duas soluções complementares:

### Digital Twin

Simulador de alta fidelidade construído em Matlab/Simulink com toolboxes especializados (Curve Fitting, Optimization, Simscape). O modelo replica o comportamento físico do BOP em diferentes condições operacionais, permitindo simular modos de falha sem risco real.

### BOP Data Universe

Ambiente de Business Intelligence que integra dados de sensores (mais de 100 tags) de múltiplas plataformas dos parceiros Petrobras, Constellation e Transocean. Inclui:

- Sistema de alertas preventivos baseado em CBM (Condition-Based Maintenance)
- Mineração de texto em registros de falha com NLTK e Scikit-Learn
- Análise de sobrevivência estatística para vida útil dos componentes
- Módulo de alertas integrado ao Intelie Live (RTO Live)

## Impacto

O projeto contribuiu para reduzir o tempo de diagnóstico de falhas e aumentar a previsibilidade de manutenções preventivas nos equipamentos monitorados.
