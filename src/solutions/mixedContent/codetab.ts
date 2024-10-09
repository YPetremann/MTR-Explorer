import { AbstractMixedContent } from "./AbstractMixedContent";
import { AbstractProxyResponse } from "./AbstractProxyResponse";

export class MixedContent extends AbstractMixedContent {
  readonly name = "codetabs.com";
  readonly order = 10;
  fetch(url: string): string {
    return fetch(`https://api.codetabs.com/v1/proxy/?quest=${url}`, {
      signal: AbortSignal.timeout(10000),
    }).then(r => new ProxyResponse(r));
  }
}

class ProxyResponse extends AbstractProxyResponse {}
