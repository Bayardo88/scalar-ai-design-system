# 📄 modalstatuscell-schema-logic.md
# Standardized Component Schema
## Scalar Design System

Source Implementation:
../src/components/ModalStatusCell.tsx

---

## 1. Component Identity
**Component:** ModalStatusCell  
**Type:** ui  
**Responsibility:** Displays status (success, error, warning, info) in table/modal using Chip.

## 2. Intent Layer (WHY)
Shows status in structured layouts. Composes Chip. Does not trigger actions.

## 3. Variant Layer (WHAT)
Status (finite): success | error | warning | info. Size (s | m | l). Align (left | center | right). bordered (boolean).

## 4. State Layer (WHEN)
Static. Default only.

## 5. Token Mapping Layer (HOW IT LOOKS)
Status maps to Chip variant and icon. stroke-disable for border. Token-only.

## 6. Layout & Spacing Layer
Flex; padding by size; alignment by align. Chip inside cell.

## 7. Typography Layer
From Chip and size tokens.

## 8. Behavioral Constraints (GUARDRAILS)
CAN: display status Chip, align, bordered. MUST NOT: arbitrary status, custom icons, interaction.

## 9. Accessibility Layer
Chip accessible. No button/link semantics on cell.

## 10. Anti-Patterns
❌ Hardcoded colors ❌ Free-form status ❌ Interactive cell

END OF SCHEMA
