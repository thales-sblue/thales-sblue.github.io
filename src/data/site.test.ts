import { describe, expect, it } from "vitest";
import { contactLinks, heroCtas, navigationItems, sectionIds } from "./site";

describe("site data integrity", () => {
  it("keeps every section id as a non-empty string", () => {
    for (const sectionId of Object.values(sectionIds)) {
      expect(typeof sectionId).toBe("string");
      expect(sectionId.trim()).not.toBe("");
    }
  });

  it("keeps navigation labels and hrefs unique and mapped to declared sections", () => {
    const hrefs = navigationItems.map((item) => item.href);
    const labels = navigationItems.map((item) => item.label);
    const declaredSectionIds = new Set<string>(Object.values(sectionIds));

    expect(new Set(hrefs).size).toBe(hrefs.length);
    expect(new Set(labels).size).toBe(labels.length);

    for (const item of navigationItems) {
      expect(item.href.startsWith("#")).toBe(true);
      expect(item.label.trim()).not.toBe("");
      expect(declaredSectionIds.has(item.href.slice(1))).toBe(true);
    }
  });

  it("keeps CTA and contact hrefs as non-empty strings", () => {
    const actionLinks = [
      heroCtas.projects,
      heroCtas.nasa,
      ...Object.values(contactLinks),
    ];

    for (const item of actionLinks) {
      expect(item.href.trim()).not.toBe("");
    }
  });

  it("keeps external contact metadata complete when present", () => {
    for (const item of Object.values(contactLinks)) {
      if (!item.href.startsWith("http")) {
        expect(item.target).toBeUndefined();
        expect(item.rel).toBeUndefined();
        continue;
      }

      expect(item.target).toBe("_blank");
      expect(item.rel).toBe("noopener noreferrer");
    }
  });
});
