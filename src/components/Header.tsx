/**
 * Header — AI-generated component
 *
 * Source of truth (Figma):
 * https://www.figma.com/design/Z4MtKOfkNEzhMYJzN1q3kR/Scalar_Design_System-Components?node-id=164-2562&m=dev
 *
 * Composes: HorizontalMenuItem (nav/tabs), Picker (e.g. measurement dates), InformationLabel (helper text).
 * Layout: top row = menu items (left) + picker (right); optional info label below.
 *
 * Rules: public/AI-Rules.md
 * Tokens: design-tokens.scalar.ai.json (semantic tokens only; no hardcoded values)
 */

/**
 * Schema:
 * ../../logic/header-schema-logic.md
 *
 * This component MUST comply with the Standardized Component Schema.
 * The schema file is the authoritative contract.
 */

import React from 'react';
import { HorizontalMenuItem } from './HorizontalMenuItem';
import { Picker } from './Picker';
import { InformationLabel } from './InformationLabel';
import type { PickerOption } from './Picker';

/** Semantic token names from design-tokens.scalar.ai.json */
type SemanticVar = 'background-page' | 'stroke-disable';

function varOf(name: SemanticVar): string {
  return `var(--${name})`;
}

const spacingVar = (t: 'xs' | 's' | 'm' | 'l' | 'xl') =>
  `var(--${t === 'xs' ? '4' : t === 's' ? '8' : t === 'm' ? '16' : t === 'l' ? '24' : '32'})`;

export type HeaderSize = 's' | 'm' | 'l';

export interface HeaderMenuItem {
  id: string;
  label: React.ReactNode;
  active?: boolean;
  icon?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export interface HeaderPickerConfig {
  value: string[];
  onChange: (value: string[]) => void;
  options: PickerOption[];
  placeholder?: string;
  selectionSummary?: (count: number) => string;
  'aria-label'?: string;
}

export interface HeaderProps {
  /** Nav/tab items (rendered as HorizontalMenuItem). */
  menuItems: HeaderMenuItem[];
  /** Picker config (e.g. measurement dates). Omit to hide picker. */
  picker?: HeaderPickerConfig;
  /** Optional info text (rendered as InformationLabel below the main row). */
  informationLabel?: React.ReactNode;
  /** Size passed to menu items, picker, and info label. */
  size?: HeaderSize;
  /** Show bottom border on header. */
  bordered?: boolean;
  className?: string;
}

/**
 * Header component. Composes HorizontalMenuItem, Picker, and InformationLabel.
 * All styling from design-tokens.scalar.ai.json. Theme: :root and [data-theme="dark"].
 */
export const Header: React.FC<HeaderProps> = ({
  menuItems,
  picker,
  informationLabel,
  size = 'm',
  bordered = true,
  className = '',
}) => {
  const headerStyle: React.CSSProperties = {
    backgroundColor: varOf('background-page'),
    borderBottom: bordered ? `1px solid ${varOf('stroke-disable')}` : undefined,
    padding: spacingVar('m'),
  };

  const rowStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacingVar('m'),
    flexWrap: 'wrap',
  };

  const navStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 0,
    flexWrap: 'wrap',
  };

  return (
    <header
      className={`ai-header ai-header--${size} ${className}`.trim()}
      style={headerStyle}
      role="banner"
    >
      <div style={rowStyle}>
        <nav style={navStyle} aria-label="Main navigation">
          {menuItems.map((item) => (
            <HorizontalMenuItem
              key={item.id}
              active={item.active}
              size={size}
              icon={item.icon}
              onClick={item.onClick}
              disabled={item.disabled}
            >
              {item.label}
            </HorizontalMenuItem>
          ))}
        </nav>
        {picker && (
          <Picker
            value={picker.value}
            onChange={picker.onChange}
            options={picker.options}
            placeholder={picker.placeholder}
            selectionSummary={picker.selectionSummary}
            size={size}
            aria-label={picker['aria-label']}
          />
        )}
      </div>
      {informationLabel != null && (
        <div style={{ marginTop: spacingVar('s') }}>
          <InformationLabel size={size} variant="secondary">
            {informationLabel}
          </InformationLabel>
        </div>
      )}
    </header>
  );
};

export default Header;
