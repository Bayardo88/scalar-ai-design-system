/**
 * Information Label — AI-generated component
 *
 * Source of truth (Figma):
 * https://www.figma.com/design/Z4MtKOfkNEzhMYJzN1q3kR/Scalar_Design_System-Components?node-id=164-2555&m=dev
 *
 * Helper or contextual label, optionally with an info icon. Use for hints, descriptions, or metadata.
 *
 * Rules: public/AI-Rules.md
 * Tokens: design-tokens.scalar.ai.json (semantic tokens only; no hardcoded values)
 */

/**
 * Schema:
 * ../../logic/informationlabel-schema-logic.md
 *
 * This component MUST comply with the Standardized Component Schema.
 * The schema file is the authoritative contract.
 */

import React from 'react';

/** Semantic token names from design-tokens.scalar.ai.json */
type SemanticVar = 'text-secondary' | 'text-tertiary' | 'icon-brand';

function varOf(name: SemanticVar): string {
  return `var(--${name})`;
}

/** Spacing tokens: xs, s, m, l, xl */
const spacingVar = (t: 'xs' | 's' | 'm' | 'l' | 'xl') =>
  `var(--${t === 'xs' ? '4' : t === 's' ? '8' : t === 'm' ? '16' : t === 'l' ? '24' : '32'})`;

/** Body/label typography from tokens.primitiveType by size (regular). */
const labelTypo = (size: 's' | 'm' | 'l') =>
  size === 's'
    ? { fontSize: 'var(--12)', lineHeight: 'var(--16)' }
    : size === 'm'
      ? { fontSize: 'var(--14)', lineHeight: 'var(--20)' }
      : { fontSize: 'var(--16)', lineHeight: 'var(--24)' };

/** Icon font size derived from size */
const sizeToIconFont = (size: 's' | 'm' | 'l') =>
  size === 's' ? 'var(--14)' : size === 'm' ? 'var(--16)' : 'var(--18)';

export type InformationLabelSize = 's' | 'm' | 'l';

export type InformationLabelVariant = 'secondary' | 'tertiary';

export interface InformationLabelProps {
  /** Label text or content. */
  children: React.ReactNode;
  /** Size for typography and icon. */
  size?: InformationLabelSize;
  /** Muted style: secondary (default) or tertiary. */
  variant?: InformationLabelVariant;
  /** Show leading info icon (Material Symbol "info"). */
  showIcon?: boolean;
  /** Optional Material Symbol name (default "info"). */
  icon?: string;
  /** HTML element to render (default: span). */
  as?: 'span' | 'p' | 'div';
  className?: string;
}

/**
 * Information Label component. Helper/contextual text with optional info icon.
 * All styling from design-tokens.scalar.ai.json. Theme: :root and [data-theme="dark"].
 */
export const InformationLabel: React.FC<InformationLabelProps> = ({
  children,
  size = 'm',
  variant = 'secondary',
  showIcon = true,
  icon = 'info',
  as: Component = 'span',
  className = '',
}) => {
  const typo = labelTypo(size);
  const textColor = variant === 'tertiary' ? varOf('text-tertiary') : varOf('text-secondary');
  const iconSize = sizeToIconFont(size);

  const style: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacingVar('xs'),
    fontFamily: 'var(--family-inter)',
    ...typo,
    fontWeight: 'var(--weight-regular)',
    letterSpacing: 'var(--letter-spacing-none)',
    color: textColor,
    margin: 0,
  };

  return (
    <Component className={`ai-information-label ai-information-label--${size} ai-information-label--${variant} ${className}`.trim()} style={style}>
      {showIcon && (
        <span
          className="material-symbols-outlined"
          aria-hidden
          style={{ fontSize: iconSize, color: varOf('icon-brand'), flexShrink: 0 }}
        >
          {icon}
        </span>
      )}
      <span style={{ minWidth: 0 }}>{children}</span>
    </Component>
  );
};

export default InformationLabel;
