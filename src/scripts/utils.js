/**
 * Utility functions for presentation
 * Re-exports from alpine-state module for backward compatibility
 */

import { alpineState } from '../lib/alpine-state.ts';

/**
 * Get Alpine.js state from the body element
 */
export function getAlpineState() {
  return alpineState.getState();
}

/**
 * Update the current slide in Alpine.js state
 */
export function updateCurrentSlide(slideIndex) {
  alpineState.setCurrentSlide(slideIndex);
}

/**
 * Check if URL syncing is enabled
 */
export function isUrlSyncEnabled() {
  return alpineState.isUrlSyncEnabled();
}
