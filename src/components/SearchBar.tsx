/**
 * Search Bar — AI-generated component
 *
 * Source of truth (Figma):
 * https://www.figma.com/design/Z4MtKOfkNEzhMYJzN1q3kR/Scalar_Design_System-Components?node-id=224-2785&m=dev
 *
 * Rules: public/AI-Rules.md
 * Tokens: design-tokens.scalar.ai.json (semantic tokens only; no hardcoded values)
 */

/**
 * Schema:
 * ../../logic/searchbar-schema-logic.md
 *
 * This component MUST comply with the Standardized Component Schema.
 * The schema file is the authoritative contract.
 */

import React from 'react';

/** Semantic token names from design-tokens.scalar.ai.json */
type SemanticVar =
  | 'text-primary'
  | 'text-tertiary'
  | 'stroke-disable'
  | 'stroke-brand'
  | 'background-page'
  | 'icon-disable';

function varOf(name: SemanticVar): string {
  return `var(--${name})`;
}

/** Spacing tokens: xs, s, m, l, xl */
const spacingVar = (t: 'xs' | 's' | 'm' | 'l' | 'xl') =>
  `var(--${t === 'xs' ? '4' : t === 's' ? '8' : t === 'm' ? '16' : t === 'l' ? '24' : '32'})`;

/** Corner radius token */
const radiusVar = (t: 'xs' | 's' | 'm' | 'l' | 'xl') =>
  `var(--${t === 'xs' ? '4' : t === 's' ? '8' : t === 'm' ? '16' : t === 'l' ? '24' : '32'})`;

/** Input typography: text-m-regular from tokens */
const inputTypo = {
  fontSize: 'var(--14)',
  lineHeight: 'var(--20)',
  fontWeight: 'var(--weight-regular)',
  letterSpacing: 'var(--letter-spacing-none)',
} as const;

export type SearchBarSize = 's' | 'm' | 'l';

export interface SearchBarProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Placeholder text. */
  placeholder?: string;
  /** Controlled value. */
  value?: string;
  /** Change handler. */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Size for padding and icon. */
  size?: SearchBarSize;
  /** Optional class for the wrapper. */
  className?: string;
  /** Optional style for the wrapper. */
  style?: React.CSSProperties;
}

/**
 * Search bar component. All styling from design-tokens.scalar.ai.json via CSS variables.
 * Uses Material Symbol "search" (AI-Rules). Theme-aware via semantic tokens.
 */
export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search…',
  value,
  onChange,
  size = 'm',
  className = '',
  style,
  disabled = false,
  ...inputProps
}) => {
  const paddingY = size === 's' ? 'xs' : size === 'm' ? 's' : 'm';
  const paddingX = size === 's' ? 's' : 'm';
  const iconSize = size === 's' ? 'var(--18)' : size === 'm' ? 'var(--20)' : 'var(--24)';

  const wrapperStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacingVar('s'),
    paddingLeft: spacingVar(paddingX as 'xs' | 's' | 'm' | 'l' | 'xl'),
    paddingRight: spacingVar(paddingX as 'xs' | 's' | 'm' | 'l' | 'xl'),
    paddingTop: spacingVar(paddingY as 'xs' | 's' | 'm' | 'l' | 'xl'),
    paddingBottom: spacingVar(paddingY as 'xs' | 's' | 'm' | 'l' | 'xl'),
    backgroundColor: varOf('background-page'),
    border: `1px solid ${varOf('stroke-disable')}`,
    borderRadius: radiusVar('m'),
    minHeight: size === 's' ? 'var(--32)' : size === 'm' ? 'var(--40)' : 'var(--48)',
    transition: 'border-color 0.2s ease',
    ...style,
  };

  const inputStyle: React.CSSProperties = {
    flex: 1,
    minWidth: 0,
    border: 'none',
    background: 'transparent',
    outline: 'none',
    fontFamily: 'var(--family-inter)',
    color: varOf('text-primary'),
    ...inputTypo,
  };

  return (
    <>
      <style>{`
        .ai-search-bar:focus-within {
          border-color: ${varOf('stroke-brand')} !important;
        }
        .ai-search-bar input::placeholder {
          color: ${varOf('text-tertiary')};
        }
        .ai-search-bar input:disabled {
          cursor: not-allowed;
          color: ${varOf('text-tertiary')};
        }
        .ai-search-bar .material-symbols-outlined {
          color: ${varOf('icon-disable')};
          font-size: ${iconSize};
          flex-shrink: 0;
        }
        .ai-search-bar:focus-within .material-symbols-outlined {
          color: ${varOf('stroke-brand')};
        }
      `}</style>
      <div
        className={`ai-search-bar ${className}`}
        style={wrapperStyle}
        role="search"
      >
        <span className="material-symbols-outlined" aria-hidden>
          search
        </span>
        <input
          type="search"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          style={inputStyle}
          aria-label={typeof placeholder === 'string' ? placeholder : 'Search'}
          {...inputProps}
        />
      </div>
    </>
  );
};

export default SearchBar;
