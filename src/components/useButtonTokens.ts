import { useMemo } from 'react';

export type ButtonVariant = 'brand' | 'positive' | 'negative' | 'warning';

export type ButtonSemanticVar =
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
  | 'icon-positive'
  | 'icon-negative'
  | 'icon-warning'
  | 'icon-disable';

export type ButtonTokenBundle = Readonly<{
  bg: ButtonSemanticVar;
  bgHover: ButtonSemanticVar;
  bgPressed: ButtonSemanticVar;
  text: ButtonSemanticVar;
  textDisabled: ButtonSemanticVar;
  icon: ButtonSemanticVar;
  iconDisabled: ButtonSemanticVar;
}>;

export const varOf = (name: ButtonSemanticVar) => `var(--${name})`;

export function useButtonTokens(variant: ButtonVariant, disabledLike: boolean): ButtonTokenBundle {
  return useMemo(() => {
    if (disabledLike) {
      return {
        bg: 'background-disable',
        bgHover: 'background-disable',
        bgPressed: 'background-disable',
        text: 'text-button-disable-label',
        textDisabled: 'text-button-disable-label',
        icon: 'icon-disable',
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
          iconDisabled: 'icon-disable',
        };
    }
  }, [variant, disabledLike]);
}
