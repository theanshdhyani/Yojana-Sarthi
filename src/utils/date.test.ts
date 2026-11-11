import { describe, it, expect } from 'vitest';
import { todayISO } from './date';

describe('todayISO', () => {
  it('uses the local calendar date, not UTC', () => {
    expect(todayISO(new Date(2026, 0, 5, 1, 30))).toBe('2026-01-05');
    expect(todayISO(new Date(2026, 11, 31, 23, 59))).toBe('2026-12-31');
  });
});
