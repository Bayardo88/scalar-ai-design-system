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

import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { ColumnHeader } from './ColumnHeader';
import { DataCell } from './DataCell';
import { KNOWLEDGE_BASE_METRICS, type KnowledgeBaseMetricKey } from './knowledgeBaseMetrics';

type SemanticVar = 'stroke-disable' | 'background-page' | 'neutral-100';

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
  width?: string; // px preferred; falls back to default
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

/** Matches Figma Make behavior: default widths exist + min column width enforced */
const DEFAULT_COL_WIDTH = 120;
const MIN_COL_WIDTH = 80;
const ADD_METRIC_COL_ID = '__add_metric__';
const ADD_METRIC_COL_WIDTH = 140;

function parseWidthPx(width?: string): number | null {
  if (!width) return null;
  const m = width.trim().match(/^(\d+)\s*px$/i);
  if (!m) return null;
  return Number(m[1]);
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
     Columns State
  ================================ */
  const [columns, setColumns] = useState(initialColumns);

  // Keep local columns in sync if caller changes `initialColumns`
  useEffect(() => {
    setColumns(initialColumns);
  }, [initialColumns]);

  /* ===============================
     Container measurement (prototype-like: tableWidth = max(total, container))
  ================================ */
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  useEffect(() => {
    if (!wrapperRef.current) return;
    const el = wrapperRef.current;

    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect?.width ?? 0;
      setContainerWidth(w);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* ===============================
     Column Widths (Record keyed by column id)
     Mirrors prototype: width per key, min/max applied
  ================================ */
  const [colWidths, setColWidths] = useState<Record<string, number>>(() => {
    const next: Record<string, number> = {};
    for (const c of initialColumns) {
      next[c.id] = parseWidthPx(c.width) ?? DEFAULT_COL_WIDTH;
    }
    if (enableAddColumn) next[ADD_METRIC_COL_ID] = ADD_METRIC_COL_WIDTH;
    return next;
  });

  // Ensure widths exist when columns change (also keeps add metric width stable)
  useEffect(() => {
    setColWidths((prev) => {
      const next = { ...prev };
      for (const c of columns) {
        if (typeof next[c.id] !== 'number') {
          next[c.id] = parseWidthPx(c.width) ?? DEFAULT_COL_WIDTH;
        }
      }
      if (enableAddColumn) {
        next[ADD_METRIC_COL_ID] = next[ADD_METRIC_COL_ID] ?? ADD_METRIC_COL_WIDTH;
      } else {
        delete next[ADD_METRIC_COL_ID];
      }
      return next;
    });
  }, [columns, enableAddColumn]);

  const getW = useCallback((id: string) => colWidths[id] ?? DEFAULT_COL_WIDTH, [colWidths]);

  /* ===============================
     Column Resize (ported behavior from ResizeHandle in firm-table.tsx)
  ================================ */
  const resizingRef = useRef<{ colId: string; lastX: number } | null>(null);

  const onMouseMove = useCallback((ev: MouseEvent) => {
    if (!resizingRef.current) return;
    const { colId, lastX } = resizingRef.current;

    const delta = ev.clientX - lastX;
    resizingRef.current.lastX = ev.clientX;

    setColWidths((prev) => {
      const current = prev[colId] ?? DEFAULT_COL_WIDTH;
      const nextW = Math.max(MIN_COL_WIDTH, current + delta);
      return { ...prev, [colId]: nextW };
    });
  }, []);

  const endResize = useCallback(() => {
    resizingRef.current = null;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', endResize);
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  }, [onMouseMove]);

  const startResize = useCallback(
    (colId: string, e: React.MouseEvent) => {
      if (!enableColumnResize) return;
      if (colId === ADD_METRIC_COL_ID) return;

      e.preventDefault();
      e.stopPropagation();

      resizingRef.current = { colId, lastX: e.clientX };

      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', endResize);
    },
    [enableColumnResize, endResize, onMouseMove],
  );

  /* ===============================
     Column Reorder (kept from your version, but blocked during resize)
  ================================ */
  const dragIndexRef = useRef<number | null>(null);

  const handleDragStart = (index: number) => {
    if (!enableColumnReorder) return;
    if (resizingRef.current) return; // don't start reorder while resizing
    if (enableAddColumn && index === columns.length - 1) return;
    dragIndexRef.current = index;
  };

  const handleDrop = (targetIndex: number) => {
    if (!enableColumnReorder || dragIndexRef.current === null) return;
    if (resizingRef.current) return;
    if (enableAddColumn && targetIndex === columns.length) return;

    const sourceIndex = dragIndexRef.current;
    dragIndexRef.current = null;

    if (sourceIndex === targetIndex) return;

    const updated = [...columns];
    const [moved] = updated.splice(sourceIndex, 1);
    updated.splice(targetIndex, 0, moved);
    setColumns(updated);
  };

  /* ===============================
     Add Metric modal (ported behavior: anchored, search, click-outside, Esc)
  ================================ */
  const addMetricAnchorRef = useRef<HTMLDivElement | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalSearch, setModalSearch] = useState('');
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);

  const alreadyAddedMetricKeys = useMemo(() => {
    // columns that match KB keys are considered added
    const keys = new Set(Object.keys(KNOWLEDGE_BASE_METRICS));
    return columns.map((c) => c.id).filter((id) => keys.has(id));
  }, [columns]);

  const openAddMetric = () => {
    const rect = addMetricAnchorRef.current?.getBoundingClientRect() ?? null;
    setAnchorRect(rect);
    setShowModal(true);
  };

  const closeAddMetric = () => {
    setShowModal(false);
    setModalSearch('');
  };

  useEffect(() => {
    if (!showModal) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeAddMetric();
    };

    const onClick = (e: MouseEvent) => {
      // close if click is outside modal
      const modal = document.getElementById('ai-table-add-metric-modal');
      if (!modal) return;
      if (e.target instanceof Node && !modal.contains(e.target)) {
        // also allow clicks on the anchor to keep it stable
        if (addMetricAnchorRef.current && addMetricAnchorRef.current.contains(e.target)) return;
        closeAddMetric();
      }
    };

    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [showModal]);

  const filteredMetricEntries = useMemo(() => {
    const q = modalSearch.trim().toLowerCase();
    const already = new Set(alreadyAddedMetricKeys);

    return (Object.keys(KNOWLEDGE_BASE_METRICS) as KnowledgeBaseMetricKey[])
      .filter((k) => !already.has(k))
      .filter((k) => (q ? KNOWLEDGE_BASE_METRICS[k].toLowerCase().includes(q) : true))
      .map((k) => ({ key: k, label: KNOWLEDGE_BASE_METRICS[k] }));
  }, [modalSearch, alreadyAddedMetricKeys]);

  const addColumn = (key: KnowledgeBaseMetricKey) => {
    setColumns((prev) => [...prev, { id: key, label: KNOWLEDGE_BASE_METRICS[key] }]);
    setColWidths((prev) => ({ ...prev, [key]: DEFAULT_COL_WIDTH }));
    closeAddMetric();
  };

  /* ===============================
     Layout styles
  ================================ */
  const wrapperStyle: React.CSSProperties = {
    width: '100%',
    backgroundColor: varOf('background-page'),
    border: `1px solid ${varOf('stroke-disable')}`,
    borderRadius: 0,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  };

  // This is the scroll viewport; header and total row stick inside it
  const scrollViewportStyle: React.CSSProperties = {
    overflow: 'auto',
    flex: 1,
    maxHeight: '100%',
  };

  // Compute grid width: max(total columns, containerWidth) (prototype behavior)
  const orderedColumnIds = useMemo(() => columns.map((c) => c.id), [columns]);
  const totalFixedWidth = useMemo(() => {
    const sum = orderedColumnIds.reduce((acc, id) => acc + getW(id), 0);
    return enableAddColumn ? sum + getW(ADD_METRIC_COL_ID) : sum;
  }, [orderedColumnIds, enableAddColumn, getW]);

  const gridWidth = Math.max(totalFixedWidth, containerWidth || 0);

  // If the table is narrower than the container, we "stretch" the last DATA column
  // so the Add Metric column visually sits at the right edge (closest grid analog).
  const stretchedWidths = useMemo(() => {
    const ids = [...orderedColumnIds];
    const widths = ids.map((id) => getW(id));
    const addW = enableAddColumn ? getW(ADD_METRIC_COL_ID) : 0;

    const total = widths.reduce((a, b) => a + b, 0) + addW;
    if (!containerWidth || total >= containerWidth || widths.length === 0) {
      return { dataWidths: widths, addW };
    }

    const slack = containerWidth - total;
    // stretch last data column
    widths[widths.length - 1] = widths[widths.length - 1] + slack;

    return { dataWidths: widths, addW };
  }, [orderedColumnIds, getW, enableAddColumn, containerWidth]);

  const gridTemplateColumns = useMemo(() => {
    const data = stretchedWidths.dataWidths.map((w) => `${w}px`).join(' ');
    if (!enableAddColumn) return data;
    return `${data} ${stretchedWidths.addW}px`;
  }, [stretchedWidths, enableAddColumn]);

  const gridBaseStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns,
    width: gridWidth,
    minWidth: '100%',
  };

  const stickyHeaderStyle: React.CSSProperties = {
    ...gridBaseStyle,
    position: 'sticky',
    top: 0,
    background: varOf('background-page'),
    zIndex: 30,
  };

  const stickyTotalStyle: React.CSSProperties = {
    ...gridBaseStyle,
    position: 'sticky',
    bottom: 0,
    background: varOf('background-page'),
    borderTop: `1px solid ${varOf('stroke-disable')}`,
    zIndex: 30,
  };

  const stickyFirstCellStyle: React.CSSProperties = {
    position: 'sticky',
    left: 0,
    background: varOf('background-page'),
    zIndex: 40,
  };

  /* ===============================
     Render helpers
  ================================ */
  const renderResizeHandle = (colId: string) => {
    if (!enableColumnResize) return null;
    if (colId === ADD_METRIC_COL_ID) return null;

    return (
      <div
        onMouseDown={(e) => startResize(colId, e)}
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: '4px',
          cursor: 'col-resize',
          touchAction: 'none',
        }}
      />
    );
  };

  return (
    <div ref={wrapperRef} className={`ai-table ${className}`} style={wrapperStyle} role="region">
      {showHeader && header && (
        <div style={{ padding: spacingVar('s'), borderBottom: `1px solid ${varOf('stroke-disable')}` }}>
          {header}
        </div>
      )}

      <div style={scrollViewportStyle}>
        {/* HEADER */}
        <div style={stickyHeaderStyle}>
          {columns.map((col, index) => (
            <div
              key={col.id}
              style={{
                position: 'relative',
                ...(stickyFirstColumn && index === 0 ? stickyFirstCellStyle : {}),
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

              {renderResizeHandle(col.id)}
            </div>
          ))}

          {/* Add Metric column header */}
          {enableAddColumn && (
            <div
              style={{
                position: 'sticky',
                right: 0,
                zIndex: 50,
                background: varOf('background-page'),
              }}
            >
              <div ref={addMetricAnchorRef}>
                <ColumnHeader onSortClick={openAddMetric} bordered>
                  Add Metric
                </ColumnHeader>
              </div>
            </div>
          )}
        </div>

        {/* ROWS */}
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} style={gridBaseStyle}>
            {columns.map((col, colIndex) => (
              <div
                key={col.id}
                style={stickyFirstColumn && colIndex === 0 ? stickyFirstCellStyle : undefined}
              >
                <DataCell size={size} align={col.align ?? 'left'} bordered>
                  {col.render ? col.render(row[col.id], row) : row[col.id]}
                </DataCell>
              </div>
            ))}

            {enableAddColumn && (
              <div
                style={{
                  position: 'sticky',
                  right: 0,
                  zIndex: 20,
                  background: varOf('background-page'),
                }}
              >
                <DataCell size={size} align="left" bordered />
              </div>
            )}
          </div>
        ))}

        {/* TOTAL ROW */}
        {showTotalRow && (
          <div style={stickyTotalStyle}>
            {columns.map((col, index) => (
              <div
                key={col.id}
                style={stickyFirstColumn && index === 0 ? stickyFirstCellStyle : undefined}
              >
                <DataCell
                  size={size}
                  align={col.align ?? 'left'}
                  bordered
                  style={{ backgroundColor: varOf('neutral-100') }}
                >
                  {index === 0 ? 'Total' : null}
                </DataCell>
              </div>
            ))}

            {enableAddColumn && (
              <div
                style={{
                  position: 'sticky',
                  right: 0,
                  zIndex: 20,
                  background: varOf('neutral-100'),
                }}
              >
                <DataCell size={size} bordered style={{ backgroundColor: varOf('neutral-100') }} />
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

      {/* ADD METRIC MODAL (anchored) */}
      {showModal && (
        <div
          id="ai-table-add-metric-modal"
          role="dialog"
          aria-modal="false"
          aria-label="Add metric column"
          style={{
            position: 'fixed',
            zIndex: 1000,
            top: anchorRect ? anchorRect.bottom + 4 : 110,
            left: anchorRect ? Math.max(8, anchorRect.left - 200) : undefined,
            right: anchorRect ? undefined : 24,
            background: varOf('background-page'),
            border: `1px solid ${varOf('stroke-disable')}`,
            padding: spacingVar('m'),
            width: 380,
            maxHeight: 520,
            overflowY: 'auto',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: spacingVar('s') }}>
            <div style={{ fontWeight: 600 }}>Add Metric Column</div>
            <button onClick={closeAddMetric} aria-label="Close">
              ✕
            </button>
          </div>

          <div style={{ marginTop: spacingVar('s') }}>
            <input
              value={modalSearch}
              onChange={(e) => setModalSearch(e.target.value)}
              placeholder="Search metrics…"
              style={{
                width: '100%',
                padding: spacingVar('s'),
                border: `1px solid ${varOf('stroke-disable')}`,
                background: varOf('background-page'),
              }}
            />
          </div>

          <div style={{ marginTop: spacingVar('s') }}>
            {filteredMetricEntries.length === 0 ? (
              <div style={{ opacity: 0.7, padding: spacingVar('s') }}>No metrics found.</div>
            ) : (
              filteredMetricEntries.map(({ key, label }) => (
                <div
                  key={key}
                  onClick={() => addColumn(key)}
                  style={{
                    padding: spacingVar('s'),
                    cursor: 'pointer',
                    borderBottom: `1px solid ${varOf('stroke-disable')}`,
                  }}
                >
                  {label}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Table;
