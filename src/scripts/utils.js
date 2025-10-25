/**
 * Utility functions for presentation
 */

/**
 * Get Alpine.js state from the body element
 */
export function getAlpineState() {
  const body = document.body;
  return body._x_dataStack?.[0] || null;
}

/**
 * Update the current slide in Alpine.js state
 */
export function updateCurrentSlide(slideIndex) {
  const state = getAlpineState();
  if (state) {
    state.currentSlide = slideIndex;
  }
}

/**
 * Check if URL syncing is enabled
 */
export function isUrlSyncEnabled() {
  const state = getAlpineState();
  return state?.syncUrlWithSlide ?? false;
}
