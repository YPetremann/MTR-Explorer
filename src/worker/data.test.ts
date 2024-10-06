import type { Segment } from "../../definitions/worker";
import { json } from "./data.min.json";
import { load, calcPath } from "./data.worker";

function displayPath(path: Segment[]) {
  console.info("Path:");
  for (const i in path) {
    console.info(`  ${i}: ${JSON.stringify(path[i])}`.slice(0, 80));
  }
}

describe("data", () => {
  it("load", async () => {
    await load(json);
  });

  it("calcPath", async () => {
    const path = await calcPath(
      ["7656000097055420305", "-7959022631105399792", "-5431161251827272709", "946998934114483299"],
      "distance",
    );
    displayPath(path);
  });

  it("calcPath", async () => {
    const path = await calcPath(
      [
        "7656000097055420305",
        "-4664309391657875505",
        "1606788516973598093",
        "-6564276519271788131",
        "-8712852306598876069",
        "-8953900199947314003",
      ],
      "distance",
    );
    displayPath(path);
  });
});
