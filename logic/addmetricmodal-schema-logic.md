# 📄 addmetricmodal-schema-logic.md
# Standardized Component Schema
## Scalar Design System

Source Implementation:
../src/components/AddMetricModal.tsx

---

## 1. Component Identity
**Component:** AddMetricModal  
**Type:** ui  
**Responsibility:** Modal composing MetricTitle, SearchBar, list of MetricItem (from Knowledge Base), Add/Cancel Button; single selection, onAdd(metricKey).

## 2. Intent Layer (WHY)
Add-a-metric flow. Composed; does not implement metric list (uses KNOWLEDGE_BASE_METRIC_KEYS). Not navigation.

## 3. Variant Layer (WHAT)
Size (s | m | l) passed to children. open (boolean). No semantic variants.

## 4. State Layer (WHEN)
open/closed. Internal: search query, selectedKey. No structural change when open.

## 5. Token Mapping Layer (HOW IT LOOKS)
overlay-50-inverse (backdrop), background-page (panel), stroke-disable, text-tertiary (empty state). Child components use their tokens.

## 6. Layout & Spacing Layer
Backdrop fixed full screen; panel centered, max-width 90vw. Sections: title+search, scrollable list, footer buttons. Spacing tokens.

## 7. Typography Layer
From MetricTitle, MetricItem, Button by size.

## 8. Behavioral Constraints (GUARDRAILS)
CAN: open, onClose, onAdd, alreadyAddedKeys, title, searchPlaceholder, add/cancel labels, size. MUST NOT: hardcode metric list, replace composed components, add undocumented props.

## 9. Accessibility Layer
role="dialog", aria-modal, aria-labelledby (title id). Focus and Escape close.

## 10. Anti-Patterns
❌ Hardcoded colors ❌ Custom list component ❌ Missing aria-labelledby

END OF SCHEMA
