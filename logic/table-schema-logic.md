# table-schema-logic.md
# Standardized Component Schema
## Scalar Design System

Source Implementation:
../src/components/Table.tsx

---

## 1. Component Identity

**Component:** Table  
**Type:** ui  
**Responsibility:** Renders structured tabular data with governed column behavior, viewport-aware sticky header logic, viewport-pinned total row, dynamic metric column management, and column interaction behaviors.

## 2. Intent Layer (WHY)

The Table component provides a full-width structured interactive data surface.

It composes:

- ColumnHeader
- DataCell
- Optional header section
- Optional pagination
- Optional TOTAL summary row

## 3. Layout Contract (MANDATORY)

The Table component MUST:

- Render at 100% width of its container.
- Have no border radius.
- Maintain a sticky header pinned to the top of the scroll viewport.
- Maintain a TOTAL row pinned to the bottom of the scroll viewport.
- Use the Neutral100 semantic token for TOTAL row DataCell background.
- Maintain an "Add Metric" column:
  - Always positioned at the far right edge
  - Sticky to the right during horizontal scroll
  - Not reorderable
  - Not resizable
  - Not part of column state
- Support horizontal scroll without breaking sticky first column.
- Support sticky first column when enabled.

## 4. Interaction Governance

### Column Resize

- Each data column MUST support pointer-based resize.
- Minimum width: 80px.
- Resize must not affect Add Metric column.
- Resize must update gridTemplateColumns state.

### Column Reorder

- Columns MUST be reorderable via pointer drag.
- Reorder must:
  - Update both column state and width state
  - Preserve Add Metric column position
- Add Metric column MUST NOT be draggable.

## 5. Sticky Behavior

| Element | Positioning | Z-Index Priority |
|---------|-------------|------------------|
| Sticky Header | top: 0 | 2 |
| Sticky First Column | left: 0 | 6 |
| Add Metric Column | right: 0 | 4 |
| Total Row | bottom: 0 | 5 |

## 6. Business Logic Boundary

The Table component does NOT implement:

- Sorting computation
- Aggregation logic
- Filtering logic
- Data transformation logic

It strictly governs layout and interaction behavior.

## 7. Authoritative Constraints

The schema is the authoritative behavioral contract.

Any deviation from:

- Full width layout
- Sticky TOTAL row
- Add Metric right pinning
- Neutral100 token usage
- Non-reorderable Add Metric
- Non-resizable Add Metric

Is a schema violation.

---

## Summary of What Is Now Enforced

- ✔ Full-width layout
- ✔ No rounded corners
- ✔ Sticky header
- ✔ Sticky total row at viewport bottom
- ✔ Total row uses Neutral100
- ✔ Add Metric always pinned right
- ✔ Add Metric not reorderable
- ✔ Add Metric not resizable
- ✔ Columns resizable
- ✔ Columns reorderable
