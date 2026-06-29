import { poissonPMF, poissonCDF, fmtPct, fmtBR } from '../utils/poisson';

export default function MetricCards({ lambda }) {
  const p0     = poissonPMF(0, lambda);
  const pMean  = poissonCDF(Math.floor(lambda), lambda);
  const std    = Math.sqrt(lambda);
  const mode   = lambda >= 1 ? Math.floor(lambda) : 0;
  const pMode  = poissonPMF(mode, lambda);

  const cards = [
    { label: 'Taxa média λ',             value: fmtBR(lambda),    sub: 'eventos por intervalo' },
    { label: 'P(X = 0) — nenhum evento', value: fmtPct(p0),       sub: 'chance de intervalo vazio' },
    { label: 'P(X ≤ λ) — abaixo da média', value: fmtPct(pMean),  sub: 'probabilidade acumulada' },
    { label: 'Desvio padrão √λ',          value: fmtBR(std),      sub: 'dispersão esperada' },
    { label: `Moda k = ${mode}`,          value: fmtPct(pMode),   sub: 'valor mais provável' },
  ];

  return (
    <div className="metrics-row">
      {cards.map((c) => (
        <div className="metric-card" key={c.label}>
          <div className="metric-label">{c.label}</div>
          <div className="metric-value">{c.value}</div>
          <div className="metric-sub">{c.sub}</div>
        </div>
      ))}
    </div>
  );
}
