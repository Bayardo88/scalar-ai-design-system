# 📄 sidebar-schema-logic.md
# Standardized Component Schema
## Scalar Design System

Source Implementation:
../src/components/Sidebar.tsx

---

## 1. Component Identity
**Component:** Sidebar  
**Type:** ui  
**Responsibility:** Vertical navigation container; renders list of SidebarIcon (or similar) items.

## 2. Intent Layer (WHY)
Holds nav items. Composes SidebarIcon per item. Does not handle routing.

## 3. Variant Layer (WHAT)
iconSize (s | m | l). Optional width. No semantic variants.

## 4. State Layer (WHEN)
Static container. Item active/disabled per item. Default only for sidebar root.

## 5. Token Mapping Layer (HOW IT LOOKS)
background-page, stroke-disable (border-right). Spacing tokens. Item styling from SidebarIcon.

## 6. Layout & Spacing Layer
flex column; gap spacing-xs; padding spacing-s. Items stacked vertically.

## 7. Typography Layer
From items (SidebarIcon). No direct typography on container.

## 8. Behavioral Constraints (GUARDRAILS)
CAN: render items, pass icon/label/active/onClick per item. MUST NOT: inject navigation logic, hardcode colors, change item structure.

## 9. Accessibility Layer
Nav landmark; items accessible via SidebarIcon aria-label.

## 10. Anti-Patterns
❌ Hardcoded colors ❌ Arbitrary item components

END OF SCHEMA
