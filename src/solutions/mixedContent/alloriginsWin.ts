import { AbstractMixedContent } from "./AbstractMixedContent";
import { AbstractProxyResponse } from "./AbstractProxyResponse";

export class MixedContent extends AbstractMixedContent {
  readonly name = "allorigins.win";
  readonly order = 99;
  fetch(url: string): string {
    return fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`).then(r => new ProxyResponse(r));
  }
}

class ProxyResponse extends AbstractProxyResponse {
  async json() {
    const provisional = await this.response.json();
    return JSON.stringify(provisional.contents);
  }
  async text() {
    const provisional = await this.response.json();
    return provisional.contents;
  }
}
