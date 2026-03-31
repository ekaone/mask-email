import { describe, it, expect } from "vitest";
import { maskEmail } from "../src/index";

describe("maskPercentage + visibleCharsEnd Interaction (Balanced)", () => {
  it("should balance visible chars between start and end when maskPercentage is set", () => {
    // When maskPercentage is provided, it balances between start and end
    // Any explicit visibleCharsEnd is ignored
    const result = maskEmail("username@test.com", {
      maskPercentage: 50,
      visibleCharsEnd: 1, // This is ignored when percentage is set
    });

    // With 50% masking on 8-char username:
    // - Show 4 chars total (50% visible)
    // - Balanced: ceil(4/2) = 2 start, floor(4/2) = 2 end
    expect(result).toBe("us****me@test.com");

    // Verify it's balanced (not start-only)
    expect(result).not.toBe("user****@test.com");
  });

  it("should use visibleCharsEnd when maskPercentage is NOT set", () => {
    // When maskPercentage is not provided, visibleCharsEnd works normally
    const result = maskEmail("username@test.com", {
      visibleChars: 3,
      visibleCharsEnd: 2, // This is used
      // maskPercentage: undefined (not provided)
    });

    // Should show 3 at start and 2 at end
    expect(result).toBe("use***me@test.com");
  });

  it("should handle odd number of visible chars with percentage", () => {
    // Testing the ceil/floor logic for odd numbers
    const result = maskEmail("username@test.com", {
      maskPercentage: 60, // 40% visible = 3.2 chars → round to 3
    });

    // 3 visible chars: ceil(3/2) = 2 start, floor(3/2) = 1 end
    expect(result).toBe("us*****e@test.com");
  });

  it("should handle 100% masking", () => {
    const result = maskEmail("test@test.com", {
      maskPercentage: 100,
    });

    // 100% masking: both start and end become 0
    expect(result).toBe("****@test.com");
  });

  it("should handle 0% masking", () => {
    const result = maskEmail("test@test.com", {
      maskPercentage: 0,
    });

    // 0% masking: show everything
    expect(result).toBe("test@test.com");
  });
});
