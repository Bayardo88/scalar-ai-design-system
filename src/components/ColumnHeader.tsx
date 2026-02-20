/**
 * ColumnHeader — AI-generated component
 *
 * Source of truth (Figma):
 * https://www.figma.com/design/Z4MtKOfkNEzhMYJzN1q3kR/Scalar_Design_System-Components?node-id=224-3018&m=dev
 *
 * Logic (authoritative): ai-sources/Logic/columnheader-schema-logic.md
 * - Table/list column label with optional sort; metric from Knowledge Base or children.
 * - No semantic variants; size s|m|l, align left|center|right, sort asc|desc|undefined, bordered.
 * - When onSortClick set: role="button", keyboard; Material Symbols arrow_upward|arrow_downward|unfold_more.
 * When using or modifying ColumnHeader, follow the logic schema.
 *
 * Rules: public/AI-Rules.md
 * Tokens: design-tokens.scalar.ai.json (semantic tokens only; no hardcoded values)
 */

/**
 * Schema:
 * ../../logic/columnheader-schema-logic.md
 *
 * This component MUST comply with the Standardized Component Schema.
 * The schema file is the authoritative contract.
 */

import React from 'react';
import { KNOWLEDGE_BASE_METRICS, type KnowledgeBaseMetricKey } from './knowledgeBaseMetrics';

/** Semantic token names from design-tokens.scalar.ai.json */
type SemanticVar =
  | 'text-primary'
  | 'text-secondary'
  | 'stroke-disable'
  | 'icon-brand';

function varOf(name: SemanticVar): string {
  return `var(--${name})`;
}

/** Spacing tokens: xs, s, m, l, xl */
const spacingVar = (t: 'xs' | 's' | 'm' | 'l' | 'xl') =>
  `var(--${t === 'xs' ? '4' : t === 's' ? '8' : t === 'm' ? '16' : t === 'l' ? '24' : '32'})`;

/** Header typography from tokens.primitiveType by size */
const headerTypo = (size: 's' | 'm' | 'l') =>
  size === 's'
    ? { fontSize: 'var(--12)', lineHeight: 'var(--16)', fontWeight: 'var(--weight-semi-bold)' as const }
    : size === 'm'
      ? { fontSize: 'var(--14)', lineHeight: 'var(--20)', fontWeight: 'var(--weight-semi-bold)' as const }
      : { fontSize: 'var(--16)', lineHeight: 'var(--24)', fontWeight: 'var(--weight-semi-bold)' as const };

export type ColumnHeaderSize = 's' | 'm' | 'l';
export type ColumnHeaderSort = 'asc' | 'desc' | undefined;

export interface ColumnHeaderProps {
  /** Header label (used when `metric` is not set). */
  children?: React.ReactNode;
  /** Metric key from Knowledge Base (public/KNOWLEDGE_BASE.md). When set, displays the corresponding label; overrides children. */
  metric?: KnowledgeBaseMetricKey;
  /** Text alignment. */
  align?: 'left' | 'center' | 'right';
  /** Sort direction when used in a sortable column. */
  sort?: ColumnHeaderSort;
  /** Called when header is clicked (e.g. to toggle sort). */
  onSortClick?: () => void;
  /** Size for typography and padding. */
  size?: ColumnHeaderSize;
  /** Show bottom border (e.g. for table header row). */
  bordered?: boolean;
  className?: string;
}

/**
 * Column Header component. For table/list column headers; optional sort indicator (Material Symbol).
 * All styling from design-tokens.scalar.ai.json. Theme: :root and [data-theme="dark"].
 */
export const ColumnHeader: React.FC<ColumnHeaderProps> = ({
  children,
  metric,
  align = 'left',
  sort,
  onSortClick,
  size = 'm',
  bordered = true,
  className = '',
}) => {
  const typo = headerTypo(size);
  const sortable = onSortClick != null;
  const iconName = sort === 'asc' ? 'arrow_upward' : sort === 'desc' ? 'arrow_downward' : 'unfold_more';
  const label = metric != null ? KNOWLEDGE_BASE_METRICS[metric] : children;

  const cellStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacingVar('xs'),
    justifyContent: align === 'left' ? 'flex-start' : align === 'center' ? 'center' : 'flex-end',
    padding: `${spacingVar('s')} ${spacingVar('m')}`,
    minHeight: size === 's' ? 'var(--32)' : size === 'm' ? 'var(--40)' : 'var(--48)',
    borderBottom: bordered ? `1px solid ${varOf('stroke-disable')}` : undefined,
    fontFamily: 'var(--family-inter)',
    ...typo,
    letterSpacing: 'var(--letter-spacing-none)',
    color: varOf('text-primary'),
    cursor: sortable ? 'pointer' : undefined,
    outline: 'none',
  };

  return (
    <div
      role={sortable ? 'button' : undefined}
      tabIndex={sortable ? 0 : undefined}
      className={`ai-column-header ai-column-header--${size} ai-column-header--${align} ${bordered ? 'ai-column-header--bordered' : ''} ${className}`}
      style={cellStyle}
      onClick={sortable ? onSortClick : undefined}
      onKeyDown={
        sortable
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSortClick?.();
              }
            }
          : undefined
      }
      aria-sort={sortable && sort ? (sort === 'asc' ? 'ascending' : 'descending') : undefined}
    >
      <span style={{ minWidth: 0 }}>{label}</span>
      {sortable && (
        <span
          className="material-symbols-outlined"
          aria-hidden
          style={{
            fontSize: size === 's' ? 'var(--14)' : 'var(--16)',
            color: varOf('icon-brand'),
            flexShrink: 0,
          }}
        >
          {iconName}
        </span>
      )}
    </div>
  );
};

export default ColumnHeader;
