/**
 * Main initialization for the presentation
 * ⚡ OPTIMIZED: Lazy load modules for faster initial load
 */

import Alpine from 'alpinejs';
import { TIMING_CONFIG } from '../lib/utils.ts';

// Initialize Alpine.js immediately (critical for app functionality)
window.Alpine = Alpine;
Alpine.start();

// ⚡ Start smart preloading on user interaction
import('./preload.js').then(({ preloadOnInteraction }) => {
  preloadOnInteraction();
});

// ⚡ Lazy load non-critical modules after DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  // Load presentation core first (critical path)
  const { initSlideAnimations } = await import('./presentation.js');
  initSlideAnimations();

  // Load navigation modules in parallel (high priority but not blocking)
  const [
    { initKeyboardNavigation, initNavigationButtons },
    { initUrlSyncToggle },
    { initMobileScrollTracking },
  ] = await Promise.all([
    import('./navigation.js'),
    import('./url-sync.js'),
    import('./mobile-scroll.js'),
  ]);

  initKeyboardNavigation();
  initNavigationButtons();
  initUrlSyncToggle();
  initMobileScrollTracking();

  // ⚡ Defer carousel initialization until after initial render
  // Carousels are only needed when user reaches those specific slides
  requestIdleCallback(
    async () => {
      const { initCarousels } = await import('./carousel.js');
      initCarousels();
    },
    { timeout: TIMING_CONFIG.CAROUSEL_INIT_TIMEOUT }
  );
});

// ⚡ Polyfill for requestIdleCallback (Safari support)
if (!window.requestIdleCallback) {
  window.requestIdleCallback = function (cb, options) {
    const start = Date.now();
    return setTimeout(() => {
      cb({
        didTimeout: false,
        timeRemaining: () => Math.max(0, 50 - (Date.now() - start)),
      });
    }, 1);
  };
}
