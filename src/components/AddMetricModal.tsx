/**
 * Add Metric Modal — AI-generated component
 *
 * Source of truth (Figma):
 * https://www.figma.com/design/Z4MtKOfkNEzhMYJzN1q3kR/Scalar_Design_System-Components?node-id=245-4312&m=dev
 *
 * Composes: MetricTitle, MetricItem, Button, SearchBar.
 * Metric list from Knowledge Base (public/KNOWLEDGE_BASE.md / knowledgeBaseMetrics).
 *
 * Rules: public/AI-Rules.md
 * Tokens: design-tokens.scalar.ai.json (semantic tokens only; no hardcoded values)
 */

/**
 * Schema:
 * ../../logic/addmetricmodal-schema-logic.md
 *
 * This component MUST comply with the Standardized Component Schema.
 * The schema file is the authoritative contract.
 */

import React, { useMemo, useState } from 'react';
import { MetricTitle } from './MetricTitle';
import { MetricItem } from './MetricItem';
import { Button } from './Button';
import { SearchBar } from './SearchBar';
import {
  KNOWLEDGE_BASE_METRICS,
  KNOWLEDGE_BASE_METRIC_KEYS,
  type KnowledgeBaseMetricKey,
} from './knowledgeBaseMetrics';

/** Semantic token names from design-tokens.scalar.ai.json */
type SemanticVar =
  | 'background-page'
  | 'stroke-disable'
  | 'overlay-50-inverse'
  | 'text-tertiary';

function varOf(name: SemanticVar): string {
  return `var(--${name})`;
}

/** Spacing tokens: xs, s, m, l, xl */
const spacingVar = (t: 'xs' | 's' | 'm' | 'l' | 'xl') =>
  `var(--${t === 'xs' ? '4' : t === 's' ? '8' : t === 'm' ? '16' : t === 'l' ? '24' : '32'})`;

/** Corner radius token */
const radiusVar = (t: 'xs' | 's' | 'm' | 'l' | 'xl') =>
  `var(--${t === 'xs' ? '4' : t === 's' ? '8' : t === 'm' ? '16' : t === 'l' ? '24' : '32'})`;

export interface AddMetricModalProps {
  /** When true, modal is visible. */
  open: boolean;
  /** Called when modal should close (e.g. Cancel or backdrop click). */
  onClose: () => void;
  /** Called when user confirms; receives the selected metric key. */
  onAdd: (metricKey: KnowledgeBaseMetricKey) => void;
  /** Metric keys already added (optional; can be used to disable or hide them). */
  alreadyAddedKeys?: KnowledgeBaseMetricKey[];
  /** Modal title. */
  title?: React.ReactNode;
  /** Search input placeholder. */
  searchPlaceholder?: string;
  /** Label for the primary action button. */
  addButtonLabel?: string;
  /** Label for the cancel button. */
  cancelButtonLabel?: string;
  /** Size for MetricItem and SearchBar. */
  size?: 's' | 'm' | 'l';
  className?: string;
}

const defaultTitle = 'Add metric';
const defaultSearchPlaceholder = 'Search metrics…';
const defaultAddLabel = 'Add';
const defaultCancelLabel = 'Cancel';

/**
 * Add Metric Modal. Uses MetricTitle, SearchBar, list of MetricItem from Knowledge Base, and Add/Cancel Button.
 * Single selection; on Add, calls onAdd(selectedMetricKey).
 */
export const AddMetricModal: React.FC<AddMetricModalProps> = ({
  open,
  onClose,
  onAdd,
  alreadyAddedKeys = [],
  title = defaultTitle,
  searchPlaceholder = defaultSearchPlaceholder,
  addButtonLabel = defaultAddLabel,
  cancelButtonLabel = defaultCancelLabel,
  size = 'm',
  className = '',
}) => {
  const [search, setSearch] = useState('');
  const [selectedKey, setSelectedKey] = useState<KnowledgeBaseMetricKey | null>(null);

  const alreadySet = useMemo(() => new Set(alreadyAddedKeys), [alreadyAddedKeys]);

  const filteredKeys = useMemo(() => {
    const available = KNOWLEDGE_BASE_METRIC_KEYS.filter((key) => !alreadySet.has(key));
    const q = search.trim().toLowerCase();
    if (!q) return available;
    return available.filter((key) => {
      const label = KNOWLEDGE_BASE_METRICS[key];
      return label.toLowerCase().includes(q);
    });
  }, [search, alreadySet]);

  const handleAdd = () => {
    if (selectedKey != null) {
      onAdd(selectedKey);
      setSelectedKey(null);
      setSearch('');
      onClose();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  };

  if (!open) return null;

  return (
    <>
      <style>{`
        .ai-add-metric-modal-backdrop {
          position: fixed;
          inset: 0;
          background: ${varOf('overlay-50-inverse')};
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .ai-add-metric-modal-panel {
          background: ${varOf('background-page')};
          border: 1px solid ${varOf('stroke-disable')};
          border-radius: ${radiusVar('m')};
          max-width: 90vw;
          width: 100%;
          max-height: 80vh;
          display: flex;
          flex-direction: column;
          box-shadow: 0 var(--4) var(--24) ${varOf('overlay-50-inverse')};
        }
        .ai-add-metric-modal-list {
          overflow: auto;
          min-height: 0;
        }
      `}</style>
      <div
        className={`ai-add-metric-modal-backdrop ${className}`}
        onClick={handleBackdropClick}
        onKeyDown={handleKeyDown}
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-metric-modal-title"
      >
        <div
          className="ai-add-metric-modal-panel"
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ padding: spacingVar('m'), borderBottom: `1px solid ${varOf('stroke-disable')}` }}>
            <MetricTitle as="h2" size={size === 's' ? 's' : size === 'l' ? 'l' : 'm'} id="add-metric-modal-title">
              {title}
            </MetricTitle>
            <div style={{ marginTop: spacingVar('s') }}>
              <SearchBar
                placeholder={searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                size={size}
              />
            </div>
          </div>

          <div className="ai-add-metric-modal-list" style={{ flex: 1 }}>
            {filteredKeys.map((key) => (
              <MetricItem
                key={key}
                metric={key}
                size={size}
                selected={selectedKey === key}
                onClick={() => setSelectedKey(key)}
                bordered
              />
            ))}
            {filteredKeys.length === 0 && (
              <div
                style={{
                  padding: spacingVar('m'),
                  fontFamily: 'var(--family-inter)',
                  fontSize: 'var(--14)',
                  lineHeight: 'var(--20)',
                  color: varOf('text-tertiary'),
                }}
              >
                No metrics match your search.
              </div>
            )}
          </div>

          <div
            style={{
              padding: spacingVar('m'),
              borderTop: `1px solid ${varOf('stroke-disable')}`,
              display: 'flex',
              justifyContent: 'flex-end',
              gap: spacingVar('s'),
            }}
          >
            <Button variant="brand" size={size} onClick={onClose}>
              {cancelButtonLabel}
            </Button>
            <Button
              variant="brand"
              size={size}
              onClick={handleAdd}
              disabled={selectedKey == null}
            >
              {addButtonLabel}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddMetricModal;
