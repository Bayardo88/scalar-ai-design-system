/**
 * Picker — AI-generated component
 *
 * Source of truth (Figma):
 * https://www.figma.com/design/Z4MtKOfkNEzhMYJzN1q3kR/Scalar_Design_System-Components?node-id=164-2532&m=dev
 *
 * Dropdown to select multiple options (e.g. measurement dates). Controlled multi-select;
 * trigger shows selection summary; list shows options with checkboxes. Close on outside click.
 *
 * Rules: public/AI-Rules.md
 * Tokens: design-tokens.scalar.ai.json (semantic tokens only; no hardcoded values)
 */

/**
 * Schema:
 * ../../logic/picker-schema-logic.md
 *
 * This component MUST comply with the Standardized Component Schema.
 * The schema file is the authoritative contract.
 */

import React, { useState, useRef, useEffect } from 'react';
import { Checkbox } from './Checkbox';

/** Semantic token names from design-tokens.scalar.ai.json */
type SemanticVar =
  | 'background-page'
  | 'text-primary'
  | 'text-secondary'
  | 'stroke-brand'
  | 'stroke-disable'
  | 'background-hover';

function varOf(name: SemanticVar): string {
  return `var(--${name})`;
}

const spacingVar = (t: 'xs' | 's' | 'm' | 'l' | 'xl') =>
  `var(--${t === 'xs' ? '4' : t === 's' ? '8' : t === 'm' ? '16' : t === 'l' ? '24' : '32'})`;

const radiusVar = (t: 'xs' | 's' | 'm' | 'l' | 'xl') =>
  `var(--${t === 'xs' ? '4' : t === 's' ? '8' : t === 'm' ? '16' : t === 'l' ? '24' : '32'})`;

const labelSizeToVars = (size: 's' | 'm' | 'l') =>
  size === 's'
    ? { fontSize: 'var(--12)', lineHeight: 'var(--16)' }
    : size === 'm'
      ? { fontSize: 'var(--14)', lineHeight: 'var(--20)' }
      : { fontSize: 'var(--16)', lineHeight: 'var(--24)' };

export type PickerSize = 's' | 'm' | 'l';

export interface PickerOption {
  value: string;
  label: React.ReactNode;
}

export interface PickerProps {
  /** Currently selected option values (controlled). */
  value?: string[];
  /** Called when selection changes. */
  onChange?: (value: string[]) => void;
  /** Options (e.g. measurement dates). */
  options: PickerOption[];
  /** Placeholder when nothing selected. */
  placeholder?: string;
  /** Label when multiple selected (e.g. "3 dates selected"). */
  selectionSummary?: (count: number) => string;
  size?: PickerSize;
  disabled?: boolean;
  'aria-label'?: string;
  className?: string;
}

const defaultPlaceholder = 'Select…';
const defaultSummary = (n: number) => `${n} selected`;

/**
 * Picker component. Multi-select dropdown; styling from design-tokens.scalar.ai.json.
 * Icon: Material Symbols "expand_more". Theme: :root and [data-theme="dark"].
 */
export const Picker: React.FC<PickerProps> = ({
  value = [],
  onChange,
  options,
  placeholder = defaultPlaceholder,
  selectionSummary = defaultSummary,
  size = 'm',
  disabled = false,
  'aria-label': ariaLabel,
  className = '',
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, [open]);

  const selectedSet = new Set(value);
  const typo = labelSizeToVars(size);
  const paddingY = size === 's' ? 'xs' : 's';
  const paddingX = size === 's' ? 's' : size === 'm' ? 'm' : 'l';

  const displayLabel =
    value.length === 0
      ? placeholder
      : value.length === 1
        ? options.find((o) => o.value === value[0])?.label ?? value[0]
        : selectionSummary(value.length);

  const triggerStyle: React.CSSProperties = {
    fontFamily: 'var(--family-inter)',
    fontSize: typo.fontSize,
    lineHeight: typo.lineHeight,
    fontWeight: 'var(--weight-regular)',
    letterSpacing: 'var(--letter-spacing-none)',
    padding: `${spacingVar(paddingY as 'xs' | 's' | 'm' | 'l' | 'xl')} ${spacingVar(paddingX as 'xs' | 's' | 'm' | 'l' | 'xl')}`,
    borderRadius: radiusVar('m'),
    border: `1px solid ${varOf('stroke-disable')}`,
    backgroundColor: varOf('background-page'),
    color: varOf('text-primary'),
    cursor: disabled ? 'not-allowed' : 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacingVar('s'),
    outline: 'none',
    minHeight: size === 's' ? 'var(--32)' : size === 'm' ? 'var(--40)' : 'var(--48)',
    minWidth: size === 's' ? 'var(--80)' : size === 'm' ? 'var(--120)' : 'var(--160)',
  };

  const listStyle: React.CSSProperties = {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    marginTop: spacingVar('xs'),
    borderRadius: radiusVar('m'),
    border: `1px solid ${varOf('stroke-disable')}`,
    backgroundColor: varOf('background-page'),
    color: varOf('text-primary'),
    boxShadow: `0 ${spacingVar('s')} ${spacingVar('l')} var(--overlay-30-inverse)`,
    zIndex: 1000,
    maxHeight: 'var(--120)',
    overflowY: 'auto',
    listStyle: 'none',
    margin: 0,
    padding: spacingVar('xs'),
  };

  const toggleOption = (optValue: string) => {
    const next = selectedSet.has(optValue)
      ? value.filter((v) => v !== optValue)
      : [...value, optValue];
    onChange?.(next);
  };

  return (
    <div
      ref={ref}
      className={`ai-picker ai-picker--${size} ${disabled ? 'ai-picker--disabled' : ''} ${className}`}
      style={{ position: 'relative', display: 'inline-block' }}
    >
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel ?? (typeof displayLabel === 'string' ? displayLabel : 'Select options')}
        aria-disabled={disabled}
        disabled={disabled}
        style={triggerStyle}
        onClick={() => !disabled && setOpen((o) => !o)}
      >
        <span style={{ flex: 1, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
          {displayLabel}
        </span>
        <span
          className="material-symbols-outlined"
          aria-hidden
          style={{ color: 'var(--icon-brand)', fontSize: '1.25em', flexShrink: 0 }}
        >
          expand_more
        </span>
      </button>
      {open && !disabled && (
        <ul role="listbox" aria-multiselectable="true" style={listStyle}>
          {options.map((opt) => (
            <li
              key={opt.value}
              id={`picker-option-${opt.value}`}
              role="option"
              aria-selected={selectedSet.has(opt.value)}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => toggleOption(opt.value)}
              style={{
                margin: 0,
                border: 'none',
                background: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: spacingVar('s'),
                padding: spacingVar('s'),
                cursor: 'pointer',
                fontFamily: 'var(--family-inter)',
                fontSize: typo.fontSize,
                lineHeight: typo.lineHeight,
                color: varOf('text-primary'),
                borderRadius: radiusVar('xs'),
              }}
            >
              <Checkbox
                checked={selectedSet.has(opt.value)}
                onChange={() => toggleOption(opt.value)}
                size={size === 's' ? 's' : 'm'}
                aria-hidden
              />
              <span>{opt.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Picker;
