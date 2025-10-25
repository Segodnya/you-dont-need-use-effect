/**
 * URL sync toggle functionality
 */

/**
 * Toggle URL syncing and update the URL accordingly
 */
export function toggleUrlSync() {
  const body = document.body;
  const state = body._x_dataStack?.[0];
  
  if (!state) return;
  
  // Toggle the state
  state.syncUrlWithSlide = !state.syncUrlWithSlide;
  
  // Update URL based on new state
  if (state.syncUrlWithSlide) {
    // Sync enabled: add current slide to URL
    const slides = Array.from(document.querySelectorAll('.slide'));
    const currentSlide = slides[state.currentSlide];
    if (currentSlide) {
      history.replaceState(null, null, '#' + currentSlide.id);
    }
  } else {
    // Sync disabled: clear hash from URL
    history.replaceState(null, null, window.location.pathname + window.location.search);
  }
}

/**
 * Initialize URL sync toggle buttons
 */
export function initUrlSyncToggle() {
  const buttons = document.querySelectorAll('.url-sync-toggle-btn');
  
  buttons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      toggleUrlSync();
    });
  });
}
