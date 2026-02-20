/**
 * Chip — AI-generated component
 *
 * Source of truth (Figma):
 * https://www.figma.com/design/Z4MtKOfkNEzhMYJzN1q3kR/Scalar_Design_System-Components?node-id=70-12104&m=dev
 *
 * Logic (authoritative): ai-sources/Logic/chip-schema-logic.md
 * - Semantic label (status, category, tag); optional icon and onRemove. Not a CTA or navigation.
 * - Variants: brand | success | error | warning. Styles: filled | outlined. Sizes: s | m | l.
 * - Token-only styling; Material Symbols; remove button is <button> with aria-label="Remove".
 * When using or modifying Chip, follow the logic schema.
 *
 * Rules: public/AI-Rules.md
 * Tokens: design-tokens.scalar.ai.json (semantic tokens only; no hardcoded values)
 */

/**
 * Schema:
 * ../../logic/chip-schema-logic.md
 *
 * This component MUST comply with the Standardized Component Schema.
 * The schema file is the authoritative contract.
 */

import React from 'react';

/** Semantic token names from design-tokens.scalar.ai.json */
type SemanticVar =
  | 'background-brand'
  | 'background-positive'
  | 'background-negative'
  | 'background-warning'
  | 'stroke-brand'
  | 'stroke-positive'
  | 'stroke-negative'
  | 'stroke-warning'
  | 'text-button-label'
  | 'text-brand'
  | 'text-primary'
  | 'text-positive'
  | 'text-negative'
  | 'text-warning';

function varOf(name: SemanticVar): string {
  return `var(--${name})`;
}

/** Spacing tokens: xs, s, m, l, xl */
const spacingVar = (t: 'xs' | 's' | 'm' | 'l' | 'xl') =>
  `var(--${t === 'xs' ? '4' : t === 's' ? '8' : t === 'm' ? '16' : t === 'l' ? '24' : '32'})`;

/** Corner radius token */
const radiusVar = (t: 'xs' | 's' | 'm' | 'l' | 'xl') =>
  `var(--${t === 'xs' ? '4' : t === 's' ? '8' : t === 'm' ? '16' : t === 'l' ? '24' : '32'})`;

/** Chip typography by size */
const chipTypo = (size: 's' | 'm' | 'l') =>
  size === 's'
    ? { fontSize: 'var(--12)', lineHeight: 'var(--16)' }
    : size === 'm'
      ? { fontSize: 'var(--14)', lineHeight: 'var(--20)' }
      : { fontSize: 'var(--16)', lineHeight: 'var(--24)' };

export type ChipVariant = 'brand' | 'success' | 'error' | 'warning';
export type ChipSize = 's' | 'm' | 'l';
export type ChipStyle = 'filled' | 'outlined';

const VARIANT_TOKENS: Record<
  ChipVariant,
  { bg: SemanticVar; stroke: SemanticVar; text: SemanticVar }
> = {
  brand: { bg: 'background-brand', stroke: 'stroke-brand', text: 'text-brand' },
  success: { bg: 'background-positive', stroke: 'stroke-positive', text: 'text-positive' },
  error: { bg: 'background-negative', stroke: 'stroke-negative', text: 'text-negative' },
  warning: { bg: 'background-warning', stroke: 'stroke-warning', text: 'text-warning' },
};

export interface ChipProps {
  /** Chip label (optional for icon-only chip). */
  children?: React.ReactNode;
  /** Visual variant (used by ModalStatusCell: success, error, warning; info maps to brand). */
  variant?: ChipVariant;
  /** Filled (default) or outlined. */
  style?: ChipStyle;
  size?: ChipSize;
  /** Optional Material Symbol name (e.g. check_circle, error, warning, info). */
  icon?: string;
  /** When set, shows remove icon and calls this on click. */
  onRemove?: () => void;
  className?: string;
}

/**
 * Chip component. Reusable across the platform; use in ModalStatusCell and other components.
 * All styling from design-tokens.scalar.ai.json. Theme: :root and [data-theme="dark"].
 */
export const Chip: React.FC<ChipProps> = ({
  children,
  variant = 'brand',
  style: chipStyle = 'filled',
  size = 'm',
  icon,
  onRemove,
  className = '',
}) => {
  const typo = chipTypo(size);
  const tokens = VARIANT_TOKENS[variant];
  const isFilled = chipStyle === 'filled';

  const bg = isFilled ? varOf(tokens.bg) : 'transparent';
  const borderColor = isFilled ? 'transparent' : varOf(tokens.stroke);
  const textColor = isFilled ? varOf('text-button-label') : varOf(tokens.text);

  const iconSize = size === 's' ? 'var(--14)' : size === 'm' ? 'var(--18)' : 'var(--20)';
  const paddingY = size === 's' ? 'xs' : 's';
  const paddingX = size === 's' ? 's' : 'm';

  const rootStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacingVar('xs'),
    padding: `${spacingVar(paddingY as 'xs' | 's' | 'm' | 'l' | 'xl')} ${spacingVar(paddingX as 'xs' | 's' | 'm' | 'l' | 'xl')}`,
    borderRadius: radiusVar('m'),
    border: `1px solid ${borderColor}`,
    backgroundColor: bg,
    color: textColor,
    fontFamily: 'var(--family-inter)',
    ...typo,
    fontWeight: 'var(--weight-semi-bold)',
    letterSpacing: 'var(--letter-spacing-none)',
    maxWidth: '100%',
    minWidth: 0,
  };

  return (
    <span
      className={`ai-chip ai-chip--${variant} ai-chip--${chipStyle} ai-chip--${size} ${className}`}
      style={rootStyle}
    >
      {icon != null && (
        <span
          className="material-symbols-outlined"
          aria-hidden
          style={{ fontSize: iconSize, width: iconSize, height: iconSize, flexShrink: 0 }}
        >
          {icon}
        </span>
      )}
      {children != null && children !== '' && (
        <span style={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {children}
        </span>
      )}
      {onRemove != null && (
        <button
          type="button"
          aria-label="Remove"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          style={{
            margin: 0,
            padding: 0,
            border: 'none',
            background: 'none',
            color: 'inherit',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            className="material-symbols-outlined"
            aria-hidden
            style={{ fontSize: iconSize, width: iconSize, height: iconSize }}
          >
            close
          </span>
        </button>
      )}
    </span>
  );
};

export default Chip;
