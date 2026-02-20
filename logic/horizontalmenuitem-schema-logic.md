# 📄 horizontalmenuitem-schema-logic.md
# Standardized Component Schema
## Scalar Design System

Source Implementation:
../src/components/HorizontalMenuItem.tsx

---

## 1. Component Identity
**Component:** HorizontalMenuItem  
**Type:** ui  
**Responsibility:** Single item in horizontal nav/tabs; label with optional icon; active state; optional onClick.

## 2. Intent Layer (WHY)
Nav/tab item. Triggers selection or navigation via onClick. Not a standalone link (wrapper may provide href).

## 3. Variant Layer (WHAT)
Size (s | m | l). active (boolean). activeIndicator: underline | none. Optional icon (Material Symbol). No semantic color variants beyond active (text-brand, stroke-brand).

## 4. State Layer (WHEN)
default, hover, pressed (when interactive), focus (when onClick). disabled. Token-based only.

## 5. Token Mapping Layer (HOW IT LOOKS)
text-primary; active: text-brand, border-bottom stroke-brand. background-hover on hover/pressed. icon inherits color. Material Symbols only.

## 6. Layout & Spacing Layer
inline-flex; gap spacing-s; padding by size. Min height by size. Border-bottom 2px when active indicator.

## 7. Typography Layer
family-inter, weight-semi-bold; size s/m/l to font-size and line-height tokens.

## 8. Behavioral Constraints (GUARDRAILS)
CAN: label, active, icon, onClick, disabled, activeIndicator. MUST NOT: arbitrary variants, custom icons, navigation logic inside.

## 9. Accessibility Layer
When onClick: role="button", tabIndex 0, Enter/Space. aria-current="page" when active. aria-disabled when disabled.

## 10. Anti-Patterns
❌ Hardcoded colors ❌ Custom icons ❌ Missing aria when interactive

END OF SCHEMA
