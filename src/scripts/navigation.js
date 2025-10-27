/**
 * Navigation controls for presentation slides
 */

import { getActiveCarousel } from './carousel.js';
import { alpineState } from '../lib/alpine-state.ts';
import { setupSlideObserver } from '../lib/slide-observer.ts';
import { toggleUrlSync } from './url-sync.js';

let slides = [];
let currentSlideIndex = 0;
let isMobile = false;

function checkIfMobile() {
  return window.innerWidth < 1024;
}

export function initKeyboardNavigation() {
  // Initialize slides array
  slides = Array.from(document.querySelectorAll('.slide'));

  // Check if mobile
  isMobile = checkIfMobile();

  // Initialize from URL hash or start at first slide (desktop only)
  if (!isMobile) {
    initializeFromHash();
  } else {
    // Mobile: just set initial state
    currentSlideIndex = 0;
    alpineState.setCurrentSlide(0);
  }

  // Listen for hash changes (desktop only)
  if (!isMobile) {
    window.addEventListener('hashchange', handleHashChange);
  }

  // Keyboard navigation (desktop only)
  if (!isMobile) {
    document.addEventListener('keydown', (e) => {
      const activeCarousel = getActiveCarousel();

      // Handle fullscreen toggle with 'F' key
      if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
        return;
      }

      // Handle URL sync toggle with 'L' key
      if (e.key === 'l' || e.key === 'L') {
        e.preventDefault();
        toggleUrlSync();
        return;
      }

      // Navigate with Arrow keys, Page Up/Down, and Space
      if (
        e.key === 'ArrowDown' ||
        e.key === 'PageDown' ||
        (e.key === ' ' && !e.shiftKey)
      ) {
        e.preventDefault();
        navigateToNextSlide();
      } else if (
        e.key === 'ArrowUp' ||
        e.key === 'PageUp' ||
        (e.key === ' ' && e.shiftKey)
      ) {
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

  // Update on resize
  window.addEventListener('resize', () => {
    const wasMobile = isMobile;
    isMobile = checkIfMobile();

    // If switching from mobile to desktop, reinitialize
    if (wasMobile && !isMobile) {
      initializeFromHash();
    }
  });
}

function initializeFromHash() {
  const hash = window.location.hash.substring(1); // Remove the '#'
  if (hash) {
    const slideElement = document.getElementById(hash);
    if (slideElement) {
      const index = slides.indexOf(slideElement);
      if (index !== -1) {
        currentSlideIndex = index;
        navigateToSlide(index, false); // Don't update hash since we're reading from it
        alpineState.setCurrentSlide(index);
        return;
      }
    }
  }

  // Default to first slide
  currentSlideIndex = 0;
  alpineState.setCurrentSlide(0);
  updateHash(0);
}

function handleHashChange() {
  const hash = window.location.hash.substring(1);
  if (hash) {
    const slideElement = document.getElementById(hash);
    if (slideElement) {
      const index = slides.indexOf(slideElement);
      if (index !== -1 && index !== currentSlideIndex) {
        currentSlideIndex = index;
        navigateToSlide(index, false); // Don't update hash since we're responding to hash change
        alpineState.setCurrentSlide(index);
      }
    }
  }
}

function updateHash(slideIndex) {
  // Check if URL syncing is enabled
  if (
    alpineState.isUrlSyncEnabled() &&
    slideIndex >= 0 &&
    slideIndex < slides.length
  ) {
    const slideId = slides[slideIndex].id;
    // Use history.replaceState to avoid creating new history entries
    history.replaceState(null, null, `#${slideId}`);
  }
}

function navigateToSlide(slideIndex, updateHashFlag = true) {
  if (slideIndex >= 0 && slideIndex < slides.length) {
    // Desktop only: smooth scroll with snap
    if (!isMobile) {
      slides[slideIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      if (updateHashFlag) {
        updateHash(slideIndex);
      }
    }
    alpineState.setCurrentSlide(slideIndex);
  }
}

function navigateToNextSlide() {
  // Mobile: do nothing, let natural scroll happen
  if (isMobile) return;

  const activeCarousel = getActiveCarousel();

  // If there's an active carousel and it's not at the end, navigate within it
  if (activeCarousel && !activeCarousel.isAtEnd()) {
    activeCarousel.next();
    return;
  }

  const nextIndex = currentSlideIndex + 1;

  if (nextIndex < slides.length) {
    currentSlideIndex = nextIndex;
    navigateToSlide(nextIndex);
  }
}

function navigateToPrevSlide() {
  // Mobile: do nothing, let natural scroll happen
  if (isMobile) return;

  const activeCarousel = getActiveCarousel();

  // If there's an active carousel and it's not at the start, navigate within it
  if (activeCarousel && !activeCarousel.isAtStart()) {
    activeCarousel.prev();
    return;
  }

  const prevIndex = currentSlideIndex - 1;

  if (prevIndex >= 0) {
    currentSlideIndex = prevIndex;
    navigateToSlide(prevIndex);
  }
}

export function initNavigationButtons() {
  const nextBtn = document.getElementById('next-slide-btn');
  const prevBtn = document.getElementById('prev-slide-btn');
  const fullscreenBtn = document.getElementById('fullscreen-btn');

  // Desktop buttons only (mobile buttons removed)
  if (nextBtn) {
    nextBtn.addEventListener('click', navigateToNextSlide);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', navigateToPrevSlide);
  }

  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', toggleFullscreen);
  }

  // Initialize navigation dots click handlers (desktop only)
  const navDots = document.querySelectorAll('.nav-dot');
  navDots.forEach((dot, index) => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      if (!isMobile) {
        currentSlideIndex = index;
        navigateToSlide(index);
      }
    });
  });

  // Update button states based on current slide
  setupSlideObserver((entry, slideIndex) => {
    currentSlideIndex = slideIndex;
    if (!isMobile) {
      updateNavigationButtons(slideIndex, slides.length);
      updateHash(slideIndex);
    }
    alpineState.setCurrentSlide(slideIndex);
  });
}

function updateNavigationButtons(currentIndex, totalSlides) {
  const prevBtn = document.getElementById('prev-slide-btn');
  const nextBtn = document.getElementById('next-slide-btn');

  // Update desktop buttons only
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
