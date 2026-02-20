/**
 * ButtonIcon — AI-generated component
 *
 * Source of truth (Figma):
 * https://www.figma.com/design/Z4MtKOfkNEzhMYJzN1q3kR/Scalar_Design_System-Components?node-id=205-709&m=dev
 *
 * Logic (authoritative): ai-sources/Logic/buttonicon_logic_schema.md
 * - Controlled dropdown: value + onChange + options; no internal value state.
 * - Open/close: toggle on trigger click; close on outside click or option selection.
 * - Variants: brand | positive | negative | warning. Sizes: s | m | l. Styles: filled | outlined | minimal.
 * - Structure: div (relative) → button (trigger) + ul (listbox when open). Trailing icon: expand_more.
 *
 * Rules: public/AI-Rules.md
 * Tokens: design-tokens.scalar.ai.json (semantic tokens only; no hardcoded values)
 */

/**
 * Schema:
 * ../../logic/buttonicon-schema-logic.md
 *
 * This component MUST comply with the Standardized Component Schema.
 * The schema file is the authoritative contract.
 */

import React, { useState, useRef, useEffect } from 'react';

/** Semantic token names from design-tokens.scalar.ai.json (background, stroke, icon, text). */
type SemanticVar =
  | 'background-brand'
  | 'background-hover'
  | 'background-pressed'
  | 'background-disable'
  | 'background-positive'
  | 'background-positive-hover'
  | 'background-positive-pressed'
  | 'background-negative'
  | 'background-negative-hover'
  | 'background-negative-pressed'
  | 'background-warning'
  | 'background-warning-hover'
  | 'background-warning-pressed'
  | 'background-page'
  | 'text-primary'
  | 'text-button-label'
  | 'text-button-disable-label'
  | 'stroke-brand'
  | 'stroke-hover'
  | 'stroke-pressed'
  | 'stroke-disable'
  | 'stroke-positive'
  | 'stroke-positive-hover'
  | 'stroke-positive-pressed'
  | 'stroke-negative'
  | 'stroke-negative-hover'
  | 'stroke-negative-pressed'
  | 'stroke-warning'
  | 'stroke-warning-hover'
  | 'stroke-warning-pressed'
  | 'icon-brand'
  | 'icon-hover'
  | 'icon-pressed'
  | 'icon-disable'
  | 'icon-positive'
  | 'icon-positive-hover'
  | 'icon-positive-pressed'
  | 'icon-negative'
  | 'icon-negative-hover'
  | 'icon-negative-pressed'
  | 'icon-warning'
  | 'icon-warning-hover'
  | 'icon-warning-pressed';

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

export type ButtonIconVariant = 'brand' | 'positive' | 'negative' | 'warning';
export type ButtonIconSize = 's' | 'm' | 'l';
export type ButtonIconStyle = 'filled' | 'outlined' | 'minimal';

export interface ButtonIconOption {
  value: string;
  label: React.ReactNode;
}

export interface ButtonIconProps {
  /** Selected value (controlled). */
  value?: string;
  /** Called when selection changes. */
  onChange?: (value: string) => void;
  /** Options list. */
  options: ButtonIconOption[];
  /** Placeholder when nothing selected. */
  placeholder?: string;
  variant?: ButtonIconVariant;
  size?: ButtonIconSize;
  /** Visual style: filled, outlined, minimal. */
  style?: ButtonIconStyle;
  disabled?: boolean;
  /** Accessible label. */
  'aria-label'?: string;
  className?: string;
}

function getSemantic(
  variant: ButtonIconVariant,
  disabled: boolean
): {
  bg: SemanticVar;
  bgHover: SemanticVar;
  bgPressed: SemanticVar;
  stroke: SemanticVar;
  strokeHover: SemanticVar;
  strokePressed: SemanticVar;
  text: SemanticVar;
  textDisabled: SemanticVar;
  icon: SemanticVar;
  iconHover: SemanticVar;
  iconPressed: SemanticVar;
  iconDisabled: SemanticVar;
} {
  if (disabled) {
    return {
      bg: 'background-disable',
      bgHover: 'background-disable',
      bgPressed: 'background-disable',
      stroke: 'stroke-disable',
      strokeHover: 'stroke-disable',
      strokePressed: 'stroke-disable',
      text: 'text-button-disable-label',
      textDisabled: 'text-button-disable-label',
      icon: 'icon-disable',
      iconHover: 'icon-disable',
      iconPressed: 'icon-disable',
      iconDisabled: 'icon-disable',
    };
  }
  switch (variant) {
    case 'positive':
      return {
        bg: 'background-positive',
        bgHover: 'background-positive-hover',
        bgPressed: 'background-positive-pressed',
        stroke: 'stroke-positive',
        strokeHover: 'stroke-positive-hover',
        strokePressed: 'stroke-positive-pressed',
        text: 'text-button-label',
        textDisabled: 'text-button-disable-label',
        icon: 'icon-positive',
        iconHover: 'icon-positive-hover',
        iconPressed: 'icon-positive-pressed',
        iconDisabled: 'icon-disable',
      };
    case 'negative':
      return {
        bg: 'background-negative',
        bgHover: 'background-negative-hover',
        bgPressed: 'background-negative-pressed',
        stroke: 'stroke-negative',
        strokeHover: 'stroke-negative-hover',
        strokePressed: 'stroke-negative-pressed',
        text: 'text-button-label',
        textDisabled: 'text-button-disable-label',
        icon: 'icon-negative',
        iconHover: 'icon-negative-hover',
        iconPressed: 'icon-negative-pressed',
        iconDisabled: 'icon-disable',
      };
    case 'warning':
      return {
        bg: 'background-warning',
        bgHover: 'background-warning-hover',
        bgPressed: 'background-warning-pressed',
        stroke: 'stroke-warning',
        strokeHover: 'stroke-warning-hover',
        strokePressed: 'stroke-warning-pressed',
        text: 'text-button-label',
        textDisabled: 'text-button-disable-label',
        icon: 'icon-warning',
        iconHover: 'icon-warning-hover',
        iconPressed: 'icon-warning-pressed',
        iconDisabled: 'icon-disable',
      };
    default:
      return {
        bg: 'background-brand',
        bgHover: 'background-hover',
        bgPressed: 'background-pressed',
        stroke: 'stroke-brand',
        strokeHover: 'stroke-hover',
        strokePressed: 'stroke-pressed',
        text: 'text-button-label',
        textDisabled: 'text-button-disable-label',
        icon: 'icon-brand',
        iconHover: 'icon-hover',
        iconPressed: 'icon-pressed',
        iconDisabled: 'icon-disable',
      };
  }
}

/**
 * Button Icon component. All styling from design-tokens.scalar.ai.json via CSS variables.
 * Theme: :root and [data-theme="dark"] must define semantic variables.
 * Icon: Material Symbols "expand_more" per AI-Rules.
 */
export const ButtonIcon: React.FC<ButtonIconProps> = ({
  value,
  onChange,
  options,
  placeholder = 'Select…',
  variant = 'brand',
  size = 'm',
  style: buttonIconStyle = 'filled',
  disabled = false,
  'aria-label': ariaLabel,
  className = '',
}) => {
  const [open, setOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, [open]);

  const s = getSemantic(variant, disabled);
  const typo = labelSizeToVars(size);
  const paddingY = size === 's' ? 'xs' : 's';
  const paddingX = size === 's' ? 's' : size === 'm' ? 'm' : 'l';

  const selectedOption = options.find((o) => o.value === value);
  const displayLabel = selectedOption ? selectedOption.label : placeholder;

  const bg =
    buttonIconStyle === 'filled'
      ? isPressed
        ? varOf(s.bgPressed)
        : isHover && !disabled
          ? varOf(s.bgHover)
          : varOf(s.bg)
      : buttonIconStyle === 'outlined'
        ? 'transparent'
        : 'transparent';

  const borderColor =
    buttonIconStyle === 'outlined' || buttonIconStyle === 'minimal'
      ? isPressed
        ? varOf(s.strokePressed)
        : isHover && !disabled
          ? varOf(s.strokeHover)
          : varOf(s.stroke)
      : 'transparent';

  const triggerStyle: React.CSSProperties = {
    fontFamily: 'var(--family-inter)',
    fontSize: typo.fontSize,
    lineHeight: typo.lineHeight,
    fontWeight: 'var(--weight-semi-bold)',
    letterSpacing: 'var(--letter-spacing-none)',
    padding: `${spacingVar(paddingY as 'xs' | 's' | 'm' | 'l' | 'xl')} ${spacingVar(paddingX as 'xs' | 's' | 'm' | 'l' | 'xl')}`,
    borderRadius: radiusVar('m'),
    border: buttonIconStyle === 'minimal' ? '1px solid transparent' : `1px solid ${borderColor}`,
    backgroundColor: bg,
    color: disabled ? varOf(s.textDisabled) : varOf(s.text),
    cursor: disabled ? 'not-allowed' : 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacingVar('s'),
    outline: 'none',
    transition: 'background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease',
    minHeight: size === 's' ? 'var(--24)' : size === 'm' ? 'var(--40)' : 'var(--48)',
    minWidth: size === 's' ? 'var(--64)' : size === 'm' ? 'var(--96)' : 'var(--128)',
  };

  const iconColor = disabled ? varOf(s.iconDisabled) : isPressed ? varOf(s.iconPressed) : isHover ? varOf(s.iconHover) : varOf(s.icon);

  const listStyle: React.CSSProperties = {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    marginTop: spacingVar('xs'),
    borderRadius: radiusVar('m'),
    border: `1px solid ${varOf(s.stroke)}`,
    backgroundColor: 'var(--background-page)',
    color: 'var(--text-primary)',
    boxShadow: `0 ${spacingVar('s')} ${spacingVar('l')} var(--overlay-30-inverse)`,
    zIndex: 1000,
    maxHeight: 'var(--120)',
    overflowY: 'auto',
  };

  const optionStyle: React.CSSProperties = {
    fontFamily: 'var(--family-inter)',
    fontSize: typo.fontSize,
    lineHeight: typo.lineHeight,
    padding: `${spacingVar('s')} ${spacingVar(paddingX as 'xs' | 's' | 'm' | 'l' | 'xl')}`,
    cursor: disabled ? 'not-allowed' : 'pointer',
    border: 'none',
    background: 'none',
    width: '100%',
    textAlign: 'left',
    color: 'var(--text-primary)',
  };

  return (
    <div
      ref={ref}
      className={`ai-button-icon ai-button-icon--${variant} ai-button-icon--${size} ai-button-icon--${buttonIconStyle} ${disabled ? 'ai-button-icon--disabled' : ''} ${className}`}
      style={{ position: 'relative', display: 'inline-block' }}
    >
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel ?? (typeof displayLabel === 'string' ? displayLabel : 'Select option')}
        aria-disabled={disabled}
        disabled={disabled}
        style={triggerStyle}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => {
          setIsHover(false);
          setIsPressed(false);
        }}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onClick={() => !disabled && setOpen((o) => !o)}
      >
        <span style={{ flex: 1, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{displayLabel}</span>
        <span className="material-symbols-outlined" aria-hidden style={{ color: iconColor, fontSize: '1.25em', flexShrink: 0 }}>
          expand_more
        </span>
      </button>
      {open && !disabled && (
        <ul
          role="listbox"
          aria-activedescendant={value ? `option-${value}` : undefined}
          style={listStyle}
        >
          {options.map((opt) => (
            <li
              key={opt.value}
              id={`option-${opt.value}`}
              role="option"
              aria-selected={value === opt.value}
              style={{
                ...optionStyle,
                backgroundColor: value === opt.value ? varOf(s.bgHover) : undefined,
              }}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                onChange?.(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ButtonIcon;
