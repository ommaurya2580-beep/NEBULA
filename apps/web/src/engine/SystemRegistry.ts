import { ILifecycle } from '../core/ILifecycle';
import { Logger } from '../core/Logger';

export class SystemRegistry {
  private static instance: SystemRegistry;
  private systems: Map<string, ILifecycle> = new Map();
  private initializationOrder: string[] = [];

  private constructor() {}

  public static getInstance(): SystemRegistry {
    if (!SystemRegistry.instance) {
      SystemRegistry.instance = new SystemRegistry();
    }
    return SystemRegistry.instance;
  }

  public register(name: string, system: ILifecycle): void {
    if (this.systems.has(name)) {
      Logger.warn(`[SystemRegistry] System ${name} is already registered.`);
      return;
    }
    this.systems.set(name, system);
    this.initializationOrder.push(name);
    Logger.info(`[SystemRegistry] Registered: ${name}`);
  }

  public getSystem<T extends ILifecycle>(name: string): T | undefined {
    return this.systems.get(name) as T | undefined;
  }

  public initializeAll(): void {
    Logger.info('[SystemRegistry] Initializing systems...');
    for (const name of this.initializationOrder) {
      const system = this.systems.get(name);
      system?.initialize();
    }
  }

  public startAll(): void {
    Logger.info('[SystemRegistry] Starting systems...');
    for (const name of this.initializationOrder) {
      const system = this.systems.get(name);
      system?.start();
    }
  }

  public pauseAll(): void {
    Logger.info('[SystemRegistry] Pausing systems...');
    for (const name of this.initializationOrder) {
      const system = this.systems.get(name);
      system?.pause();
    }
  }

  public resumeAll(): void {
    Logger.info('[SystemRegistry] Resuming systems...');
    for (const name of this.initializationOrder) {
      const system = this.systems.get(name);
      system?.resume();
    }
  }

  public destroyAll(): void {
    Logger.info('[SystemRegistry] Destroying systems...');
    // Destroy in reverse order of registration
    for (let i = this.initializationOrder.length - 1; i >= 0; i--) {
      const name = this.initializationOrder[i];
      const system = this.systems.get(name);
      system?.destroy();
    }
    this.systems.clear();
    this.initializationOrder = [];
  }
}

export const registry = SystemRegistry.getInstance();
