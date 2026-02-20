# 📄 header-schema-logic.md
# Standardized Component Schema
## Scalar Design System

Source Implementation:
../src/components/Header.tsx

---

## 1. Component Identity
**Component:** Header  
**Type:** ui  
**Responsibility:** Composes HorizontalMenuItem (nav), Picker (e.g. dates), InformationLabel (helper text). Layout: row + optional info below.

## 2. Intent Layer (WHY)
Page or section header with nav and picker. Composed; does not implement nav or picker logic.

## 3. Variant Layer (WHAT)
Size (s | m | l) passed to children. bordered (boolean). No semantic variants.

## 4. State Layer (WHEN)
Static container. Interactive states in children only.

## 5. Token Mapping Layer (HOW IT LOOKS)
background-page, stroke-disable (bottom border). Spacing tokens. Child components use their own tokens.

## 6. Layout & Spacing Layer
Flex column. Row: flex, space-between, wrap. Nav left, Picker right. Info label below with margin-top.

## 7. Typography Layer
From child components (MetricTitle, InformationLabel, etc.).

## 8. Behavioral Constraints (GUARDRAILS)
CAN: menuItems, picker config, informationLabel, size, bordered. MUST NOT: hardcode layout colors, replace child components with custom UI.

## 9. Accessibility Layer
role="banner". Nav and Picker expose their own a11y.

## 10. Anti-Patterns
❌ Hardcoded colors ❌ Skipping composed components

END OF SCHEMA
