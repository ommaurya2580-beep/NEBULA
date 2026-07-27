import { ILifecycle } from '../core/ILifecycle';
import { Logger } from '../core/Logger';
import { eventBus } from './EventBus';
import { commandBus } from './CommandBus';
import { queryBus } from './QueryBus';
import { useExperienceStore } from '../store/useExperienceStore';

export type ExperienceState = 
  | 'BOOT' | 'LOADING' | 'INTRO' | 'BRAND' | 'WORLD' 
  | 'COLLECTION' | 'PRODUCT' | 'DETAIL' | 'CUSTOMIZATION' 
  | 'CART' | 'CHECKOUT' | 'OUTRO';

export interface IExperiencePreset {
  camera: string;
  lighting: string;
  audio: string;
  particle: string;
  ui: string;
}

export interface IExperienceStateDef {
  state: ExperienceState;
  preset: IExperiencePreset;
  onEnter: () => void;
  onUpdate: (delta: number) => void;
  onExit: () => void;
}

export class ExperienceEngine implements ILifecycle {
  private static instance: ExperienceEngine;
  private states = new Map<ExperienceState, IExperienceStateDef>();
  private activeState: ExperienceState = 'BOOT';
  private stateHistory: ExperienceState[] = [];

  private constructor() {}

  public static getInstance(): ExperienceEngine {
    if (!ExperienceEngine.instance) {
      ExperienceEngine.instance = new ExperienceEngine();
    }
    return ExperienceEngine.instance;
  }

  public registerState(def: IExperienceStateDef): void {
    this.states.set(def.state, def);
  }

  public async transitionTo(newState: ExperienceState): Promise<void> {
    const nextDef = this.states.get(newState);
    if (!nextDef) {
      Logger.error(`[ExperienceEngine] Invalid state transition requested: ${newState}`);
      return;
    }

    Logger.info(`[ExperienceEngine] Transitioning: ${this.activeState} -> ${newState}`);
    eventBus.publish('EXPERIENCE_TRANSITION_START', { from: this.activeState, to: newState });

    const currentDef = this.states.get(this.activeState);
    if (currentDef) {
      currentDef.onExit();
    }

    this.stateHistory.push(this.activeState);
    this.activeState = newState;

    // Sync to React Zustand Store
    useExperienceStore.getState().setCurrentState(newState);

    // Apply Presets via CommandBus
    await commandBus.execute('APPLY_CAMERA_PRESET', nextDef.preset.camera);
    await commandBus.execute('APPLY_LIGHTING_PRESET', nextDef.preset.lighting);
    await commandBus.execute('APPLY_AUDIO_PRESET', nextDef.preset.audio);
    await commandBus.execute('APPLY_PARTICLE_PRESET', nextDef.preset.particle);
    await commandBus.execute('MOUNT_UI_LAYOUT', nextDef.preset.ui);

    nextDef.onEnter();
    eventBus.publish('EXPERIENCE_TRANSITION_COMPLETE', { active: newState });
  }

  public update(delta: number): void {
    const currentDef = this.states.get(this.activeState);
    if (currentDef) {
      currentDef.onUpdate(delta);
    }
  }

  public getActiveState(): ExperienceState {
    return this.activeState;
  }

  public initialize(): void {
    Logger.info('[ExperienceEngine] Initialized');
    
    // Register allowed commands
    commandBus.register('TRANSITION_EXPERIENCE', async (payload: any) => {
      await this.transitionTo(payload.to as ExperienceState);
    });
    
    // Register queries
    queryBus.register('GET_ACTIVE_EXPERIENCE', () => {
      return this.activeState;
    });
  }

  public start(): void {
    Logger.info('[ExperienceEngine] Started');
  }

  public pause(): void {
    Logger.info('[ExperienceEngine] Paused');
  }

  public resume(): void {
    Logger.info('[ExperienceEngine] Resumed');
  }

  public destroy(): void {
    Logger.info('[ExperienceEngine] Destroyed');
    this.states.clear();
  }
}

export const experienceEngine = ExperienceEngine.getInstance();
