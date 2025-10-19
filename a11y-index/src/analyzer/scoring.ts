import { config } from '../config.ts';
import type { A11yFeatures } from './featureDetector.ts';
import { clamp01 } from '../utils/normalize.ts';

export function scoreFeatures(f: A11yFeatures) {
  // Normalize gently by scaling per 100 tags instead of per tag
  const ratio = f.totalTags > 0 ? f.totalTags / 100 : 1;

  // Compute proportional scores (bounded between 0 and 1)
  const altScore = clamp01(f.altCount / ratio);
  const ariaScore = clamp01(f.ariaCount / ratio);
  const semanticsScore = clamp01(f.semanticCount / ratio);
  const labelScore = clamp01(f.labelCount / ratio);
  const keyboardScore = clamp01(f.keyboardCount / ratio);
  const penaltyScore = clamp01(f.penalties / (ratio * 2)); // softer penalty impact

  // Weighted sum — emphasize good practices, reduce penalty influence
  const weighted =
    altScore * config.weights.alt * 1.2 +
    ariaScore * config.weights.aria * 1.2 +
    semanticsScore * config.weights.semantics +
    labelScore * config.weights.label +
    keyboardScore * config.weights.keyboard -
    penaltyScore * config.weights.penalties * 0.5;

  // Apply a baseline so decent pages don’t score unrealistically low
  const adjusted = weighted * 0.7;

  // Convert to percentage (0–100) and clamp to avoid overflow
  return Math.round(clamp01(adjusted) * 100);
}

export function aggregate(results: { file: string; ai: number; features?: { totalTags?: number } }[]) {
  // Filter out very small / structural HTML files from the AI computation
  const filtered = results.filter(r =>
    r.features && r.features.totalTags && r.features.totalTags >= 50
  );

  // If all files are small, just use all results
  const validResults = filtered.length ? filtered : results;

  // Compute average AI only on valid pages
  const avg = validResults.reduce((s, r) => s + r.ai, 0) / validResults.length;

  const grade =
    avg >= config.thresholds.green ? 'green' :
    avg >= config.thresholds.orange ? 'orange' : 'red';

  // Include extra info for transparency
  return {
    averageAI: Math.round(avg),
    grade,
    totalAnalyzed: results.length,
    includedInAverage: validResults.length
  };
}
