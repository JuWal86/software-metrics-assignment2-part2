export const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
export const toPercent = (v: number) => Math.round(clamp01(v) * 100);
