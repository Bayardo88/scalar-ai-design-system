# 📄 evaluationstatuscell-schema-logic.md
# Standardized Component Schema
## Scalar Design System

Source Implementation:
../src/components/EvaluationStatusCell.tsx

---

## 1. Component Identity
**Component:** EvaluationStatusCell  
**Type:** ui  
**Responsibility:** Displays evaluation status in table/modal using Chip (success, error, warning, info).

## 2. Intent Layer (WHY)
Communicates evaluation result in structured layouts. Composes Chip. Does not trigger actions.

## 3. Variant Layer (WHAT)
Status semantic variants (finite): success | error | warning | info. Size (s | m | l). Align (left | center | right). Chip style: filled | outlined. bordered (boolean).

## 4. State Layer (WHEN)
Static. Default only. No interactive states.

## 5. Token Mapping Layer (HOW IT LOOKS)
Maps status to Chip variant and icon. Border: stroke-disable. All via Chip and tokens.

## 6. Layout & Spacing Layer
Flex; padding by size; alignment by align. Chip renders inside cell.

## 7. Typography Layer
Inherited from Chip and size. family-inter, tokenized size/line-height.

## 8. Behavioral Constraints (GUARDRAILS)
CAN: display status Chip, align, bordered. MUST NOT: accept arbitrary status values, override Chip, add interaction.

## 9. Accessibility Layer
Chip and label accessible. No interactive roles on cell.

## 10. Anti-Patterns
❌ Hardcoded colors ❌ Free-form status ❌ Custom icons ❌ Interactive cell

END OF SCHEMA
