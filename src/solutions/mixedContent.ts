class MixedContent {
  constructor(modules) {
    this.key = "MixedContent";
    this.modules = Object.values(modules)
      .map(module => module.MixedContent)
      .filter(module => module)
      .map(module => new module())
      .sort((a, b) => a.order - b.order);
    console.info(`${this.key} Strategies:`, this.modules.map(module => module.name).join(", "));
  }
  async fetchJJson(url: string): string {
    for (const module of this.modules) {
      try {
        const res = await module.fetch(url).then(res => res.json());
        console.info(`${this.key} Strategy ${module.name} : worked`);
        return res;
      } catch (e) {
        console.warn(`${this.key} Strategy ${module.name} :`, e);
      }
    }
  }
}

export const mixedContent = new MixedContent(import.meta.glob("./mixedContent/*.ts", { eager: true }));
