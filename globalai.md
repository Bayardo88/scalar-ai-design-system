# Scalar Design System — Global AI Governance
## Authoritative Rulebook for Cursor & AI Tools

---

## 0. PURPOSE

This document defines the global governance rules that all AI tools (Cursor, Copilot, etc.) MUST follow when:

- Creating new pages
- Creating new components
- Modifying existing components
- Using design tokens
- Composing layouts

**This file is the highest authority in the Scalar Design System.**

If any conflict exists:

1. **globalai.md** overrides everything.
2. Then component **\*-schema-logic.md**
3. Then **.tsx** implementation files.

---

## 1. ARCHITECTURAL HIERARCHY

The system follows a strict dependency hierarchy:

```
src/tokens/design-tokens.scalar.ai.json
        ↓
Component Schema (logic/*.md)
        ↓
Component Implementation (src/components/*.tsx)
        ↓
Pages / Layouts
```

**Rules:**

- Tokens define visual primitives.
- Schema defines component contract.
- .tsx implements schema.
- Pages compose components only.
- **Pages MUST NOT bypass this hierarchy.**

---

## 2. NON-NEGOTIABLE CORE RULES

### 2.1 No Hardcoding

AI MUST NEVER:

- Hardcode hex colors
- Hardcode spacing values
- Hardcode font sizes
- Hardcode border radii
- Use arbitrary Tailwind color utilities
- Use inline px values outside token scale

**ALL styling must originate from:**

- `src/tokens/design-tokens.scalar.ai.json` (or generated `src/styles/tokens.css`)

### 2.2 Schema-First Component Usage

When using any component:

**AI MUST:**

- Locate the corresponding file in:
  - `logic/[name]-schema-logic.md`
- Read the schema before using the component.
- Respect:
  - Variants
  - States
  - Behavioral constraints
  - Accessibility rules
  - Anti-pattern restrictions

**AI MUST NOT:**

- Invent new variants
- Invent new sizes
- Override layout rules
- Modify structure ad hoc
- Use undocumented props

**The schema file is the contract.**

### 2.3 No Implicit Component Mutation

When building a page:

- If a needed behavior does not exist in the schema → **DO NOT** modify component inline.
- Instead:
  1. Update schema first.
  2. Then update component.
  3. Then use it.
- **No silent mutation allowed.**

---

## 3. PAGE CREATION RULES

When generating new pages:

**AI MUST:**

- Compose using existing components only.
- Respect component layout constraints.
- Use spacing tokens for layout gaps.
- Maintain vertical rhythm consistency.
- Follow typography scale from tokens.
- Avoid inline styling unless token-based.

**AI MUST NOT:**

- Create ad hoc UI patterns.
- Wrap components in arbitrary styled divs.
- Override component padding.
- Introduce visual patterns not backed by schema.

---

## 4. COMPONENT CREATION RULES

When creating a new component:

**AI MUST:**

1. Create a schema file first:
   - `logic/[name]-schema-logic.md`
2. Follow the **10-section Standardized Component Schema**.
3. Map all visuals to semantic tokens.
4. Define:
   - Identity
   - Intent
   - Variants
   - States
   - Token mapping
   - Layout rules
   - Typography rules
   - Behavioral constraints
   - Accessibility
   - Anti-patterns
5. Then create .tsx in `src/components/` that references the schema.

**AI MUST NOT:**

- Create implementation without schema.
- Skip token mapping.
- Skip accessibility layer.
- Invent tokens.

---

## 5. TOKEN ENFORCEMENT RULES (TOKEN-FIRST ARCHITECTURE)

All visual output MUST derive from:

- `src/tokens/design-tokens.scalar.ai.json`

**Priority order:**

1. Semantic tokens (preferred)
2. Primitive tokens (only if semantic does not exist)

**AI MUST:**

- Use `var(--token-name)`
- Respect theme switching (`:root` and `[data-theme="dark"]`)
- Avoid inline numeric literals

**AI MUST NOT:**

- Invent token names
- Create new CSS variables ad hoc
- Mix semantic and hardcoded values

---

## 6. VARIANT GOVERNANCE

Variants must be:

- Finite
- Enumerated
- Meaning-based (semantic) OR structural
- Explicitly documented in schema

**AI MUST NOT:**

- Accept free-form string variants
- Dynamically construct class names from user input
- Create conditional styling outside documented variants

---

## 7. STATE GOVERNANCE

States must:

- Not alter structure
- Only modify tokens
- Be explicitly defined in schema

**AI MUST NOT:**

- Add hover effects without schema support
- Add animations not documented
- Change layout on state change

---

## 8. ACCESSIBILITY MANDATE

All interactive components MUST:

- Be keyboard accessible
- Have visible focus state
- Use semantic HTML
- Include ARIA where applicable

**AI MUST NOT:**

- Replace semantic elements with divs
- Hide focus outlines without token replacement
- Remove ARIA attributes defined in schema

**Accessibility is not optional.**

---

## 9. TRACEABILITY REQUIREMENT

Every component MUST:

- Reference its schema file in the header comment (`logic/[name]-schema-logic.md`)
- Be traceable bidirectionally (schema lists Source Implementation: `../src/components/[Name].tsx`)

**If schema changes:** Implementation must be reviewed.

**If implementation changes:** Schema must be updated.

**No drift allowed.**

---

## 10. PROHIBITED ACTIONS

AI MUST NEVER:

- Create visual logic outside schema
- Override spacing inside page-level divs
- Inject custom inline style blocks
- Create new design tokens
- Modify schema structure
- Skip schema reference
- Create "temporary" UI hacks

---

## 11. PAGE COMPOSITION CHECKLIST

Before finalizing a generated page, AI must verify:

- [ ] All components exist in `src/components/`
- [ ] Each used component has a schema file in `logic/`
- [ ] No token violations exist
- [ ] No hardcoded values exist
- [ ] No free-form variants exist
- [ ] No structural overrides exist

**If any violation exists → fix before completion.**

---

## 12. AI EXECUTION DIRECTIVE

When Cursor creates or modifies anything:

1. Check **globalai.md**
2. Check relevant **logic/*-schema-logic.md**
3. Check **src/tokens/design-tokens.scalar.ai.json**
4. Then implement

**Never skip steps.**

---

## 13. ENFORCEMENT PRINCIPLE

If a requested UI pattern:

- Conflicts with schema
- Requires hardcoded styling
- Introduces undocumented variants
- Breaks token system

**AI must refuse and propose a schema update instead.**

---

## 14. DESIGN SYSTEM PHILOSOPHY

The Scalar Design System is:

- Deterministic
- Token-driven
- Schema-governed
- Variant-restricted
- Accessibility-enforced
- Hierarchically structured

**Creativity exists within constraints.**

---

## 15. SCHEMA LOCK MODE

If a .tsx file is modified, Cursor MUST:

1. Update the corresponding schema file in `logic/`.
2. Modify both files in the same operation.
3. Never change implementation without adjusting schema.
4. Refuse edits that alter:
   - Variants
   - States
   - Token mappings
   - Props  
   unless the schema is updated.

**Failure to update schema invalidates the change.**

---

**END OF GLOBAL GOVERNANCE FILE**
