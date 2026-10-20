import { describe, it, expect } from 'vitest';
import { safeExternalUrl, safeTelHref } from './safeUrl';

describe('safeExternalUrl', () => {
  it('allows https links', () => {
    expect(safeExternalUrl('https://pmkisan.gov.in')).toBe('https://pmkisan.gov.in/');
  });

  it.each(['javascript:alert(1)', 'JaVaScRiPt:alert(1)', 'data:text/html,<script>', 'http://example.com', '', null, 42])(
    'rejects %s',
    (url) => {
      expect(safeExternalUrl(url)).toBeUndefined();
    }
  );
});

describe('safeTelHref', () => {
  it('uses the first number of a list and strips separators', () => {
    expect(safeTelHref('155261 / 011-24300606')).toBe('tel:155261');
    expect(safeTelHref('1800-111-565')).toBe('tel:1800111565');
  });

  it('strips anything that is not part of a phone number', () => {
    expect(safeTelHref('1930"><script>')).toBe('tel:1930');
    expect(safeTelHref('abc')).toBeUndefined();
  });
});
