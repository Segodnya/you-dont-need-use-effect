/**
 * Shared button style constants to follow DRY principle
 * These classes are used across navigation buttons, carousel controls, etc.
 */

const BUTTON_STYLES = {
  base: 'nav-button backdrop-blur-sm text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-cyan-400',
  primary: 'bg-gray-800/80 hover:bg-cyan-600/90',
  disabled:
    'disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100',
  sizes: {
    sm: 'p-2',
    md: 'p-3',
    lg: 'p-4',
  },
  icon: {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  },
} as const;

const CAROUSEL_BUTTON_STYLES = {
  base: 'carousel-btn text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400 shrink-0',
  primary: 'bg-blue-600/80 hover:bg-blue-500',
  disabled:
    'disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100',
  size: 'p-4',
} as const;

/**
 * Build complete button class string
 */
export function buildButtonClass(
  type: 'nav' | 'carousel' = 'nav',
  size: 'sm' | 'md' | 'lg' = 'md',
  canDisable: boolean = false,
  additionalClasses: string = ''
): string {
  if (type === 'carousel') {
    const classes: string[] = [
      CAROUSEL_BUTTON_STYLES.base,
      CAROUSEL_BUTTON_STYLES.primary,
      CAROUSEL_BUTTON_STYLES.size,
    ];
    if (canDisable) {
      classes.push(CAROUSEL_BUTTON_STYLES.disabled);
    }
    if (additionalClasses) {
      classes.push(additionalClasses);
    }
    return classes.join(' ');
  }

  // Nav button
  const classes: string[] = [
    BUTTON_STYLES.base,
    BUTTON_STYLES.primary,
    BUTTON_STYLES.sizes[size],
  ];
  if (canDisable) {
    classes.push(BUTTON_STYLES.disabled);
  }
  if (additionalClasses) {
    classes.push(additionalClasses);
  }
  return classes.join(' ');
}

/**
 * Get icon size class for a button size
 */
export function getIconSize(size: 'sm' | 'md' | 'lg' = 'md'): string {
  return BUTTON_STYLES.icon[size];
}
