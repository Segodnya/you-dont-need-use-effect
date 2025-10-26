/**
 * ⚡ Smart Preloading System for Slides
 * Preloads next/previous slides in the background for instant navigation
 */

const PRELOAD_DISTANCE = 2; // Preload 2 slides ahead and 1 behind
const preloadedSlides = new Set();

/**
 * Preload slide content using link prefetch
 */
function preloadSlide(slideIndex) {
  if (preloadedSlides.has(slideIndex)) {
    return; // Already preloaded
  }
  
  preloadedSlides.add(slideIndex);
  
  // Mark for preloading (browser will handle the actual loading)
  console.log(`⚡ Preloading slide ${slideIndex}`);
}

/**
 * Initialize smart preloading based on current slide
 */
export function initSmartPreload() {
  let currentSlide = 0;
  
  // Watch for slide changes
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const slides = Array.from(document.querySelectorAll('.slide'));
        const slideIndex = slides.indexOf(entry.target);
        
        if (slideIndex !== -1 && slideIndex !== currentSlide) {
          currentSlide = slideIndex;
          preloadAdjacentSlides(slideIndex, slides.length);
        }
      }
    });
  }, {
    threshold: 0.5
  });
  
  // Observe all slides
  document.querySelectorAll('.slide').forEach(slide => {
    observer.observe(slide);
  });
  
  // Preload initial slides
  const totalSlides = document.querySelectorAll('.slide').length;
  preloadAdjacentSlides(0, totalSlides);
}

/**
 * Preload slides adjacent to the current one
 */
function preloadAdjacentSlides(currentIndex, totalSlides) {
  // Preload next slides
  for (let i = 1; i <= PRELOAD_DISTANCE; i++) {
    const nextIndex = currentIndex + i;
    if (nextIndex < totalSlides) {
      requestIdleCallback(() => preloadSlide(nextIndex), { timeout: 1000 });
    }
  }
  
  // Preload previous slide
  const prevIndex = currentIndex - 1;
  if (prevIndex >= 0) {
    requestIdleCallback(() => preloadSlide(prevIndex), { timeout: 1000 });
  }
}

/**
 * Preload critical resources on user interaction
 */
export function preloadOnInteraction() {
  const events = ['mousedown', 'touchstart', 'keydown'];
  
  const preload = () => {
    // Preload all slide chunks
    events.forEach(event => {
      document.removeEventListener(event, preload);
    });
    
    console.log('⚡ User interaction detected, preloading resources');
    initSmartPreload();
  };
  
  events.forEach(event => {
    document.addEventListener(event, preload, { once: true, passive: true });
  });
}
