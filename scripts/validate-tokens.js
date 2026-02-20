const fs = require("fs");
const path = require("path");

const COMPONENT_DIR = path.join(__dirname, "../src/components");

const forbiddenPatterns = [
  { pattern: /#[0-9a-fA-F]{3,6}\b/g, name: "hex color" },
  { pattern: /\b(?!1px)\d+px\b/g, name: "px value (non-1px)" },
  { pattern: /rgb\s*\(/g, name: "rgb()" },
  { pattern: /hsl\s*\(/g, name: "hsl()" },
];

function fail(message) {
  console.error("❌ TOKEN DRIFT DETECTED:");
  console.error(message);
  process.exit(1);
}

if (!fs.existsSync(COMPONENT_DIR)) {
  console.log("✅ Token validation passed (no components).");
  process.exit(0);
}

const files = fs
  .readdirSync(COMPONENT_DIR)
  .filter((f) => f.endsWith(".tsx"));

files.forEach((file) => {
  const content = fs.readFileSync(
    path.join(COMPONENT_DIR, file),
    "utf-8"
  );

  forbiddenPatterns.forEach(({ pattern, name }) => {
    const matches = content.match(pattern);
    if (matches) {
      fail(`Forbidden ${name} in ${file}: ${matches[0]}`);
    }
  });
});

console.log("✅ Token validation passed.");
