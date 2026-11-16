import { spawnSync } from "node:child_process";

if (!process.env.DATABASE_URL?.trim()) {
  console.log("[SITES EVOLVE] No DATABASE_URL set — skipping database migrations for public preview.");
  process.exit(0);
}

console.log("[SITES EVOLVE] Database detected — applying committed Prisma migrations.");
const npm = process.platform === "win32" ? "npm.cmd" : "npm";
const result = spawnSync(npm, ["run", "db:deploy"], {
  stdio: "inherit",
  env: process.env,
  shell: false,
});
if (result.error) {
  console.error("[SITES EVOLVE] Database migration process failed to start.");
  process.exit(1);
}
process.exit(result.status ?? 1);
