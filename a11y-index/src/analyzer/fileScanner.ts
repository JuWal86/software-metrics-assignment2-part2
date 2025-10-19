import { listFiles, readFileContent } from '../utils/file.js';
import { config } from '../config.js';

export function scanRepository(repoPath: string) {
  const files = listFiles(repoPath, config.extensions);
  const results = files.map(f => analyzeFile(f));
  const summary = aggregate(results);
  return { files: results, summary };
}
