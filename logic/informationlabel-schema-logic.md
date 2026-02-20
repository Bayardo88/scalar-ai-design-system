# 📄 informationlabel-schema-logic.md
# Standardized Component Schema
## Scalar Design System

Source Implementation:
../src/components/InformationLabel.tsx

---

## 1. Component Identity
**Component:** InformationLabel  
**Type:** ui  
**Responsibility:** Helper or contextual label with optional leading info icon; muted text for hints/metadata.

## 2. Intent Layer (WHY)
Informational text only. Not interactive. Not a control label (use for descriptions, hints).

## 3. Variant Layer (WHAT)
Size (s | m | l). Variant: secondary | tertiary (text color). showIcon (boolean). No semantic status variants.

## 4. State Layer (WHEN)
Static. Default only.

## 5. Token Mapping Layer (HOW IT LOOKS)
text-secondary | text-tertiary. icon-brand for icon. Material Symbol (default "info"). Typography from tokens.

## 6. Layout & Spacing Layer
inline-flex; align center; gap spacing-xs. Icon optional leading.

## 7. Typography Layer
family-inter, weight-regular; size mapping s/m/l to font-size and line-height tokens.

## 8. Behavioral Constraints (GUARDRAILS)
CAN: display text, optional icon, variant, size. MUST NOT: act as button, accept arbitrary colors, add interaction.

## 9. Accessibility Layer
Text readable. Icon aria-hidden. No interactive roles.

## 10. Anti-Patterns
❌ Hardcoded colors ❌ Interactive behavior ❌ Custom icons

END OF SCHEMA
