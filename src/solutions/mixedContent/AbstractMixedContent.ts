export abstract class AbstractMixedContent {
  readonly name: string;
  readonly order: number;
  work(url: string): string;
}
