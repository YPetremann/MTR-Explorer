import { AbstractMixedContent } from "./AbstractMixedContent";
import { AbstractProxyResponse } from "./AbstractProxyResponse";

export class MixedContent extends AbstractMixedContent {
  readonly name = "alloworigin.com";
  readonly order = 99;
  fetch(url: string): string {
    return fetch(`http://alloworigin.com/get?url=${url}`).then(r => new ProxyResponse(r));
  }
}

class ProxyResponse extends AbstractProxyResponse {}
