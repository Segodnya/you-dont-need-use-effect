/**
 * ⚡ Performance Monitoring & Optimization Utilities
 */

/**
 * Monitor and log Core Web Vitals
 */
export function monitorPerformance() {
  // Only run in production or when explicitly enabled
  if (import.meta.env.DEV) return;

  // Largest Contentful Paint (LCP)
  new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    const lastEntry = entries[entries.length - 1];
    console.log('⚡ LCP:', lastEntry.renderTime || lastEntry.loadTime);
  }).observe({ type: 'largest-contentful-paint', buffered: true });

  // First Input Delay (FID)
  new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    entries.forEach((entry) => {
      const fid = entry.processingStart - entry.startTime;
      console.log('⚡ FID:', fid);
    });
  }).observe({ type: 'first-input', buffered: true });

  // Cumulative Layout Shift (CLS)
  let clsScore = 0;
  new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      if (!entry.hadRecentInput) {
        clsScore += entry.value;
      }
    }
    console.log('⚡ CLS:', clsScore);
  }).observe({ type: 'layout-shift', buffered: true });

  // Time to Interactive (TTI) approximation
  if (document.readyState === 'complete') {
    logTTI();
  } else {
    window.addEventListener('load', logTTI);
  }
}

function logTTI() {
  const navTiming = performance.getEntriesByType('navigation')[0];
  if (navTiming) {
    const tti = navTiming.domInteractive - navTiming.fetchStart;
    console.log('⚡ TTI (approx):', tti);
  }
}

/**
 * Log bundle sizes and loading times
 */
export function logResourceTiming() {
  window.addEventListener('load', () => {
    const resources = performance.getEntriesByType('resource');
    const scripts = resources.filter(r => r.name.endsWith('.js'));
    const styles = resources.filter(r => r.name.endsWith('.css'));
    
    const totalScriptSize = scripts.reduce((acc, r) => acc + (r.transferSize || 0), 0);
    const totalStyleSize = styles.reduce((acc, r) => acc + (r.transferSize || 0), 0);
    
    console.group('⚡ Resource Performance');
    console.log('JavaScript:', (totalScriptSize / 1024).toFixed(2), 'KB');
    console.log('CSS:', (totalStyleSize / 1024).toFixed(2), 'KB');
    console.log('Total Resources:', resources.length);
    console.groupEnd();
  });
}

/**
 * Optimize third-party scripts
 */
export function optimizeThirdParty() {
  // Delay third-party scripts until after page interaction
  const delayedScripts = [];
  
  const loadDelayedScripts = () => {
    delayedScripts.forEach(({ src, strategy }) => {
      const script = document.createElement('script');
      script.src = src;
      if (strategy === 'async') script.async = true;
      if (strategy === 'defer') script.defer = true;
      document.head.appendChild(script);
    });
  };

  // Load on first user interaction
  const events = ['mousedown', 'touchstart', 'keydown', 'scroll'];
  events.forEach(event => {
    window.addEventListener(event, () => {
      loadDelayedScripts();
      events.forEach(e => window.removeEventListener(e, loadDelayedScripts));
    }, { once: true, passive: true });
  });

  // Fallback: load after 5 seconds
  setTimeout(loadDelayedScripts, 5000);
}
