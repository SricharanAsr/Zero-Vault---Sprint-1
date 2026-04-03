import { logger } from './logger';

export class AppError extends Error {
  public readonly code: string;
  public readonly context?: string;

  constructor(message: string, code: string, context?: string) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.context = context;
  }
}

/**
 * Normalizes any unknown error into a string message.
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return 'An unknown error occurred';
}

/**
 * Handles an error by logging it and optionally re-throwing.
 */
export function handleError(
  error: unknown,
  context: string,
  rethrow = false
): void {
  const message = getErrorMessage(error);
  logger.error(context, message, error);
  if (rethrow) throw error;
}

export default handleError;
