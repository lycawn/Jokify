import { describe, it, expect, vi } from "vitest";
import { truncText, $mobile, $localUser } from "../composables/utils/usables";

describe("truncText", () => {
  it("should return the full string if length <= 10", () => {
    expect(truncText("short")).toBe("short");
  });

  it("should return truncated string with ellipsis if length > 10", () => {
    const input = "1234567890123456789012345";
    expect(truncText(input)).toBe(input.slice(0, 20) + "...");
  });
});

describe("$mobile", () => {
  it("should return true if screen.width < 780", () => {
    vi.stubGlobal("screen", { width: 500 });
    expect($mobile()).toBe(true);
  });

  it("should return false if screen.width >= 780", () => {
    vi.stubGlobal("screen", { width: 1024 });
    expect($mobile()).toBe(false);
  });
});

describe("$localUser", () => {
  it("it should stringify an object and setIt as userInfo in localhost", () => {
    const input = {
      user: "Tester",
      favorites: ["Test", "test2"],
      id: 12,
    };
    $localUser(input);
    const stored = localStorage.getItem("userInfo");
    expect(stored).toBe(JSON.stringify(input));
  });
});
