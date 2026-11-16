import { defineRailway, project, service } from "railway/iac";
// This repository manages only its own resources in the environment. Other
// repositories export their own partial name.
// See https://docs.railway.com/infrastructure-as-code#multi-repo-projects
export const partial = "sites-evolve";
export default defineRailway(() => {
  const sitesEvolve = service("sites-evolve", {
    build: { buildCommand: "npm run build", buildEnvironment: "V3", builder: "RAILPACK" },
    start: "npm run start -- -H 0.0.0.0",
    healthcheck: "/api/health",
    healthcheckTimeout: 180,
    preDeploy: "npm run db:deploy:optional",
    replicas: { "iad": 1 },
  });

  return project("sites-evolve", {
    variables: { managed: false },
    resources: [sitesEvolve],
  });
});
