/**
 * Horizontal Menu Item — AI-generated component
 *
 * Source of truth (Figma):
 * https://www.figma.com/design/Z4MtKOfkNEzhMYJzN1q3kR/Scalar_Design_System-Components?node-id=121-2963&m=dev
 *
 * Single item for horizontal nav/tabs. Optional icon; active state uses brand token.
 *
 * Rules: public/AI-Rules.md
 * Tokens: design-tokens.scalar.ai.json (semantic tokens only; no hardcoded values)
 */

/**
 * Schema:
 * ../../logic/horizontalmenuitem-schema-logic.md
 *
 * This component MUST comply with the Standardized Component Schema.
 * The schema file is the authoritative contract.
 */

import React from 'react';

/** Semantic token names from design-tokens.scalar.ai.json */
type SemanticVar =
  | 'text-primary'
  | 'text-brand'
  | 'background-hover'
  | 'stroke-brand'
  | 'stroke-disable'
  | 'icon-brand';

function varOf(name: SemanticVar): string {
  return `var(--${name})`;
}

/** Spacing tokens: xs, s, m, l, xl */
const spacingVar = (t: 'xs' | 's' | 'm' | 'l' | 'xl') =>
  `var(--${t === 'xs' ? '4' : t === 's' ? '8' : t === 'm' ? '16' : t === 'l' ? '24' : '32'})`;

/** Label typography from tokens.primitiveType by size (semi-bold for nav). */
const labelTypo = (size: 's' | 'm' | 'l') =>
  size === 's'
    ? { fontSize: 'var(--12)', lineHeight: 'var(--16)', fontWeight: 'var(--weight-semi-bold)' as const }
    : size === 'm'
      ? { fontSize: 'var(--14)', lineHeight: 'var(--20)', fontWeight: 'var(--weight-semi-bold)' as const }
      : { fontSize: 'var(--16)', lineHeight: 'var(--24)', fontWeight: 'var(--weight-semi-bold)' as const };

const iconSizeFor = (size: 's' | 'm' | 'l') =>
  size === 's' ? 'var(--16)' : size === 'm' ? 'var(--18)' : 'var(--20)';

export type HorizontalMenuItemSize = 's' | 'm' | 'l';

export interface HorizontalMenuItemProps {
  /** Item label. */
  children: React.ReactNode;
  /** Whether this item is the current/active selection. */
  active?: boolean;
  /** Size for typography and padding. */
  size?: HorizontalMenuItemSize;
  /** Optional Material Symbol name (leading icon). */
  icon?: string;
  /** Click handler; when set, item is interactive. */
  onClick?: () => void;
  /** When true, item is not clickable and uses disabled styling. */
  disabled?: boolean;
  /** Show bottom border as active indicator (when active). */
  activeIndicator?: 'underline' | 'none';
  className?: string;
}

/**
 * Horizontal Menu Item. For use in horizontal nav bars or tabs.
 * All styling from design-tokens.scalar.ai.json. Theme: :root and [data-theme="dark"].
 */
export const HorizontalMenuItem: React.FC<HorizontalMenuItemProps> = ({
  children,
  active = false,
  size = 'm',
  icon,
  onClick,
  disabled = false,
  activeIndicator = 'underline',
  className = '',
}) => {
  const typo = labelTypo(size);
  const interactive = Boolean(onClick && !disabled);

  const rootStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacingVar('s'),
    padding: `${spacingVar('s')} ${spacingVar('m')}`,
    minHeight: size === 's' ? 'var(--32)' : size === 'm' ? 'var(--40)' : 'var(--48)',
    fontFamily: 'var(--family-inter)',
    ...typo,
    letterSpacing: 'var(--letter-spacing-none)',
    color: active ? varOf('text-brand') : varOf('text-primary'),
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom:
      active && activeIndicator === 'underline'
        ? `var(--2) solid ${varOf('stroke-brand')}`
        : 'var(--2) solid transparent',
    cursor: interactive ? 'pointer' : disabled ? 'not-allowed' : undefined,
    outline: 'none',
    transition: 'color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease',
    opacity: disabled ? 0.6 : 1,
  };

  return (
    <>
      <style>{`
        .ai-horizontal-menu-item[role="button"]:hover:not(.ai-horizontal-menu-item--disabled) { background-color: ${varOf('background-hover')} !important; }
        .ai-horizontal-menu-item[role="button"]:active:not(.ai-horizontal-menu-item--disabled) { background-color: ${varOf('background-hover')} !important; }
        .ai-horizontal-menu-item .material-symbols-outlined { color: inherit; flex-shrink: 0; }
      `}</style>
      <div
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        className={`ai-horizontal-menu-item ai-horizontal-menu-item--${size} ${active ? 'ai-horizontal-menu-item--active' : ''} ${disabled ? 'ai-horizontal-menu-item--disabled' : ''} ${className}`.trim()}
        style={rootStyle}
        onClick={disabled ? undefined : onClick}
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
        aria-current={active ? 'page' : undefined}
        aria-disabled={disabled}
      >
        {icon && (
          <span
            className="material-symbols-outlined"
            aria-hidden
            style={{ fontSize: iconSizeFor(size) }}
          >
            {icon}
          </span>
        )}
        <span style={{ minWidth: 0 }}>{children}</span>
      </div>
    </>
  );
};

export default HorizontalMenuItem;
