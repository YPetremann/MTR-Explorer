import type { AbstractMixedContent } from "./AbstractMixedContent";

export class MixedContent implements AbstractMixedContent {
  readonly name = "thingproxy.freeboard.io";
  readonly order = 1;
  fetch(url: string): string {
    return fetch(`https://thingproxy.freeboard.io/fetch/${url}`);
  }
}
