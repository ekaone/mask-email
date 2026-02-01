import { EmailOptions } from "./types";

/**
 * Masks an email address.
 * Example: 'ekaone3033@gmail.com' -> 'ek****@gmail.com'
 * @param email - The email string to be masked
 * @param options - Configuration options for masking
 * @returns The masked email string
 */
export const maskEmail = (
  email: string,
  options: EmailOptions = {},
): string => {
  const {
    maskChar = "*",
    visibleChars = 2,
    maskDomain = false,
    viewable = false,
  } = options;

  // Input validation
  if (!email || typeof email !== "string") return email;
  if (viewable) return email;

  const atIndex = email.lastIndexOf("@"); // Handle multiple @ symbols
  if (atIndex === -1) return email;

  const username = email.slice(0, atIndex);
  const domain = email.slice(atIndex + 1);

  // Handle very short usernames
  const actualVisibleChars = Math.min(visibleChars, username.length);
  const visiblePart = username.slice(0, actualVisibleChars);
  const maskedUsername =
    visiblePart +
    maskChar.repeat(Math.max(0, username.length - actualVisibleChars));

  // Enhanced domain masking for subdomains
  let finalDomain = domain;
  if (maskDomain) {
    const domainParts = domain.split(".");
    if (domainParts.length >= 2) {
      // Mask all parts except the TLD (last part)
      const maskedParts = domainParts
        .slice(0, -1)
        .map(
          (part) =>
            part.charAt(0) + maskChar.repeat(Math.max(0, part.length - 1)),
        );
      finalDomain = [...maskedParts, domainParts[domainParts.length - 1]].join(
        ".",
      );
    }
  }

  return `${maskedUsername}@${finalDomain}`;
};
