/**
 * Title Item Row — AI-generated component
 *
 * Source of truth (Figma):
 * https://www.figma.com/design/Z4MtKOfkNEzhMYJzN1q3kR/Scalar_Design_System-Components?node-id=229-2974&m=dev
 *
 * Rules: public/AI-Rules.md
 * Tokens: design-tokens.scalar.ai.json (semantic tokens only; no hardcoded values)
 */

/**
 * Schema:
 * ../../logic/titleitemrow-schema-logic.md
 *
 * This component MUST comply with the Standardized Component Schema.
 * The schema file is the authoritative contract.
 */

import React from 'react';

/** Semantic token names from design-tokens.scalar.ai.json */
type SemanticVar =
  | 'text-primary'
  | 'text-secondary';

function varOf(name: SemanticVar): string {
  return `var(--${name})`;
}

/** Spacing tokens: xs, s, m, l, xl */
const spacingVar = (t: 'xs' | 's' | 'm' | 'l' | 'xl') =>
  `var(--${t === 'xs' ? '4' : t === 's' ? '8' : t === 'm' ? '16' : t === 'l' ? '24' : '32'})`;

/** Title typography from tokens.primitiveType by size */
const titleTypo = (size: 's' | 'm' | 'l') =>
  size === 's'
    ? { fontSize: 'var(--12)', lineHeight: 'var(--16)', fontWeight: 'var(--weight-semi-bold)' as const }
    : size === 'm'
      ? { fontSize: 'var(--14)', lineHeight: 'var(--20)', fontWeight: 'var(--weight-semi-bold)' as const }
      : { fontSize: 'var(--16)', lineHeight: 'var(--24)', fontWeight: 'var(--weight-semi-bold)' as const };

export type TitleItemRowSize = 's' | 'm' | 'l';

export interface TitleItemRowProps {
  /** Row title (left side). */
  title: React.ReactNode;
  /** Optional value or trailing content (right side). */
  value?: React.ReactNode;
  /** Optional subtitle below the title. */
  subtitle?: React.ReactNode;
  /** Size for title (and row min-height). */
  size?: TitleItemRowSize;
  /** Optional click handler; makes the row interactive. */
  onClick?: () => void;
  className?: string;
}

/**
 * Title Item Row component. Displays a title with optional value/subtitle in a single row.
 * All styling from design-tokens.scalar.ai.json. Theme: :root and [data-theme="dark"].
 */
export const TitleItemRow: React.FC<TitleItemRowProps> = ({
  title,
  value,
  subtitle,
  size = 'm',
  onClick,
  className = '',
}) => {
  const typo = titleTypo(size);
  const minHeight = size === 's' ? 'var(--32)' : size === 'm' ? 'var(--40)' : 'var(--48)';

  const rowStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacingVar('m'),
    minHeight,
    cursor: onClick ? 'pointer' : undefined,
    outline: 'none',
  };

  const titleStyle: React.CSSProperties = {
    fontFamily: 'var(--family-inter)',
    ...typo,
    letterSpacing: 'var(--letter-spacing-none)',
    color: varOf('text-primary'),
    flex: value != null ? '1' : undefined,
    minWidth: 0,
  };

  const subtitleStyle: React.CSSProperties = {
    fontFamily: 'var(--family-inter)',
    fontSize: size === 's' ? 'var(--10)' : 'var(--12)',
    lineHeight: size === 's' ? 'var(--14)' : 'var(--16)',
    fontWeight: 'var(--weight-regular)',
    letterSpacing: 'var(--letter-spacing-none)',
    color: varOf('text-secondary'),
    marginTop: spacingVar('xs'),
  };

  const valueStyle: React.CSSProperties = {
    fontFamily: 'var(--family-inter)',
    fontSize: typo.fontSize,
    lineHeight: typo.lineHeight,
    fontWeight: 'var(--weight-regular)',
    letterSpacing: 'var(--letter-spacing-none)',
    color: varOf('text-secondary'),
    flexShrink: 0,
    textAlign: 'right',
  };

  const content = (
    <>
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={titleStyle}>{title}</div>
        {subtitle != null && <div style={subtitleStyle}>{subtitle}</div>}
      </div>
      {value != null && <div style={valueStyle}>{value}</div>}
    </>
  );

  if (onClick) {
    return (
      <div
        role="button"
        tabIndex={0}
        className={`ai-title-item-row ai-title-item-row--${size} ${className}`}
        style={rowStyle}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
          }
        }}
        aria-label={typeof title === 'string' ? title : undefined}
      >
        {content}
      </div>
    );
  }

  return (
    <div
      className={`ai-title-item-row ai-title-item-row--${size} ${className}`}
      style={rowStyle}
    >
      {content}
    </div>
  );
};

export default TitleItemRow;
