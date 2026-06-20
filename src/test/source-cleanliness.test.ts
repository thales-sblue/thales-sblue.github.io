import { describe, expect, it } from "vitest";

describe("src source cleanliness", () => {
  it("contains no JavaScript or JSX files", () => {
    const sourceFiles = Object.keys(
      import.meta.glob([
        "../**/*",
        "!../**/node_modules/**",
        "!../**/dist/**",
        "!../**/coverage/**",
        "!../**/build/**",
      ]),
    );
    const legacySourceFiles = sourceFiles.filter((file) =>
      /\.jsx?$/.test(file),
    );

    expect(legacySourceFiles).toEqual([]);
  });
});
