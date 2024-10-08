import type { AbstractMixedContent } from "./AbstractMixedContent";

export class MixedContent implements AbstractMixedContent {
  readonly name = "same";
  readonly order = 0;
  fetch(url: string): string {
    return fetch(url);
  }
}
