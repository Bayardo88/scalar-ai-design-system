# 📄 buttonicon-schema-logic.md
# Standardized Component Schema
## Scalar Design System

Source Implementation:
../src/components/ButtonIcon.tsx

---

## 1. Component Identity
**Component:** ButtonIcon  
**Type:** ui  
**Responsibility:** Controlled dropdown trigger; single selection; value + onChange + options; displays selected label or placeholder.

## 2. Intent Layer (WHY)
Select one option from list. Not multi-select, not combobox. Controlled only; no internal value state.

## 3. Variant Layer (WHAT)
Variant (brand | positive | negative | warning). Size (s | m | l). Style (filled | outlined | minimal). No arbitrary variants.

## 4. State Layer (WHEN)
default, hover, pressed (trigger), open (dropdown), disabled. Close on outside click or option select.

## 5. Token Mapping Layer (HOW IT LOOKS)
Background/stroke/text/icon tokens per variant and style. Material Symbol expand_more. List: background-page, stroke, text-primary.

## 6. Layout & Spacing Layer
Relative container; trigger inline-flex; list absolute, full width, below. Padding by size. Option padding and typography by size.

## 7. Typography Layer
family-inter, weight-semi-bold; size s/m/l from tokens.

## 8. Behavioral Constraints (GUARDRAILS)
CAN: value, onChange, options, placeholder, variant, size, style, disabled, aria-label. MUST NOT: multi-select, internal value state, arbitrary variants.

## 9. Accessibility Layer
aria-haspopup="listbox", aria-expanded, aria-disabled. List role="listbox", options role="option", aria-selected. Trigger type="button".

## 10. Anti-Patterns
❌ Hardcoded colors ❌ Internal state ❌ Custom icons

END OF SCHEMA
