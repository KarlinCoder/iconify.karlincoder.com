import PQueue from "p-queue";
import { BaseConfig } from "../config/base.config";

export class Queue {
  private readonly queue = new PQueue({
    concurrency: BaseConfig.maxConcurrentProcess,
    autoStart: true,
  });

  public add(task: () => Promise<string>) {
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
