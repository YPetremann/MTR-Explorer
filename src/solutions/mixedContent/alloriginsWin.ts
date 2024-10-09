import { AbstractMixedContent } from "./AbstractMixedContent";
import { AbstractProxyResponse } from "./AbstractProxyResponse";

export class MixedContent extends AbstractMixedContent {
  readonly name = "allorigins.win";
  readonly order = 50;
  fetch(url: string): string {
    return fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`, {
      signal: AbortSignal.timeout(10000),
    }).then(r => new ProxyResponse(r));
  }
}

class ProxyResponse extends AbstractProxyResponse {
  async json() {
    return JSON.parse(await this.text());
  }
  async text() {
    const provisional = JSON.parse(await this.response.text());
    return provisional.contents;
  }
}
