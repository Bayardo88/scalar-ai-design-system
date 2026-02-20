# 📄 datacell-schema-logic.md
# Standardized Component Schema
## Scalar Design System

Source Implementation:
../src/components/DataCell.tsx

---

## 1. Component Identity
**Component:** DataCell  
**Type:** ui  
**Responsibility:** Displays table body cell content; pairs with ColumnHeader for aligned columns.

## 2. Intent Layer (WHY)
Renders cell content in structured data layouts (tables, grids). Does not represent actions or navigation.

## 3. Variant Layer (WHAT)
No semantic color variants. Structural only: size (s | m | l), alignment (left | center | right), variant (primary | secondary), bordered (boolean).

## 4. State Layer (WHEN)
Static. States: default only. No hover, focus, or pressed.

## 5. Token Mapping Layer (HOW IT LOOKS)
Text: text-primary | text-secondary. Border: stroke-disable. Typography from tokens by size. No hardcoded colors.

## 6. Layout & Spacing Layer
display: flex; align-items: center; padding: spacing-s vertical, spacing-m horizontal; justify-content by align. Min height by size (var(--32)|var(--40)|var(--48)).

## 7. Typography Layer
family-inter, weight-regular, letter-spacing-none. Size s: var(--12)/var(--16); m: var(--14)/var(--20); l: var(--16)/var(--24).

## 8. Behavioral Constraints (GUARDRAILS)
CAN: display content, align, use primary/secondary tone, show border. MUST NOT: act as button/link, accept arbitrary colors/sizes, add interactive states.

## 9. Accessibility Layer
Text readable by screen readers. No interactive roles. No button/link semantics.

## 10. Anti-Patterns
❌ Hardcoded colors ❌ Arbitrary px ❌ Interactive behavior ❌ Free-form variants

END OF SCHEMA
