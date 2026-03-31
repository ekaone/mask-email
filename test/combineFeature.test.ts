import { describe, it, expect } from "vitest";
import {
  maskEmail,
  maskEmailBatch,
  validateEmail,
  isValidEmail,
  anonymizeEmail,
  anonymizeEmailBatch,
} from "../src/index";

describe("Feature 1: Preserve Last Characters", () => {
  it("should preserve characters at the end of username", () => {
    const result = maskEmail("ekaone3033@gmail.com", {
      visibleChars: 2,
      visibleCharsEnd: 2,
    });
    expect(result).toBe("ek******33@gmail.com");
  });

  it("should handle equal start and end visible chars", () => {
    const result = maskEmail("johndoe@test.com", {
      visibleChars: 2,
      visibleCharsEnd: 2,
    });
    expect(result).toBe("jo***oe@test.com");
  });

  it("should handle only end visible chars", () => {
    const result = maskEmail("username@test.com", {
      visibleChars: 0,
      visibleCharsEnd: 3,
    });
    expect(result).toBe("*****ame@test.com");
  });

  it("should handle more visible chars than username length", () => {
    const result = maskEmail("ab@test.com", {
      visibleChars: 1,
      visibleCharsEnd: 5,
    });
    expect(result).toBe("ab@test.com");
  });
});

describe("Feature 2: Email Anonymization", () => {
  it("should anonymize email with default options", () => {
    const result = anonymizeEmail("john.doe@company.com");
    expect(result).toMatch(/^user_[a-z0-9]{6}@\*+\.com$/);
  });

  it("should use custom prefix", () => {
    const result = anonymizeEmail("admin@example.com", { prefix: "anon" });
    expect(result).toMatch(/^anon_[a-z0-9]{6}@\*+\.com$/);
  });

  it("should use custom id length", () => {
    const result = anonymizeEmail("test@test.com", { idLength: 10 });
    expect(result).toMatch(/^user_[a-z0-9]{10}@\*+\.com$/);
  });

  it("should not mask domain when maskDomain is false", () => {
    const result = anonymizeEmail("user@mail.google.com", {
      maskDomain: false,
    });
    expect(result).toMatch(/^user_[a-z0-9]{6}@mail\.google\.com$/);
  });

  it("should handle batch anonymization", () => {
    const emails = ["user1@test.com", "user2@test.com"];
    const results = anonymizeEmailBatch(emails);
    expect(results).toHaveLength(2);
    results.forEach((result) => {
      expect(result).toMatch(/^user_[a-z0-9]{6}@\*+\.com$/);
    });
  });

  it("should generate different ids for each call", () => {
    const result1 = anonymizeEmail("test@test.com");
    const result2 = anonymizeEmail("test@test.com");
    expect(result1).not.toBe(result2);
  });
});

describe("Feature 3: Email Validation", () => {
  it("should validate correct email", () => {
    const result = validateEmail("test@example.com");
    expect(result.valid).toBe(true);
    expect(result.original).toBe("test@example.com");
    expect(result.masked).toBe("te**@example.com");
    expect(result.error).toBeUndefined();
  });

  it("should validate correct email with custom options", () => {
    const result = validateEmail("user@test.com", { visibleChars: 3 });
    expect(result.valid).toBe(true);
    expect(result.masked).toBe("use*@test.com");
  });

  it("should reject invalid email (no @)", () => {
    const result = validateEmail("invalid-email");
    expect(result.valid).toBe(false);
    expect(result.masked).toBe(null);
    expect(result.error).toBe("Invalid email format");
  });

  it("should reject invalid email (no domain)", () => {
    const result = validateEmail("user@");
    expect(result.valid).toBe(false);
    expect(result.masked).toBe(null);
    expect(result.error).toBe("Invalid domain");
  });

  it("should reject empty email", () => {
    const result = validateEmail("");
    expect(result.valid).toBe(false);
    expect(result.masked).toBe(null);
    expect(result.error).toBe("Email is required");
  });

  it("should reject email with no username", () => {
    const result = validateEmail("@example.com");
    expect(result.valid).toBe(false);
    expect(result.masked).toBe(null);
  });

  it("isValidEmail should return boolean", () => {
    expect(isValidEmail("test@example.com")).toBe(true);
    expect(isValidEmail("invalid")).toBe(false);
    expect(isValidEmail("")).toBe(false);
  });
});

describe("Feature 4: Percentage-Based Masking", () => {
  it("should mask 50% of username", () => {
    const result = maskEmail("username@test.com", { maskPercentage: 50 });
    expect(result).toBe("use*****@test.com");
  });

  it("should mask 70% of username", () => {
    const result = maskEmail("ekaone3033@gmail.com", { maskPercentage: 70 });
    expect(result).toBe("eka*******@gmail.com");
  });

  it("should mask 90% of username", () => {
    const result = maskEmail("johndoe@example.com", { maskPercentage: 90 });
    expect(result).toBe("j******@example.com");
  });

  it("should mask 0% (show all)", () => {
    const result = maskEmail("test@test.com", { maskPercentage: 0 });
    expect(result).toBe("test@test.com");
  });

  it("should mask 100% (hide all)", () => {
    const result = maskEmail("test@test.com", { maskPercentage: 100 });
    expect(result).toBe("****@test.com");
  });

  it("should handle percentage with maskDomain", () => {
    const result = maskEmail("user@gmail.com", {
      maskPercentage: 50,
      maskDomain: true,
    });
    expect(result).toBe("us**@g****.com");
  });

  it("maskPercentage should take precedence over visibleChars", () => {
    const result = maskEmail("username@test.com", {
      visibleChars: 5,
      maskPercentage: 50,
    });
    // Should use percentage, not visibleChars
    expect(result).toBe("use*****@test.com");
  });
});

describe("Feature 5: Partial Domain Masking (Full Mode)", () => {
  it("should fully mask domain including TLD", () => {
    const result = maskEmail("user@gmail.com", { maskDomain: "full" });
    expect(result).toBe("us**@*****.***");
  });

  it("should fully mask subdomain", () => {
    const result = maskEmail("admin@mail.google.com", { maskDomain: "full" });
    expect(result).toBe("ad***@****.******.***");
  });

  it("should partially mask domain (default true)", () => {
    const result = maskEmail("user@gmail.com", { maskDomain: true });
    expect(result).toBe("us**@g****.com");
  });

  it("should partially mask subdomain", () => {
    const result = maskEmail("user@mail.google.com", { maskDomain: true });
    expect(result).toBe("us**@m***.g*****.com");
  });

  it("should not mask domain when false", () => {
    const result = maskEmail("user@gmail.com", { maskDomain: false });
    expect(result).toBe("us**@gmail.com");
  });

  it("should fully mask with custom mask char", () => {
    const result = maskEmail("test@test.com", {
      maskDomain: "full",
      maskChar: "#",
    });
    expect(result).toBe("te##@####.###");
  });
});

describe("maskEmailBatch - Batch Processing", () => {
  it("should mask multiple emails with same options", () => {
    const emails = ["user1@test.com", "user2@example.com", "admin@site.com"];
    const results = maskEmailBatch(emails, { visibleChars: 3 });
    expect(results).toEqual([
      "use**@test.com",
      "use**@example.com",
      "adm**@site.com",
    ]);
  });

  it("should handle empty array", () => {
    const results = maskEmailBatch([]);
    expect(results).toEqual([]);
  });

  it("should handle batch with percentage masking", () => {
    const emails = ["test@test.com", "user@test.com"];
    const results = maskEmailBatch(emails, { maskPercentage: 50 });
    expect(results[0]).toBe("te**@test.com");
    expect(results[1]).toBe("us**@test.com");
  });
});

describe("Combined Features", () => {
  it("should combine visibleCharsEnd + maskDomain full", () => {
    const result = maskEmail("ekaone3033@gmail.com", {
      visibleChars: 2,
      visibleCharsEnd: 2,
      maskDomain: "full",
    });
    expect(result).toBe("ek******33@*****.***");
  });

  it("should combine percentage + partial domain masking", () => {
    const result = maskEmail("username@mail.google.com", {
      maskPercentage: 60,
      maskDomain: true,
    });
    expect(result).toBe("use*****@m***.g*****.com");
  });

  it("should validate and mask with all options", () => {
    const result = validateEmail("john.doe@company.com", {
      visibleChars: 2,
      visibleCharsEnd: 1,
      maskDomain: "full",
      maskChar: "•",
    });
    expect(result.valid).toBe(true);
    expect(result.masked).toBe("jo•••••••e@•••••••.•••");
  });
});
