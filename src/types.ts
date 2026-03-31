/**
 * Base configuration options for the masking process.
 */
export interface MaskOptions {
  /** Character used for masking (default: '*') */
  maskChar?: string;
  /** Number of characters to remain visible at the beginning */
  visibleChars?: number;
  /** If true, returns the original string without masking */
  viewable?: boolean;
}

/**
 * Domain masking modes for email addresses
 */
export type DomainMaskMode = boolean | "partial" | "full";

/**
 * Specific configuration for Email masking.
 */
export interface EmailOptions extends MaskOptions {
  /**
   * Domain masking mode:
   * - true / 'partial': Masks domain parts but keeps TLD visible (e.g., g****.com)
   * - 'full': Masks entire domain including TLD (e.g., *****.***)
   * - false: No domain masking
   * @default false
   */
  maskDomain?: DomainMaskMode;

  /**
   * Number of characters to remain visible at the end of username
   * @example maskEmail('ekaone3033@gmail.com', { visibleChars: 2, visibleCharsEnd: 2 })
   * // Returns: 'ek******33@gmail.com'
   */
  visibleCharsEnd?: number;

  /**
   * Mask based on percentage of username length (0-100)
   * Takes precedence over visibleChars if both are provided
   * @example maskEmail('username@test.com', { maskPercentage: 70 })
   * // Masks 70% of username, shows 30%
   */
  maskPercentage?: number;
}

/**
 * Result of email validation with optional masking
 */
export interface EmailValidationResult {
  /** Whether the email format is valid */
  valid: boolean;
  /** The original email address */
  original: string;
  /** Masked email (null if invalid) */
  masked: string | null;
  /** Error message if validation failed */
  error?: string;
}

/**
 * Options for email anonymization
 */
export interface AnonymizeOptions {
  /**
   * Prefix for anonymous email (default: 'user')
   * @example 'user_a1b2c3@*****.com'
   */
  prefix?: string;

  /**
   * Length of random identifier (default: 6)
   */
  idLength?: number;

  /**
   * Whether to mask the domain (default: true)
   */
  maskDomain?: boolean;
}
