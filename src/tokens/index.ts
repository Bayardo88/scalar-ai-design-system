/**
 * @scalar/design-system tokens
 * Import: import tokens from '@scalar/design-system/tokens'
 */

import designTokens from "./design-tokens.scalar.ai.json";

export const tokens = designTokens as {
  meta?: { name?: string; version?: string };
  tokens?: Record<string, unknown>;
  tailwind?: unknown;
  cssVariables?: unknown;
  react?: unknown;
};

export default tokens;
