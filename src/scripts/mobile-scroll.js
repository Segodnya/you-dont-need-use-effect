/**
 * Mobile scroll tracking for slide counter
 * Tracks which slide is most visible during scroll on mobile devices
 */

import { alpineState } from '../lib/alpine-state.ts';

let slides = [];
let isTracking = false;

function checkIfMobile() {
  return window.innerWidth < 1024;
}

/**
 * Calculate which slide is currently most visible in viewport
 */
function getCurrentVisibleSlide() {
  let maxVisibility = 0;
  let currentSlideIndex = 0;

  slides.forEach((slide, index) => {
    const rect = slide.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // Calculate how much of the slide is visible
    const visibleTop = Math.max(0, rect.top);
    const visibleBottom = Math.min(viewportHeight, rect.bottom);
    const visibleHeight = Math.max(0, visibleBottom - visibleTop);

    // Calculate visibility percentage
    const visibility = visibleHeight / viewportHeight;

    if (visibility > maxVisibility) {
      maxVisibility = visibility;
      currentSlideIndex = index;
    }
  });

  return currentSlideIndex;
}

/**
 * Handle scroll events to update counter
 */
function handleScroll() {
  if (!isTracking) return;

  const currentSlide = getCurrentVisibleSlide();
  alpineState.setCurrentSlide(currentSlide);
}

/**
 * Initialize mobile scroll tracking
 */
export function initMobileScrollTracking() {
  const isMobile = checkIfMobile();

  if (!isMobile) return;

  slides = Array.from(document.querySelectorAll('.slide'));
  isTracking = true;

  // Use throttled scroll event for performance
  let ticking = false;

  const scrollContainer = document.querySelector('.scroll-container');
  if (scrollContainer) {
    scrollContainer.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // Set initial slide
  handleScroll();

  // Handle resize
  window.addEventListener('resize', () => {
    const nowMobile = checkIfMobile();
    if (nowMobile !== isTracking) {
      isTracking = nowMobile;
      if (nowMobile) {
        slides = Array.from(document.querySelectorAll('.slide'));
        handleScroll();
      }
    }
  });
}
