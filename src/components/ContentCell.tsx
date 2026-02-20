/**
 * ContentCell — AI-generated component
 *
 * Source of truth (Figma):
 * https://www.figma.com/design/Z4MtKOfkNEzhMYJzN1q3kR/Scalar_Design_System-Components?node-id=224-3070&m=dev
 *
 * Logic (authoritative): ai-sources/Logic/contentcell-schema-logic.md
 * - Table cell for rich/multi-line content or avatar + name; static, non-interactive.
 * - Size s|m|l, align left|center|right, variant primary|secondary, bordered, truncate, avatar.
 * - Avatar mode: Avatar size xs only; token-only styling. Use with ColumnHeader/DataCell.
 * When using or modifying ContentCell, follow the logic schema.
 *
 * Rules: public/AI-Rules.md
 * Tokens: design-tokens.scalar.ai.json (semantic tokens only; no hardcoded values)
 */

/**
 * Schema:
 * ../../logic/contentcell-schema-logic.md
 *
 * This component MUST comply with the Standardized Component Schema.
 * The schema file is the authoritative contract.
 */

import React from 'react';
import { Avatar } from './Avatar';

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

/** Cell typography from tokens.primitiveType by size */
const cellTypo = (size: 's' | 'm' | 'l') =>
  size === 's'
    ? { fontSize: 'var(--12)', lineHeight: 'var(--16)' }
    : size === 'm'
      ? { fontSize: 'var(--14)', lineHeight: 'var(--20)' }
      : { fontSize: 'var(--16)', lineHeight: 'var(--24)' };

export type ContentCellSize = 's' | 'm' | 'l';

export interface ContentCellAvatarProps {
  /** Image URL (optional; fallback to initials from name). */
  src?: string | null;
  /** Display name (used for initials fallback and as the main label). */
  name: string;
}

export interface ContentCellProps {
  /** Cell content (can be multi-line or rich). When avatar is set, optional subtitle/extra. */
  children?: React.ReactNode;
  /** When set, shows Avatar (XS size) + name. Use for user/customer cells. */
  avatar?: ContentCellAvatarProps;
  /** Text alignment. */
  align?: 'left' | 'center' | 'right';
  /** Size; use same as ColumnHeader for the column. */
  size?: ContentCellSize;
  /** Use secondary/muted text color. */
  variant?: 'primary' | 'secondary';
  /** Show bottom border. */
  bordered?: boolean;
  /** Truncate with ellipsis when single line (default: false, content wraps). */
  truncate?: boolean;
  className?: string;
}

/**
 * Content Cell component. For table/layout cells with richer or multi-line content.
 * All styling from design-tokens.scalar.ai.json. Theme: :root and [data-theme="dark"].
 */
export const ContentCell: React.FC<ContentCellProps> = ({
  children,
  avatar,
  align = 'left',
  size = 'm',
  variant = 'primary',
  bordered = true,
  truncate = false,
  className = '',
}) => {
  const typo = cellTypo(size);
  const textColor = variant === 'secondary' ? varOf('text-secondary') : varOf('text-primary');
  const hasAvatar = avatar != null;

  const cellStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: hasAvatar || truncate ? 'center' : 'flex-start',
    justifyContent: align === 'left' ? 'flex-start' : align === 'center' ? 'center' : 'flex-end',
    gap: hasAvatar ? spacingVar('s') : undefined,
    padding: `${spacingVar('s')} ${spacingVar('m')}`,
    minHeight: size === 's' ? 'var(--32)' : size === 'm' ? 'var(--40)' : 'var(--48)',
    borderBottom: bordered ? `1px solid ${varOf('stroke-disable')}` : undefined,
    fontFamily: 'var(--family-inter)',
    ...typo,
    fontWeight: 'var(--weight-regular)',
    letterSpacing: 'var(--letter-spacing-none)',
    color: textColor,
    minWidth: 0,
  };

  const innerStyle: React.CSSProperties = {
    minWidth: 0,
    ...(truncate || hasAvatar
      ? { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const }
      : {}),
  };

  return (
    <div
      className={`ai-content-cell ai-content-cell--${size} ai-content-cell--${align} ai-content-cell--${variant} ${hasAvatar ? 'ai-content-cell--with-avatar' : ''} ${bordered ? 'ai-content-cell--bordered' : ''} ${className}`}
      style={cellStyle}
    >
      {hasAvatar ? (
        <>
          <Avatar
            size="xs"
            src={avatar.src}
            name={avatar.name}
            alt={avatar.name}
          />
          <span style={innerStyle}>
            {avatar.name}
          </span>
        </>
      ) : (
        <span style={innerStyle}>
          {children}
        </span>
      )}
    </div>
  );
};

export default ContentCell;
