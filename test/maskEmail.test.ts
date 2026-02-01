import { describe, it, expect } from "vitest";
import { maskEmail } from "../src/index";

describe("maskEmail - Basic Functionality", () => {
  it("should mask email with default options", () => {
    const result = maskEmail("ekaone3033@gmail.com");
    expect(result).toBe("ek********@gmail.com");
  });

  it("should mask email with visible chars", () => {
    const result = maskEmail("john.doe@example.com");
    expect(result).toBe("jo******@example.com");
  });

  it("should handle short emails", () => {
    const result = maskEmail("a@test.com");
    expect(result).toBe("a@test.com");
  });
});

describe("maskEmail - Custom Options", () => {
  it("should use custom visible chars", () => {
    const result = maskEmail("ekaone3033@gmail.com", { visibleChars: 4 });
    expect(result).toBe("ekao******@gmail.com");
  });

  it("should use custom visible chars (1)", () => {
    const result = maskEmail("ekaone3033@gmail.com", { visibleChars: 1 });
    expect(result).toBe("e*********@gmail.com");
  });

  it("should use custom mask character", () => {
    const result = maskEmail("user@example.com", { maskChar: "#" });
    expect(result).toBe("us##@example.com");
  });

  it("should use custom mask character (bullet)", () => {
    const result = maskEmail("user@example.com", { maskChar: "•" });
    expect(result).toBe("us••@example.com");
  });

  it("should use custom mask character (dash)", () => {
    const result = maskEmail("user@example.com", { maskChar: "-" });
    expect(result).toBe("us--@example.com");
  });
});

describe("maskEmail - Domain Masking", () => {
  it("should mask domain when maskDomain is true", () => {
    const result = maskEmail("user@gmail.com", { maskDomain: true });
    expect(result).toBe("us**@g****.com");
  });

  it("should mask subdomain", () => {
    const result = maskEmail("contact@mail.google.com", { maskDomain: true });
    expect(result).toBe("co*****@m***.g*****.com");
  });

  it("should not mask domain when maskDomain is false", () => {
    const result = maskEmail("user@gmail.com", { maskDomain: false });
    expect(result).toBe("us**@gmail.com");
  });
});

describe("maskEmail - Viewable Mode", () => {
  it("should return original email when viewable is true", () => {
    const email = "secret@company.com";
    const result = maskEmail(email, { viewable: true });
    expect(result).toBe(email);
  });

  it("should mask email when viewable is false", () => {
    const result = maskEmail("secret@company.com", { viewable: false });
    expect(result).toBe("se****@company.com");
  });
});

describe("maskEmail - Combined Options", () => {
  it("should handle multiple options together", () => {
    const result = maskEmail("ekaone3033@gmail.com", {
      visibleChars: 3,
      maskChar: "-",
      maskDomain: true,
    });
    expect(result).toBe("eka-------@g----.com");
  });

  it("should handle all options", () => {
    const result = maskEmail("admin@mail.company.com", {
      visibleChars: 1,
      maskChar: "•",
      maskDomain: true,
    });
    expect(result).toBe("a••••@m•••.c••••••.com");
  });
});

describe("maskEmail - Edge Cases", () => {
  it("should handle very short username (1 char)", () => {
    const result = maskEmail("a@example.com", { visibleChars: 2 });
    expect(result).toBe("a@example.com");
  });

  it("should handle very short username with masking", () => {
    const result = maskEmail("ab@example.com", { visibleChars: 1 });
    expect(result).toBe("a*@example.com");
  });

  it("should handle invalid email (no @ symbol)", () => {
    const result = maskEmail("notanemail");
    expect(result).toBe("notanemail");
  });

  it("should handle empty string", () => {
    const result = maskEmail("");
    expect(result).toBe("");
  });

  it("should handle null input", () => {
    const result = maskEmail(null as any);
    expect(result).toBe(null);
  });

  it("should handle undefined input", () => {
    const result = maskEmail(undefined as any);
    expect(result).toBe(undefined);
  });

  it("should handle multiple @ symbols", () => {
    const result = maskEmail("user@name@domain.com");
    expect(result).toBe("us*******@domain.com");
  });

  it("should handle email with dots in username", () => {
    const result = maskEmail("john.doe@example.com", { visibleChars: 3 });
    expect(result).toBe("joh*****@example.com");
  });

  it("should handle visibleChars larger than username", () => {
    const result = maskEmail("ab@test.com", { visibleChars: 10 });
    expect(result).toBe("ab@test.com");
  });

  it("should handle zero visibleChars", () => {
    const result = maskEmail("test@example.com", { visibleChars: 0 });
    expect(result).toBe("****@example.com");
  });
});

describe("maskEmail - Type Safety", () => {
  it("should accept EmailOptions type", () => {
    const options = {
      maskChar: "*",
      visibleChars: 2,
      maskDomain: false,
      viewable: false,
    };
    const result = maskEmail("test@example.com", options);
    expect(result).toBe("te**@example.com");
  });
});
