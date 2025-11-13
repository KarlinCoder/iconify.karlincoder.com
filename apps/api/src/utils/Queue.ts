const PQueue = require("p-queue").default;

import { BaseConfig } from "../config/base.config";

export class Queue {
  private readonly queue;

  constructor() {
    this.queue = new PQueue({
      concurrency: BaseConfig.maxConcurrentProcess,
      autoStart: true,
    });
  }

  public async add<T>(task: () => Promise<T>) {
    return this.queue.add(task);
  }

  async onIdle() {
    await this.queue.onIdle();
  }

  get pending() {
    return this.queue.pending;
  }

  get size() {
    return this.queue.size;
  }
}
