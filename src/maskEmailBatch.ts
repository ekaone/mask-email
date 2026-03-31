import type { EmailOptions } from "./types";
import { maskEmail } from "./maskEmail";

/**
 * Masks multiple email addresses with the same options.
 *
 * @example
 * ```typescript
 * maskEmailBatch(['user1@test.com', 'user2@test.com'], { visibleChars: 3 });
 * // Returns: ['use**@test.com', 'use**@test.com']
 * ```
 *
 * @param emails - Array of email strings to be masked
 * @param options - Configuration options for masking (applied to all emails)
 * @returns Array of masked email strings
 */
export const maskEmailBatch = (
  emails: string[],
  options?: EmailOptions,
): string[] => {
  return emails.map((email) => maskEmail(email, options));
};
