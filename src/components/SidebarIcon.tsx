/**
 * Sidebar Icon — AI-generated component
 *
 * Source of truth (Figma):
 * https://www.figma.com/design/Z4MtKOfkNEzhMYJzN1q3kR/Scalar_Design_System-Components?node-id=1-49231&m=dev
 *
 * Use this component for all sidebar icons. Pass the Material Symbol name via the `icon` prop
 * to change the icon per context (e.g. home, settings, menu, dashboard).
 *
 * Rules: public/AI-Rules.md
 * Tokens: design-tokens.scalar.ai.json (semantic tokens only; no hardcoded values)
 */

/**
 * Schema:
 * ../../logic/sidebaricon-schema-logic.md
 *
 * This component MUST comply with the Standardized Component Schema.
 * The schema file is the authoritative contract.
 */

import React, { useState } from 'react';

/** Semantic token names from design-tokens.scalar.ai.json */
type SemanticVar =
  | 'icon-brand'
  | 'icon-hover'
  | 'icon-pressed'
  | 'icon-disable'
  | 'text-secondary'
  | 'background-hover'
  | 'background-pressed';

function varOf(name: SemanticVar): string {
  return `var(--${name})`;
}

/** Spacing tokens: xs, s, m, l, xl */
const spacingVar = (t: 'xs' | 's' | 'm' | 'l' | 'xl') =>
  `var(--${t === 'xs' ? '4' : t === 's' ? '8' : t === 'm' ? '16' : t === 'l' ? '24' : '32'})`;

/** Corner radius token */
const radiusVar = (t: 'xs' | 's' | 'm' | 'l' | 'xl') =>
  `var(--${t === 'xs' ? '4' : t === 's' ? '8' : t === 'm' ? '16' : t === 'l' ? '24' : '32'})`;

/** Icon size from token scale (glyph size, not hit area) */
const sizeToIconPx = (size: 's' | 'm' | 'l') =>
  size === 's' ? 'var(--20)' : size === 'm' ? 'var(--24)' : 'var(--32)';

export type SidebarIconSize = 's' | 'm' | 'l';

export interface SidebarIconProps {
  /** Material Symbol name (e.g. "home", "settings", "menu", "dashboard"). AI-Rules: use Material Symbols only. */
  icon: string;
  /** Selected/active state (e.g. current nav item). */
  active?: boolean;
  disabled?: boolean;
  size?: SidebarIconSize;
  /** Accessible label for the icon button. */
  'aria-label': string;
  onClick?: () => void;
  className?: string;
}

/**
 * Sidebar icon component. All sidebar icons should use this; change the icon via the `icon` prop.
 * Styling from design-tokens.scalar.ai.json. Theme: :root and [data-theme="dark"] must define semantic variables.
 */
export const SidebarIcon: React.FC<SidebarIconProps> = ({
  icon,
  active = false,
  disabled = false,
  size = 'm',
  'aria-label': ariaLabel,
  onClick,
  className = '',
}) => {
  const [isHover, setIsHover] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const iconSize = sizeToIconPx(size);
  const hitArea = size === 's' ? 'var(--32)' : size === 'm' ? 'var(--40)' : 'var(--48)';

  const iconColor = disabled
    ? varOf('icon-disable')
    : active
      ? isPressed
        ? varOf('icon-pressed')
        : isHover
          ? varOf('icon-hover')
          : varOf('icon-brand')
      : isPressed
        ? varOf('icon-pressed')
        : isHover
          ? varOf('icon-hover')
          : varOf('text-secondary');

  const bgColor =
    !disabled && (isHover || isPressed)
      ? isPressed
        ? varOf('background-pressed')
        : varOf('background-hover')
      : 'transparent';

  const buttonStyle: React.CSSProperties = {
    width: hitArea,
    height: hitArea,
    padding: 0,
    border: 'none',
    borderRadius: radiusVar('s'),
    background: bgColor,
    color: iconColor,
    cursor: disabled ? 'not-allowed' : 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    outline: 'none',
    transition: 'background-color 0.2s ease, color 0.2s ease',
  };

  return (
    <button
      type="button"
      className={`ai-sidebar-icon ai-sidebar-icon--${size} ${active ? 'ai-sidebar-icon--active' : ''} ${disabled ? 'ai-sidebar-icon--disabled' : ''} ${className}`}
      style={buttonStyle}
      aria-label={ariaLabel}
      aria-current={active ? 'page' : undefined}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => {
        setIsHover(false);
        setIsPressed(false);
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
    >
      <span
        className="material-symbols-outlined"
        aria-hidden
        style={{ fontSize: iconSize, width: iconSize, height: iconSize }}
      >
        {icon}
      </span>
    </button>
  );
};

export default SidebarIcon;
