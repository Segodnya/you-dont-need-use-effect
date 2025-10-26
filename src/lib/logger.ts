/**
 * Logger utility - Centralized logging with debug mode control
 * Makes it easy to toggle debug logs in production
 */

const IS_DEV = import.meta.env.DEV;
const DEBUG_ENABLED = IS_DEV || localStorage?.getItem('debug') === 'true';

export const logger = {
  log: (...args: any[]) => {
    if (DEBUG_ENABLED) {
      console.log(...args);
    }
  },

  error: (...args: any[]) => {
    // Always show errors
    console.error(...args);
  },

  warn: (...args: any[]) => {
    if (DEBUG_ENABLED) {
      console.warn(...args);
    }
  },

  info: (...args: any[]) => {
    if (DEBUG_ENABLED) {
      console.info(...args);
    }
  },

  debug: (...args: any[]) => {
    if (DEBUG_ENABLED) {
      console.debug(...args);
    }
  },
};

// Helper to enable debug mode in browser console: enableDebug()
if (typeof window !== 'undefined') {
  (window as any).enableDebug = () => {
    localStorage?.setItem('debug', 'true');
    console.log('Debug mode enabled. Reload the page to see debug logs.');
  };

  (window as any).disableDebug = () => {
    localStorage?.removeItem('debug');
    console.log('Debug mode disabled. Reload the page.');
  };
}
