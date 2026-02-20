# 📄 titleitemrow-schema-logic.md
# Standardized Component Schema
## Scalar Design System

Source Implementation:
../src/components/TitleItemRow.tsx

---

## 1. Component Identity
**Component:** TitleItemRow  
**Type:** ui  
**Responsibility:** Displays a title-value row (e.g. label + value, optional subtitle).

## 2. Intent Layer (WHY)
Presents key-value or title-value pairs in forms/details. Not interactive.

## 3. Variant Layer (WHAT)
Size (s | m | l). Structural only. No semantic variants.

## 4. State Layer (WHEN)
Static. Default only.

## 5. Token Mapping Layer (HOW IT LOOKS)
text-primary, text-secondary for title/value/subtitle. stroke-disable for border. Typography from tokens.

## 6. Layout & Spacing Layer
Flex row or stacked; padding by size; gap from spacing tokens.

## 7. Typography Layer
family-inter; size mapping s/m/l to font-size and line-height tokens.

## 8. Behavioral Constraints (GUARDRAILS)
CAN: display title, value, subtitle. MUST NOT: act as button, accept arbitrary colors, add interaction.

## 9. Accessibility Layer
Content readable. No interactive roles.

## 10. Anti-Patterns
❌ Hardcoded colors ❌ Interactive behavior ❌ Free-form variants

END OF SCHEMA
