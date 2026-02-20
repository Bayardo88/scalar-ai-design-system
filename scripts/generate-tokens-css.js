const fs = require("fs");
const path = require("path");

const TOKENS_JSON = path.join(__dirname, "../src/tokens/design-tokens.scalar.ai.json");
const OUT_CSS = path.join(__dirname, "../src/styles/tokens.css");

const data = JSON.parse(fs.readFileSync(TOKENS_JSON, "utf-8"));
const t = data.tokens || {};

function toCssVars(obj, prefix = "--") {
  return Object.entries(obj)
    .filter(([, v]) => typeof v === "string")
    .map(([k, v]) => `  ${prefix}${k.replace(/\s/g, "-")}: ${v};`)
    .join("\n");
}

const primitives = toCssVars(t.primitiveColors || {});
const units = toCssVars(t.unit || {}, "--");
const semanticLight = toCssVars(t.semanticColorsLight || {}, "--");
const semanticDark = toCssVars(t.semanticColorsDark || {}, "--");

const primitiveType = t.primitiveType || {};
const typeVars = Object.entries(primitiveType)
  .filter(([, v]) => typeof v === "string")
  .map(([k, v]) => `  --${k.replace(/\s/g, "-")}: ${v.startsWith("var(") ? v : `"${v}"`};`)
  .join("\n");

const breakpoints = t.breakpoints || {};
const breakpointVars = Object.entries(breakpoints)
  .map(([k, v]) => `  --${k}: ${v};`)
  .join("\n");

const css = `/**
 * Scalar Design System — CSS variables
 * Auto-generated from src/tokens/design-tokens.scalar.ai.json
 * Supports :root (light) and [data-theme="dark"].
 */

:root {
  /* Primitive colors */
${primitives}

  /* Units */
${units}

  /* Typography primitives */
${typeVars}

  /* Breakpoints */
${breakpointVars}

  /* Semantic (light) */
${semanticLight}
}

[data-theme="dark"] {
${semanticDark}
}
`;

fs.mkdirSync(path.dirname(OUT_CSS), { recursive: true });
fs.writeFileSync(OUT_CSS, css, "utf-8");
console.log("Generated", OUT_CSS);
