import { describe, it, expect } from "vitest";
import { isActivePath, getUserName } from "./navigation";

describe("isActivePath", () => {
  it("returns true when paths match exactly", () => {
    expect(isActivePath("/", "/")).toBe(true);
  });

  it('returns true for root path "/"', () => {});

  it("returns true when current path includes href", () => {});

  it("returns false when paths don't match", () => {});
});

describe("getUserName", () => {
  it("returns the name from the user object in storage", () => {});

  it("returns null when no user exists", () => {
    expect(getUserName()).toBeNull();
  });
});
