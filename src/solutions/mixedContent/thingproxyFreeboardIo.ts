import { AbstractMixedContent } from "./AbstractMixedContent";
import { AbstractProxyResponse } from "./AbstractProxyResponse";

export class MixedContent extends AbstractMixedContent {
  readonly name = "thingproxy.freeboard.io";
  readonly order = 10;
  fetch(url: string): string {
    return fetch(`https://thingproxy.freeboard.io/fetch/${url}`, {
      signal: AbortSignal.timeout(10000),
    }).then(r => new ProxyResponse(r));
  }
}

class ProxyResponse extends AbstractProxyResponse {}
