export class DependencyContainer {
  private static instance: DependencyContainer;
  private services = new Map<string, unknown>();

  private constructor() {}

  public static getInstance(): DependencyContainer {
    if (!DependencyContainer.instance) {
      DependencyContainer.instance = new DependencyContainer();
    }
    return DependencyContainer.instance;
  }

  public register<T>(name: string, service: T): void {
    if (this.services.has(name)) {
      console.warn(`[DependencyContainer] Service ${name} is already registered. Overwriting.`);
    }
    this.services.set(name, service);
  }

  public resolve<T>(name: string): T {
    if (!this.services.has(name)) {
      throw new Error(`[DependencyContainer] Service ${name} not found!`);
    }
    return this.services.get(name) as T;
  }

  public clear(): void {
    this.services.clear();
  }
}

export const container = DependencyContainer.getInstance();
