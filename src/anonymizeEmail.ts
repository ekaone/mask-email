import { AnonymizeOptions } from "./types";

/**
 * Generates a random alphanumeric string.
 * @param length - Length of the random string
 * @returns Random string
 */
function generateRandomId(length: number): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Anonymizes an email address by replacing the username with a random identifier.
 *
 * @example
 * ```typescript
 * anonymizeEmail('john.doe@company.com');
 * // Returns: 'user_a1b2c3@*****.com'
 *
 * anonymizeEmail('admin@example.com', { prefix: 'anon', idLength: 8 });
 * // Returns: 'anon_x7y2k9m4@*******.com'
 *
 * anonymizeEmail('test@mail.google.com', { maskDomain: false });
 * // Returns: 'user_h3j5k2@mail.google.com'
 * ```
 *
 * @param email - The email address to anonymize
 * @param options - Anonymization options
 * @returns Anonymized email address
 */
export const anonymizeEmail = (
  email: string,
  options: AnonymizeOptions = {},
): string => {
  const { prefix = "user", idLength = 6, maskDomain = true } = options;

  // Input validation
  if (!email || typeof email !== "string") return email;

  const atIndex = email.lastIndexOf("@");
  if (atIndex === -1) return email;

  const domain = email.slice(atIndex + 1);
  const randomId = generateRandomId(idLength);
  const anonymousUsername = `${prefix}_${randomId}`;

  // Handle domain masking
  let finalDomain = domain;
  if (maskDomain) {
    const domainParts = domain.split(".");
    if (domainParts.length >= 2) {
      // Mask all parts except TLD
      const maskedParts = domainParts
        .slice(0, -1)
        .map((part) => "*".repeat(part.length));
      finalDomain = [...maskedParts, domainParts[domainParts.length - 1]].join(
        ".",
      );
    }
  }

  return `${anonymousUsername}@${finalDomain}`;
};

/**
 * Batch anonymize multiple email addresses.
 *
 * @example
 * ```typescript
 * anonymizeEmailBatch(['user1@test.com', 'user2@test.com']);
 * // Returns: ['user_a1b2c3@****.com', 'user_x7y8z9@****.com']
 * ```
 *
 * @param emails - Array of email addresses to anonymize
 * @param options - Anonymization options (applied to all emails)
 * @returns Array of anonymized email addresses
 */
export const anonymizeEmailBatch = (
  emails: string[],
  options?: AnonymizeOptions,
): string[] => {
  return emails.map((email) => anonymizeEmail(email, options));
};
