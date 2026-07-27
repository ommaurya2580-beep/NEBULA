import { Logger } from '../core/Logger';
import { commandBus } from './CommandBus';

export type SceneState = 'CREATED' | 'INITIALIZED' | 'ACTIVE' | 'PAUSED' | 'DISPOSED';

export interface IScene {
  id: string;
  state: SceneState;
  create: () => Promise<void>;
  initialize: () => Promise<void>;
  enter: () => void;
  pause: () => void;
  exit: () => void;
  dispose: () => void;
}

export class SceneRegistry {
  private static instance: SceneRegistry;
  private scenes = new Map<string, IScene>();
  private activeScene: IScene | null = null;

  private constructor() {}

  public static getInstance(): SceneRegistry {
    if (!SceneRegistry.instance) {
      SceneRegistry.instance = new SceneRegistry();
    }
    return SceneRegistry.instance;
  }

  public register(scene: IScene): void {
    if (this.scenes.has(scene.id)) {
      Logger.warn(`[SceneRegistry] Scene ${scene.id} already registered.`);
      return;
    }
    this.scenes.set(scene.id, scene);
    Logger.info(`[SceneRegistry] Registered Scene: ${scene.id}`);
  }

  public async loadScene(id: string): Promise<void> {
    const scene = this.scenes.get(id);
    if (!scene) throw new Error(`Scene ${id} not found.`);
    
    if (scene.state === 'CREATED' || scene.state === 'DISPOSED') {
      await scene.create();
      await scene.initialize();
      scene.state = 'INITIALIZED';
    }
  }

  public activateScene(id: string): void {
    const scene = this.scenes.get(id);
    if (!scene) throw new Error(`Scene ${id} not found.`);

    if (this.activeScene) {
      this.activeScene.exit();
      this.activeScene.state = 'INITIALIZED';
    }

    scene.enter();
    scene.state = 'ACTIVE';
    this.activeScene = scene;
    
    Logger.info(`[SceneRegistry] Activated Scene: ${id}`);
  }

  public initializeCommands(): void {
    commandBus.register('LOAD_SCENE', async (payload: any) => {
      await this.loadScene(payload.id);
    });
    
    commandBus.register('ACTIVATE_SCENE', async (payload: any) => {
      this.activateScene(payload.id);
    });
  }
}

export const sceneRegistry = SceneRegistry.getInstance();
