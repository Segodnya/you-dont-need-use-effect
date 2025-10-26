/**
 * Alpine State Manager - Centralized state management for Alpine.js
 * Eliminates scattered _x_dataStack access across the codebase
 * Follows Single Responsibility Principle
 */

export class AlpineStateManager {
  private static instance: AlpineStateManager;

  private constructor() {}

  static getInstance(): AlpineStateManager {
    if (!AlpineStateManager.instance) {
      AlpineStateManager.instance = new AlpineStateManager();
    }
    return AlpineStateManager.instance;
  }

  /**
   * Get Alpine.js state from the body element
   */
  getState(): any {
    const body = document.body as any;
    return body._x_dataStack?.[0] || null;
  }

  /**
   * Update the current slide in Alpine.js state
   */
  setCurrentSlide(slideIndex: number): void {
    const state = this.getState();
    if (state) {
      state.currentSlide = slideIndex;
    }
  }

  /**
   * Get current slide index
   */
  getCurrentSlide(): number {
    const state = this.getState();
    return state?.currentSlide ?? 0;
  }

  /**
   * Get total slides count
   */
  getTotalSlides(): number {
    const state = this.getState();
    return state?.totalSlides ?? 0;
  }

  /**
   * Check if URL syncing is enabled
   */
  isUrlSyncEnabled(): boolean {
    const state = this.getState();
    return state?.syncUrlWithSlide ?? false;
  }

  /**
   * Toggle URL sync state
   */
  toggleUrlSync(): void {
    const state = this.getState();
    if (state) {
      state.syncUrlWithSlide = !state.syncUrlWithSlide;
    }
  }

  /**
   * Set URL sync state
   */
  setUrlSync(enabled: boolean): void {
    const state = this.getState();
    if (state) {
      state.syncUrlWithSlide = enabled;
    }
  }
}

// Export singleton instance
export const alpineState = AlpineStateManager.getInstance();
