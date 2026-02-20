/**
 * Metric Title — AI-generated component
 *
 * Source of truth (Figma):
 * https://www.figma.com/design/Z4MtKOfkNEzhMYJzN1q3kR/Scalar_Design_System-Components?node-id=245-4168&m=dev
 *
 * Heading for a metric or section, optionally linked to the Fund Intelligence Metrics Knowledge Base
 * (public/KNOWLEDGE_BASE.md). Use above metric values, in modals, or in detail views.
 *
 * Rules: public/AI-Rules.md
 * Tokens: design-tokens.scalar.ai.json (semantic tokens only; no hardcoded values)
 */

/**
 * Schema:
 * ../../logic/metrictitle-schema-logic.md
 *
 * This component MUST comply with the Standardized Component Schema.
 * The schema file is the authoritative contract.
 */

import React from 'react';
import { KNOWLEDGE_BASE_METRICS, type KnowledgeBaseMetricKey } from './knowledgeBaseMetrics';

/** Semantic token names from design-tokens.scalar.ai.json */
type SemanticVar = 'text-primary';

function varOf(name: SemanticVar): string {
  return `var(--${name})`;
}

/** Heading typography from tokens.primitiveType by size (semi-bold). */
const titleTypo = (size: 's' | 'm' | 'l') =>
  size === 's'
    ? { fontSize: 'var(--12)', lineHeight: 'var(--16)', fontWeight: 'var(--weight-semi-bold)' as const }
    : size === 'm'
      ? { fontSize: 'var(--14)', lineHeight: 'var(--20)', fontWeight: 'var(--weight-semi-bold)' as const }
      : { fontSize: 'var(--16)', lineHeight: 'var(--24)', fontWeight: 'var(--weight-semi-bold)' as const };

export type MetricTitleSize = 's' | 'm' | 'l';

export interface MetricTitleProps {
  /** Metric key from Knowledge Base (public/KNOWLEDGE_BASE.md). When set, title shows the corresponding name; overrides children. */
  metric?: KnowledgeBaseMetricKey;
  /** Custom title (used when `metric` is not set). */
  children?: React.ReactNode;
  /** Size for typography. */
  size?: MetricTitleSize;
  /** HTML element to render (default: span). Use "h2", "h3", etc. for semantics. */
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'p';
  className?: string;
  id?: string;
}

/**
 * Metric Title component. Renders a metric/section heading; label from Knowledge Base or children.
 * All styling from design-tokens.scalar.ai.json. Theme: :root and [data-theme="dark"].
 */
export const MetricTitle: React.FC<MetricTitleProps> = ({
  metric,
  children,
  size = 'm',
  as: Component = 'span',
  className = '',
  id,
}) => {
  const typo = titleTypo(size);
  const label = metric != null ? KNOWLEDGE_BASE_METRICS[metric] : children;

  const style: React.CSSProperties = {
    fontFamily: 'var(--family-inter)',
    ...typo,
    letterSpacing: 'var(--letter-spacing-none)',
    color: varOf('text-primary'),
    margin: 0,
    display: 'block',
  };

  return (
    <Component
      id={id}
      className={`ai-metric-title ai-metric-title--${size} ${className}`}
      style={style}
    >
      {label}
    </Component>
  );
};

export default MetricTitle;
