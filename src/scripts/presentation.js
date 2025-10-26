/**
 * Presentation slide animations and tracking
 */

import { alpineState } from '../lib/alpine-state.ts';
import { setupSlideObserver } from '../lib/slide-observer.ts';

export function initSlideAnimations() {
  const slides = document.querySelectorAll('.slide');

  // Use shared observer utility
  setupSlideObserver((entry, slideIndex) => {
    // Remove active class from all slides first
    slides.forEach(slide => slide.classList.remove('active'));
    // Add active class to current slide
    entry.target.classList.add('active');

    // Update Alpine store using centralized state manager
    alpineState.setCurrentSlide(slideIndex);
  });
}
