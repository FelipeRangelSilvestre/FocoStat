import { useRef, useEffect } from 'react';

function drawForest(ctx, W, H) {
  ctx.fillStyle = '#0d2218';
  ctx.fillRect(0, 0, W, H);
  const gs = 6;
  for (let r = 0; r < Math.ceil(H / gs); r++) {
    for (let c = 0; c < Math.ceil(W / gs); c++) {
      const g = 28 + Math.random() * 38;
      ctx.fillStyle = `rgb(${Math.floor(g * 0.28)},${Math.floor(g)},${Math.floor(g * 0.3)})`;
      ctx.fillRect(c * gs, r * gs, gs - 1, gs - 1);
    }
  }
}

function drawFires(ctx, W, H, count) {
  for (let i = 0; i < count; i++) {
    const x = 12 + Math.random() * (W - 24);
    const y = 12 + Math.random() * (H - 24);
    const intensity = 0.45 + Math.random() * 0.55;
    const r = 3 + Math.random() * 6;

    ctx.beginPath();
    ctx.arc(x, y, r * 2, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(232,93,4,${intensity * 0.22})`;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,${Math.floor(90 + intensity * 70)},0,${0.65 + intensity * 0.35})`;
    ctx.fill();
  }
}

export default function FireMap({ simData }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.offsetWidth || canvas.width;
    const H = canvas.offsetHeight || canvas.height;
    canvas.width = W;
    canvas.height = H;
    const total = simData.reduce((s, d) => s + d.observed, 0);
    drawForest(ctx, W, H);
    drawFires(ctx, W, H, total);
  }, [simData]);

  return (
    <div className="panel">
      <div className="panel-title">Mapa de calor — região simulada</div>
      <div className="panel-sub">Cada ponto representa um foco detectado nos 30 intervalos</div>
      <div className="map-wrap">
        <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block', borderRadius: 6 }} />
      </div>
      <div className="chart-legend" style={{ marginTop: 8 }}>
        <span><span className="dot" style={{ background: '#ff4500' }} /> Foco ativo</span>
        <span><span className="dot" style={{ background: '#3a7a3a' }} /> Vegetação</span>
      </div>
    </div>
  );
}
