import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ReferenceLine, ResponsiveContainer, Cell,
} from 'recharts';
import { buildDistribution, fmtPct } from '../utils/poisson';

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const { k, p } = payload[0].payload;
  return (
    <div className="tooltip">
      <div className="tooltip-title">k = {k} eventos</div>
      <div>P(X = {k}) = <strong>{fmtPct(p, 2)}</strong></div>
    </div>
  );
}

export default function DistributionChart({ lambda }) {
  const data = buildDistribution(lambda);
  const mode = data.reduce((best, d) => (d.p > best.p ? d : best), data[0]);

  return (
    <div className="panel">
      <div className="panel-title">Distribuição de probabilidade P(X = k)</div>
      <div className="panel-sub">
        Altura de cada barra = probabilidade de observar exatamente k eventos num intervalo
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.15)" vertical={false} />
          <XAxis
            dataKey="k"
            tick={{ fontSize: 11, fill: '#888' }}
            label={{ value: 'k (nº de eventos)', position: 'insideBottom', offset: -4, fontSize: 11, fill: '#888' }}
          />
          <YAxis
            tickFormatter={(v) => (v * 100).toFixed(0) + '%'}
            tick={{ fontSize: 11, fill: '#888' }}
            width={42}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(128,128,128,0.08)' }} />
          <ReferenceLine x={lambda} stroke="#4CAF50" strokeDasharray="4 3" strokeWidth={1.5} label={{ value: 'λ', fill: '#4CAF50', fontSize: 12 }} />
          <Bar dataKey="p" radius={[3, 3, 0, 0]} maxBarSize={36}>
            {data.map((entry) => (
              <Cell
                key={entry.k}
                fill={entry.k === mode.k ? '#E85D04' : entry.k === 0 ? '#888' : '#4CAF50'}
                opacity={entry.k === mode.k ? 1 : 0.65}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="chart-legend">
        <span><span className="dot" style={{ background: '#E85D04' }} /> Moda (k mais provável)</span>
        <span><span className="dot" style={{ background: '#4CAF50' }} /> Demais valores</span>
        <span><span className="dot" style={{ background: '#888' }} /> k = 0 (nenhum evento)</span>
        <span style={{ color: '#4CAF50', fontSize: 11 }}>— λ (média)</span>
      </div>
    </div>
  );
}
