/**
 * Returns the URL only if it is a plain https:// link, otherwise undefined.
 * Links rendered from stored or imported data go through this so a tampered
 * record can never inject a `javascript:` or `data:` URL into an <a href>.
 */
export function safeExternalUrl(url: unknown): string | undefined {
  if (typeof url !== 'string') return undefined;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' ? parsed.href : undefined;
  } catch {
    return undefined;
  }
}

/** Keeps only digits, +, - and spaces so a tel: link cannot carry anything else. */
export function safeTelHref(phone: unknown): string | undefined {
  if (typeof phone !== 'string') return undefined;
  const cleaned = phone.split('/')[0].replace(/[^\d+\- ]/g, '').trim();
  return cleaned ? `tel:${cleaned.replace(/[\s-]/g, '')}` : undefined;
}
