/**
 * URL sync toggle functionality
 */

import { alpineState } from '../lib/alpine-state.ts';

/**
 * Toggle URL syncing and update the URL accordingly
 */
export function toggleUrlSync() {
  // Toggle the state using centralized state manager
  alpineState.toggleUrlSync();

  // Update URL based on new state
  if (alpineState.isUrlSyncEnabled()) {
    // Sync enabled: add current slide to URL
    const slides = Array.from(document.querySelectorAll('.slide'));
    const currentSlide = slides[alpineState.getCurrentSlide()];
    if (currentSlide) {
      history.replaceState(null, null, '#' + currentSlide.id);
    }
  } else {
    // Sync disabled: clear hash from URL
    history.replaceState(
      null,
      null,
      window.location.pathname + window.location.search
    );
  }
}

/**
 * Initialize URL sync toggle buttons
 */
export function initUrlSyncToggle() {
  const buttons = document.querySelectorAll('.url-sync-toggle-btn');

  buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      toggleUrlSync();
    });
  });
}
