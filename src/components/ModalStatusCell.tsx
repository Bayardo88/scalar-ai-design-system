/**
 * Modal Status Cell — AI-generated component
 *
 * Source of truth (Figma):
 * https://www.figma.com/design/Z4MtKOfkNEzhMYJzN1q3kR/Scalar_Design_System-Components?node-id=224-3088&m=dev
 *
 * Displays a status (success, error, warning, info) using the Chip component.
 *
 * Rules: public/AI-Rules.md
 * Tokens: design-tokens.scalar.ai.json (semantic tokens only; no hardcoded values)
 */

/**
 * Schema:
 * ../../logic/modalstatuscell-schema-logic.md
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

export type ModalStatusCellSize = 's' | 'm' | 'l';
export type ModalStatusCellStatus = 'success' | 'error' | 'warning' | 'info';

const STATUS_TO_CHIP: Record<ModalStatusCellStatus, { variant: ChipVariant; icon: string }> = {
  success: { variant: 'success', icon: 'check_circle' },
  error: { variant: 'error', icon: 'error' },
  warning: { variant: 'warning', icon: 'warning' },
  info: { variant: 'brand', icon: 'info' },
};

export interface ModalStatusCellProps {
  /** Status type (drives Chip variant and icon). */
  status: ModalStatusCellStatus;
  /** Label text (optional; passed to Chip). */
  children?: React.ReactNode;
  /** Size; use same as ColumnHeader for the column. */
  size?: ModalStatusCellSize;
  /** Show bottom border. */
  bordered?: boolean;
  /** Text alignment. */
  align?: 'left' | 'center' | 'right';
  /** Chip style: filled (default) or outlined. */
  chipStyle?: 'filled' | 'outlined';
  className?: string;
}

/**
 * Modal Status Cell component. Renders a Chip with status variant and icon.
 * All styling from design-tokens.scalar.ai.json. Theme: :root and [data-theme="dark"].
 */
export const ModalStatusCell: React.FC<ModalStatusCellProps> = ({
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
      className={`ai-modal-status-cell ai-modal-status-cell--${status} ai-modal-status-cell--${size} ai-modal-status-cell--${align} ${bordered ? 'ai-modal-status-cell--bordered' : ''} ${className}`}
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

export default ModalStatusCell;
