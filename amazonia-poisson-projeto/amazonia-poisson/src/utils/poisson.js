export function poissonPMF(k, lambda) {
  if (k < 0 || lambda <= 0) return 0;
  let logP = k * Math.log(lambda) - lambda;
  for (let i = 1; i <= k; i++) logP -= Math.log(i);
  return Math.exp(logP);
}

export function poissonCDF(k, lambda) {
  let cum = 0;
  for (let i = 0; i <= k; i++) cum += poissonPMF(i, lambda);
  return Math.min(cum, 1);
}

export function poissonSample(lambda) {
  const L = Math.exp(-lambda);
  let k = 0, p = 1;
  do { k++; p *= Math.random(); } while (p > L);
  return k - 1;
}

export function buildDistribution(lambda) {
  const maxK = Math.max(14, Math.ceil(lambda * 3));
  const entries = [];
  for (let k = 0; k <= maxK; k++) {
    entries.push({ k, p: poissonPMF(k, lambda) });
  }
  return entries;
}

export function runSimulation(lambda, n = 30) {
  return Array.from({ length: n }, (_, i) => ({
    interval: i + 1,
    observed: poissonSample(lambda),
    mean: lambda,
  }));
}

export function fmtPct(v, decimals = 1) {
  return (v * 100).toFixed(decimals) + '%';
}

export function fmtBR(v, decimals = 1) {
  return v.toLocaleString('pt-BR', { maximumFractionDigits: decimals, minimumFractionDigits: decimals });
}
