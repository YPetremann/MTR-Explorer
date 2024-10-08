import type { AbstractMixedContent } from "./AbstractMixedContent";

export class MixedContent implements AbstractMixedContent {
  readonly name = "allorigins.win";
  readonly order = 99;
  fetch(url: string): string {
    return fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
  }
}
