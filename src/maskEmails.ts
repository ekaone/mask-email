import type { EmailOptions } from "./types";
import { maskEmail } from "./maskEmail";

/**
 * Batch Masking
 * Masks an array of email addresses with the same options.
 * @param emails - Array of email strings to be masked
 * @param options - Configuration options for masking (applied to all emails)
 * @returns Array of masked email strings
 */
export const maskEmails = (
  emails: string[],
  options?: EmailOptions,
): string[] => {
  return emails.map((email) => maskEmail(email, options));
};
