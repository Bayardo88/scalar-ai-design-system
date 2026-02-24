# table-schema-logic.md
# Standardized Component Schema
## Scalar Design System

Source Implementation:
../src/components/Table.tsx

---

## 1. Component Identity

**Component:** Table  
**Type:** ui  
**Responsibility:** Renders structured tabular data with governed column behavior, viewport-aware sticky header logic, viewport-pinned total row, column resizing, column reordering, and dynamic metric column management.

---

## 2. Intent Layer (WHY)

The Table component provides a structured, interactive data surface.

It composes:

- ColumnHeader
- DataCell
- Optional header section
- Optional pagination
- Optional TOTAL summary row
- Optional Add Metric column + modal

It governs:

- Viewport-based sticky header behavior
- Viewport-based sticky total row behavior
- Column resizing behavior
- Column reorder behavior
- Column width bookkeeping
- Dynamic metric column addition from knowledge base

It does not implement business logic (sorting computations, aggregation logic, filtering logic).

---

## 3. Layout Contract (MANDATORY)

The Table component MUST:

1. Render at 100% width of its container.
2. Have no border radius.
3. Provide a single scroll viewport for table content.
4. Keep header row sticky to the top of the scroll viewport.
5. Keep total row sticky to the bottom of the scroll viewport when enabled.
6. Maintain consistent column widths across header, body, and total row.

### Full-viewport width behavior (ported from prototype)

- The Table MUST behave as if:
  - `tableWidth = max(sum(columnWidths), containerWidth)`
- If total fixed column width is less than the container width, the layout MUST stretch so the last column does not float mid-screen.

---

## 4. Add Metric Column (dynamic column management)

When enabled, the Table MUST render an "Add Metric" column at the end.

The Add Metric column MUST:

- Be rendered as a dedicated final column (not merged into normal data column state).
- Open an Add Metric modal on activation.
- Maintain a stable width.
- NOT be resizable.

Modal requirements (ported from prototype):

- Modal MUST be positioned relative to the Add Metric header cell when anchor geometry is available.
- Modal MUST close on:
  - Escape key
  - Click outside
- Modal MUST support metric search filtering.
- Modal MUST prevent adding metrics that are already present.

---

## 5. Column Resize Governance (ported behavior)

When resizing is enabled:

- Each non-Add-Metric column MUST expose a 4px resize handle at its right edge.
- Resize interaction MUST:
  - Use global pointer/mouse move and up listeners (document-level) so resizing continues outside the header cell bounds.
  - Lock cursor to `col-resize` and disable text selection during drag.
  - Apply delta updates incrementally on each move.
- Minimum column width MUST be enforced (>= 80px unless otherwise specified by tokens/rules).

---

## 6. Column Reorder Governance

When column reordering is enabled:

- Columns MUST be reorderable by dragging.
- Reorder MUST update column order state.
- Reorder MUST be suppressed while a resize gesture is active.
- Add Metric column MUST NOT be reorderable.

---

## 7. Sticky Behavior

- Sticky header z-index MUST remain above body rows.
- Sticky first column (if enabled) MUST remain above both body and header cells at intersection points.
- Sticky total row MUST remain above body rows.

Total row background:

- Total row DataCell background MUST use the Neutral100 semantic token.

---

## 8. Business Logic Boundary

The Table component does NOT implement:

- Sorting computation
- Aggregation logic
- Filtering logic
- Data transformation logic

**END OF SCHEMA**
