/* eslint-env node */
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
  ],
  ignorePatterns: ["dist", "node_modules", "*.cjs"],
  parser: "@typescript-eslint/parser",
  parserOptions: { ecmaVersion: "latest", sourceType: "module", ecmaFeatures: { jsx: true } },
  plugins: ["@typescript-eslint", "react"],
  settings: { react: { version: "detect" } },
  rules: {
    "react/prop-types": "off",
    "no-restricted-syntax": [
      "error",
      {
        selector: "Literal[value=/^#[0-9a-fA-F]{3,8}$/]",
        message: "Use design tokens (var(--token-name)), not hex colors.",
      },
    ],
  },
  overrides: [
    {
      files: ["src/**/*.ts", "src/**/*.tsx"],
      rules: {
        "no-restricted-syntax": [
          "error",
          { selector: "Literal[value=/^#[0-9a-fA-F]{3,8}$/]", message: "Use design tokens (var(--token-name)), not hex colors." },
          { selector: "Literal[value=/^\\d+px$/]", message: "Use token scale (e.g. var(--8)), not raw px (except 1px)." },
        ],
      },
    },
  ],
};
