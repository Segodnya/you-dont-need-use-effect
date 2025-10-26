/**
 * Presentation slide animations and tracking
 */

import { alpineState } from '../lib/alpine-state.ts';
import { setupSlideObserver } from '../lib/slide-observer.ts';

function checkIfMobile() {
  return window.innerWidth < 1024;
}

export function initSlideAnimations() {
  const slides = document.querySelectorAll('.slide');
  const isMobile = checkIfMobile();

  // Use shared observer utility
  setupSlideObserver((entry, slideIndex) => {
    // Desktop only: manage active class for animations
    if (!isMobile) {
      // Remove active class from all slides first
      slides.forEach((slide) => slide.classList.remove('active'));
      // Add active class to current slide
      entry.target.classList.add('active');
    } else {
      // Mobile: all slides are "active" for normal flow
      entry.target.classList.add('active');
    }

    // Update Alpine store using centralized state manager
    alpineState.setCurrentSlide(slideIndex);
  });

  // On mobile, make all slides active immediately
  if (isMobile) {
    slides.forEach((slide) => slide.classList.add('active'));
  }
}
