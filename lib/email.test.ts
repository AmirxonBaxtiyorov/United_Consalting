import { describe, it, expect } from 'vitest';
import { escapeHtml } from './email';

describe('escapeHtml', () => {
  it('escapes &, <, >, " and \'', () => {
    expect(escapeHtml('a & b')).toBe('a &amp; b');
    expect(escapeHtml('<script>')).toBe('&lt;script&gt;');
    expect(escapeHtml('she said "hi"')).toBe('she said &quot;hi&quot;');
    expect(escapeHtml("o'clock")).toBe('o&#39;clock');
  });

  it('handles empty string', () => {
    expect(escapeHtml('')).toBe('');
  });

  it('does not double-escape already-escaped entities', () => {
    expect(escapeHtml('&amp;')).toBe('&amp;amp;');
  });

  it('escapes the script-injection vector', () => {
    const dirty = '<img src=x onerror="alert(1)">';
    const clean = escapeHtml(dirty);
    expect(clean).not.toContain('<');
    expect(clean).not.toContain('"');
  });
});
