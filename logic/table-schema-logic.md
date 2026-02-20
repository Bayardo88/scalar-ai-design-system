# 📄 table-schema-logic.md
# Standardized Component Schema
## Scalar Design System

Source Implementation:
../src/components/Table.tsx

---

## 1. Component Identity

**Component:** Table  
**Type:** ui  
**Responsibility:** Renders structured tabular data with governed column behavior, viewport-aware header logic, column resizing, column reordering, dynamic column management, optional sticky total row, and optional sticky first column.

## 2. Intent Layer (WHY)

The Table component provides a structured, interactive data surface.

It composes:

- ColumnHeader
- DataCell
- Optional header section
- Optional pagination
- Optional TOTAL summary row

It governs:

- Viewport-based sticky header logic
- Column resizing behavior
- Column reorder behavior
- Column count synchronization
- Dynamic column addition via knowledge base
- Sticky TOTAL row
- Sticky first column during horizontal scroll

It does not implement business logic (sorting calculations, aggregation logic, filtering logic).

**END OF SCHEMA**
