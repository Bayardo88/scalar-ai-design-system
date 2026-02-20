# 📄 picker-schema-logic.md
# Standardized Component Schema
## Scalar Design System

Source Implementation:
../src/components/Picker.tsx

---

## 1. Component Identity
**Component:** Picker  
**Type:** ui  
**Responsibility:** Multi-select dropdown; trigger shows selection summary; list with checkboxes; emits selected values via onChange.

## 2. Intent Layer (WHY)
Select multiple options (e.g. measurement dates). Controlled: value (string[]), onChange. Not navigation or single-select only.

## 3. Variant Layer (WHAT)
Size (s | m | l). No semantic variants.

## 4. State Layer (WHEN)
default, open (dropdown visible), disabled. Close on outside click. No structural change between states.

## 5. Token Mapping Layer (HOW IT LOOKS)
background-page, stroke-disable, text-primary. List: background-page, stroke-disable. Material Symbol expand_more. Checkbox from Checkbox component tokens.

## 6. Layout & Spacing Layer
Trigger: inline-flex; dropdown absolute, full width of trigger. List max-height, overflow auto. Options with Checkbox + label.

## 7. Typography Layer
From size; family-inter. Label from tokens.

## 8. Behavioral Constraints (GUARDRAILS)
CAN: value, onChange, options, placeholder, selectionSummary, disabled. MUST NOT: single-select only contract, custom list markup, arbitrary icons.

## 9. Accessibility Layer
aria-haspopup="listbox", aria-expanded, aria-multiselectable. Options role="option", aria-selected. aria-label on trigger.

## 10. Anti-Patterns
❌ Hardcoded colors ❌ Single-select only ❌ Custom checkbox

END OF SCHEMA
