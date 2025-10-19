import path from "path";
import chalk from "chalk";
import { analyzeFile } from "./analyzer/featureDetector.ts";
import { scoreFeatures, aggregate } from "./analyzer/scoring.ts";
import { listFiles, writeJSON } from "./utils/file.ts";
import { config } from "./config.ts";

(async () => {
  const repoPath = process.argv[2] || ".";
  const files = listFiles(repoPath, config.extensions);
  const debug = process.env.DEBUG === "1";   // turn on with DEBUG=1

  const results = files.map(f => {
    const features = analyzeFile(f);
    const ai = scoreFeatures(features);
    if (debug) {
      console.log(chalk.gray(`\nFile: ${f}`));
      console.table(features);   // show raw category counts
      console.log(chalk.cyan(`AI → ${ai}`));
    }
    return { file: f, ai, features };
  });

  const summary = aggregate(results);

  console.log(chalk.cyan(`\nAccessibility Index Summary for ${repoPath}`));
  console.log(chalk.cyan("------------------------------------------"));
  results.slice(0, 10).forEach(r => {
    const color =
      r.ai >= config.thresholds.green ? chalk.green :
      r.ai >= config.thresholds.orange ? chalk.yellow : chalk.red;
    console.log(color(`${path.basename(r.file)} → ${r.ai}`));
  });

  console.log("\nAverage Accessibility Index:", chalk.bold(summary.averageAI));
  const gradeColor =
    summary.grade === "green" ? chalk.greenBright :
    summary.grade === "orange" ? chalk.yellowBright : chalk.redBright;
  console.log("Grade:", gradeColor(summary.grade.toUpperCase()));

  writeJSON("out/react_report.json", { results, summary });
})();
