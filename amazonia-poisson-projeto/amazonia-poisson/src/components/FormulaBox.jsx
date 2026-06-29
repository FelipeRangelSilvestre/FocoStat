import { poissonPMF, fmtBR, fmtPct } from '../utils/poisson';

export default function FormulaBox({ lambda }) {
  const k = Math.round(lambda);
  const p = poissonPMF(k, lambda);
  const eNeg = Math.exp(-lambda).toFixed(5);

  return (
    <div className="formula-box">
      <div className="formula-title">Fórmula de Poisson</div>
      <div className="formula-main">P(X = k) = (λ<sup>k</sup> × e<sup>−λ</sup>) / k!</div>
      <hr className="formula-divider" />
      <div className="formula-example">
        <strong>Exemplo com λ = {fmtBR(lambda)} e k = {k}:</strong>
        <div style={{ marginTop: 6, lineHeight: 1.9, fontSize: 13 }}>
          <span>
            P(X = {k}) = ({fmtBR(lambda)}
            <sup>{k}</sup> × e<sup>−{fmtBR(lambda)}</sup>) / {k}!
          </span>
          <br />
          <span>
            = ({fmtBR(lambda)}
            <sup>{k}</sup> × {eNeg}) / {k}!
          </span>
          <br />
          <span>
            ≈ <strong style={{ color: '#E85D04', fontSize: 15 }}>{fmtPct(p, 2)}</strong>
          </span>
        </div>
      </div>
      <div className="formula-note">
        Onde: <strong>λ</strong> = taxa média de eventos · <strong>k</strong> = número de eventos observados ·
        <strong> e</strong> ≈ 2,71828 (número de Euler)
      </div>
    </div>
  );
}
