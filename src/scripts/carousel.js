/**
 * Carousel functionality for slides with multiple content items
 */

class Carousel {
  constructor(container) {
    this.container = container;
    this.id = container.dataset.carouselId;
    this.items = Array.from(container.querySelectorAll('.carousel-item'));
    this.currentIndex = 0;
    this.totalItems = this.items.length;
    
    this.prevBtn = container.querySelector('.carousel-prev-btn');
    this.nextBtn = container.querySelector('.carousel-next-btn');
    this.currentIndexEl = container.querySelector('.current-index');
    this.totalItemsEl = container.querySelector('.total-items');
    this.dotsContainer = container.querySelector('.carousel-dots');
    
    this.init();
  }

  init() {
    // Set total items
    if (this.totalItemsEl) {
      this.totalItemsEl.textContent = this.totalItems;
    }

    // Create dots
    this.createDots();

    // Show first item
    this.showItem(0);

    // Add event listeners
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.prev();
      });
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.next();
      });
    }

    // Add keyboard navigation
    this.addKeyboardNavigation();
  }

  createDots() {
    if (!this.dotsContainer) return;

    this.items.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.className = 'carousel-dot';
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        this.goTo(index);
      });
      this.dotsContainer.appendChild(dot);
    });
  }

  showItem(index) {
    // Hide all items
    this.items.forEach(item => item.classList.remove('active'));
    
    // Show current item
    this.items[index].classList.add('active');
    this.currentIndex = index;

    // Update indicator
    if (this.currentIndexEl) {
      this.currentIndexEl.textContent = index + 1;
    }

    // Update buttons state
    this.updateButtonsState();

    // Update dots
    this.updateDots();
  }

  updateButtonsState() {
    if (this.prevBtn) {
      this.prevBtn.disabled = this.currentIndex === 0;
    }
    if (this.nextBtn) {
      this.nextBtn.disabled = this.currentIndex === this.totalItems - 1;
    }
  }

  updateDots() {
    if (!this.dotsContainer) return;

    const dots = this.dotsContainer.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
      if (index === this.currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  next() {
    if (this.currentIndex < this.totalItems - 1) {
      this.showItem(this.currentIndex + 1);
      return true;
    }
    return false;
  }

  prev() {
    if (this.currentIndex > 0) {
      this.showItem(this.currentIndex - 1);
      return true;
    }
    return false;
  }

  goTo(index) {
    if (index >= 0 && index < this.totalItems) {
      this.showItem(index);
    }
  }

  isAtStart() {
    return this.currentIndex === 0;
  }

  isAtEnd() {
    return this.currentIndex === this.totalItems - 1;
  }

  addKeyboardNavigation() {
    // We'll handle this in the navigation.js by checking if carousel is active
  }
}

// Store for active carousels
const carousels = new Map();

export function initCarousels() {
  const carouselContainers = document.querySelectorAll('.carousel-container');
  
  carouselContainers.forEach(container => {
    const carousel = new Carousel(container);
    carousels.set(carousel.id, carousel);
  });
}

export function getActiveCarousel() {
  // Check if the active slide has a carousel
  const activeSlide = document.querySelector('.slide.active');
  if (!activeSlide) return null;

  const carouselContainer = activeSlide.querySelector('.carousel-container');
  if (!carouselContainer) return null;

  const carouselId = carouselContainer.dataset.carouselId;
  return carousels.get(carouselId);
}

export function hasActiveCarousel() {
  return getActiveCarousel() !== null;
}
