import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ReferenceLine, ResponsiveContainer, Cell,
} from 'recharts';
import { fmtBR } from '../utils/poisson';

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const obs = payload.find((p) => p.dataKey === 'observed')?.value;
  const mean = payload.find((p) => p.dataKey === 'mean')?.value;
  return (
    <div className="tooltip">
      <div className="tooltip-title">Intervalo {label}</div>
      <div>Observado: <strong>{obs}</strong> eventos</div>
      <div style={{ color: '#4CAF50' }}>Média λ = {fmtBR(mean)}</div>
    </div>
  );
}

export default function SimulationChart({ data, lambda }) {
  const avg = data.length ? (data.reduce((s, d) => s + d.observed, 0) / data.length) : 0;

  return (
    <div className="panel">
      <div className="panel-title">Simulação — 30 intervalos observados</div>
      <div className="panel-sub">
        Média simulada: <strong>{fmtBR(avg)}</strong> &nbsp;·&nbsp; λ esperado: <strong>{fmtBR(lambda)}</strong>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <ComposedChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.15)" vertical={false} />
          <XAxis
            dataKey="interval"
            tick={{ fontSize: 10, fill: '#888' }}
            label={{ value: 'Intervalo simulado', position: 'insideBottom', offset: -4, fontSize: 11, fill: '#888' }}
            tickCount={10}
          />
          <YAxis tick={{ fontSize: 11, fill: '#888' }} width={32} allowDecimals={false} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(128,128,128,0.08)' }} />
          <ReferenceLine y={lambda} stroke="#4CAF50" strokeDasharray="4 3" strokeWidth={1.5} />
          <Bar dataKey="observed" radius={[2, 2, 0, 0]} maxBarSize={18}>
            {data.map((entry, i) => (
              <Cell
                key={i}
                fill={entry.observed > lambda * 2 ? '#ff4500' : '#E85D04'}
                opacity={0.8}
              />
            ))}
          </Bar>
          <Line dataKey="mean" stroke="transparent" dot={false} activeDot={false} />
        </ComposedChart>
      </ResponsiveContainer>
      <div className="chart-legend">
        <span><span className="dot" style={{ background: '#E85D04' }} /> Focos observados</span>
        <span><span className="dot" style={{ background: '#ff4500' }} /> Pico ({'>'} 2λ)</span>
        <span style={{ color: '#4CAF50', fontSize: 11 }}>— — λ (média esperada)</span>
      </div>
    </div>
  );
}
