/**
 * Presentation slide animations and tracking
 */

export function initSlideAnimations() {
  const slides = document.querySelectorAll('.slide');
  const progress = document.getElementById('scroll-progress');

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

  // Update progress bar on scroll
  window.addEventListener('scroll', () => {
    const winHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset;
    const scrollPercent = scrollTop / (docHeight - winHeight);

    if (progress) {
      progress.style.width = `${scrollPercent * 100}%`;
    }
  });
}
