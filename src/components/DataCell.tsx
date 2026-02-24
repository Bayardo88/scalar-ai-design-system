/**
 * Data Cell — AI-generated component
 *
 * Source of truth (Figma):
 * https://www.figma.com/design/Z4MtKOfkNEzhMYJzN1q3kR/Scalar_Design_System-Components?node-id=224-2954&m=dev
 *
 * Use with ColumnHeader for table body cells. Same size/alignment tokens for consistent layout.
 *
 * Rules: public/AI-Rules.md
 * Tokens: design-tokens.scalar.ai.json (semantic tokens only; no hardcoded values)
 */

/**
 * Schema:
 * ../../logic/datacell-schema-logic.md
 *
 * This component MUST comply with the Standardized Component Schema.
 * The schema file is the authoritative contract.
 */

import React from 'react';

/** Semantic token names from design-tokens.scalar.ai.json */
type SemanticVar =
  | 'text-primary'
  | 'text-secondary'
  | 'stroke-disable';

function varOf(name: SemanticVar): string {
  return `var(--${name})`;
}

/** Spacing tokens: xs, s, m, l, xl */
const spacingVar = (t: 'xs' | 's' | 'm' | 'l' | 'xl') =>
  `var(--${t === 'xs' ? '4' : t === 's' ? '8' : t === 'm' ? '16' : t === 'l' ? '24' : '32'})`;

/** Cell typography from tokens.primitiveType by size (regular weight for data) */
const cellTypo = (size: 's' | 'm' | 'l') =>
  size === 's'
    ? { fontSize: 'var(--12)', lineHeight: 'var(--16)' }
    : size === 'm'
      ? { fontSize: 'var(--14)', lineHeight: 'var(--20)' }
      : { fontSize: 'var(--16)', lineHeight: 'var(--24)' };

export type DataCellSize = 's' | 'm' | 'l';

export interface DataCellProps {
  /** Cell content. */
  children?: React.ReactNode;
  /** Text alignment (match ColumnHeader for the column). */
  align?: 'left' | 'center' | 'right';
  /** Size (use same as ColumnHeader for the column). */
  size?: DataCellSize;
  /** Use secondary/muted text color. */
  variant?: 'primary' | 'secondary';
  /** Show bottom border. */
  bordered?: boolean;
  /** Optional style to merge with root container. */
  style?: React.CSSProperties;
  className?: string;
}

/**
 * Data Cell component. Table body cell; pair with ColumnHeader for aligned columns.
 * All styling from design-tokens.scalar.ai.json. Theme: :root and [data-theme="dark"].
 */
export const DataCell: React.FC<DataCellProps> = ({
  children,
  align = 'left',
  size = 'm',
  variant = 'primary',
  bordered = true,
  style,
  className = '',
}) => {
  const typo = cellTypo(size);
  const textColor = variant === 'secondary' ? varOf('text-secondary') : varOf('text-primary');

  const cellStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: align === 'left' ? 'flex-start' : align === 'center' ? 'center' : 'flex-end',
    padding: `${spacingVar('s')} ${spacingVar('m')}`,
    minHeight: size === 's' ? 'var(--32)' : size === 'm' ? 'var(--40)' : 'var(--48)',
    borderBottom: bordered ? `1px solid ${varOf('stroke-disable')}` : undefined,
    fontFamily: 'var(--family-inter)',
    ...typo,
    fontWeight: 'var(--weight-regular)',
    letterSpacing: 'var(--letter-spacing-none)',
    color: textColor,
    minWidth: 0,
    ...style,
  };

  return (
    <div
      className={`ai-data-cell ai-data-cell--${size} ai-data-cell--${align} ai-data-cell--${variant} ${bordered ? 'ai-data-cell--bordered' : ''} ${className}`}
      style={cellStyle}
    >
      <span style={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {children}
      </span>
    </div>
  );
};

export default DataCell;
