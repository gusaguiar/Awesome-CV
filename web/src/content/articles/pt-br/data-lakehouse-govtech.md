---
id: "data-lakehouse-govtech"
title: "Construindo Data Lakehouses para Governos Estaduais"
description: "Arquitetura prática de um Data Lakehouse com Cloudera Data Platform, PySpark e Airflow para atender múltiplas secretarias estaduais com pipelines Bronze/Silver/Gold."
publishedAt: 2025-11-10
tags: ["data-engineering", "lakehouse", "cloudera", "pyspark", "airflow", "govtech"]
locale: "pt-br"
draft: false
relatedIds: []
---

## O problema

Secretarias estaduais acumulam dados em silos: sistemas legados, planilhas compartilhadas, bancos relacionais e APIs externas com contratos distintos. Quando chega a hora de gerar um relatório gerencial, a integração é manual e demora dias.

## A solução: Lakehouse em três camadas

Adotamos a arquitetura medalhão (Bronze/Silver/Gold) sobre Cloudera Data Platform com HDFS como armazenamento distribuído e Impala para consultas analíticas.

```
Bronze  → dados brutos exatamente como chegam (imutável)
Silver  → dados limpos, tipados e validados por schema
Gold    → agregações e marts prontos para consumo analítico
```

### Orquestração com Airflow

Cada secretaria tem seu próprio namespace de DAGs. O padrão de DAG para ingestão é:

```python
from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime

with DAG(
    dag_id="seger_folha_pagamento_bronze",
    schedule="0 6 * * *",
    start_date=datetime(2024, 1, 1),
    catchup=False,
    tags=["seger", "bronze", "folha"],
) as dag:
    ingerir = PythonOperator(
        task_id="ingerir_api_seger",
        python_callable=ingerir_folha_pagamento,
    )
    validar = PythonOperator(
        task_id="validar_schema",
        python_callable=validar_bronze,
    )
    ingerir >> validar
```

## Governança e segurança

Com Ranger e Kerberos configurados, cada secretaria só acessa seu próprio namespace no HDFS. A auditoria de acessos fica centralizada no Ranger Admin, atendendo aos requisitos de LGPD para dados sensíveis de saúde e segurança pública.

## Resultados

Em 18 meses operando com múltiplas secretarias do Espírito Santo, o lakehouse consolidou mais de 300 fontes de dados distintas, com atualização diária automatizada e tempo médio de disponibilização de novos dados inferior a 2 horas após a chegada na camada Bronze.
