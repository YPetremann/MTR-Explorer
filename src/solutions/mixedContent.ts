class MixedContent {
  constructor(modules) {
    this.key = this.constructor.name;
    this.modules = Object.values(modules)
      .map(module => module[this.key])
      .filter(module => module)
      .map(module => new module())
      .sort((a, b) => a.order - b.order);
  }
  async fetch(url: string): string {
    for (const module of this.modules) {
      try {
        const res = await module.fetch(url);
        console.info(`${this.key} Strategy ${module.name} : worked`);
        return res;
      } catch (e) {
        console.warn(`${this.key} Strategy ${module.name} :`, e);
      }
    }
  }
}

export const mixedContent = new MixedContent(import.meta.glob("./mixedContent/*.ts", { eager: true }));
