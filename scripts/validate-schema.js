const fs = require("fs");
const path = require("path");

const COMPONENT_DIR = path.join(__dirname, "../src/components");
const SCHEMA_DIR = path.join(__dirname, "../logic");

function getFiles(dir, ext) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(ext))
    .map((f) => f.replace(ext, ""));
}

function fail(message) {
  console.error("❌ SCHEMA VALIDATION FAILED:");
  console.error(message);
  process.exit(1);
}

function validateFilePairing() {
  const components = getFiles(COMPONENT_DIR, ".tsx");
  const schemaFiles = getFiles(SCHEMA_DIR, "-schema-logic.md");
  const schemas = schemaFiles.map((name) =>
    name.replace("-schema-logic", "")
  );

  components.forEach((c) => {
    const key = c.toLowerCase().replace(/\s/g, "");
    if (!schemas.includes(key)) {
      fail(`Component "${c}.tsx" has no matching schema.`);
    }
  });

  schemas.forEach((s) => {
    const hasComponent = components.some(
      (c) => c.toLowerCase().replace(/\s/g, "") === s
    );
    if (!hasComponent) {
      fail(`Schema "${s}-schema-logic.md" has no matching component.`);
    }
  });
}

function validateVariantUsage() {
  if (!fs.existsSync(SCHEMA_DIR)) return;

  const componentFiles = fs
    .readdirSync(COMPONENT_DIR)
    .filter((f) => f.endsWith(".tsx"));

  componentFiles.forEach((file) => {
    const componentPath = path.join(COMPONENT_DIR, file);
    const baseName = file.replace(".tsx", "").toLowerCase();
    const schemaPath = path.join(SCHEMA_DIR, `${baseName}-schema-logic.md`);

    if (!fs.existsSync(schemaPath)) return;

    const componentContent = fs.readFileSync(componentPath, "utf-8");
    const schemaContent = fs.readFileSync(schemaPath, "utf-8");

    const hasVariantProp =
      /variant\s*\??\s*:\s*(?:React\.|)/.test(componentContent) ||
      /variant\s*\??\s*:\s*[A-Z]/.test(componentContent);
    if (!hasVariantProp) return;

    const variantMatches = componentContent.match(
      /variant\s*=\s*['"`]([^'"`]+)['"`]/g
    );
    if (!variantMatches) return;

    variantMatches.forEach((match) => {
      const variant = match.split(/['"`]/)[1];
      if (variant && !schemaContent.includes(variant)) {
        fail(
          `Variant "${variant}" used in ${file} is not documented in schema.`
        );
      }
    });
  });
}

validateFilePairing();
validateVariantUsage();

console.log("✅ Schema validation passed.");
