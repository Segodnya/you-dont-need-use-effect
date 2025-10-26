/**
 * Shared Intersection Observer utilities
 * Eliminates duplication of observer setup across navigation.js and presentation.js
 */

import { OBSERVER_CONFIG } from './utils';

/**
 * Create an Intersection Observer for slide tracking
 * @param callback - Function to call when a slide becomes visible
 * @param options - Optional IntersectionObserver options
 */
export function createSlideObserver(
  callback: (entry: IntersectionObserverEntry, slideIndex: number, slides: Element[]) => void,
  options?: IntersectionObserverInit
): IntersectionObserver {
  const defaultOptions: IntersectionObserverInit = {
    threshold: OBSERVER_CONFIG.SLIDE_THRESHOLD,
    rootMargin: OBSERVER_CONFIG.SLIDE_ROOT_MARGIN,
  };

  const mergedOptions = { ...defaultOptions, ...options };

  const slides = Array.from(document.querySelectorAll('.slide'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const slideIndex = slides.indexOf(entry.target);
        if (slideIndex !== -1) {
          callback(entry, slideIndex, slides);
        }
      }
    });
  }, mergedOptions);

  return observer;
}

/**
 * Observe all slides with a given observer
 * @param observer - IntersectionObserver instance
 */
export function observeAllSlides(observer: IntersectionObserver): void {
  const slides = document.querySelectorAll('.slide');
  slides.forEach((slide) => observer.observe(slide));
}

/**
 * Create and setup a slide observer in one call
 * @param callback - Function to call when a slide becomes visible
 * @param options - Optional IntersectionObserver options
 */
export function setupSlideObserver(
  callback: (entry: IntersectionObserverEntry, slideIndex: number, slides: Element[]) => void,
  options?: IntersectionObserverInit
): IntersectionObserver {
  const observer = createSlideObserver(callback, options);
  observeAllSlides(observer);
  return observer;
}
