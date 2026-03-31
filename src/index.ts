/**
 * @file index.ts
 * @description Core entry point for @ekaone/mail-mask.
 * @author Eka Prasetia
 * @website https://prasetia.me
 * @license MIT
 */

export { maskEmail } from "./maskEmail";
export { maskEmailBatch } from "./maskEmailBatch";

// Validation functions
export { validateEmail, isValidEmail } from "./validateEmail";

// Anonymization functions
export { anonymizeEmail, anonymizeEmailBatch } from "./anonymizeEmail";

// Type exports
export type {
  MaskOptions,
  EmailOptions,
  DomainMaskMode,
  EmailValidationResult,
  AnonymizeOptions,
} from "./types";
