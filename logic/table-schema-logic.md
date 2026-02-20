# 📄 table-schema-logic.md
# Standardized Component Schema
## Scalar Design System

Source Implementation:
../src/components/Table.tsx

---

## 1. Component Identity
**Component:** Table  
**Type:** ui  
**Responsibility:** Renders structured table with optional header, column headers + data rows, and optional pagination.

## 2. Intent Layer (WHY)
Displays tabular data. Composes ColumnHeader, DataCell, optional TitleItemRow. Does not handle sorting logic internally (column config may pass onSortClick).

## 3. Variant Layer (WHAT)
Size (s | m | l) for cells. showHeader, showPagination (boolean). No semantic variants.

## 4. State Layer (WHEN)
Static layout. Sort state is external. Default only for table container.

## 5. Token Mapping Layer (HOW IT LOOKS)
background-page, stroke-disable. Cell styling from ColumnHeader/DataCell tokens.

## 6. Layout & Spacing Layer
Sections: 1) header slot 2) table (grid) 3) pagination slot. Grid columns from column definitions.

## 7. Typography Layer
Inherited from ColumnHeader and DataCell by size.

## 8. Behavioral Constraints (GUARDRAILS)
CAN: render header, columns, rows, pagination, custom cell renderers. MUST NOT: invent column types, hardcode colors, add table-level interaction beyond column config.

## 9. Accessibility Layer
Table semantics; headers and cells readable. Sort exposed via ColumnHeader.

## 10. Anti-Patterns
❌ Hardcoded colors ❌ Arbitrary layout ❌ Table-level click handlers

END OF SCHEMA
