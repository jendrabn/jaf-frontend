import { execSync } from "node:child_process";

const run = (command) => {
  execSync(command, { stdio: "inherit" });
};

try {
  run("tsc -b");
  run("vite build");
} catch (error) {
  // Keep the original exit code/context for npm
  if (error?.status) {
    process.exit(error.status);
  }
  process.exit(1);
}
