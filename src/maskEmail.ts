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
    visibleCharsEnd = 0,
    maskDomain = false,
    viewable = false,
    maskPercentage,
  } = options;

  const finalMaskChar =
    typeof maskChar === "string" && maskChar.length > 0 ? maskChar : "*";

  // Input validation
  if (!email || typeof email !== "string") return email;
  if (viewable) return email;

  const atIndex = email.lastIndexOf("@"); // Handle multiple @ symbols
  if (atIndex === -1) return email;

  const username = email.slice(0, atIndex);
  const domain = email.slice(atIndex + 1);

  // Calculate visible characters
  let startVisible = visibleChars;
  startVisible = Math.max(
    0,
    Math.floor(Number.isFinite(startVisible) ? startVisible : 0),
  );

  let endVisible = visibleCharsEnd;
  endVisible = Math.max(
    0,
    Math.floor(Number.isFinite(endVisible) ? endVisible : 0),
  );

  // Percentage-based masking takes precedence
  if (maskPercentage !== undefined) {
    const percentage = Math.max(0, Math.min(100, maskPercentage));
    const charsToShow = Math.ceil(username.length * (1 - percentage / 100));
    startVisible = Math.floor(charsToShow / 2);
    endVisible = charsToShow - startVisible;
  }

  // Handle very short usernames
  const actualStartVisible = Math.min(startVisible, username.length);
  const actualEndVisible = Math.min(
    endVisible,
    username.length - actualStartVisible,
  );

  // Build masked username
  const visibleStart = username.slice(0, actualStartVisible);
  const visibleEnd =
    actualEndVisible > 0 ? username.slice(-actualEndVisible) : "";
  const maskedLength = Math.max(
    0,
    username.length - actualStartVisible - actualEndVisible,
  );
  const maskedUsername =
    visibleStart + finalMaskChar.repeat(maskedLength) + visibleEnd;

  // Enhanced domain masking
  let finalDomain = domain;
  if (maskDomain) {
    const domainParts = domain.split(".");

    if (maskDomain === "full") {
      // Full domain masking - mask everything including TLD
      finalDomain = domainParts
        .map((part) => finalMaskChar.repeat(part.length))
        .join(".");
    } else if (domainParts.length >= 2) {
      // Partial masking - mask all parts except TLD (last part)
      const maskedParts = domainParts
        .slice(0, -1)
        .map(
          (part) =>
            part.charAt(0) + finalMaskChar.repeat(Math.max(0, part.length - 1)),
        );
      finalDomain = [...maskedParts, domainParts[domainParts.length - 1]].join(
        ".",
      );
    }
  }

  return `${maskedUsername}@${finalDomain}`;
};
