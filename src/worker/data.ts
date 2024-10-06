export const dataWorker = new ComlinkWorker<typeof import("./data.worker")>(new URL("./data.worker", import.meta.url));
