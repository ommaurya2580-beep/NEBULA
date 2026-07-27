export type CommandHandler = (payload?: unknown) => void | Promise<void>;

export class CommandBus {
  private static instance: CommandBus;
  private handlers = new Map<string, CommandHandler>();

  private constructor() {}

  public static getInstance(): CommandBus {
    if (!CommandBus.instance) CommandBus.instance = new CommandBus();
    return CommandBus.instance;
  }

  public register(command: string, handler: CommandHandler): void {
    if (this.handlers.has(command)) {
      console.warn("Command ${command} is already registered.");
      return;
    }
    this.handlers.set(command, handler);
  }

  public async execute(command: string, payload?: unknown): Promise<void> {
    const handler = this.handlers.get(command);
    if (!handler) {
      console.error("No handler registered for command ${command}.");
      return;
    }
    await handler(payload);
  }
}

export const commandBus = CommandBus.getInstance();
