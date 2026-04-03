/**
 * Logger utility - provides consistent structured logging for Zero-Vault.
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const isDev = import.meta.env.DEV;

function formatMessage(level: LogLevel, context: string, message: string): string {
  const timestamp = new Date().toISOString();
  return `[${timestamp}] [${level.toUpperCase()}] [${context}] ${message}`;
}

export const logger = {
  debug(context: string, message: string, data?: unknown): void {
    if (isDev) {
      console.debug(formatMessage('debug', context, message), data ?? '');
    }
  },

  info(context: string, message: string, data?: unknown): void {
    console.info(formatMessage('info', context, message), data ?? '');
  },

  warn(context: string, message: string, data?: unknown): void {
    console.warn(formatMessage('warn', context, message), data ?? '');
  },

  error(context: string, message: string, error?: unknown): void {
    console.error(formatMessage('error', context, message), error ?? '');
  },
};

export default logger;
