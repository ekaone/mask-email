/**
 * Configuration options for email masking.
 */
export interface EmailOptions {
  /** Character used for masking (default: '*') */
  maskChar?: string;
  /** Number of characters to remain visible at the beginning (default: 2) */
  visibleChars?: number;
  /** If true, returns the original email without masking (default: false) */
  viewable?: boolean;
  /** If true, the domain part (after @) will also be masked (default: false) */
  maskDomain?: boolean;
}
