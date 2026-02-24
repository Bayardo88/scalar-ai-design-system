/**
 * Table — AI-generated component
 *
 * Source of truth (Figma):
 * https://www.figma.com/design/Z4MtKOfkNEzhMYJzN1q3kR/Scalar_Design_System-Components?node-id=225-3142&m=dev
 *
 * Logic (authoritative): logic/table-schema-logic.md
 * Governs: sticky header, sticky total row, sticky first column, column resize, column reorder, add column.
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

import React, { useState, useRef, useCallback } from 'react';
import { ColumnHeader } from './ColumnHeader';
import { DataCell } from './DataCell';
import { KNOWLEDGE_BASE_METRICS, type KnowledgeBaseMetricKey } from './knowledgeBaseMetrics';

type SemanticVar =
  | 'stroke-disable'
  | 'background-page'
  | 'neutral-100';

function varOf(name: SemanticVar): string {
  return `var(--${name})`;
}

const spacingVar = (t: 'xs' | 's' | 'm' | 'l' | 'xl') =>
  `var(--${t === 'xs' ? '4' : t === 's' ? '8' : t === 'm' ? '16' : t === 'l' ? '24' : '32'})`;

export type TableSize = 's' | 'm' | 'l';

export interface TableColumn<T = Record<string, React.ReactNode>> {
  id: string;
  label: React.ReactNode;
  align?: 'left' | 'center' | 'right';
  sort?: 'asc' | 'desc';
  onSortClick?: () => void;
  width?: string;
  render?: (value: React.ReactNode, row: T) => React.ReactNode;
}

export interface TableProps<T = Record<string, React.ReactNode>> {
  header?: React.ReactNode;
  showHeader?: boolean;
  columns: TableColumn<T>[];
  rows: T[];
  pagination?: React.ReactNode;
  showPagination?: boolean;
  size?: TableSize;
  showTotalRow?: boolean;
  enableColumnResize?: boolean;
  enableAddColumn?: boolean;
  enableColumnReorder?: boolean;
  stickyFirstColumn?: boolean;
  className?: string;
}

export function Table<T extends Record<string, React.ReactNode>>({
  header,
  showHeader = true,
  columns: initialColumns,
  rows,
  pagination,
  showPagination = true,
  size = 'm',
  showTotalRow = false,
  enableColumnResize = false,
  enableAddColumn = false,
  enableColumnReorder = false,
  stickyFirstColumn = false,
  className = '',
}: TableProps<T>) {

  /* ===============================
     Column + Width State
  ================================ */

  const [columns, setColumns] = useState(initialColumns);
  const [columnWidths, setColumnWidths] = useState(
    initialColumns.map(col => col.width ?? '1fr')
  );

  /* ===============================
     COLUMN REORDER (POINTER BASED)
  ================================ */

  const dragIndexRef = useRef<number | null>(null);

  const handleDragStart = (index: number) => {
    if (!enableColumnReorder) return;
    if (enableAddColumn && index === columns.length - 1) return;
    dragIndexRef.current = index;
  };

  const handleDrop = (targetIndex: number) => {
    if (!enableColumnReorder || dragIndexRef.current === null) return;
    if (enableAddColumn && targetIndex === columns.length) return;

    const sourceIndex = dragIndexRef.current;
    dragIndexRef.current = null;

    if (sourceIndex === targetIndex) return;

    const updatedColumns = [...columns];
    const updatedWidths = [...columnWidths];

    const [movedCol] = updatedColumns.splice(sourceIndex, 1);
    const [movedWidth] = updatedWidths.splice(sourceIndex, 1);

    updatedColumns.splice(targetIndex, 0, movedCol);
    updatedWidths.splice(targetIndex, 0, movedWidth);

    setColumns(updatedColumns);
    setColumnWidths(updatedWidths);
  };

  /* ===============================
     COLUMN RESIZE
  ================================ */

  const resizeRef = useRef<{ index: number; startX: number; startWidth: number } | null>(null);

  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (!resizeRef.current) return;

    const { index, startX, startWidth } = resizeRef.current;
    const delta = e.clientX - startX;
    const newWidth = Math.max(startWidth + delta, 80);

    setColumnWidths(prev => {
      const updated = [...prev];
      updated[index] = `${newWidth}px`;
      return updated;
    });
  }, []);

  const handlePointerUp = useCallback(() => {
    resizeRef.current = null;
    window.removeEventListener('pointermove', handlePointerMove);
    window.removeEventListener('pointerup', handlePointerUp);
  }, [handlePointerMove]);

  const handleResizeStart = (index: number, e: React.PointerEvent) => {
    if (!enableColumnResize) return;

    const currentWidth = (e.currentTarget.parentElement as HTMLElement).offsetWidth;

    resizeRef.current = {
      index,
      startX: e.clientX,
      startWidth: currentWidth,
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };

  const gridTemplateColumns = enableAddColumn
    ? [...columnWidths, 'auto'].join(' ')
    : columnWidths.join(' ');

  /* ===============================
     Add Column Modal
  ================================ */

  const [showModal, setShowModal] = useState(false);

  const addColumn = (key: string) => {
    setColumns(prev => [...prev, { id: key, label: key }]);
    setColumnWidths(prev => [...prev, '1fr']);
    setShowModal(false);
  };

  /* ===============================
     STYLES
  ================================ */

  const wrapperStyle: React.CSSProperties = {
    width: '100%',
    backgroundColor: varOf('background-page'),
    border: `1px solid ${varOf('stroke-disable')}`,
    borderRadius: 0, // REQUIRED — no rounded corners
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  };

  const scrollContainerStyle: React.CSSProperties = {
    overflow: 'auto',
    flex: 1,
  };

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns,
    width: '100%',
  };

  const stickyHeaderStyle: React.CSSProperties = {
    ...gridStyle,
    position: 'sticky',
    top: 0,
    background: varOf('background-page'),
    zIndex: 2,
  };

  const stickyTotalStyle: React.CSSProperties = {
    ...gridStyle,
    position: 'sticky',
    bottom: 0,
    background: varOf('background-page'),
    borderTop: `1px solid ${varOf('stroke-disable')}`,
    zIndex: 5,
  };

  const stickyFirstCellStyle: React.CSSProperties = {
    position: 'sticky',
    left: 0,
    background: varOf('background-page'),
    zIndex: 6,
  };

  return (
    <div className={`ai-table ${className}`} style={wrapperStyle} role="region">

      {showHeader && header && (
        <div style={{ padding: spacingVar('s'), borderBottom: `1px solid ${varOf('stroke-disable')}` }}>
          {header}
        </div>
      )}

      <div style={scrollContainerStyle}>

        {/* HEADER */}
        <div style={stickyHeaderStyle}>
          {columns.map((col, index) => (
            <div
              key={col.id}
              style={{
                position: 'relative',
                ...(stickyFirstColumn && index === 0 ? stickyFirstCellStyle : {})
              }}
              onPointerDown={() => handleDragStart(index)}
              onPointerUp={() => handleDrop(index)}
            >
              <ColumnHeader
                size={size}
                align={col.align ?? 'left'}
                sort={col.sort}
                onSortClick={col.onSortClick}
                bordered
              >
                {col.label}
              </ColumnHeader>

              {enableColumnResize && (
                <div
                  onPointerDown={(e) => handleResizeStart(index, e)}
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    width: '4px',
                    height: '100%',
                    cursor: 'col-resize',
                  }}
                />
              )}
            </div>
          ))}

          {enableAddColumn && (
            <div
              style={{
                position: 'sticky',
                right: 0,
                zIndex: 4,
                background: varOf('background-page'),
              }}
            >
              <ColumnHeader onSortClick={() => setShowModal(true)} bordered>
                Add Metric
              </ColumnHeader>
            </div>
          )}
        </div>

        {/* ROWS */}
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} style={gridStyle}>
            {columns.map((col, colIndex) => (
              <div
                key={col.id}
                style={
                  stickyFirstColumn && colIndex === 0
                    ? stickyFirstCellStyle
                    : undefined
                }
              >
                <DataCell size={size} align={col.align ?? 'left'} bordered>
                  {col.render ? col.render(row[col.id], row) : row[col.id]}
                </DataCell>
              </div>
            ))}
            {enableAddColumn && <div />}
          </div>
        ))}

        {/* TOTAL ROW */}
        {showTotalRow && (
          <div style={stickyTotalStyle}>
            {columns.map((col, index) => (
              <div
                key={col.id}
                style={
                  stickyFirstColumn && index === 0
                    ? stickyFirstCellStyle
                    : undefined
                }
              >
                <DataCell
                  size={size}
                  align={col.align ?? 'left'}
                  bordered
                  style={{ backgroundColor: varOf('neutral-100') }}
                >
                  TOTAL
                </DataCell>
              </div>
            ))}
            {enableAddColumn && (
              <div>
                <DataCell
                  size={size}
                  align="left"
                  bordered
                  style={{ backgroundColor: varOf('neutral-100') }}
                />
              </div>
            )}
          </div>
        )}

      </div>

      {showPagination && pagination && (
        <div style={{ padding: spacingVar('s'), borderTop: `1px solid ${varOf('stroke-disable')}` }}>
          {pagination}
        </div>
      )}

      {/* ADD COLUMN MODAL */}
      {showModal && (
        <div
          style={{
            position: 'fixed',
            top: spacingVar('l'),
            right: spacingVar('l'),
            background: varOf('background-page'),
            border: `1px solid ${varOf('stroke-disable')}`,
            padding: spacingVar('m'),
            maxHeight: '70vh',
            overflowY: 'auto',
          }}
        >
          {(Object.keys(KNOWLEDGE_BASE_METRICS) as KnowledgeBaseMetricKey[]).map(key => (
            <div
              key={key}
              onClick={() => addColumn(key)}
              style={{ padding: spacingVar('xs'), cursor: 'pointer' }}
            >
              {KNOWLEDGE_BASE_METRICS[key]}
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default Table;
