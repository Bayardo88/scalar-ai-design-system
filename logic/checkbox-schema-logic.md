# 📄 checkbox-schema-logic.md
# Standardized Component Schema
## Scalar Design System

Source Implementation:
../src/components/Checkbox.tsx

---

This document defines the authoritative logic contract for the Checkbox component.

**All AI tools MUST conform to this schema when creating or modifying the component.**

**Deviation is invalid output.**

---

## 1. Component Identity

**Component:** Checkbox  
**Type:** ui  
**Responsibility:** Allows users to toggle a binary or mixed selection state within a form context.

---

## 2. Intent Layer (WHY)

**Intent:**

The Checkbox component represents a selectable control that manages a boolean state (checked / unchecked) with optional support for an indeterminate state.

It is used in form selection, multi-select groups, and hierarchical selection patterns.

It does **not** represent navigation or action triggering.

---

## 3. Variant Layer (WHAT)

Checkbox does **NOT** support semantic variants.

There are no meaning-based variants such as primary, danger, etc.

The only allowed variation is **structural size**.

### Size Variants (finite)

- **s**
- **m**

**Rules:**

- Size affects only box dimensions and typography scale.
- Size does not affect semantic meaning.
- No additional sizes allowed.
- No free-form size strings allowed.

---

## 4. State Layer (WHEN)

States define the interaction lifecycle and selection logic.

### Interaction States

- default
- hover
- pressed
- focus
- disabled

### Selection States

- unchecked
- checked
- indeterminate

**Rules:**

- States must not alter structure.
- States only affect semantic tokens.
- Indeterminate does not equal checked.
- Disabled overrides all interaction states.
- Focus must be visible and token-based.
- Structure remains constant across all states.

---

## 5. Token Mapping Layer (HOW IT LOOKS)

All styling MUST map to semantic tokens defined in `design-tokens.scalar.ai.json`.

No hardcoded values allowed.

### Border Tokens

| Condition | Token        |
| --------- | ------------ |
| default   | stroke-brand |
| hover     | stroke-hover |
| pressed   | stroke-pressed |
| disabled  | stroke-disable |

### Background Tokens

| Condition  | Token             |
| ---------- | ----------------- |
| unchecked  | transparent       |
| checked    | background-brand  |
| disabled   | background-disable |

Indeterminate uses the same background as checked.

### Check / Icon Tokens

| Condition | Token                  |
| --------- | ---------------------- |
| default   | text-button-label      |
| disabled  | text-button-disable-label |

Icon must use Material Symbol:

- **"check"** (checked)
- **"remove"** (indeterminate)

No custom SVGs.

### Label Tokens

| Condition | Token                  |
| --------- | ---------------------- |
| default   | text-primary           |
| disabled  | text-button-disable-label |

Typography must use:

- family-inter
- weight-regular
- letter-spacing-none
- tokenized size + line-height based on size variant

---

## 6. Layout & Spacing Layer

Checkbox layout must follow predictable structure.

### Structural Model

```
<label>
  <input type="checkbox" hidden />
  <span class="box">
    <icon />
  </span>
  <span class="label" />
</label>
```

### Layout Rules

- Container → inline-flex
- Alignment → center
- Gap → spacing-s
- No arbitrary margins
- No external padding
- Box must not resize dynamically
- Box must be square
- Border radius → cornerRadius-xs

### Size Mapping

| Size | Box Size   | Icon Size  |
| ---- | ---------- | ---------- |
| s    | var(--16)  | var(--12)  |
| m    | var(--20)  | var(--14)  |

No additional size scaling allowed.

---

## 7. Typography Layer

Typography is fixed per size.

**Size s**

- font-size → var(--12)
- line-height → var(--16)

**Size m**

- font-size → var(--14)
- line-height → var(--20)

**Rules:**

- No per-instance overrides.
- No custom font families.
- No dynamic typography props.

---

## 8. Behavioral Constraints (GUARDRAILS)

**Checkbox CAN:**

- Be controlled or uncontrolled.
- Emit onChange(boolean).
- Support indeterminate state.
- Support disabled state.
- Include optional label.
- Accept name and value attributes.
- Support aria-label for accessibility.
- Be grouped inside fieldsets.

**Checkbox MUST NOT:**

- Act as a navigation trigger.
- Accept semantic color variants.
- Allow custom color overrides.
- Allow custom spacing overrides.
- Resize based on label length.
- Change structure between states.
- Accept arbitrary icons.
- Replace Material Symbol icon system.

---

## 9. Accessibility Layer

Minimum requirements:

- Must use native `<input type="checkbox">`
- Input must remain in DOM (not replaced with div role)
- Must support keyboard interaction (Space toggles)
- Must support `aria-checked="mixed"` for indeterminate
- Must expose `aria-disabled` when disabled
- Must maintain accessible label association
- If no visible label, `aria-label` is required
- Focus state must be visible

**Failure to comply invalidates implementation.**

---

## 10. Anti-Patterns

The following are strictly forbidden:

- ❌ Hardcoded hex values
- ❌ Inline arbitrary px values outside token system
- ❌ Tailwind color utilities
- ❌ New semantic variants
- ❌ Replacing input with div role="checkbox"
- ❌ Allowing custom icon injection
- ❌ Structural changes across states
- ❌ Mixing action-button behavior into checkbox

---

**END OF SCHEMA**
