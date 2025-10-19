import fs from 'fs';

export type A11yFeatures = {
  altCount: number;
  ariaCount: number;
  semanticCount: number;
  labelCount: number;
  keyboardCount: number;
  penalties: number;
  totalTags: number;
};

export function analyzeFile(file: string): A11yFeatures {
  const code = fs.readFileSync(file, 'utf-8');
  const totalTags = (code.match(/<[A-Za-z][A-Za-z0-9:_-]*/g) || []).length;
  const altCount = (code.match(/\balt\s*=\s*["'][^"']+/gi) || []).length;
  const ariaCount = (code.match(/\baria-[a-z-]+\s*=/g) || []).length + (code.match(/\brole\s*=/g) || []).length;

  const semanticCount = (code.match(/<(nav|header|main|footer|section|button|figure|article|[A-Z][a-zA-Z]+Button|Nav|Header|Footer)\b/g) || []).length;
  const labelCount = (code.match(/<(label|input|textarea)\b/gi) || []).length;
  const keyboardCount = (code.match(/\btabindex\s*=\s*["']?-?\d+["']?/g) || []).length
    + (code.match(/\bon(KeyDown|KeyUp|KeyPress)\s*=/g) || []).length;

  // anti-patterns
  const divAsButton = (code.match(/<div[^>]+role\s*=\s*["']?button/g) || []).length;
  const onclickNonInteractive = (code.match(/<(div|span|p)[^>]+onClick\s*=/gi) || []).length;
  const missingAlt = (code.match(/<img(?![^>]*alt)/gi) || []).length;

  const penalties = divAsButton + onclickNonInteractive + missingAlt;

  return { altCount, ariaCount, semanticCount, labelCount, keyboardCount, penalties, totalTags };
}
