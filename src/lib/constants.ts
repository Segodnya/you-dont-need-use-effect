/**
 * Shared gradient color schemes used across components
 * These provide consistent visual themes throughout the application
 */

export type ColorVariant = 
  | 'blue' 
  | 'green' 
  | 'red' 
  | 'yellow' 
  | 'purple' 
  | 'cyan' 
  | 'pink' 
  | 'gray';

export type StatusVariant = 
  | 'info' 
  | 'success' 
  | 'error' 
  | 'warning' 
  | 'tip' 
  | 'primary';

/**
 * Gradient background classes for the blurred backdrop effect
 * Format: from-{color}-via-{color}-to-{color} with 20% opacity
 */
export const GRADIENT_BACKGROUNDS: Record<ColorVariant, string> = {
  blue: 'from-blue-500/20 via-purple-500/20 to-cyan-500/20',
  green: 'from-green-500/20 via-emerald-500/20 to-teal-500/20',
  red: 'from-red-500/20 via-rose-500/20 to-pink-500/20',
  yellow: 'from-yellow-500/20 via-amber-500/20 to-orange-500/20',
  purple: 'from-purple-500/20 via-violet-500/20 to-indigo-500/20',
  cyan: 'from-cyan-500/20 via-blue-500/20 to-indigo-500/20',
  pink: 'from-pink-500/20 via-rose-500/20 to-red-500/20',
  gray: 'from-gray-500/20 via-gray-600/20 to-gray-700/20',
};

/**
 * Map status variants to color variants
 */
export const STATUS_TO_COLOR: Record<StatusVariant, ColorVariant> = {
  info: 'blue',
  success: 'green',
  error: 'red',
  warning: 'yellow',
  tip: 'yellow',
  primary: 'purple',
};

/**
 * Border colors for each variant
 */
export const BORDER_COLORS: Record<ColorVariant, string> = {
  blue: 'border-blue-400/40',
  green: 'border-green-400/40',
  red: 'border-red-400/40',
  yellow: 'border-yellow-400/40',
  purple: 'border-purple-400/40',
  cyan: 'border-cyan-400/40',
  pink: 'border-pink-400/40',
  gray: 'border-gray-400/40',
};

/**
 * Background colors for card content
 */
export const BACKGROUND_COLORS: Record<ColorVariant, string> = {
  blue: 'bg-blue-950/40',
  green: 'bg-green-950/40',
  red: 'bg-red-950/40',
  yellow: 'bg-yellow-950/40',
  purple: 'bg-purple-950/40',
  cyan: 'bg-cyan-950/40',
  pink: 'bg-pink-950/40',
  gray: 'bg-gray-950/40',
};

/**
 * Shadow colors for each variant
 */
export const SHADOW_COLORS: Record<ColorVariant, string> = {
  blue: 'shadow-blue-500/10',
  green: 'shadow-green-500/10',
  red: 'shadow-red-500/10',
  yellow: 'shadow-yellow-500/10',
  purple: 'shadow-purple-500/10',
  cyan: 'shadow-cyan-500/10',
  pink: 'shadow-pink-500/10',
  gray: 'shadow-gray-500/10',
};

/**
 * Text colors for titles
 */
export const TITLE_COLORS: Record<ColorVariant, string> = {
  blue: 'text-blue-400',
  green: 'text-green-400',
  red: 'text-red-400',
  yellow: 'text-yellow-400',
  purple: 'text-purple-400',
  cyan: 'text-cyan-400',
  pink: 'text-pink-400',
  gray: 'text-gray-400',
};

/**
 * Text colors for content
 */
export const TEXT_COLORS: Record<ColorVariant, string> = {
  blue: 'text-blue-200',
  green: 'text-green-200',
  red: 'text-red-200',
  yellow: 'text-yellow-200',
  purple: 'text-purple-200',
  cyan: 'text-cyan-200',
  pink: 'text-pink-200',
  gray: 'text-gray-200',
};

/**
 * Secondary text colors (300 level)
 */
export const TITLE_COLORS_LIGHT: Record<ColorVariant, string> = {
  blue: 'text-blue-300',
  green: 'text-green-300',
  red: 'text-red-300',
  yellow: 'text-yellow-300',
  purple: 'text-purple-300',
  cyan: 'text-cyan-300',
  pink: 'text-pink-300',
  gray: 'text-gray-300',
};

/**
 * Default icons for status variants
 */
export const STATUS_ICONS: Record<StatusVariant, string> = {
  info: '💡',
  success: '✅',
  error: '❌',
  warning: '⚠️',
  tip: '💡',
  primary: '🔑',
};

/**
 * Get a complete theme configuration for a color variant
 */
export function getColorTheme(color: ColorVariant) {
  return {
    gradient: GRADIENT_BACKGROUNDS[color],
    border: BORDER_COLORS[color],
    background: BACKGROUND_COLORS[color],
    shadow: SHADOW_COLORS[color],
    title: TITLE_COLORS[color],
    text: TEXT_COLORS[color],
    titleLight: TITLE_COLORS_LIGHT[color],
  };
}

/**
 * Get a complete theme configuration for a status variant
 */
export function getStatusTheme(status: StatusVariant) {
  const color = STATUS_TO_COLOR[status];
  return {
    ...getColorTheme(color),
    icon: STATUS_ICONS[status],
  };
}
