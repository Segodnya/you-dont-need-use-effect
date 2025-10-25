/**
 * Main initialization for the presentation
 */

import Alpine from 'alpinejs';
import { initSlideAnimations } from './presentation.js';
import { initKeyboardNavigation, initNavigationButtons } from './navigation.js';
import { initCarousels } from './carousel.js';

// Initialize Alpine.js
window.Alpine = Alpine;
Alpine.start();

// Initialize presentation features when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initSlideAnimations();
  initKeyboardNavigation();
  initNavigationButtons();
  initCarousels();
});
