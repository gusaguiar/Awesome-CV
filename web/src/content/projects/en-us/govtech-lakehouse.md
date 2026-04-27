---
id: "govtech-lakehouse"
title: "GovTech Data Lakehouse - Espirito Santo"
description: "Complete Data Lakehouse for multiple state secretariats of Espirito Santo with Cloudera Data Platform, PySpark, Airflow, AI models and RAG agents."
repository: "https://github.com/gusaguiar"
stack: ["Cloudera", "PySpark", "Airflow", "MLflow", "SAS Viya", "FastAPI", "Docker", "Kubernetes", "PostgreSQL", "Python"]
role: "Solutions Architect / Senior Data Scientist"
period: "Jul. 2022 - Present"
featured: true
locale: "en-us"
---

## Scope

Long-running analytical transformation project for the State Government of Espirito Santo, covering multiple secretariats: SEGER, SESA, SEDU, SEJUS, SESP, SECONT, Civil Police and SEPOL.

## Architecture

The Data Lakehouse runs on Cloudera Data Platform with medallion architecture (Bronze/Silver/Gold), orchestrated by Airflow and with ML models managed via MLflow. Applications are containerized with Docker and orchestrated on Kubernetes (Rancher and OpenShift).

## Key deliveries

- More than 300 data sources integrated with automated daily updates
- AI models for anomaly detection in public prices, document classification and demand forecasting
- RAG agents for procurement and legal advisory at SEGER
- Network analysis tool for fraud detection in state vehicle fleet
- Integrated legal Data Mart in SAS Viya for the Eletrobras Group
- More than 50 analytical dashboards and data products delivered
