# 📄 chip-schema-logic.md
# Standardized Component Schema
## Scalar Design System

Source Implementation:
../src/components/Chip.tsx

---

This document defines the authoritative logic contract for the Chip component.

**All AI tools MUST conform to this schema when creating or modifying this component.**

**Deviation is invalid output.**

---

## 1. Component Identity

**Component:** Chip  
**Type:** ui  
**Responsibility:** Displays a compact semantic label that represents status, category, or metadata, optionally with an icon and removable action.

---

## 2. Intent Layer (WHY)

**Intent:**

The Chip component communicates contextual meaning (status, classification, tag) in a compact pill format.

It is informational by default and may optionally expose a removal affordance.

It is **not** a primary action trigger and does **not** represent navigation.

---

## 3. Variant Layer (WHAT)

Variants define semantic meaning only.

### Semantic Variants (finite)

- brand
- success
- error
- warning

**Rules:**

- Variants must map to background, stroke, and text semantic tokens.
- No free-form variant strings allowed.
- No additional variants permitted without design system approval.

### Style Variants (Structural)

- **filled** (default)
- **outlined**

**Rules:**

- Style affects background and stroke usage only.
- Style does not change semantic meaning.
- Style must not alter layout or typography.

### Size Variants (Structural)

- s
- m
- l

**Rules:**

- Size affects padding, typography scale, and icon size.
- Size does not affect semantic meaning.
- No additional sizes allowed.

---

## 4. State Layer (WHEN)

Chip is primarily static but supports interaction states when removable.

### Interaction States

- default
- hover (remove button only)
- pressed (remove button only)
- focus (remove button only)
- disabled (if implemented externally)

**Rules:**

- The root chip does not change structure across states.
- Only token-based color adjustments are allowed.
- Remove button must not modify chip layout when focused or pressed.
- No animated structural transitions.

---

## 5. Token Mapping Layer (HOW IT LOOKS)

All visual output must map to semantic tokens from `design-tokens.scalar.ai.json`.

No hardcoded color values allowed.

### Variant Token Mapping

| Variant  | Background         | Stroke          | Text           |
| -------- | ------------------ | --------------- | -------------- |
| brand    | background-brand   | stroke-brand    | text-brand     |
| success  | background-positive| stroke-positive | text-positive  |
| error    | background-negative| stroke-negative | text-negative  |
| warning  | background-warning | stroke-warning  | text-warning   |

### Filled Style

- background → variant background token
- border → transparent
- text → text-button-label

### Outlined Style

- background → transparent
- border → variant stroke token
- text → variant text token

### Icon Tokens

- Inherit current text color
- Must use Material Symbols
- No custom SVGs
- No arbitrary icon sizing outside token system

---

## 6. Layout & Spacing Layer

### Structural Model

```
<span class="chip">
  [icon]
  [label]
  [remove-button]
</span>
```

### Layout Rules

- display → inline-flex
- align-items → center
- gap → spacing-xs
- border-radius → cornerRadius-m
- max-width → 100%
- min-width → 0
- Text must truncate with ellipsis
- No arbitrary margin

### Padding Mapping

| Size | Padding Y   | Padding X   |
| ---- | ----------- | ----------- |
| s    | spacing-xs  | spacing-s   |
| m    | spacing-s   | spacing-m   |
| l    | spacing-s   | spacing-m   |

### Icon Size Mapping

| Size | Icon Size   |
| ---- | ----------- |
| s    | var(--14)   |
| m    | var(--18)   |
| l    | var(--20)   |

Remove icon uses the same icon size as leading icon.

---

## 7. Typography Layer

Typography is fixed per size.

- **Font family:** family-inter
- **Font weight:** weight-semi-bold
- **Letter spacing:** letter-spacing-none

### Size Mapping

| Size | Font Size   | Line Height  |
| ---- | ----------- | ------------ |
| s    | var(--12)   | var(--16)    |
| m    | var(--14)   | var(--20)    |
| l    | var(--16)   | var(--24)    |

**Rules:**

- No per-instance overrides.
- No dynamic typography props.
- Typography must not change across style variants.

---

## 8. Behavioral Constraints (GUARDRAILS)

**Chip CAN:**

- Display text.
- Display leading icon.
- Be icon-only.
- Be removable via onRemove.
- Be used inside table cells (e.g., ModalStatusCell).
- Truncate long content.
- Be used inline with text.

**Chip MUST NOT:**

- Act as primary CTA.
- Accept arbitrary colors.
- Accept free-form variant names.
- Allow layout overrides.
- Allow typography overrides.
- Resize dynamically based on hover.
- Introduce new icon systems.
- Replace Material Symbols.
- Change structure between filled and outlined.

---

## 9. Accessibility Layer

Minimum requirements:

- If removable, remove button must be a `<button>` element.
- Remove button must include `aria-label="Remove"`.
- Remove button must stop event propagation.
- Icons must be `aria-hidden`.
- Text must remain accessible.
- If icon-only chip is used, accessible name must be provided externally.

---

## 10. Anti-Patterns

The following are strictly forbidden:

- ❌ Hardcoded hex colors
- ❌ Inline px values outside token scale
- ❌ Tailwind color utilities
- ❌ Free-form variants
- ❌ Arbitrary padding overrides
- ❌ Embedding complex interactive logic inside chip root
- ❌ Replacing remove button with div
- ❌ Structural animation altering layout

---

**END OF SCHEMA**
