/**
 * Checkbox — AI-generated component
 *
 * Source of truth (Figma):
 * https://www.figma.com/design/Z4MtKOfkNEzhMYJzN1q3kR/Scalar_Design_System-Components?node-id=73-12236&m=dev
 *
 * Logic (authoritative): ai-sources/Logic/checkbox-schema-logic.md
 * - Binary/indeterminate selection only; no semantic variants; sizes s | m.
 * - States: default, hover, pressed, focus, disabled; selection: unchecked, checked, indeterminate.
 * - Native <input type="checkbox"> in DOM; Material Symbol "check" | "remove"; token-only styling.
 * When using or modifying Checkbox, follow the logic schema.
 *
 * Rules: public/AI-Rules.md
 * Tokens: design-tokens.scalar.ai.json (semantic tokens only; no hardcoded values)
 */

/**
 * Schema:
 * ../../logic/checkbox-schema-logic.md
 *
 * This component MUST comply with the Standardized Component Schema.
 * The schema file is the authoritative contract.
 */

import React, { useState, useRef } from 'react';

/** Semantic token names from design-tokens.scalar.ai.json */
type SemanticVar =
  | 'background-brand'
  | 'background-hover'
  | 'background-pressed'
  | 'background-disable'
  | 'text-button-label'
  | 'text-primary'
  | 'text-secondary'
  | 'text-button-disable-label'
  | 'stroke-brand'
  | 'stroke-hover'
  | 'stroke-pressed'
  | 'stroke-disable';

function varOf(name: SemanticVar): string {
  return `var(--${name})`;
}

/** Spacing tokens: xs, s, m, l, xl */
const spacingVar = (t: 'xs' | 's' | 'm' | 'l' | 'xl') =>
  `var(--${t === 'xs' ? '4' : t === 's' ? '8' : t === 'm' ? '16' : t === 'l' ? '24' : '32'})`;

/** Corner radius token */
const radiusVar = (t: 'xs' | 's' | 'm' | 'l' | 'xl') =>
  `var(--${t === 'xs' ? '4' : t === 's' ? '8' : t === 'm' ? '16' : t === 'l' ? '24' : '32'})`;

/** Box size from token scale */
const sizeToPx = (size: 's' | 'm') => (size === 's' ? 'var(--16)' : 'var(--20)');

/** Icon (check) size to match box */
const sizeToIconPx = (size: 's' | 'm') => (size === 's' ? 'var(--12)' : 'var(--14)');

export type CheckboxSize = 's' | 'm';

export interface CheckboxProps {
  /** Controlled checked state. */
  checked?: boolean;
  /** Default checked (uncontrolled). */
  defaultChecked?: boolean;
  /** Called when checked state changes. */
  onChange?: (checked: boolean) => void;
  /** Indeterminate state (e.g. "some selected"). */
  indeterminate?: boolean;
  disabled?: boolean;
  /** Optional label next to the checkbox. */
  label?: React.ReactNode;
  size?: CheckboxSize;
  /** Accessible name when label is not a string or is missing. */
  'aria-label'?: string;
  name?: string;
  value?: string;
  className?: string;
}

/**
 * Checkbox component. All styling from design-tokens.scalar.ai.json.
 * Checkmark uses Material Symbol "check" per AI-Rules. Theme: :root and [data-theme="dark"].
 */
export const Checkbox: React.FC<CheckboxProps> = ({
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  indeterminate = false,
  disabled = false,
  label,
  size = 'm',
  'aria-label': ariaLabel,
  name,
  value,
  className = '',
}) => {
  const [uncontrolledChecked, setUncontrolledChecked] = useState(defaultChecked);
  const inputRef = useRef<HTMLInputElement>(null);
  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : uncontrolledChecked;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.checked;
    if (!isControlled) setUncontrolledChecked(next);
    onChange?.(next);
  };

  React.useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  const boxSize = sizeToPx(size);
  const iconSize = sizeToIconPx(size);

  const borderColor = disabled
    ? varOf('stroke-disable')
    : checked || indeterminate
      ? varOf('stroke-brand')
      : varOf('stroke-brand');

  const bgColor = disabled
    ? varOf('background-disable')
    : checked && !indeterminate
      ? varOf('background-brand')
      : 'transparent';

  const checkColor = disabled
    ? varOf('text-button-disable-label')
    : varOf('text-button-label');

  const labelColor = disabled ? varOf('text-button-disable-label') : varOf('text-primary');
  const labelVars = {
    fontFamily: 'var(--family-inter)',
    fontSize: size === 's' ? 'var(--12)' : 'var(--14)',
    lineHeight: size === 's' ? 'var(--16)' : 'var(--20)',
    fontWeight: 'var(--weight-regular)',
    letterSpacing: 'var(--letter-spacing-none)',
    color: labelColor,
  };

  const id = React.useId();

  return (
    <label
      htmlFor={id}
      className={`ai-checkbox ai-checkbox--${size} ${disabled ? 'ai-checkbox--disabled' : ''} ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: spacingVar('s'),
        cursor: disabled ? 'not-allowed' : 'pointer',
        userSelect: 'none',
      }}
    >
      <input
        ref={inputRef}
        id={id}
        type="checkbox"
        name={name}
        value={value}
        checked={isControlled ? checked : undefined}
        defaultChecked={!isControlled ? defaultChecked : undefined}
        disabled={disabled}
        onChange={handleChange}
        aria-label={ariaLabel}
        aria-checked={indeterminate ? 'mixed' : checked}
        aria-disabled={disabled}
        style={{
          position: 'absolute',
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: 'hidden',
          clip: 'rect(0,0,0,0)',
          whiteSpace: 'nowrap',
          border: 0,
        }}
      />
      <span
        className="ai-checkbox__box"
        style={{
          width: boxSize,
          height: boxSize,
          minWidth: boxSize,
          minHeight: boxSize,
          borderRadius: radiusVar('xs'),
          border: `1px solid ${borderColor}`,
          backgroundColor: bgColor,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          transition: 'background-color 0.2s ease, border-color 0.2s ease',
        }}
        aria-hidden
      >
        {(checked || indeterminate) && (
          <span
            className="material-symbols-outlined"
            aria-hidden
            style={{
              fontSize: iconSize,
              width: iconSize,
              height: iconSize,
              color: checkColor,
            }}
          >
            {indeterminate ? 'remove' : 'check'}
          </span>
        )}
      </span>
      {label != null && (
        <span style={labelVars}>
          {label}
        </span>
      )}
    </label>
  );
};

export default Checkbox;
