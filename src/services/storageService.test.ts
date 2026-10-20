import { describe, it, expect } from 'vitest';
import { sanitizeAnswers } from './storageService';

describe('sanitizeAnswers', () => {
  it('returns an empty profile for corrupt values instead of crashing', () => {
    expect(sanitizeAnswers(null)).toEqual({});
    expect(sanitizeAnswers('oops')).toEqual({});
    expect(sanitizeAnswers([1, 2, 3])).toEqual({});
  });

  it('keeps valid fields and drops unknown or out-of-range ones', () => {
    const clean = sanitizeAnswers({
      age: 42,
      gender: 'female',
      occupation: 'farmer',
      annualIncomeBracket: 'not-a-bracket',
      landholding: 7,
      injected: '<img src=x onerror=alert(1)>'
    });
    expect(clean).toEqual({ age: 42, gender: 'female', occupation: 'farmer' });
  });

  it('rejects impossible ages', () => {
    expect(sanitizeAnswers({ age: -5 })).toEqual({});
    expect(sanitizeAnswers({ age: 999 })).toEqual({});
    expect(sanitizeAnswers({ age: 4.5 })).toEqual({});
  });
});
