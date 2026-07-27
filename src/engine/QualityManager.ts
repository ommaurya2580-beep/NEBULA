import { Logger } from '../core/Logger';

export type DeviceTier = 'ULTRA' | 'HIGH' | 'MEDIUM' | 'LOW' | 'FALLBACK';

export class QualityManager {
  private tier: DeviceTier = 'HIGH';

  public detectGPU(): void {
    // Mock GPU Detection
    Logger.info('[QualityManager] Detecting GPU capabilities...');
    this.tier = 'HIGH';
    Logger.info(`[QualityManager] Device Tier set to: ${this.tier}`);
  }

  public getTier(): DeviceTier {
    return this.tier;
  }
}

export const qualityManager = new QualityManager();
