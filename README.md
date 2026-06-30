<div align="center">
  <img width="300" height="300" alt="ChatGPT Image 30 de jun  de 2026, 10_50_25" src="https://github.com/user-attachments/assets/6c399738-5718-4a39-bc19-e39983609fe9" />
</div>

# 🔥 FocoStat

**Ferramenta educacional interativa para o ensino do Modelo de Poisson**, contextualizada com cenários reais de queimadas na Amazônia.

Desenvolvido pela equipe **Lambda Verde** para a Competição de Soluções para o Ensino dos Modelos Binomial e Poisson — LAMAPP/NUPEC, ICET/UFAM, 2026.

---

## 📖 Sobre o projeto

O FocoStat permite que o usuário explore, de forma visual e interativa, como o **Modelo de Poisson** descreve a ocorrência de eventos raros num intervalo de tempo ou área. Em vez de exemplos abstratos, a aplicação usa dados contextualizados à realidade amazônica — focos de incêndio, detecções por satélite e alertas de desmatamento — tornando o aprendizado mais relevante e próximo da realidade regional.

Ajustando o parâmetro **λ (lambda)**, o usuário observa em tempo real como muda a distribuição de probabilidade, a simulação de eventos e a interpretação estatística.

## ✨ Funcionalidades

- **4 cenários amazônicos reais**: incêndios semanais, queimadas detectadas por satélite, alertas DETER mensais e focos em época seca
- **Slider interativo de λ**: todos os gráficos e métricas se atualizam em tempo real
- **Histograma de distribuição** P(X = k), com destaque visual na moda e na média
- **Tabela de probabilidades** com P(X = k) e P(X ≤ k) para cada valor de k
- **Simulação estocástica** de 30 intervalos, com amostragem real de Poisson
- **Mapa de calor estilizado** representando os focos gerados na simulação
- **Painel de métricas**: P(X = 0), P(X ≤ λ), desvio padrão (√λ) e moda
- **Fórmula de Poisson explicada**, com exemplo numérico calculado dinamicamente
- **Dark mode automático**, seguindo a preferência do sistema do usuário

## 🛠️ Tecnologias utilizadas

| Tecnologia | Finalidade |
|---|---|
| [React](https://react.dev/) + [Vite](https://vitejs.dev/) | Framework e bundler do frontend |
| [Recharts](https://recharts.org/) | Gráficos de distribuição e simulação |
| Canvas API (HTML5) | Renderização do mapa de calor |
| CSS com variáveis | Tema visual responsivo e dark mode |

## 🚀 Como rodar localmente

```bash
# Clonar o repositório
git clone <url-do-repositorio>
cd amazonia-poisson

# Instalar dependências
npm install

# Rodar em modo desenvolvimento
npm run dev
```

A aplicação ficará disponível em `http://localhost:5173`.

### Build de produção

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`, prontos para deploy em qualquer serviço de hospedagem estática (Vercel, Netlify, GitHub Pages, etc.).

## 📁 Estrutura do projeto

```
src/
├── components/
│   ├── MetricCards.jsx       # Cards com P(X=0), desvio padrão, moda etc.
│   ├── DistributionChart.jsx # Histograma da distribuição de Poisson
│   ├── ProbTable.jsx         # Tabela de probabilidades P(X=k) e P(X≤k)
│   ├── SimulationChart.jsx   # Gráfico de simulação de 30 intervalos
│   ├── FireMap.jsx           # Mapa de calor (Canvas API)
│   └── FormulaBox.jsx        # Fórmula com exemplo numérico em tempo real
├── utils/
│   ├── poisson.js            # Funções matemáticas (PMF, CDF, amostragem)
│   └── scenarios.js          # Definição dos cenários amazônicos
├── App.jsx                   # Componente principal
└── App.css                   # Estilos e tema visual
```

## 🧮 Fundamentação matemática

A aplicação implementa a função de massa de probabilidade do Modelo de Poisson:

```
P(X = k) = (λᵏ × e⁻λ) / k!
```

onde **λ** é a taxa média de eventos por intervalo, **k** é o número de eventos observados e **e** é a constante de Euler (≈ 2,71828). A função de distribuição acumulada P(X ≤ k) e a amostragem estocástica (para a simulação) também são implementadas em `src/utils/poisson.js`.

## 🤖 Uso de Inteligência Artificial

Este projeto foi desenvolvido com apoio de ferramentas de Inteligência Artificial, em conformidade com o regulamento da competição. O relatório detalhado de uso — ferramentas, etapas, decisões da equipe e validações — está disponível separadamente na documentação entregue à organização.

## 👥 Equipe Lambda Verde

<table align="center">
  <tr>
    <td align="center"><a href="https://github.com/FelipeRangelSilvestre"><img src="https://github.com/FelipeRangelSilvestre.png" width="100px;" alt=""/><br /><sub><b>Felipe Rangel</b></sub></a></td>
    <td align="center"><a href="https://github.com/IasBraga"><img src="https://github.com/IasBraga.png" width="100px;" alt=""/><br /><sub><b>Iasmim Braga</b></sub></a></td>
    <td align="center"><a href="https://github.com/marecelobarrosdasilva-bit"><img src="https://github.com/marecelobarrosdasilva-bit.png" width="100px;" alt=""/><br /><sub><b>Marcelo Barros</b></sub></a></td>
  </tr>
</table>

## 📄 Licença

Projeto desenvolvido para fins acadêmicos no âmbito da Competição de Soluções LAMAPP/NUPEC — ICET/UFAM. Direitos de uso acadêmico cedidos ao LAMAPP e ao NUPEC conforme regulamento, sem prejuízo da autoria intelectual da equipe.
