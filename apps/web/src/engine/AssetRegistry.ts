import { Logger } from '../core/Logger';

export interface AssetMetadata {
  id: string;
  type: string;
  priority: number;
  size: number;
}

export class AssetRegistry2 {
  private assets = new Map<string, AssetMetadata>();

  public preload(metadata: AssetMetadata): void {
    Logger.info(`[AssetRegistry] Preloading asset: ${metadata.id}`);
    this.assets.set(metadata.id, metadata);
  }

  public stream(metadata: AssetMetadata): void {
    Logger.info(`[AssetRegistry] Streaming asset: ${metadata.id}`);
  }

  public dispose(id: string): void {
    Logger.info(`[AssetRegistry] Disposing asset: ${id}`);
    this.assets.delete(id);
  }
}

export const assetRegistry2 = new AssetRegistry2();
