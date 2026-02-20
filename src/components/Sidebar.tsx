/**
 * Sidebar — AI-generated component
 *
 * Source of truth (Figma):
 * https://www.figma.com/design/Z4MtKOfkNEzhMYJzN1q3kR/Scalar_Design_System-Components?node-id=66-11894&m=dev
 *
 * Contains SidebarIcon for each nav item. Use the same Sidebar component and pass
 * items with different icons/labels per context.
 *
 * Rules: public/AI-Rules.md
 * Tokens: design-tokens.scalar.ai.json (semantic tokens only; no hardcoded values)
 */

/**
 * Schema:
 * ../../logic/sidebar-schema-logic.md
 *
 * This component MUST comply with the Standardized Component Schema.
 * The schema file is the authoritative contract.
 */

import React from 'react';
import { SidebarIcon, type SidebarIconSize } from './SidebarIcon';

/** Semantic token names from design-tokens.scalar.ai.json */
type SemanticVar =
  | 'background-page'
  | 'text-primary'
  | 'text-secondary'
  | 'stroke-disable';

function varOf(name: SemanticVar): string {
  return `var(--${name})`;
}

/** Spacing tokens: xs, s, m, l, xl */
const spacingVar = (t: 'xs' | 's' | 'm' | 'l' | 'xl') =>
  `var(--${t === 'xs' ? '4' : t === 's' ? '8' : t === 'm' ? '16' : t === 'l' ? '24' : '32'})`;

/** Typography from tokens.primitiveType */
const labelVars = {
  fontSize: 'var(--14)',
  lineHeight: 'var(--20)',
  fontWeight: 'var(--weight-semi-bold)',
  letterSpacing: 'var(--letter-spacing-none)',
};

export interface SidebarItem {
  /** Unique key for the item. */
  id: string;
  /** Material Symbol name (e.g. "home", "dashboard", "settings"). */
  icon: string;
  /** Optional label shown next to the icon. */
  label?: React.ReactNode;
  /** Whether this item is the current page/selection. */
  active?: boolean;
  disabled?: boolean;
  /** Called when the icon is activated. */
  onClick?: () => void;
}

export interface SidebarProps {
  /** Nav items; each uses SidebarIcon with the given icon and state. */
  items: SidebarItem[];
  /** Icon size for all items. */
  iconSize?: SidebarIconSize;
  /** Optional width of the sidebar (token or CSS length). */
  width?: string;
  className?: string;
}

/**
 * Sidebar component. Renders a vertical nav using SidebarIcon for each item.
 * All styling from design-tokens.scalar.ai.json. Theme: :root and [data-theme="dark"].
 */
export const Sidebar: React.FC<SidebarProps> = ({
  items,
  iconSize = 'm',
  width,
  className = '',
}) => {
  const containerStyle: React.CSSProperties = {
    backgroundColor: varOf('background-page'),
    borderRight: `1px solid ${varOf('stroke-disable')}`,
    padding: spacingVar('s'),
    display: 'flex',
    flexDirection: 'column',
    gap: spacingVar('xs'),
    minHeight: '100%',
    width: width ?? 'auto',
    boxSizing: 'border-box',
  };

  const itemRowStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacingVar('s'),
    minHeight: 'var(--40)',
  };

  const labelStyle = (active: boolean): React.CSSProperties => ({
    fontFamily: 'var(--family-inter)',
    ...labelVars,
    color: active ? varOf('text-primary') : varOf('text-secondary'),
    flex: 1,
    textAlign: 'left',
  });

  return (
    <nav
      className={`ai-sidebar ${className}`}
      style={containerStyle}
      aria-label="Sidebar"
    >
      {items.map((item) => (
        <div
          key={item.id}
          className={`ai-sidebar__item ${item.active ? 'ai-sidebar__item--active' : ''}`}
          style={itemRowStyle}
        >
          <SidebarIcon
            icon={item.icon}
            active={item.active}
            disabled={item.disabled}
            size={iconSize}
            aria-label={item.label != null && typeof item.label === 'string' ? item.label : item.id}
            onClick={item.onClick}
          />
          {item.label != null && (
            <span style={labelStyle(Boolean(item.active))} aria-hidden>
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Sidebar;
