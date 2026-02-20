# 📄 metricitem-schema-logic.md
# Standardized Component Schema
## Scalar Design System

Source Implementation:
../src/components/MetricItem.tsx

---

## 1. Component Identity
**Component:** MetricItem  
**Type:** ui  
**Responsibility:** Single row for metric label (from Knowledge Base or children), optional value, optional icon; optionally selectable (onClick).

## 2. Intent Layer (WHY)
List item in metric pickers, sidebars. Optional selection. Not navigation; selection callback only.

## 3. Variant Layer (WHAT)
Size (s | m | l). selected (boolean). Optional icon (Material Symbol). bordered (boolean). metric (KnowledgeBaseMetricKey) or children. No semantic color variants.

## 4. State Layer (WHEN)
default, selected, hover/pressed when onClick set. disabled not in props (external). Token-based.

## 5. Token Mapping Layer (HOW IT LOOKS)
text-primary, text-secondary (value). background-hover when selected or hover. icon-brand. stroke-disable for border.

## 6. Layout & Spacing Layer
flex; gap spacing-s; padding s/m; min height by size. Label flex 1 minWidth 0; value shrink 0.

## 7. Typography Layer
family-inter, weight-regular; size mapping s/m/l.

## 8. Behavioral Constraints (GUARDRAILS)
CAN: metric, children, value, selected, icon, onClick, bordered. MUST NOT: arbitrary metric keys, custom icons, navigation logic.

## 9. Accessibility Layer
When onClick: role="button", tabIndex 0, Enter/Space. Label and value readable.

## 10. Anti-Patterns
❌ Hardcoded colors ❌ Free-form metric ❌ Custom icons

END OF SCHEMA
