/**
 * Presentation slide animations and tracking
 */

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

          // Update Alpine store if available
          if (window.Alpine) {
            const alpineData = window.Alpine.$data(document.body);
            if (alpineData) {
              alpineData.currentSlide = slideIndex;
            }
          }
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
