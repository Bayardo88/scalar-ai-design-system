# 📄 metrictitle-schema-logic.md
# Standardized Component Schema
## Scalar Design System

Source Implementation:
../src/components/MetricTitle.tsx

---

## 1. Component Identity
**Component:** MetricTitle  
**Type:** ui  
**Responsibility:** Heading for a metric or section; label from Knowledge Base (metric prop) or children.

## 2. Intent Layer (WHY)
Section/metric title in modals, details, forms. Not interactive. Optional link to Knowledge Base.

## 3. Variant Layer (WHAT)
Size (s | m | l). Optional metric (KnowledgeBaseMetricKey). as (span | h1 | h2 | h3 | h4 | p). No semantic color variants.

## 4. State Layer (WHEN)
Static. Default only.

## 5. Token Mapping Layer (HOW IT LOOKS)
text-primary. Typography: weight-semi-bold, size/line-height by size from tokens.

## 6. Layout & Spacing Layer
display block; margin 0. No padding. Optional id for aria-labelledby.

## 7. Typography Layer
family-inter, weight-semi-bold, letter-spacing-none. s: var(--12)/var(--16); m: var(--14)/var(--20); l: var(--16)/var(--24).

## 8. Behavioral Constraints (GUARDRAILS)
CAN: metric (Knowledge Base), children, size, as, id. MUST NOT: arbitrary metric strings, custom colors, interaction.

## 9. Accessibility Layer
Semantic heading when as is h1–h4. id for labelledby. Text readable.

## 10. Anti-Patterns
❌ Hardcoded colors ❌ Free-form metric keys ❌ Interactive behavior

END OF SCHEMA
