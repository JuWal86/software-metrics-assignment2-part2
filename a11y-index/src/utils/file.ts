import fs from 'fs';
import path from 'path';
import fg from 'fast-glob';

export function listFiles(root: string, extensions: string[]) {
  const patterns = extensions.map(e => `**/*${e}`);
  return fg.sync(patterns, {
    cwd: root,
    absolute: true,
    ignore: [
      '**/node_modules/**',
      '**/assets/**',
      '**/images/**',
      '**/static/**',
      '**/scripts/**',
      '**/css/**',
    ]
  });
}


export function readFileContent(file: string) {
  return fs.readFileSync(file, 'utf-8');
}

export function writeJSON(outPath: string, data: any) {
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(data, null, 2), 'utf-8');
}
