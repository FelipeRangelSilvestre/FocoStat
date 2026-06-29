import { useState, useCallback } from 'react';
import MetricCards from './components/MetricCards';
import DistributionChart from './components/DistributionChart';
import ProbTable from './components/ProbTable';
import SimulationChart from './components/SimulationChart';
import FireMap from './components/FireMap';
import FormulaBox from './components/FormulaBox';
import { SCENARIOS } from './utils/scenarios';
import { runSimulation } from './utils/poisson';
import './App.css';

export default function App() {
  const [scenario, setScenario] = useState(SCENARIOS[0]);
  const [lambda, setLambda] = useState(SCENARIOS[0].lambda);
  const [simData, setSimData] = useState(() => runSimulation(SCENARIOS[0].lambda, 30));

  const handleScenario = (sc) => {
    setScenario(sc);
    setLambda(sc.lambda);
    setSimData(runSimulation(sc.lambda, 30));
  };

  const handleSimulate = useCallback(() => {
    setSimData(runSimulation(lambda, 30));
  }, [lambda]);

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <div>
            <h1 className="app-title">FocoStat</h1>
            <p className="app-subtitle">Queimadas na Amazônia — Modelo de Poisson</p>
          </div>
          <div className="header-badge">Probabilidade &amp; Estatística · ICET/UFAM</div>
        </div>
      </header>

      <main className="app-main">
        <section className="scenario-section">
          <div className="section-label">Escolha um cenário</div>
          <div className="scenario-btns">
            {SCENARIOS.map((sc) => (
              <button
                key={sc.id}
                className={`sc-btn ${scenario.id === sc.id ? 'active' : ''}`}
                onClick={() => handleScenario(sc)}
              >
                <span className="sc-icon">{sc.icon}</span>
                {sc.label}
              </button>
            ))}
          </div>
        </section>

        <section className="controls-section">
          <div className="controls-inner">
            <div className="ctrl-group">
              <label className="ctrl-label" htmlFor="lambda-range">
                Taxa média λ — {scenario.unit}
              </label>
              <div className="slider-row">
                <input
                  id="lambda-range"
                  type="range"
                  min="0.1"
                  max="12"
                  step="0.1"
                  value={lambda}
                  onChange={(e) => setLambda(parseFloat(e.target.value))}
                  className="lambda-slider"
                />
                <span className="lambda-val">{lambda.toFixed(1)}</span>
              </div>
            </div>
            <div className="ctrl-desc">
              <div className="ctrl-desc-label">Cenário ativo</div>
              <div className="ctrl-desc-text">{scenario.desc}</div>
            </div>
            <button className="sim-btn" onClick={handleSimulate}>
              Simular 30 intervalos
            </button>
          </div>
        </section>

        <MetricCards lambda={lambda} />

        <div className="two-col">
          <DistributionChart lambda={lambda} />
          <ProbTable lambda={lambda} />
        </div>

        <div className="two-col">
          <SimulationChart data={simData} lambda={lambda} />
          <FireMap simData={simData} />
        </div>

        <FormulaBox lambda={lambda} />
      </main>

      <footer className="app-footer">
        FocoStat · Equipe Lambda Verde · Competição de Soluções ICET/UFAM · 2026
      </footer>
    </div>
  );
}
