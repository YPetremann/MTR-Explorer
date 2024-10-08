import type { AbstractMixedContent } from "./AbstractMixedContent";

export class MixedContent implements AbstractMixedContent {
  readonly name = "alloworigin.com";
  readonly order = 99;
  fetch(url: string): string {
    return fetch(`http://alloworigin.com/get?url=${url}`);
  }
}
