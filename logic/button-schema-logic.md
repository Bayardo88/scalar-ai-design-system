# button-schema-logic.md
# Standardized Component Schema
## Scalar Design System

Source Implementation:
../src/components/Button.tsx

---

## 1. Component Identity

**Component:** Button  
**Type:** ui  
**Responsibility:** Triggers a single explicit user action; optional leading/trailing icon, loading state.

## 2. Intent Layer (WHY)

Primary action trigger. One action per activation. Not navigation (unless rendered as link externally). No internal state or business logic.

## 3. Variant Layer (WHAT)

Variant (brand | positive | negative | warning). Size (s | m | l). No arbitrary variants.

## 4. State Layer (WHEN)

default, hover, pressed, focus, disabled, loading. Token-based. When loading or disabled: no onClick.

## 5. Token Mapping Layer (HOW IT LOOKS)

All visual properties MUST use semantic tokens.

Theme requirements:

- The required semantic variables MUST be defined in both:
  - :root (light theme)
  - [data-theme="dark"] (dark theme)
- Missing variables is a schema violation.

## 6. Layout & Spacing Layer

inline-flex; gap spacing-s; padding by size; min height by size; border-radius xs (4px). Structure unchanged when loading (label reserved, spinner overlay).

## 7. Typography Layer

family-inter, weight-semi-bold; size s/m/l to font-size and line-height tokens.

## 8. Behavioral Constraints (GUARDRAILS)

CAN: children, variant, size, disabled, loading, iconLeft, iconRight, onClick. MUST NOT: multiple actions, internal fetch, arbitrary variants/sizes.

## 9. Accessibility Layer

- Icon-only buttons MUST provide aria-label (enforced via TypeScript prop typing).
- Icons are aria-hidden.
- Focus-visible MUST present a visible outline (token-driven).
- Native <button>. aria-disabled, aria-busy when loading. Keyboard activation.

## 10. Anti-Patterns

❌ Hardcoded colors ❌ div with role button ❌ Custom icons

## 11. Implementation Constraint

- Hover/pressed/focus-visible styling MUST be implemented via stylesheet state selectors (e.g. CSS Modules or prefixed CSS).
- Per-instance injected <style> blocks are not allowed.

END OF SCHEMA
