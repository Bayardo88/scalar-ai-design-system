# 📄 avatar-schema-logic.md
# Standardized Component Schema
## Scalar Design System

Source Implementation:
../src/components/Avatar.tsx

---

## 1. Component Identity
**Component:** Avatar  
**Type:** ui  
**Responsibility:** Represents user/entity via image, initials, icon, or anonymous fallback; optional onClick.

## 2. Intent Layer (WHY)
Identity marker. Not navigation. Optional interaction (onClick). Fallback order: image → initials → icon → anonymous.

## 3. Variant Layer (WHAT)
Size (xs | sm | md | lg | xl). Variant (user | organization | system | anonymous); semantic only. bordered (boolean). No semantic color variants beyond token mapping.

## 4. State Layer (WHEN)
default, hover/pressed when onClick and not disabled, focus when interactive, disabled. No structural change.

## 5. Token Mapping Layer (HOW IT LOOKS)
background-brand, text-button-label, stroke-disable (border). Icon: icon-brand. Material Symbol "person" for anonymous; prop icon for icon fallback.

## 6. Layout & Spacing Layer
Square (1:1), border-radius 50%, overflow hidden. Min width/height by size. Inline-flex center. No layout shift on fallback.

## 7. Typography Layer
Initials: family-inter, weight-semi-bold; size from size variant. Icon size from size.

## 8. Behavioral Constraints (GUARDRAILS)
CAN: src, alt, name, initials, icon, variant, onClick, disabled, aria-label. MUST NOT: free-form sizes/variants, custom SVGs, internal async fetch.

## 9. Accessibility Layer
role="img" or role="button" when onClick. aria-label; full name in initials mode. aria-disabled when disabled. Image alt.

## 10. Anti-Patterns
❌ Hardcoded colors ❌ Arbitrary size ❌ Replacing input/roles incorrectly

END OF SCHEMA
