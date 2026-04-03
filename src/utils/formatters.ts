/**
 * Formatting utilities for Zero-Vault.
 */

/**
 * Formats a date to a human-readable string.
 */
export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options,
  });
}

/**
 * Returns a relative time string, e.g. "2 days ago".
 */
export function timeAgo(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const seconds = Math.floor((Date.now() - d.getTime()) / 1000);
  const intervals: [number, string][] = [
    [31536000, 'year'],
    [2592000, 'month'],
    [86400, 'day'],
    [3600, 'hour'],
    [60, 'minute'],
    [1, 'second'],
  ];
  for (const [divisor, unit] of intervals) {
    const count = Math.floor(seconds / divisor);
    if (count >= 1) return `${count} ${unit}${count !== 1 ? 's' : ''} ago`;
  }
  return 'just now';
}

/**
 * Masks a password for display (e.g., "••••••••").
 */
export function maskPassword(password: string): string {
  return '•'.repeat(Math.min(password.length, 12));
}

/**
 * Truncates a string to a given length, appending "...".
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + '...';
}
