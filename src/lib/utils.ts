/**
 * Configuration constants and utility functions
 */

/**
 * Intersection Observer configuration
 */
export const OBSERVER_CONFIG = {
  /** Default threshold for slide visibility (50% visible) */
  SLIDE_THRESHOLD: 0.5,
  /** Margin before slide enters viewport for carousel preloading */
  CAROUSEL_PRELOAD_MARGIN: '50px',
  /** Margin for slide tracking to prevent premature activation */
  SLIDE_ROOT_MARGIN: '-10% 0px -10% 0px',
} as const;

/**
 * Timing configuration
 */
export const TIMING_CONFIG = {
  /** Delay before setting up Alpine sync (ms) */
  ALPINE_SYNC_DELAY: 100,
  /** Timeout for idle callback operations (ms) */
  IDLE_TIMEOUT: 1000,
  /** Timeout for deferred carousel initialization (ms) */
  CAROUSEL_INIT_TIMEOUT: 2000,
  /** Delay before showing page content to avoid FOUC (ms) */
  PAGE_LOAD_DELAY: 50,
} as const;

/**
 * Preloading configuration
 */
export const PRELOAD_CONFIG = {
  /** Number of slides to preload ahead */
  PRELOAD_DISTANCE: 2,
  /** Events that trigger preloading */
  INTERACTION_EVENTS: ['mousedown', 'touchstart', 'keydown'] as const,
} as const;
