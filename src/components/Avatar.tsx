/**
 * Avatar — AI-generated component
 *
 * Source of truth (Figma):
 * https://www.figma.com/design/Z4MtKOfkNEzhMYJzN1q3kR/Scalar_Design_System-Components?node-id=66-11868&m=dev
 *
 * Logic (authoritative): ai-sources/Logic/avatar_logic_schema.md
 * - Rendering priority: image → initials → icon → anonymous. No visual collapse.
 * - Sizes: xs | sm | md | lg | xl (predefined enum only).
 * - Variants: user | organization | system | anonymous (token mapping only).
 * - Interaction: role="img" by default; role="button" + keyboard when onClick set.
 * - Accessibility: alt/aria-label per mode; full name in initials mode.
 *
 * Rules: public/AI-Rules.md
 * Tokens: design-tokens.scalar.ai.json (semantic tokens only; no hardcoded values)
 */

/**
 * Schema:
 * ../../logic/avatar-schema-logic.md
 *
 * This component MUST comply with the Standardized Component Schema.
 * The schema file is the authoritative contract.
 */

import React, { useState, useCallback } from 'react';

/** Semantic token names from design-tokens.scalar.ai.json */
type SemanticVar =
  | 'background-brand'
  | 'text-button-label'
  | 'stroke-disable';

function varOf(name: SemanticVar): string {
  return `var(--${name})`;
}

/** Size enum from avatar_logic_schema.md §3 — no numeric or arbitrary values */
export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/** Variant from avatar_logic_schema.md §6 — semantic meaning and token mapping only */
export type AvatarVariant = 'user' | 'organization' | 'system' | 'anonymous';

const sizeToPx = (size: AvatarSize): string =>
  size === 'xs' ? 'var(--20)' : size === 'sm' ? 'var(--24)' : size === 'md' ? 'var(--32)' : size === 'lg' ? 'var(--40)' : 'var(--48)';

/** Typography for initials — derived from size per schema §3 */
const sizeToFont = (size: AvatarSize) =>
  size === 'xs' || size === 'sm'
    ? { fontSize: 'var(--10)', lineHeight: 'var(--14)' }
    : size === 'md'
      ? { fontSize: 'var(--12)', lineHeight: 'var(--16)' }
      : size === 'lg'
        ? { fontSize: 'var(--14)', lineHeight: 'var(--20)' }
        : { fontSize: 'var(--16)', lineHeight: 'var(--24)' };

/** Icon font size derived from size per schema §3 */
const sizeToIconFont = (size: AvatarSize): string =>
  size === 'xs' ? 'var(--12)' : size === 'sm' ? 'var(--14)' : size === 'md' ? 'var(--18)' : size === 'lg' ? 'var(--22)' : 'var(--24)';

function getInitials(name: string | undefined): string {
  if (!name || !name.trim()) return '';
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

/** Resolved content mode per avatar_logic_schema.md §1 — priority: image → initials → icon → anonymous */
type AvatarContentMode = 'image' | 'initials' | 'icon' | 'anonymous';

export interface AvatarProps {
  /** Image URL. Fallback on load failure per schema §1, §8. */
  src?: string | null;
  /** Alt for image (meaningful or "" if decorative) — schema §7. */
  alt?: string;
  /** Display name: derives initials and provides aria-label in initials mode — schema §7. */
  name?: string;
  /** Explicit initials override; when set, used instead of deriving from name. */
  initials?: string;
  /** Material Symbol name for icon fallback — schema §5 (Figma MCP). */
  icon?: string;
  /** Size from predefined enum — schema §3. */
  size?: AvatarSize;
  /** Variant for semantic meaning and token mapping — schema §6. Anonymous when no identity data. */
  variant?: AvatarVariant;
  /** Optional border; uses semantic stroke. */
  bordered?: boolean;
  /** When set, Avatar is interactive: role="button", keyboard, focus — schema §4. */
  onClick?: () => void;
  /** When true, interaction disabled and aria-disabled — schema §4, §5. */
  disabled?: boolean;
  /** Accessible label when in icon or anonymous mode, or when decorative image — schema §7. */
  'aria-label'?: string;
  className?: string;
}

/**
 * Avatar component. Logic: ai-sources/Logic/avatar_logic_schema.md.
 * Styling from design-tokens.scalar.ai.json. Deterministic fallback; no layout shift.
 */
export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = '',
  name,
  initials: initialsProp,
  icon,
  size = 'md',
  variant: variantProp,
  bordered = false,
  onClick,
  disabled = false,
  'aria-label': ariaLabelProp,
  className = '',
}) => {
  const [imgFailed, setImgFailed] = useState(false);
  const onImgError = useCallback(() => setImgFailed(true), []);

  const showImage = Boolean(src && !imgFailed);
  const derivedInitials = getInitials(name);
  const initials = initialsProp !== undefined && initialsProp !== '' ? initialsProp : derivedInitials;
  const hasInitials = initials.length > 0;
  const hasIcon = Boolean(icon && icon.trim());
  const hasIdentity = showImage || hasInitials || hasIcon;

  // Content mode per schema §1 — strict priority
  const contentMode: AvatarContentMode = showImage
    ? 'image'
    : hasInitials
      ? 'initials'
      : hasIcon
        ? 'icon'
        : 'anonymous';

  // Variant: anonymous when no identity data — schema §6
  const variant: AvatarVariant = variantProp ?? (hasIdentity ? 'user' : 'anonymous');

  const dim = sizeToPx(size);
  const font = sizeToFont(size);
  const iconSize = sizeToIconFont(size);

  const interactive = Boolean(onClick && !disabled);

  const baseStyle: React.CSSProperties = {
    width: dim,
    height: dim,
    minWidth: dim,
    minHeight: dim,
    borderRadius: '50%',
    overflow: 'hidden',
    flexShrink: 0,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'var(--family-inter)',
    fontWeight: 'var(--weight-semi-bold)',
    letterSpacing: 'var(--letter-spacing-none)',
    fontSize: font.fontSize,
    lineHeight: font.lineHeight,
    backgroundColor: varOf('background-brand'),
    color: varOf('text-button-label'),
    border: bordered ? `1px solid ${varOf('stroke-disable')}` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    cursor: interactive ? 'pointer' : undefined,
    outline: 'none',
  };

  // Accessible label per schema §7 — persists across fallback states
  const ariaLabel =
    ariaLabelProp ??
    (contentMode === 'image' && (alt !== '' || name) ? (alt || name || undefined) : undefined) ??
    (contentMode === 'initials' && name ? name : undefined) ??
    (contentMode === 'icon' ? 'Avatar' : undefined) ??
    (contentMode === 'anonymous' ? 'Anonymous' : undefined) ??
    'Avatar';

  const content = (
    <>
      {contentMode === 'image' && src && (
        <img
          src={src}
          alt={alt}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          onError={onImgError}
        />
      )}
      {contentMode === 'initials' && <span aria-hidden style={{ userSelect: 'none' }}>{initials}</span>}
      {contentMode === 'icon' && icon && (
        <span className="material-symbols-outlined" aria-hidden style={{ fontSize: iconSize, userSelect: 'none' }}>
          {icon}
        </span>
      )}
      {contentMode === 'anonymous' && (
        <span className="material-symbols-outlined" aria-hidden style={{ fontSize: iconSize, userSelect: 'none' }}>
          person
        </span>
      )}
    </>
  );

  const commonProps = {
    className: `ai-avatar ai-avatar--${size} ai-avatar--${variant} ${bordered ? 'ai-avatar--bordered' : ''} ${className}`.trim(),
    style: baseStyle,
    'aria-label': ariaLabel,
    'aria-disabled': interactive ? disabled : undefined,
  };

  if (interactive) {
    return (
      <div
        role="button"
        tabIndex={0}
        {...commonProps}
        onClick={disabled ? undefined : onClick}
        onKeyDown={(e) => {
          if (disabled) return;
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.();
          }
        }}
      >
        {content}
      </div>
    );
  }

  return <div role="img" {...commonProps}>{content}</div>;
};

export default Avatar;
