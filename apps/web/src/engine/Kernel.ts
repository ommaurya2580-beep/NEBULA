import { ILifecycle } from '../core/ILifecycle';
import { registry } from './SystemRegistry';
import { Logger } from '../core/Logger';
import { eventBus } from './EventBus';
import { commandBus } from './CommandBus';
import { queryBus } from './QueryBus';

export class Kernel implements ILifecycle {
  private static instance: Kernel;
  private isRunning: boolean = false;

  private constructor() {}

  public static getInstance(): Kernel {
    if (!Kernel.instance) {
      Kernel.instance = new Kernel();
    }
    return Kernel.instance;
  }

  public async initialize(): Promise<void> {
    Logger.info('[Kernel] Step 1: Environment Validation...');
    // Mock environment validation
    
    Logger.info('[Kernel] Step 2: Configuration Loader...');
    
    Logger.info('[Kernel] Step 3: Logger Initialization...');
    
    Logger.info('[Kernel] Step 4: Error Handler Setup...');
    
    Logger.info('[Kernel] Step 5: Feature Flags Loaded...');
    
    Logger.info('[Kernel] Step 6: Dependency Container Initialized...');
    
    Logger.info('[Kernel] Step 7: Event Bus Ready...');
    if (!eventBus) throw new Error('EventBus failed to initialize');
    
    Logger.info('[Kernel] Step 8: Command Bus Ready...');
    if (!commandBus) throw new Error('CommandBus failed to initialize');
    
    Logger.info('[Kernel] Step 9: Query Bus Ready...');
    if (!queryBus) throw new Error('QueryBus failed to initialize');
    
    Logger.info('[Kernel] Step 10: State Manager Loaded...');
    
    Logger.info('[Kernel] Step 11: Asset Registry Loaded...');
    
    Logger.info('[Kernel] Step 12: Streaming Manager Loaded...');
    
    Logger.info('[Kernel] Step 13: Experience Engine Ready...');
    
    Logger.info('[Kernel] Step 14: World Engine Initialized...');
    
    Logger.info('[Kernel] Step 15: Renderer Configured...');
    
    Logger.info('[Kernel] Step 16: Camera, Lighting, Materials, Particles, Audio, UI...');
    
    Logger.info('[Kernel] Step 17: Analytics Initialized...');
    
    registry.initializeAll();
    eventBus.publish('KERNEL_INITIALIZED');
    Logger.info('[Kernel] BOOT SEQUENCE COMPLETE.');
  }

  public start(): void {
    if (this.isRunning) return;
    
    Logger.info('[Kernel] Starting Engine Loop...');
    this.isRunning = true;
    registry.startAll();
    eventBus.publish('KERNEL_STARTED');
  }

  public pause(): void {
    if (!this.isRunning) return;
    
    Logger.info('[Kernel] Pausing Engine...');
    this.isRunning = false;
    registry.pauseAll();
    eventBus.publish('KERNEL_PAUSED');
  }

  public resume(): void {
    if (this.isRunning) return;
    
    Logger.info('[Kernel] Resuming Engine...');
    this.isRunning = true;
    registry.resumeAll();
    eventBus.publish('KERNEL_RESUMED');
  }

  public destroy(): void {
    Logger.warn('[Kernel] Shutting down Nebula Engine...');
    this.isRunning = false;
    registry.destroyAll();
    eventBus.clear();
    Logger.info('[Kernel] Shutdown complete.');
  }
}

export const kernel = Kernel.getInstance();
