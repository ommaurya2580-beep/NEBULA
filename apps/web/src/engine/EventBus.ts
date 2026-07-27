export type EventCallback = (payload?: unknown) => void;

interface Listener {
  callback: EventCallback;
  priority: number;
  once: boolean;
}

export class EventBus {
  private static instance: EventBus;
  private listeners: Map<string, Listener[]> = new Map();
  private wildcardListeners: Listener[] = [];

  private constructor() {}

  public static getInstance(): EventBus {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus();
    }
    return EventBus.instance;
  }

  public subscribe(event: string, callback: EventCallback, priority = 0): void {
    if (event === '*') {
      this.wildcardListeners.push({ callback, priority, once: false });
      this.wildcardListeners.sort((a, b) => b.priority - a.priority);
      return;
    }

    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    const eventListeners = this.listeners.get(event)!;
    eventListeners.push({ callback, priority, once: false });
    eventListeners.sort((a, b) => b.priority - a.priority);
  }

  public subscribeOnce(event: string, callback: EventCallback, priority = 0): void {
    if (event === '*') {
      this.wildcardListeners.push({ callback, priority, once: true });
      this.wildcardListeners.sort((a, b) => b.priority - a.priority);
      return;
    }

    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    const eventListeners = this.listeners.get(event)!;
    eventListeners.push({ callback, priority, once: true });
    eventListeners.sort((a, b) => b.priority - a.priority);
  }

  public unsubscribe(event: string, callback: EventCallback): void {
    if (event === '*') {
      this.wildcardListeners = this.wildcardListeners.filter((l) => l.callback !== callback);
      return;
    }

    if (!this.listeners.has(event)) return;
    const filtered = this.listeners.get(event)!.filter((l) => l.callback !== callback);
    if (filtered.length === 0) {
      this.listeners.delete(event);
    } else {
      this.listeners.set(event, filtered);
    }
  }

  public publish(event: string, payload?: unknown): void {
    const invokeListener = (l: Listener) => {
      try {
        l.callback(payload);
      } catch (e) {
        console.error(`[EventBus] Error executing listener for event: ${event}`, e);
      }
    };

    // Execute exact matches
    if (this.listeners.has(event)) {
      const eventListeners = this.listeners.get(event)!;
      // Copy to array to avoid issues if listeners unsubscribe during execution
      [...eventListeners].forEach(invokeListener);
      
      // Remove once listeners
      this.listeners.set(
        event,
        eventListeners.filter((l) => !l.once)
      );
    }

    // Execute wildcards
    if (this.wildcardListeners.length > 0) {
      [...this.wildcardListeners].forEach(invokeListener);
      this.wildcardListeners = this.wildcardListeners.filter((l) => !l.once);
    }
  }

  public clear(): void {
    this.listeners.clear();
    this.wildcardListeners = [];
  }
}

export const eventBus = EventBus.getInstance();
