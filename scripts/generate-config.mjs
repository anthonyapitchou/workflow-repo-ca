// Reads .env and writes js/config.js so the browser code can use the values.
// The browser cannot read .env directly, so this runs as part of `npm run dev`
// (and can be run on its own with `npm run config`).

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const envPath = resolve(root, ".env");
const outPath = resolve(root, "js/config.js");

const defaults = {
  API_BASE_URL: "https://v2.api.noroff.dev/",
  API_KEY: "",
};

function parseEnv(contents) {
  const env = {};
  for (const rawLine of contents.split("\n")) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;

    const eq = line.indexOf("=");
    if (eq === -1) continue;

    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();

    const quoted =
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"));
    if (quoted) value = value.slice(1, -1);

    env[key] = value;
  }
  return env;
}

const fileEnv = existsSync(envPath)
  ? parseEnv(readFileSync(envPath, "utf8"))
  : {};

let apiUrl = fileEnv.API_BASE_URL || defaults.API_BASE_URL;
if (!apiUrl.endsWith("/")) apiUrl += "/"; // requests append paths like `auth/login`

const apiKey = fileEnv.API_KEY ?? defaults.API_KEY;

const output = `// AUTO-GENERATED from .env by scripts/generate-config.mjs.
// Do not edit by hand — run \`npm run config\` to regenerate.
export const CONFIG = {
  apiUrl: ${JSON.stringify(apiUrl)},
  apiKey: ${JSON.stringify(apiKey)},
};
`;

writeFileSync(outPath, output);

if (!existsSync(envPath)) {
  console.warn("No .env found — generated js/config.js with default values.");
}
console.log(
  `Wrote js/config.js (apiUrl: ${apiUrl}, apiKey: ${apiKey ? "set" : "empty"})`
);
