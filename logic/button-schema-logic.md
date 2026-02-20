# 📄 button-schema-logic.md
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
Background/text/icon tokens per variant and state. Material Symbols for icon and progress_activity (loading). No hardcoded colors.

## 6. Layout & Spacing Layer
inline-flex; gap spacing-s; padding by size; min height by size; border-radius m. Structure unchanged when loading (label reserved, spinner overlay).

## 7. Typography Layer
family-inter, weight-semi-bold; size s/m/l to font-size and line-height tokens.

## 8. Behavioral Constraints (GUARDRAILS)
CAN: children, variant, size, disabled, loading, iconLeft, iconRight, onClick. MUST NOT: multiple actions, internal fetch, arbitrary variants/sizes.

## 9. Accessibility Layer
Native <button>. aria-disabled, aria-busy when loading. Icon-only requires aria-label. Keyboard activation.

## 10. Anti-Patterns
❌ Hardcoded colors ❌ div with role button ❌ Custom icons

END OF SCHEMA
