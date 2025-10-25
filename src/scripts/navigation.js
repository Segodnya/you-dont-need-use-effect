/**
 * Navigation controls for presentation slides
 */

import { getActiveCarousel } from './carousel.js';
import { updateCurrentSlide, isUrlSyncEnabled } from './utils.js';

let slides = [];
let currentSlideIndex = 0;

export function initKeyboardNavigation() {
  // Initialize slides array
  slides = Array.from(document.querySelectorAll('.slide'));
  
  // Initialize from URL hash or start at first slide
  initializeFromHash();
  
  // Listen for hash changes
  window.addEventListener('hashchange', handleHashChange);
  
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

function initializeFromHash() {
  const hash = window.location.hash.substring(1); // Remove the '#'
  if (hash) {
    const slideElement = document.getElementById(hash);
    if (slideElement) {
      const index = slides.indexOf(slideElement);
      if (index !== -1) {
        currentSlideIndex = index;
        navigateToSlide(index, false); // Don't update hash since we're reading from it
        updateCurrentSlide(index);
        return;
      }
    }
  }
  
  // Default to first slide
  currentSlideIndex = 0;
  updateCurrentSlide(0);
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
        updateCurrentSlide(index);
      }
    }
  }
}

function updateHash(slideIndex) {
  // Check if URL syncing is enabled
  if (isUrlSyncEnabled() && slideIndex >= 0 && slideIndex < slides.length) {
    const slideId = slides[slideIndex].id;
    // Use history.replaceState to avoid creating new history entries
    history.replaceState(null, null, `#${slideId}`);
  }
}

function navigateToSlide(slideIndex, updateHashFlag = true) {
  if (slideIndex >= 0 && slideIndex < slides.length) {
    slides[slideIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
    if (updateHashFlag) {
      updateHash(slideIndex);
    }
    updateCurrentSlide(slideIndex);
  }
}

export function navigateToNextSlide() {
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

export function navigateToPrevSlide() {
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
  
  // Mobile buttons
  const nextBtnMobile = document.getElementById('next-slide-btn-mobile');
  const prevBtnMobile = document.getElementById('prev-slide-btn-mobile');
  const fullscreenBtnMobile = document.getElementById('fullscreen-btn-mobile');

  // Desktop buttons
  if (nextBtn) {
    nextBtn.addEventListener('click', navigateToNextSlide);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', navigateToPrevSlide);
  }

  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', toggleFullscreen);
  }

  // Mobile buttons
  if (nextBtnMobile) {
    nextBtnMobile.addEventListener('click', navigateToNextSlide);
  }

  if (prevBtnMobile) {
    prevBtnMobile.addEventListener('click', navigateToPrevSlide);
  }

  if (fullscreenBtnMobile) {
    fullscreenBtnMobile.addEventListener('click', toggleFullscreen);
  }

  // Initialize navigation dots click handlers
  const navDots = document.querySelectorAll('.nav-dot');
  navDots.forEach((dot, index) => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      currentSlideIndex = index;
      navigateToSlide(index);
    });
  });

  // Update button states based on current slide
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const slideIndex = Array.from(slides).indexOf(entry.target);
          if (slideIndex !== -1) {
            currentSlideIndex = slideIndex;
            updateNavigationButtons(slideIndex, slides.length);
            updateCurrentSlide(slideIndex);
            updateHash(slideIndex);
          }
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
  const prevBtnMobile = document.getElementById('prev-slide-btn-mobile');
  const nextBtnMobile = document.getElementById('next-slide-btn-mobile');

  // Update desktop buttons
  if (prevBtn) {
    prevBtn.disabled = currentIndex === 0;
    prevBtn.style.opacity = currentIndex === 0 ? '0.3' : '1';
  }

  if (nextBtn) {
    nextBtn.disabled = currentIndex === totalSlides - 1;
    nextBtn.style.opacity = currentIndex === totalSlides - 1 ? '0.3' : '1';
  }

  // Update mobile buttons
  if (prevBtnMobile) {
    prevBtnMobile.disabled = currentIndex === 0;
    prevBtnMobile.style.opacity = currentIndex === 0 ? '0.3' : '1';
  }

  if (nextBtnMobile) {
    nextBtnMobile.disabled = currentIndex === totalSlides - 1;
    nextBtnMobile.style.opacity = currentIndex === totalSlides - 1 ? '0.3' : '1';
  }

  // Update progress bar
  const progressBar = document.getElementById('scroll-progress');
  if (progressBar) {
    const progress = totalSlides > 1 ? (currentIndex / (totalSlides - 1)) * 100 : 0;
    progressBar.style.width = `${progress}%`;
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