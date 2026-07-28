import { describe, expect, test } from "bun:test";
import {
  ARTICLE_INVENTORY,
  getArticleEditorial,
} from "../src/constants/editorial";

describe("editorial SEO inventory", () => {
  test("contains exactly 25 article topics", () => {
    const count = Object.values(ARTICLE_INVENTORY).reduce(
      (sum, slugs) => sum + slugs.length,
      0,
    );
    expect(count).toBe(25);
  });

  test("creates three distinct image variants with valid dates", () => {
    const meta = getArticleEditorial(
      "cat",
      "cat-mock-analysis",
      "CAT Mock Analysis",
    );
    const images = Object.values(meta.images);
    expect(new Set(images.map((image) => image.url)).size).toBe(3);
    expect(images.map((image) => `${image.width}x${image.height}`)).toEqual([
      "1200x1200",
      "1200x900",
      "1200x675",
    ]);
    expect(Date.parse(meta.dateModified)).toBeGreaterThanOrEqual(
      Date.parse(meta.datePublished),
    );
  });
});
