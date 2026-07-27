import { ILifecycle } from '../core/ILifecycle';
import { Logger } from '../core/Logger';
import { usePerformanceStore } from '../store/usePerformanceStore';
import * as THREE from 'three';

export class RendererManager implements ILifecycle {
  private static instance: RendererManager;
  private renderer: THREE.WebGLRenderer | null = null;

  private constructor() {}

  public static getInstance(): RendererManager {
    if (!RendererManager.instance) {
      RendererManager.instance = new RendererManager();
    }
    return RendererManager.instance;
  }

  public setRenderer(renderer: THREE.WebGLRenderer) {
    this.renderer = renderer;
    this.configureRenderer();
  }

  private configureRenderer() {
    if (!this.renderer) return;

    Logger.info('[RendererManager] Configuring physically correct WebGL settings...');
    
    // Physically correct lighting is now default in modern Three.js
    
    // Tone mapping (Cinematic look)
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.0;
    
    // Color management
    THREE.ColorManagement.enabled = true;
    
    // Shadows
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Output Encoding
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
  }

  public updateDPR(dpr: number) {
    if (this.renderer) {
      this.renderer.setPixelRatio(dpr);
      usePerformanceStore.getState().setDpr(dpr);
    }
  }

  public initialize(): void {
    Logger.info('[RendererManager] Initialized');
  }

  public start(): void {
    Logger.info('[RendererManager] Started');
  }

  public pause(): void {
    Logger.info('[RendererManager] Paused');
  }

  public resume(): void {
    Logger.info('[RendererManager] Resumed');
  }

  public destroy(): void {
    Logger.info('[RendererManager] Destroyed');
    if (this.renderer) {
      this.renderer.dispose();
      this.renderer = null;
    }
  }
}

export const rendererManager = RendererManager.getInstance();
