/**
 * Presentation slide animations and tracking
 */

import { updateCurrentSlide } from './utils.js';

export function initSlideAnimations() {
  const slides = document.querySelectorAll('.slide');

  // Intersection Observer for slide animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Remove active class from all slides first
          slides.forEach(slide => slide.classList.remove('active'));
          // Add active class to current slide
          entry.target.classList.add('active');
          const slideIndex = Array.from(slides).indexOf(entry.target);

          // Update Alpine store
          updateCurrentSlide(slideIndex);
        }
      });
    },
    {
      threshold: 0.5,
      rootMargin: '-10% 0px -10% 0px',
    }
  );

  slides.forEach((slide) => observer.observe(slide));
}
