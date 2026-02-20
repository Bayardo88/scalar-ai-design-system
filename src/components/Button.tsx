/**
 * Button — AI-generated component
 *
 * Source of truth (Figma):
 * https://www.figma.com/design/Z4MtKOfkNEzhMYJzN1q3kR/Scalar_Design_System-Components?node-id=59-21923&m=dev
 *
 * Logic (authoritative): ai-sources/Logic/button_logic_schema.md
 * - One action per activation; no internal state or business logic.
 * - Structure: label (or icon-only with aria-label) + optional leading/trailing icon + optional loading.
 * - Variants/sizes: predefined enum only; fallback variant=brand (primary), size=m (md).
 * - Disabled/loading: suppress onClick, aria-disabled / aria-busy; preserve layout.
 *
 * Rules: public/AI-Rules.md
 * Tokens: design-tokens.scalar.ai.json (semantic tokens only; no hardcoded values)
 */

/**
 * Schema:
 * ../../logic/button-schema-logic.md
 *
 * This component MUST comply with the Standardized Component Schema.
 * The schema file is the authoritative contract.
 */

import React from 'react';

/** Token-driven styles. All values are CSS variables from design-tokens.scalar.ai.json. */
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
  | 'text-button-label'
  | 'text-button-disable-label'
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

/** Spacing tokens: xs, s, m, l, xl → var(--4) … var(--32) */
const spacingVar = (t: 'xs' | 's' | 'm' | 'l' | 'xl') => `var(--${t === 'xs' ? '4' : t === 's' ? '8' : t === 'm' ? '16' : t === 'l' ? '24' : '32'})`;

/** Corner radius token (e.g. rounded-m). */
const radiusVar = (t: 'xs' | 's' | 'm' | 'l' | 'xl') => `var(--${t === 'xs' ? '4' : t === 's' ? '8' : t === 'm' ? '16' : t === 'l' ? '24' : '32'})`;

/** Typography: label-s, label-m, label-l from tokens.primitiveType (size-*, line-height-*). */
const labelSizeToVars = (size: 's' | 'm' | 'l') =>
  size === 's'
    ? { fontSize: 'var(--12)', lineHeight: 'var(--16)' }
    : size === 'm'
      ? { fontSize: 'var(--14)', lineHeight: 'var(--20)' }
      : { fontSize: 'var(--16)', lineHeight: 'var(--24)' };

export type ButtonVariant = 'brand' | 'positive' | 'negative' | 'warning';
export type ButtonSize = 's' | 'm' | 'l';

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Label (required unless icon-only with aria-label) — button_logic_schema §2. */
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  /** When true, suppresses interaction and sets aria-busy; preserves width — button_logic_schema §5, §7. */
  loading?: boolean;
  /** Material Symbol name (AI-Rules: use Material Symbols only). */
  iconLeft?: string;
  iconRight?: string;
}

/**
 * Button component. All styling comes from design-tokens.scalar.ai.json via CSS variables.
 * Theme: :root (light) and [data-theme="dark"] must define semantic variables.
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'brand',
  size = 'm',
  disabled = false,
  loading = false,
  iconLeft,
  iconRight,
  style,
  onClick,
  ...props
}) => {
  const effectivelyDisabled = disabled || loading;

  const semantic = (): {
    bg: SemanticVar;
    bgHover: SemanticVar;
    bgPressed: SemanticVar;
    text: SemanticVar;
    textDisabled: SemanticVar;
    icon: SemanticVar;
    iconHover: SemanticVar;
    iconPressed: SemanticVar;
    iconDisabled: SemanticVar;
  } => {
    if (effectivelyDisabled) {
      return {
        bg: 'background-disable',
        bgHover: 'background-disable',
        bgPressed: 'background-disable',
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
          text: 'text-button-label',
          textDisabled: 'text-button-disable-label',
          icon: 'icon-brand',
          iconHover: 'icon-hover',
          iconPressed: 'icon-pressed',
          iconDisabled: 'icon-disable',
        };
    }
  };

  const s = semantic();
  const typo = labelSizeToVars(size);
  const paddingY = size === 's' ? 'xs' : 's';
  const paddingX = size === 's' ? 's' : size === 'm' ? 'm' : 'l';

  const baseStyle: React.CSSProperties = {
    fontFamily: 'var(--family-inter)',
    fontSize: typo.fontSize,
    lineHeight: typo.lineHeight,
    fontWeight: 'var(--weight-semi-bold)',
    letterSpacing: 'var(--letter-spacing-none)',
    padding: `${spacingVar(paddingY as 'xs' | 's' | 'm' | 'l' | 'xl')} ${spacingVar(paddingX as 'xs' | 's' | 'm' | 'l' | 'xl')}`,
    borderRadius: radiusVar('m'),
    border: 'none',
    backgroundColor: varOf(s.bg),
    color: effectivelyDisabled ? varOf(s.textDisabled) : varOf(s.text),
    cursor: effectivelyDisabled ? 'not-allowed' : 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacingVar('s'),
    outline: 'none',
    transition: 'background-color 0.2s ease, color 0.2s ease',
    minHeight: size === 's' ? 'var(--24)' : size === 'm' ? 'var(--40)' : 'var(--48)',
    position: 'relative',
    ...style,
  };

  const className = `ai-button ai-button--${variant} ai-button--${size} ${effectivelyDisabled ? 'ai-button--disabled' : ''} ${loading ? 'ai-button--loading' : ''}`;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (effectivelyDisabled) return;
    onClick?.(e);
  };

  return (
    <>
      <style>{`
        .ai-button:hover:not(:disabled):not(.ai-button--loading) { background-color: ${varOf(s.bgHover)} !important; color: ${varOf(s.text)} !important; }
        .ai-button:active:not(:disabled):not(.ai-button--loading) { background-color: ${varOf(s.bgPressed)} !important; color: ${varOf(s.text)} !important; }
        .ai-button .material-symbols-outlined { color: inherit; font-size: inherit; }
      `}</style>
      <button
        type="button"
        className={className}
        disabled={effectivelyDisabled}
        style={baseStyle}
        aria-disabled={effectivelyDisabled}
        aria-busy={loading ? true : undefined}
        onClick={handleClick}
        {...props}
      >
        <span style={loading ? { visibility: 'hidden' as const } : undefined}>
          {iconLeft && (
            <span className="material-symbols-outlined" aria-hidden style={{ fontSize: '1em' }}>
              {iconLeft}
            </span>
          )}
          {children}
          {iconRight && (
            <span className="material-symbols-outlined" aria-hidden style={{ fontSize: '1em' }}>
              {iconRight}
            </span>
          )}
        </span>
        {loading && (
          <span
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '1em' }}>
              progress_activity
            </span>
          </span>
        )}
      </button>
    </>
  );
};

export default Button;
