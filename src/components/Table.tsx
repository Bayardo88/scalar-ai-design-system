/**
 * Table — AI-generated component
 *
 * Source of truth (Figma):
 * https://www.figma.com/design/Z4MtKOfkNEzhMYJzN1q3kR/Scalar_Design_System-Components?node-id=225-3142&m=dev
 *
 * Three sections: Section 1 (Header), Section 2 (Table), Section 3 (Pagination).
 * Uses ColumnHeader, DataCell, and TitleItemRow. Header and Pagination are optional (booleans).
 *
 * Rules: public/AI-Rules.md
 * Tokens: design-tokens.scalar.ai.json (semantic tokens only; no hardcoded values)
 */

/**
 * Schema:
 * ../../logic/table-schema-logic.md
 *
 * This component MUST comply with the Standardized Component Schema.
 * The schema file is the authoritative contract.
 */

import React from 'react';
import { ColumnHeader } from './ColumnHeader';
import { DataCell } from './DataCell';

/** Semantic token names from design-tokens.scalar.ai.json */
type SemanticVar = 'stroke-disable' | 'background-page';

function varOf(name: SemanticVar): string {
  return `var(--${name})`;
}

/** Spacing tokens: xs, s, m, l, xl */
const spacingVar = (t: 'xs' | 's' | 'm' | 'l' | 'xl') =>
  `var(--${t === 'xs' ? '4' : t === 's' ? '8' : t === 'm' ? '16' : t === 'l' ? '24' : '32'})`;

export type TableSize = 's' | 'm' | 'l';

export interface TableColumn<T = Record<string, React.ReactNode>> {
  id: string;
  label: React.ReactNode;
  align?: 'left' | 'center' | 'right';
  sort?: 'asc' | 'desc';
  onSortClick?: () => void;
  /** Optional width (e.g. "1fr", "var(--120)"). */
  width?: string;
  /** Custom cell renderer; default is DataCell. */
  render?: (value: React.ReactNode, row: T) => React.ReactNode;
}

export interface TableProps<T = Record<string, React.ReactNode>> {
  /** Section 1: optional header (e.g. TitleItemRow with table title). Shown when showHeader is true. */
  header?: React.ReactNode;
  /** Show Section 1 (Header). Default true. */
  showHeader?: boolean;
  /** Column definitions (used for Section 2). */
  columns: TableColumn<T>[];
  /** Row data: array of objects keyed by column id. */
  rows: T[];
  /** Section 3: optional pagination (custom content). Shown when showPagination is true. */
  pagination?: React.ReactNode;
  /** Show Section 3 (Pagination). Default true. */
  showPagination?: boolean;
  /** Cell size for ColumnHeader and DataCell. */
  size?: TableSize;
  className?: string;
}

/**
 * Table component. Section 1 = Header (optional), Section 2 = Table (ColumnHeader + DataCell rows), Section 3 = Pagination (optional).
 * All styling from design-tokens.scalar.ai.json. Theme: :root and [data-theme="dark"].
 */
export function Table<T extends Record<string, React.ReactNode>>({
  header,
  showHeader = true,
  columns,
  rows,
  pagination,
  showPagination = true,
  size = 'm',
  className = '',
}: TableProps<T>) {
  const gridTemplateColumns = columns.map((c) => c.width ?? '1fr').join(' ');

  const tableWrapperStyle: React.CSSProperties = {
    backgroundColor: varOf('background-page'),
    border: `1px solid ${varOf('stroke-disable')}`,
    borderRadius: spacingVar('s'),
    overflow: 'hidden',
  };

  const tableGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns,
    minWidth: 0,
  };

  return (
    <div
      className={`ai-table ${className}`}
      style={tableWrapperStyle}
      role="region"
      aria-label="Table"
    >
      {showHeader && header != null && (
        <div className="ai-table__header" style={{ padding: spacingVar('s'), borderBottom: `1px solid ${varOf('stroke-disable')}` }}>
          {header}
        </div>
      )}

      <div className="ai-table__section-2">
        <div className="ai-table__header-row" style={tableGridStyle}>
          {columns.map((col) => (
            <ColumnHeader
              key={col.id}
              size={size}
              align={col.align ?? 'left'}
              sort={col.sort}
              onSortClick={col.onSortClick}
              bordered
            >
              {col.label}
            </ColumnHeader>
          ))}
        </div>
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="ai-table__row" style={tableGridStyle}>
            {columns.map((col) => {
              const value = row[col.id];
              const cell =
                col.render != null ? (
                  col.render(value, row)
                ) : (
                  <DataCell size={size} align={col.align ?? 'left'} bordered>
                    {value}
                  </DataCell>
                );
              return <React.Fragment key={col.id}>{cell}</React.Fragment>;
            })}
          </div>
        ))}
      </div>

      {showPagination && pagination != null && (
        <div className="ai-table__pagination" style={{ padding: spacingVar('s'), borderTop: `1px solid ${varOf('stroke-disable')}` }}>
          {pagination}
        </div>
      )}
    </div>
  );
}

export default Table;
