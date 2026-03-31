import { EmailOptions, EmailValidationResult } from "./types";
import { maskEmail } from "./maskEmail";

/**
 * Validates an email address and optionally masks it.
 *
 * @example
 * ```typescript
 * validateEmail('test@example.com');
 * // Returns: { valid: true, original: 'test@example.com', masked: 'te**@example.com' }
 *
 * validateEmail('invalid-email');
 * // Returns: { valid: false, original: 'invalid-email', masked: null, error: 'Invalid email format' }
 * ```
 *
 * @param email - The email string to validate
 * @param options - Optional masking options (applied if email is valid)
 * @returns Validation result with masked email if valid
 */
export const validateEmail = (
  email: string,
  options?: EmailOptions,
): EmailValidationResult => {
  // Basic validation checks
  if (!email || typeof email !== "string") {
    return {
      valid: false,
      original: email || "",
      masked: null,
      error: "Email is required",
    };
  }

  // Check for basic structure before regex
  const atIndex = email.indexOf("@");
  if (atIndex === -1) {
    return {
      valid: false,
      original: email,
      masked: null,
      error: "Invalid email format",
    };
  }

  const username = email.slice(0, atIndex);
  const domain = email.slice(atIndex + 1);

  // Check for empty username
  if (username.length === 0) {
    return {
      valid: false,
      original: email,
      masked: null,
      error: "Username cannot be empty",
    };
  }

  // Check for empty domain or missing dot in domain
  if (domain.length === 0 || !domain.includes(".")) {
    return {
      valid: false,
      original: email,
      masked: null,
      error: "Invalid domain",
    };
  }

  // RFC 5322 simplified email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return {
      valid: false,
      original: email,
      masked: null,
      error: "Invalid email format",
    };
  }

  // Email is valid - mask it
  const masked = maskEmail(email, options);

  return {
    valid: true,
    original: email,
    masked,
  };
};

/**
 * Quick email validation without masking.
 *
 * @example
 * ```typescript
 * isValidEmail('test@example.com'); // true
 * isValidEmail('invalid'); // false
 * ```
 *
 * @param email - The email string to validate
 * @returns true if valid, false otherwise
 */
export const isValidEmail = (email: string): boolean => {
  return validateEmail(email).valid;
};
