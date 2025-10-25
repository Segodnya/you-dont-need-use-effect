/**
 * Navigation controls for presentation slides
 */

import { getActiveCarousel } from './carousel.js';

export function initKeyboardNavigation() {
  document.addEventListener('keydown', (e) => {
    const activeCarousel = getActiveCarousel();

    // Navigate with Arrow keys, Page Up/Down, and Space
    if (e.key === 'ArrowDown' || e.key === 'PageDown' || (e.key === ' ' && !e.shiftKey)) {
      e.preventDefault();
      navigateToNextSlide();
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp' || (e.key === ' ' && e.shiftKey)) {
      e.preventDefault();
      navigateToPrevSlide();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      // If there's an active carousel, navigate within it first
      if (activeCarousel && !activeCarousel.isAtEnd()) {
        activeCarousel.next();
      } else {
        navigateToNextSlide();
      }
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      // If there's an active carousel, navigate within it first
      if (activeCarousel && !activeCarousel.isAtStart()) {
        activeCarousel.prev();
      } else {
        navigateToPrevSlide();
      }
    }
  });
}

export function navigateToNextSlide() {
  const activeCarousel = getActiveCarousel();
  
  // If there's an active carousel and it's not at the end, navigate within it
  if (activeCarousel && !activeCarousel.isAtEnd()) {
    activeCarousel.next();
    return;
  }

  const slides = document.querySelectorAll('.slide');
  let currentIndex = getCurrentSlideIndex(slides);
  
  const nextIndex = currentIndex + 1;
  
  if (nextIndex < slides.length) {
    slides[nextIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

export function navigateToPrevSlide() {
  const activeCarousel = getActiveCarousel();
  
  // If there's an active carousel and it's not at the start, navigate within it
  if (activeCarousel && !activeCarousel.isAtStart()) {
    activeCarousel.prev();
    return;
  }

  const slides = document.querySelectorAll('.slide');
  let currentIndex = getCurrentSlideIndex(slides);
  
  const prevIndex = currentIndex - 1;
  
  if (prevIndex >= 0) {
    slides[prevIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

function getCurrentSlideIndex(slides) {
  // First try to find the active slide
  const activeSlide = document.querySelector('.slide.active');
  if (activeSlide) {
    return Array.from(slides).indexOf(activeSlide);
  }
  
  // Fallback: find the slide closest to the center of the viewport
  const viewportCenter = window.innerHeight / 2 + window.scrollY;
  let closestIndex = 0;
  let closestDistance = Infinity;
  
  slides.forEach((slide, index) => {
    const rect = slide.getBoundingClientRect();
    const slideCenter = rect.top + window.scrollY + rect.height / 2;
    const distance = Math.abs(slideCenter - viewportCenter);
    
    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = index;
    }
  });
  
  return closestIndex;
}

export function initNavigationButtons() {
  const nextBtn = document.getElementById('next-slide-btn');
  const prevBtn = document.getElementById('prev-slide-btn');
  const fullscreenBtn = document.getElementById('fullscreen-btn');

  if (nextBtn) {
    nextBtn.addEventListener('click', navigateToNextSlide);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', navigateToPrevSlide);
  }

  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', toggleFullscreen);
  }

  // Update button states based on current slide
  const slides = document.querySelectorAll('.slide');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const slideIndex = Array.from(slides).indexOf(entry.target);
          updateNavigationButtons(slideIndex, slides.length);
        }
      });
    },
    { threshold: 0.5 }
  );

  slides.forEach((slide) => observer.observe(slide));
}

function updateNavigationButtons(currentIndex, totalSlides) {
  const prevBtn = document.getElementById('prev-slide-btn');
  const nextBtn = document.getElementById('next-slide-btn');

  if (prevBtn) {
    prevBtn.disabled = currentIndex === 0;
    prevBtn.style.opacity = currentIndex === 0 ? '0.3' : '1';
  }

  if (nextBtn) {
    nextBtn.disabled = currentIndex === totalSlides - 1;
    nextBtn.style.opacity = currentIndex === totalSlides - 1 ? '0.3' : '1';
  }
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch((err) => {
      console.error('Error attempting to enable fullscreen:', err);
    });
  } else {
    document.exitFullscreen();
  }
}
