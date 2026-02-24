/**
 * Button — AI-generated component
 *
 * Source of truth (Figma):
 * https://www.figma.com/design/Z4MtKOfkNEzhMYJzN1q3kR/Scalar_Design_System-Components?node-id=59-21923&m=dev
 *
 * Logic (authoritative): logic/button-schema-logic.md
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
import './Button.css';
import { useButtonTokens, varOf } from './useButtonTokens';
import type { ButtonVariant } from './useButtonTokens';

export type { ButtonVariant };

/** Spacing tokens: xs, s, m, l, xl → var(--4) … var(--32) */
const spacingVar = (t: 'xs' | 's' | 'm' | 'l' | 'xl') =>
  `var(--${t === 'xs' ? '4' : t === 's' ? '8' : t === 'm' ? '16' : t === 'l' ? '24' : '32'})`;

/** Corner radius token (e.g. rounded-m). */
const radiusVar = () => `var(--16)`;

export type ButtonSize = 's' | 'm' | 'l';

/**
 * Strict TS enforcement:
 * - If children is omitted (icon-only), aria-label MUST be provided.
 * - If children exists, aria-label remains optional.
 */
type ButtonBaseProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  iconLeft?: string;
  iconRight?: string;
};

type ButtonWithChildren = ButtonBaseProps & {
  children: React.ReactNode;
  'aria-label'?: string;
};

type ButtonIconOnly = ButtonBaseProps & {
  children?: undefined;
  iconLeft: string; // require at least one icon for icon-only
  'aria-label': string; // REQUIRED
};

export type ButtonProps = ButtonWithChildren | ButtonIconOnly;

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'brand',
  size = 'm',
  disabled = false,
  loading = false,
  iconLeft,
  iconRight,
  onClick,
  style,
  className,
  ...props
}) => {
  const disabledLike = disabled || loading;

  const tokens = useButtonTokens(variant, disabledLike);

  const typography =
    size === 's'
      ? { fontSize: 'var(--12)', lineHeight: 'var(--16)', minHeight: 'var(--24)' }
      : size === 'm'
        ? { fontSize: 'var(--14)', lineHeight: 'var(--20)', minHeight: 'var(--40)' }
        : { fontSize: 'var(--16)', lineHeight: 'var(--24)', minHeight: 'var(--48)' };

  const paddingX = size === 's' ? spacingVar('s') : size === 'm' ? spacingVar('m') : spacingVar('l');

  // Inline style sets semantic-driven values + internal hover/pressed vars used by stylesheet.
  const baseStyle: React.CSSProperties = {
    fontFamily: 'var(--family-inter)',
    fontWeight: 'var(--weight-semi-bold)',
    letterSpacing: 'var(--letter-spacing-none)',
    fontSize: typography.fontSize,
    lineHeight: typography.lineHeight,
    minHeight: typography.minHeight,
    padding: `0 ${paddingX}`,
    borderRadius: radiusVar(),
    backgroundColor: varOf(tokens.bg),
    color: disabledLike ? varOf(tokens.textDisabled) : varOf(tokens.text),
    cursor: disabledLike ? 'not-allowed' : 'pointer',
    gap: spacingVar('s'),

    // Internal runtime vars consumed by stylesheet state selectors:
    ['--_btn-bg-hover' as any]: varOf(tokens.bgHover),
    ['--_btn-bg-pressed' as any]: varOf(tokens.bgPressed),
    ['--_btn-outline' as any]: varOf(tokens.icon),

    ...style,
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabledLike) return;
    onClick?.(e);
  };

  return (
    <button
      type="button"
      className={[
        'ai-button-root',
        loading ? 'ai-button-loading' : '',
        className ?? '',
        `ai-button ai-button--${variant} ai-button--${size}`,
      ]
        .filter(Boolean)
        .join(' ')}
      style={baseStyle}
      disabled={disabledLike}
      aria-disabled={disabledLike}
      aria-busy={loading ? true : undefined}
      onClick={handleClick}
      {...props}
    >
      <span className={loading ? 'ai-button-content-hidden' : undefined}>
        {iconLeft && (
          <span className={`material-symbols-outlined ai-button-icon`} aria-hidden>
            {iconLeft}
          </span>
        )}

        {children}

        {iconRight && (
          <span className={`material-symbols-outlined ai-button-icon`} aria-hidden>
            {iconRight}
          </span>
        )}
      </span>

      {loading && (
        <span aria-hidden className="ai-button-spinner-overlay">
          <span className={`material-symbols-outlined ai-button-icon`}>progress_activity</span>
        </span>
      )}
    </button>
  );
};

export default Button;
