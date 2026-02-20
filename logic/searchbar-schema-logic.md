# 📄 searchbar-schema-logic.md
# Standardized Component Schema
## Scalar Design System

Source Implementation:
../src/components/SearchBar.tsx

---

## 1. Component Identity
**Component:** SearchBar  
**Type:** ui  
**Responsibility:** Single-line search input with leading search icon; triggers filter/search via value and onChange.

## 2. Intent Layer (WHY)
Filter or search input in headers/toolbars. Not navigation. Controlled input.

## 3. Variant Layer (WHAT)
Size (s | m | l). No semantic variants.

## 4. State Layer (WHEN)
default, focus (border token). disabled. No hover/pressed on container beyond native input.

## 5. Token Mapping Layer (HOW IT LOOKS)
background-page, stroke-disable, stroke-brand (focus). text-primary, text-tertiary (placeholder). icon-disable/icon-brand. Material Symbol "search".

## 6. Layout & Spacing Layer
inline-flex; gap spacing-s; padding by size; border-radius m. Input flex 1, minWidth 0.

## 7. Typography Layer
family-inter, weight-regular; size m: var(--14)/var(--20). Letter-spacing-none.

## 8. Behavioral Constraints (GUARDRAILS)
CAN: value, onChange, placeholder, disabled. MUST NOT: custom icons, arbitrary colors, submit/navigate internally.

## 9. Accessibility Layer
role="search". aria-label from placeholder or prop. type="search". Input accessible.

## 10. Anti-Patterns
❌ Hardcoded colors ❌ Custom SVG icon ❌ Free-form size

END OF SCHEMA
