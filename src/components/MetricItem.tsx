/**
 * Metric Item — AI-generated component
 *
 * Source of truth (Figma):
 * https://www.figma.com/design/Z4MtKOfkNEzhMYJzN1q3kR/Scalar_Design_System-Components?node-id=224-2756&m=dev
 *
 * Displays a single metric, optionally linked to the Fund Intelligence Metrics Knowledge Base
 * (public/KNOWLEDGE_BASE.md). Use in metric pickers, sidebars, or lists.
 *
 * Rules: public/AI-Rules.md
 * Tokens: design-tokens.scalar.ai.json (semantic tokens only; no hardcoded values)
 */

/**
 * Schema:
 * ../../logic/metricitem-schema-logic.md
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
  | 'background-hover'
  | 'background-pressed'
  | 'stroke-disable'
  | 'icon-brand';

function varOf(name: SemanticVar): string {
  return `var(--${name})`;
}

/** Spacing tokens: xs, s, m, l, xl */
const spacingVar = (t: 'xs' | 's' | 'm' | 'l' | 'xl') =>
  `var(--${t === 'xs' ? '4' : t === 's' ? '8' : t === 'm' ? '16' : t === 'l' ? '24' : '32'})`;

/** Body/label typography from tokens.primitiveType by size */
const itemTypo = (size: 's' | 'm' | 'l') =>
  size === 's'
    ? { fontSize: 'var(--12)', lineHeight: 'var(--16)', fontWeight: 'var(--weight-regular)' as const }
    : size === 'm'
      ? { fontSize: 'var(--14)', lineHeight: 'var(--20)', fontWeight: 'var(--weight-regular)' as const }
      : { fontSize: 'var(--16)', lineHeight: 'var(--24)', fontWeight: 'var(--weight-regular)' as const };

export type MetricItemSize = 's' | 'm' | 'l';

export interface MetricItemProps {
  /** Metric key from Knowledge Base (public/KNOWLEDGE_BASE.md). When set, label shows the corresponding name; overrides children. */
  metric?: KnowledgeBaseMetricKey;
  /** Custom label (used when `metric` is not set). */
  children?: React.ReactNode;
  /** Optional value or secondary text (e.g. right-aligned). */
  value?: React.ReactNode;
  /** Size for typography and padding. */
  size?: MetricItemSize;
  /** Visual selected state (e.g. highlighted in a list). */
  selected?: boolean;
  /** Optional Material Symbol name (left icon). */
  icon?: string;
  /** Click handler; when set, item is interactive (button-like). */
  onClick?: () => void;
  /** Show bottom border. */
  bordered?: boolean;
  className?: string;
}

/**
 * Metric Item component. Renders one metric row; label from Knowledge Base or children.
 * All styling from design-tokens.scalar.ai.json. Theme: :root and [data-theme="dark"].
 */
export const MetricItem: React.FC<MetricItemProps> = ({
  metric,
  children,
  value,
  size = 'm',
  selected = false,
  icon,
  onClick,
  bordered = false,
  className = '',
}) => {
  const typo = itemTypo(size);
  const label = metric != null ? KNOWLEDGE_BASE_METRICS[metric] : children;
  const interactive = onClick != null;

  const rootStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacingVar('s'),
    padding: `${spacingVar('s')} ${spacingVar('m')}`,
    minHeight: size === 's' ? 'var(--32)' : size === 'm' ? 'var(--40)' : 'var(--48)',
    borderBottom: bordered ? `1px solid ${varOf('stroke-disable')}` : undefined,
    fontFamily: 'var(--family-inter)',
    ...typo,
    letterSpacing: 'var(--letter-spacing-none)',
    color: varOf('text-primary'),
    backgroundColor: selected ? varOf('background-hover') : undefined,
    cursor: interactive ? 'pointer' : undefined,
    outline: 'none',
    transition: 'background-color 0.2s ease',
  };

  return (
    <>
      <style>{`
        .ai-metric-item[role="button"]:hover { background-color: ${varOf('background-hover')} !important; }
        .ai-metric-item[role="button"]:active { background-color: ${varOf('background-pressed')} !important; }
        .ai-metric-item .material-symbols-outlined { color: ${varOf('icon-brand')}; flex-shrink: 0; }
      `}</style>
      <div
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        className={`ai-metric-item ai-metric-item--${size} ${selected ? 'ai-metric-item--selected' : ''} ${bordered ? 'ai-metric-item--bordered' : ''} ${className}`}
        style={rootStyle}
        onClick={onClick}
        onKeyDown={
          interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onClick?.();
                }
              }
            : undefined
        }
      >
        {icon && (
          <span
            className="material-symbols-outlined"
            aria-hidden
            style={{
              fontSize: size === 's' ? 'var(--16)' : size === 'm' ? 'var(--18)' : 'var(--20)',
            }}
          >
            {icon}
          </span>
        )}
        <span style={{ minWidth: 0, flex: 1 }}>{label}</span>
        {value != null && (
          <span style={{ color: varOf('text-secondary'), flexShrink: 0 }}>{value}</span>
        )}
      </div>
    </>
  );
};

export default MetricItem;
