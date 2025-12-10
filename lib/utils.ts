/**
 * Utility Functions Module
 *
 * Provides common utility functions used throughout the application.
 *
 * @module utils
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines and merges CSS class names intelligently.
 *
 * This function uses clsx to handle conditional classes and twMerge to
 * properly merge Tailwind CSS classes, preventing conflicts and ensuring
 * that later classes override earlier ones when they target the same property.
 *
 * @param inputs - Variable number of class values (strings, objects, arrays, etc.)
 * @returns A merged string of class names
 *
 * @example
 * ```typescript
 * // Basic usage
 * cn('px-2 py-1', 'bg-blue-500')
 * // Returns: 'px-2 py-1 bg-blue-500'
 *
 * // Conditional classes
 * cn('px-2', isActive && 'bg-blue-500', !isActive && 'bg-gray-500')
 *
 * // Overriding Tailwind classes
 * cn('px-2 py-1', 'px-4')
 * // Returns: 'py-1 px-4' (px-4 overrides px-2)
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
