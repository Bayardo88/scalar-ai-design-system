import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import type { ButtonSemanticVar } from '../useButtonTokens';

const REQUIRED: ButtonSemanticVar[] = [
  'background-brand',
  'background-hover',
  'background-pressed',
  'background-disable',
  'background-positive',
  'background-positive-hover',
  'background-positive-pressed',
  'background-negative',
  'background-negative-hover',
  'background-negative-pressed',
  'background-warning',
  'background-warning-hover',
  'background-warning-pressed',
  'text-button-label',
  'text-button-disable-label',
  'icon-brand',
  'icon-positive',
  'icon-negative',
  'icon-warning',
  'icon-disable',
];

function extractVarNamesFromCss(cssText: string, selector: string): Set<string> {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`${escaped}\\s*\\{([\\s\\S]*?)\\}(?=\\s*(?:[^{]|$))`, 'm');
  const match = cssText.match(re);
  if (!match) return new Set();
  const block = match[1];

  const vars = new Set<string>();
  const varRe = /--([a-z0-9-]+)\s*:/gi;
  let m: RegExpExecArray | null;
  while ((m = varRe.exec(block))) {
    vars.add(m[1]);
  }
  return vars;
}

describe('Button theme token mapping', () => {
  it('defines required Button semantic vars in :root and [data-theme="dark"]', () => {
    const cssPath = join(__dirname, '../../styles/tokens.css');
    const cssText = readFileSync(cssPath, 'utf-8');

    const lightVars = extractVarNamesFromCss(cssText, ':root');
    const darkVars = extractVarNamesFromCss(cssText, '[data-theme="dark"]');

    const missingLight = REQUIRED.filter((v) => !lightVars.has(v));
    const missingDark = REQUIRED.filter((v) => !darkVars.has(v));

    expect(missingLight, `Missing in :root: ${missingLight.join(', ')}`).toEqual([]);
    expect(missingDark, `Missing in [data-theme="dark"]: ${missingDark.join(', ')}`).toEqual([]);
  });
});
