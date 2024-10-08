import { AbstractMixedContent } from "./AbstractMixedContent";
import { AbstractProxyResponse } from "./AbstractProxyResponse";

export class MixedContent extends AbstractMixedContent {
  readonly name = "same";
  readonly order = 0;
  fetch(url: string): string {
    return fetch(url).then(r => new ProxyResponse(r));
  }
}

class ProxyResponse extends AbstractProxyResponse {}
