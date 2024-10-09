export class MixedContent {
  constructor(modules) {
    this.key = "MixedContent";
    this.modules = Object.values(modules)
      .map(module => module.MixedContent)
      .filter(module => module)
      .map(module => new module())
      .sort((a, b) => a.order - b.order);
    //console.info(`${this.key} Strategies:`, this.modules.map(module => module.name).join(", "));
  }
  async fetchJson(url: string): string {
    try {
      console.group(`${this.key} Strategies: fetchJson ${url}`);
      for (const module of this.modules) {
        console.groupCollapsed(`${module.name}`);
        try {
          const res = await module.fetch(url).then(res => res.json());
          console.info(`${this.key} Strategy ${module.name} : worked`);
          return res;
        } catch (e) {
          console.warn(`${this.key} Strategy ${module.name} :`, e);
        } finally {
          console.groupEnd();
        }
      }
    } finally {
      console.groupEnd();
    }
  }
}

export const mixedContent = new MixedContent(import.meta.glob("./mixedContent/*.ts", { eager: true }));
