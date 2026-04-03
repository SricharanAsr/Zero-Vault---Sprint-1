import { describe, it, expect } from 'vitest';
import { formatDate, maskPassword, truncate } from '../formatters';

describe('formatters', () => {
  describe('formatDate', () => {
    it('formats a date correctly', () => {
      const date = new Date('2024-01-01');
      expect(formatDate(date)).toBe('Jan 1, 2024');
    });
  });

  describe('maskPassword', () => {
    it('masks a password with bullet points', () => {
      expect(maskPassword('password123')).toBe('•••••••••••');
    });

    it('limits mask length to 12', () => {
      expect(maskPassword('verylongpasswordthatkeepgoing')).toBe('••••••••••••');
    });
  });

  describe('truncate', () => {
    it('truncates long strings', () => {
      expect(truncate('this is a very long string indeed', 10)).toBe('this is...');
    });

    it('does not truncate short strings', () => {
      expect(truncate('short', 10)).toBe('short');
    });
  });
});
