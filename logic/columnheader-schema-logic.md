# 📄 columnheader-schema-logic.md
# Standardized Component Schema
## Scalar Design System

Source Implementation:
../src/components/ColumnHeader.tsx

---

This document defines the authoritative logic contract for the ColumnHeader component.

**All AI tools MUST conform to this schema when creating or modifying this component.**

**Deviation is invalid output.**

---

## 1. Component Identity

**Component:** ColumnHeader  
**Type:** ui  
**Responsibility:** Displays a table or list column label with optional sorting behavior and metric standardization.

---

## 2. Intent Layer (WHY)

**Intent:**

The ColumnHeader component represents the label of a data column and optionally provides a sortable interaction.

It standardizes column naming through integration with the Fund Intelligence Metrics Knowledge Base.

It is **not** a generic button or typography component.  
It exists exclusively within structured data layouts (tables, lists, grids).

---

## 3. Variant Layer (WHAT)

ColumnHeader does **NOT** support semantic variants.

There are only **structural** variants.

### Size Variants (finite)

- s
- m
- l

**Rules:**

- Size affects typography scale and minimum height.
- Size does not affect semantic meaning.
- No additional sizes allowed.

### Alignment Variants (finite)

- left
- center
- right

**Rules:**

- Alignment controls horizontal layout only.
- Alignment must not change typography or tokens.

### Sort Variants (finite)

- asc
- desc
- undefined

**Rules:**

- Sort only affects icon and aria-sort.
- Sort does not change structure.
- Sort requires onSortClick to be interactive.

### Border Variant

- **bordered** (true | false)

**Rules:**

- Only affects bottom border visibility.
- Must map to semantic stroke token.
- No alternative border styles allowed.

---

## 4. State Layer (WHEN)

States define interaction lifecycle.

### Static State

- default

### Interactive State (when sortable)

- hover
- focus
- pressed
- keyboard-activated

**Rules:**

- Root element only becomes interactive if onSortClick is provided.
- When interactive, role="button" and tabIndex=0 must be applied.
- No structural change between sortable and non-sortable.
- Icon must remain consistent in position.
- Focus must be visible (token-based).

---

## 5. Token Mapping Layer (HOW IT LOOKS)

All styling MUST map to semantic tokens from `design-tokens.scalar.ai.json`.

No hardcoded values allowed.

### Text Tokens

| Purpose    | Token        |
| ---------- | ------------ |
| Label text | text-primary |

### Icon Tokens

| Purpose   | Token      |
| --------- | ---------- |
| Sort icon | icon-brand |

**Icon names:**

- asc → **arrow_upward**
- desc → **arrow_downward**
- undefined → **unfold_more**

Must use Material Symbols. No custom SVGs allowed.

### Border Tokens

| Condition | Token        |
| --------- | ------------ |
| bordered  | stroke-disable |

---

## 6. Layout & Spacing Layer

### Structural Model

```
<div role="button?">
  <span class="label" />
  <span class="sort-icon" />
</div>
```

### Layout Rules

- display → flex
- align-items → center
- gap → spacing-xs
- padding → spacing-s (vertical) + spacing-m (horizontal)
- letter-spacing → letter-spacing-none
- font-family → family-inter
- flex-shrink → 0 for icon
- minWidth → 0 for label
- outline → none (focus handled via token styling)

### Minimum Height Mapping

| Size | Min Height  |
| ---- | ----------- |
| s    | var(--32)   |
| m    | var(--40)   |
| l    | var(--48)   |

### Typography Mapping

| Size | Font Size   | Line Height  | Weight          |
| ---- | ----------- | ------------ | --------------- |
| s    | var(--12)   | var(--16)    | weight-semi-bold |
| m    | var(--14)   | var(--20)    | weight-semi-bold |
| l    | var(--16)   | var(--24)    | weight-semi-bold |

**Rules:**

- Typography must not vary by sort state.
- No per-instance typography overrides.
- No dynamic font weights.

---

## 7. Knowledge Base Integration

**When metric prop is provided:**

- Label MUST be resolved from KNOWLEDGE_BASE_METRICS.
- children must be ignored.
- Metric keys must match KnowledgeBaseMetricKey.
- No arbitrary metric strings allowed.

**If metric is not provided:**

- children is rendered as label.

---

## 8. Behavioral Constraints (GUARDRAILS)

**ColumnHeader CAN:**

- Display metric-based standardized label.
- Display custom label via children.
- Toggle sort via onSortClick.
- Be keyboard accessible when sortable.
- Show ascending or descending indicator.
- Be used in table header rows.
- Align content left, center, or right.

**ColumnHeader MUST NOT:**

- Act as navigation link.
- Accept semantic color variants.
- Accept arbitrary icon injection.
- Replace Material Symbols.
- Change structure between sorted states.
- Animate layout changes.
- Accept custom padding overrides.
- Introduce new semantic states.
- Be used outside structured data context.

---

## 9. Accessibility Layer

Minimum requirements:

- **If sortable:**
  - role="button"
  - tabIndex=0
  - Keyboard activation via Enter and Space
  - aria-sort: "ascending" | "descending"
- Icon must be aria-hidden.
- Label must remain readable by screen readers.
- Focus must be visible.
- Non-sortable header must not expose button role.

**Failure to comply invalidates implementation.**

---

## 10. Anti-Patterns

The following are strictly forbidden:

- ❌ Hardcoded hex colors
- ❌ Inline arbitrary px values outside token system
- ❌ Tailwind color utilities
- ❌ Free-form sort values
- ❌ Arbitrary icon names
- ❌ Replacing div with semantic button incorrectly
- ❌ Layout changes between sorted states
- ❌ Introducing additional border styles
- ❌ Overriding Knowledge Base labels

---

**END OF SCHEMA**
