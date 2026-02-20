/**
 * Evaluation Status Cell — AI-generated component
 *
 * Source of truth (Figma):
 * https://www.figma.com/design/Z4MtKOfkNEzhMYJzN1q3kR/Scalar_Design_System-Components?node-id=224-3101&m=dev
 *
 * Displays an evaluation status using the Chip component. Use in tables/modals for evaluation results.
 *
 * Rules: public/AI-Rules.md
 * Tokens: design-tokens.scalar.ai.json (semantic tokens only; no hardcoded values)
 */

/**
 * Schema:
 * ../../logic/evaluationstatuscell-schema-logic.md
 *
 * This component MUST comply with the Standardized Component Schema.
 * The schema file is the authoritative contract.
 */

import React from 'react';
import { Chip, type ChipVariant } from './Chip';

/** Semantic token names from design-tokens.scalar.ai.json */
type SemanticVar = 'stroke-disable';

function varOf(name: SemanticVar): string {
  return `var(--${name})`;
}

/** Spacing tokens: xs, s, m, l, xl */
const spacingVar = (t: 'xs' | 's' | 'm' | 'l' | 'xl') =>
  `var(--${t === 'xs' ? '4' : t === 's' ? '8' : t === 'm' ? '16' : t === 'l' ? '24' : '32'})`;

export type EvaluationStatusCellSize = 's' | 'm' | 'l';
export type EvaluationStatusCellStatus = 'success' | 'error' | 'warning' | 'info';

const STATUS_TO_CHIP: Record<
  EvaluationStatusCellStatus,
  { variant: ChipVariant; icon: string }
> = {
  success: { variant: 'success', icon: 'check_circle' },
  error: { variant: 'error', icon: 'error' },
  warning: { variant: 'warning', icon: 'warning' },
  info: { variant: 'brand', icon: 'info' },
};

export interface EvaluationStatusCellProps {
  /** Evaluation status (drives Chip variant and icon). */
  status: EvaluationStatusCellStatus;
  /** Label text (optional; passed to Chip, e.g. "Passed", "Failed", "Pending"). */
  children?: React.ReactNode;
  /** Size; use same as ColumnHeader for the column. */
  size?: EvaluationStatusCellSize;
  /** Show bottom border. */
  bordered?: boolean;
  /** Text alignment. */
  align?: 'left' | 'center' | 'right';
  /** Chip style: filled (default) or outlined. */
  chipStyle?: 'filled' | 'outlined';
  className?: string;
}

/**
 * Evaluation Status Cell component. Renders a Chip with status variant and icon.
 * All styling from design-tokens.scalar.ai.json. Theme: :root and [data-theme="dark"].
 */
export const EvaluationStatusCell: React.FC<EvaluationStatusCellProps> = ({
  status,
  children,
  size = 'm',
  bordered = true,
  align = 'left',
  chipStyle = 'filled',
  className = '',
}) => {
  const config = STATUS_TO_CHIP[status];

  const cellStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: align === 'left' ? 'flex-start' : align === 'center' ? 'center' : 'flex-end',
    padding: `${spacingVar('s')} ${spacingVar('m')}`,
    minHeight: size === 's' ? 'var(--32)' : size === 'm' ? 'var(--40)' : 'var(--48)',
    borderBottom: bordered ? `1px solid ${varOf('stroke-disable')}` : undefined,
    minWidth: 0,
  };

  return (
    <div
      className={`ai-evaluation-status-cell ai-evaluation-status-cell--${status} ai-evaluation-status-cell--${size} ai-evaluation-status-cell--${align} ${bordered ? 'ai-evaluation-status-cell--bordered' : ''} ${className}`}
      style={cellStyle}
    >
      <Chip
        variant={config.variant}
        style={chipStyle}
        size={size}
        icon={config.icon}
      >
        {children}
      </Chip>
    </div>
  );
};

export default EvaluationStatusCell;
