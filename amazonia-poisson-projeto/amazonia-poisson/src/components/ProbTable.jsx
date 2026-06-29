import { poissonPMF, poissonCDF, fmtPct } from '../utils/poisson';

export default function ProbTable({ lambda }) {
  const maxK = Math.min(12, Math.max(10, Math.ceil(lambda * 2.5)));
  const rows = [];
  for (let k = 0; k <= maxK; k++) {
    rows.push({ k, pmf: poissonPMF(k, lambda), cdf: poissonCDF(k, lambda) });
  }
  const maxPmf = Math.max(...rows.map((r) => r.pmf));

  return (
    <div className="panel">
      <div className="panel-title">Tabela de probabilidades</div>
      <div className="panel-sub">P(X = k) e P(X ≤ k) para cada valor de k</div>
      <div style={{ overflowY: 'auto', maxHeight: 280 }}>
        <table className="prob-table">
          <thead>
            <tr>
              <th>k</th>
              <th>Distribuição</th>
              <th>P(X=k)</th>
              <th>P(X≤k)</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ k, pmf, cdf }) => {
              const barW = Math.round((pmf / maxPmf) * 56);
              const isMode = pmf === maxPmf;
              return (
                <tr key={k} className={isMode ? 'row-mode' : ''}>
                  <td style={{ fontWeight: isMode ? 500 : 400 }}>{k}</td>
                  <td>
                    <span
                      className="prob-bar"
                      style={{ width: barW, background: isMode ? '#E85D04' : '#4CAF50' }}
                    />
                  </td>
                  <td>{fmtPct(pmf, 2)}</td>
                  <td style={{ color: '#888' }}>{fmtPct(cdf, 1)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
