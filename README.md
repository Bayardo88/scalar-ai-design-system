# @scalar/design-system

Production-ready, token-driven React design system with schema governance. Part of the Scalar AI Design System.

## Installation

```bash
npm install @scalar/design-system react
```

Peer dependency: `react` (>=18).

## Usage

```tsx
import { Button, Chip, Avatar } from "@scalar/design-system";
import "@scalar/design-system/styles/tokens.css"; // or link the built CSS

<Button variant="brand" size="m" label="Submit" />
<Chip label="Tag" variant="neutral" />
<Avatar name="Jane" size="md" />
```

## Token import

Consumers can use design tokens (e.g. for custom layouts or theme wiring):

```tsx
import tokens from "@scalar/design-system/tokens";
// tokens.tokens.primitiveColors, tokens.tokens.semanticColorsLight, etc.
```

For CSS variables, import or link the generated tokens:

```tsx
import "@scalar/design-system/dist/styles/tokens.css"; // or link from node_modules
```

Or copy `src/styles/tokens.css` into your app and ensure it is loaded. It defines `:root` (light) and `[data-theme="dark"]` semantic variables.

## Governance

- **globalai.md** — Global AI governance: hierarchy, token-first rules, schema lock mode.
- **logic/*-schema-logic.md** — Per-component schema (variants, states, token mapping). Each schema references `../src/components/[Name].tsx`; each component references `../../logic/[name]-schema-logic.md`.
- New components require a schema in `logic/` first; implementation must stay in sync (no undocumented variants, token-only styling).

## Versioning

Semantic versioning. Minor for new components/variants; patch for fixes and docs. Major for breaking contract or token changes.

## Publishing

1. Ensure you are logged in: `npm login` (scope `@scalar`).
2. Run validations and build: `npm run prepublishOnly` (runs schema validation, token validation, then build).
3. Publish: `npm publish --access public` (for scoped package).

Publishing will fail if schema or token validation fails.

## Scripts

| Script | Description |
|--------|-------------|
| `npm run build` | Generate tokens CSS + tsup build (ESM + CJS + types) |
| `npm run validate:schema` | 1:1 component/schema pairing; documented variants only |
| `npm run validate:tokens` | No hex, px (except 1px), rgb(), hsl() in components |
| `npm run lint` | ESLint (no hex, token-first rules) |
| `npm run prepublishOnly` | validate:schema + validate:tokens + build |

## License

MIT
