export const BLessThanK = (b, k, x0, v0) => {
  const k1 = Math.sqrt(k * k - b * b);
  const A = x0;
  const B = (b * x0 + v0) / k1;

  return {
    position: (t) =>
      Math.exp(-b * t) * (A * Math.cos(k1 * t) + B * Math.sin(k1 * t)),
    velocity: (t) =>
      k1 * Math.exp(-b * t) * (B * Math.cos(k1 * t) - A * Math.sin(k1 * t)) -
      b * Math.exp(-b * t) * (A * Math.cos(k1 * t) + B * Math.sin(k1 * t)),
  };
};

export const KLessThanB = (b, k, x0, v0) => {
  const n = Math.sqrt(b * b - k * k);
  const C1 = (v0 + n * x0 + b * x0) / 2.0;
  const C2 = x0 - C1;

  return {
    position: (t) =>
      Math.exp(-b * t) * (C1 * Math.exp(n * t) + C2 * Math.exp(-n * t)),
    velocity: (t) =>
      n * Math.exp(-b * t) * (C1 * Math.exp(n * t) - C2 * Math.exp(-n * t)) -
      b * Math.exp(-b * t) * (C1 * Math.exp(n * t) + C2 * Math.exp(-n * t)),
  };
};

export const KEqualsB = (b, x0, v0) => {
    const C1 = x0;
    const C2 = v0 + b * x0;

    return {
        position: (t) => Math.exp(-b * t) * (C1 + C2 * t),
        velocity:  (t) => Math.exp(-b * t) * C2 - b * Math.exp(-b * t) * (C1 + C2 * t)
    }
}

