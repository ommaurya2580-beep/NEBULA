export type QueryHandler<T> = (payload?: unknown) => T | Promise<T>;

export class QueryBus {
  private static instance: QueryBus;
  private handlers = new Map<string, QueryHandler<unknown>>();

  private constructor() {}

  public static getInstance(): QueryBus {
    if (!QueryBus.instance) QueryBus.instance = new QueryBus();
    return QueryBus.instance;
  }

  public register<T>(query: string, handler: QueryHandler<T>): void {
    if (this.handlers.has(query)) {
      console.warn("Query ${query} is already registered.");
      return;
    }
    this.handlers.set(query, handler as QueryHandler<unknown>);
  }

  public async execute<T>(query: string, payload?: unknown): Promise<T | null> {
    const handler = this.handlers.get(query);
    if (!handler) {
      console.error("No handler registered for query ${query}.");
      return null;
    }
    return (await handler(payload)) as T;
  }
}

export const queryBus = QueryBus.getInstance();
