# 📄 contentcell-schema-logic.md
# Standardized Component Schema
## Scalar Design System

Source Implementation:
../src/components/ContentCell.tsx

---

This document defines the authoritative logic contract for the ContentCell component.

**All AI tools MUST conform to this schema when creating or modifying this component.**

**Deviation is invalid output.**

---

## 1. Component Identity

**Component:** ContentCell  
**Type:** ui  
**Responsibility:** Displays structured table cell content with support for multi-line text or avatar-based identity presentation.

---

## 2. Intent Layer (WHY)

**Intent:**

The ContentCell component renders rich or multi-line content within structured data layouts (tables, lists, grids).

It supports optional identity representation (Avatar + name) and controlled text presentation (wrap or truncate).

It does **not** represent actions or navigation.

---

## 3. Variant Layer (WHAT)

ContentCell does **NOT** support semantic color variants beyond text tone.

All variants are **structural**.

### Size Variants (finite)

- s
- m
- l

**Rules:**

- Size affects typography and minimum height.
- Size must align with ColumnHeader size in the same column.
- No additional sizes allowed.

### Text Tone Variant (finite)

- primary
- secondary

**Rules:**

- primary → text-primary
- secondary → text-secondary
- Variant affects text color only.
- No additional tone variants allowed.

### Alignment Variants (finite)

- left
- center
- right

**Rules:**

- Alignment controls horizontal justification only.
- Must not affect typography or spacing tokens.

### Structural Variants

- **bordered** (true | false)
- **truncate** (true | false)
- **avatar** (present | absent)

**Rules:**

- bordered controls bottom border visibility.
- truncate controls white-space behavior.
- avatar switches structural layout to identity mode.
- Variants must not introduce new layout primitives.

---

## 4. State Layer (WHEN)

ContentCell is **static and non-interactive**.

### States

- default

**Rules:**

- No hover or pressed states.
- No focus handling.
- No structural changes across states.
- No interactive affordances.

---

## 5. Token Mapping Layer (HOW IT LOOKS)

All styling MUST map to semantic tokens from `design-tokens.scalar.ai.json`.

No hardcoded colors allowed.

### Text Tokens

| Variant   | Token          |
| --------- | -------------- |
| primary   | text-primary  |
| secondary | text-secondary |

### Border Tokens

| Condition | Token        |
| --------- | ------------ |
| bordered  | stroke-disable |

### Typography Mapping

- **Font family:** family-inter
- **Font weight:** weight-regular
- **Letter spacing:** letter-spacing-none

### Size Mapping

| Size | Font Size   | Line Height  | Min Height  |
| ---- | ----------- | ------------ | ----------- |
| s    | var(--12)   | var(--16)    | var(--32)   |
| m    | var(--14)   | var(--20)    | var(--40)   |
| l    | var(--16)   | var(--24)    | var(--48)   |

---

## 6. Layout & Spacing Layer

### Structural Model (Standard Content)

```
<div class="content-cell">
  <span class="content" />
</div>
```

### Structural Model (Avatar Mode)

```
<div class="content-cell with-avatar">
  <Avatar size="xs" />
  <span class="name" />
</div>
```

### Layout Rules

- display → flex
- justify-content → based on align
- padding → spacing-s (vertical) + spacing-m (horizontal)
- font-family → family-inter
- minWidth → 0
- No arbitrary margin

### Alignment Rules

| Align  | justify-content |
| ------ | --------------- |
| left   | flex-start      |
| center | center          |
| right  | flex-end        |

### Avatar Mode Rules

- Avatar size MUST be **"xs"**
- Gap → spacing-s
- align-items → center
- Name must use inner text span
- Avatar must receive: src, name, alt=name
- No alternative avatar sizes allowed.

### Truncation Rules

- **If truncate is true OR avatar mode is enabled:** overflow → hidden, text-overflow → ellipsis, white-space → nowrap
- **If truncate is false and no avatar:** content wraps naturally.

---

## 7. Behavioral Constraints (GUARDRAILS)

**ContentCell CAN:**

- Display multi-line rich content.
- Display avatar + name.
- Align content left, center, or right.
- Truncate content when requested.
- Be used alongside ColumnHeader and DataCell.
- Use primary or secondary text tone.
- Show bottom border.

**ContentCell MUST NOT:**

- Act as button or link.
- Accept arbitrary colors.
- Accept free-form size values.
- Override typography tokens.
- Introduce additional interactive states.
- Change layout dynamically on hover.
- Use different Avatar sizes.
- Inject custom spacing overrides.
- Introduce semantic variants (success, error, etc.).

---

## 8. Accessibility Layer

Minimum requirements:

- Avatar must include alt attribute (name).
- Text must remain readable by screen readers.
- No interactive roles must be added.
- Truncation must not remove accessible content (screen readers must read full content).
- Component must not expose button or link semantics.

---

## 9. Composition Constraints

ContentCell must be used within structured layouts:

- Table rows
- Data grids
- List layouts aligned with ColumnHeader

It must maintain height consistency across rows.

---

## 10. Anti-Patterns

The following are strictly forbidden:

- ❌ Hardcoded hex colors
- ❌ Inline px values outside token system
- ❌ Tailwind color utilities
- ❌ Adding interactive click behavior
- ❌ Changing Avatar size
- ❌ Injecting custom typography
- ❌ Dynamic height changes across rows
- ❌ Free-form variant strings
- ❌ Adding background color variants

---

**END OF SCHEMA**
