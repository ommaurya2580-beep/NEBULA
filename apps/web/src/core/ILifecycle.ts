export interface ILifecycle {
  initialize(): void;
  start(): void;
  pause(): void;
  resume(): void;
  destroy(): void;
}
