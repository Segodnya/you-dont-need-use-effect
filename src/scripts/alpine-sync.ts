/**
 * Alpine-DarkVeil synchronization module
 * Separates concerns: sync logic moved out of Presentation.astro
 */

import { alpineState } from '../lib/alpine-state.ts';
import { logger } from '../lib/logger.ts';
import { TIMING_CONFIG } from '../lib/utils.ts';

/**
 * Setup synchronization between Alpine.js state and DarkVeil container
 */
export function setupAlpineSync(): void {
  logger.log('🏔️ Setting up Alpine sync');
  const container = document.getElementById('dark-veil-container');
  
  if (!container) {
    logger.error('❌ DarkVeil container not found');
    return;
  }

  logger.log('✅ DarkVeil container found');

  // Check if Alpine is available
  if (typeof (window as any).Alpine === 'undefined') {
    logger.error('❌ Alpine.js not found on window');
    return;
  }

  logger.log('✅ Alpine.js found, setting up Alpine.effect');

  // Watch for currentSlide and totalSlides changes
  (window as any).Alpine.effect(() => {
    const currentSlide = alpineState.getCurrentSlide();
    const totalSlides = alpineState.getTotalSlides();

    logger.debug('🔄 Alpine.effect triggered:', {
      currentSlide,
      totalSlides,
    });

    container.dataset.currentSlide = String(currentSlide);
    container.dataset.totalSlides = String(totalSlides);

    logger.debug('📝 Updated container attributes:', {
      'data-current-slide': container.dataset.currentSlide,
      'data-total-slides': container.dataset.totalSlides,
    });
  });
}

/**
 * Initialize Alpine-DarkVeil sync with proper timing
 */
export function initAlpineSync(): void {
  // Try on alpine:init event
  document.addEventListener('alpine:init', setupAlpineSync);

  // Also try on DOMContentLoaded as fallback
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(setupAlpineSync, TIMING_CONFIG.ALPINE_SYNC_DELAY);
  });
}
