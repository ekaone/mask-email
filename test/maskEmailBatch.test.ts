import { describe, it, expect } from "vitest";
import { maskEmailBatch } from "../src/maskEmailBatch";

describe("maskEmailBatch - Batch Functionality", () => {
  it("should mask array of emails with default options", () => {
    const emails = ["john.doe@example.com", "jane.smith@company.com"];
    const result = maskEmailBatch(emails);
    expect(result).toEqual(["jo******@example.com", "ja********@company.com"]);
  });

  it("should mask empty array", () => {
    const result = maskEmailBatch([]);
    expect(result).toEqual([]);
  });

  it("should apply custom options to all emails", () => {
    const emails = ["admin@site.com", "user@test.org"];
    const result = maskEmailBatch(emails, { visibleChars: 3, maskChar: "#" });
    expect(result).toEqual(["adm##@site.com", "use#@test.org"]);
  });

  it("should handle mixed valid and invalid emails", () => {
    const emails = ["valid@email.com", "invalid-email", "another@valid.com"];
    const result = maskEmailBatch(emails);
    expect(result).toEqual([
      "va***@email.com",
      "invalid-email",
      "an*****@valid.com",
    ]);
  });

  it("should handle domain masking for batch", () => {
    const emails = ["user@gmail.com", "admin@company.co.uk"];
    const result = maskEmailBatch(emails, { maskDomain: true });
    expect(result).toEqual(["us**@g****.com", "ad***@c******.c*.uk"]);
  });

  it("should handle viewable mode for batch", () => {
    const emails = ["secret@company.com", "private@user.net"];
    const result = maskEmailBatch(emails, { viewable: true });
    expect(result).toEqual(emails);
  });
});
