export class AbstractProxyResponse {
  constructor(response: Response) {
    this.response = response;
  }
  get body(): ReadableStream {
    return this.response.body;
  }
  get bodyUsed(): boolean {
    return this.response.bodyUsed;
  }
  get headers(): Headers {
    return this.response.headers;
  }
  get ok(): boolean {
    return this.response.ok;
  }
  get redirected(): boolean {
    return this.response.redirected;
  }
  get status(): number {
    return this.response.status;
  }
  get statusText(): string {
    return this.response.statusText;
  }
  get type(): ResponseType {
    return this.response.type;
  }
  get url(): string {
    return this.response.url;
  }

  async arrayBuffer(): Promise<ArrayBuffer> {
    return await this.response.arrayBuffer();
  }
  async blob(): Promise<Blob> {
    return await this.response.blob();
  }
  async bytes(): Promise<Uint8Array> {
    return await this.response.bytes();
  }
  async clone(): Response {
    return await this.response.clone();
  }
  async formData(): Promise<FormData> {
    return await this.response.formData();
  }
  async json(): Promise<unknown> {
    return await this.response.json();
  }
  async text(): Promise<string> {
    return await this.response.text();
  }
}
