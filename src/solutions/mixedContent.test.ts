import { test, describe, expect } from "vitest";
import { MixedContent } from "./mixedContent";

export const mixedContent = new MixedContent(import.meta.glob("./mixedContent/*.ts", { eager: true }));
const testUrl = "http://de1.ocean-hosting.top:25003/data";

describe.concurrent("MixedContent Strategy", () => {
  describe.concurrent("text", () => {
    test.each(mixedContent.modules)(
      "$name",
      async strategy => {
        const body = await strategy.fetch(testUrl).then(res => res.text());
        let data;
        try {
          data = JSON.parse(body);
          expect(data).toBeInstanceOf(Array);
          expect(data[0]).toHaveProperty("routes");
          expect(data[0]).toHaveProperty("stations");
        } catch (e) {
          console.info(strategy.name, body);
          throw e;
        }
      },
      { timeout: 5000 },
    );
  });
});
