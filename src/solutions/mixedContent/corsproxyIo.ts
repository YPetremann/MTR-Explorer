import type { AbstractMixedContent } from "./AbstractMixedContent";

export class MixedContent implements AbstractMixedContent {
  readonly name = "corsproxy.io";
  readonly order = 99;
  fetch(url: string): string {
    return fetch(`https://corsproxy.io/?${encodeURIComponent(url)}`);
  }
}
