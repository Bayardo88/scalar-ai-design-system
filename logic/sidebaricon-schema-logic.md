# 📄 sidebaricon-schema-logic.md
# Standardized Component Schema
## Scalar Design System

Source Implementation:
../src/components/SidebarIcon.tsx

---

## 1. Component Identity
**Component:** SidebarIcon  
**Type:** ui  
**Responsibility:** Icon button for sidebar navigation; supports active and disabled states.

## 2. Intent Layer (WHY)
Nav item in sidebar. Single icon, optional click. Not a generic button.

## 3. Variant Layer (WHAT)
Size (s | m | l). active (boolean). disabled (boolean). No semantic color variants; active/disabled affect tokens.

## 4. State Layer (WHEN)
default, hover, pressed, focus (when onClick set), disabled. Token-based only.

## 5. Token Mapping Layer (HOW IT LOOKS)
icon-brand, icon-hover, icon-pressed, icon-disable; background-hover, background-pressed. Material Symbols only.

## 6. Layout & Spacing Layer
inline-flex; center; padding and size from tokens. Square hit area. radius from tokens.

## 7. Typography Layer
Icon size by size variant (var(--20)|var(--24)|var(--32)). No text typography.

## 8. Behavioral Constraints (GUARDRAILS)
CAN: show icon, active, disabled, onClick. MUST NOT: accept arbitrary icons (must be Material Symbol name), custom colors, navigation logic inside.

## 9. Accessibility Layer
aria-label required. role="button" when interactive. Keyboard activation when not disabled.

## 10. Anti-Patterns
❌ Hardcoded colors ❌ Custom SVGs ❌ Missing aria-label

END OF SCHEMA
