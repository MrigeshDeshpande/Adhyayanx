/**
 * Color Constants
 * 
 * Centralized color palette for the entire application.
 * This file contains all colors used across components.
 * 
 * Color Palette:
 * - Light mode: Cream/beige backgrounds with brown accents
 * - Dark mode: Black backgrounds with beige/brown accents
 */

export const COLORS = {
    /**
     * Core palette colors
     */
    palette: {
        // Light mode backgrounds
        offWhite: '#f5f5f0',      // Light off-white/gray background
        beigeCream: '#ebe8de',    // Beige/cream for cards
        lightTaupe: '#d4cfc4',    // Light taupe for borders/secondary

        // Accent colors
        brownTaupe: '#a89f91',    // Primary brown/taupe accent
        darkerBrown: '#8b8375',   // Darker brown for gradients

        // Text colors
        midGray: '#6b6b6b',       // Mid gray for muted text

        // Dark mode backgrounds
        pureBlack: '#0a0a0a',     // Pure black background
        darkGray: '#1a1a1a',      // Dark gray/black for cards
        lightBlack: '#2a2a2a',    // Slightly lighter black for borders
    },

    /**
     * Gradient combinations
     * Use these for consistent gradient styling
     */
    gradients: {
        primary: 'from-[#a89f91] to-[#8b8375]',  // Brown/taupe gradient
    },

    /**
     * Shadow colors with opacity
     */
    shadows: {
        primary: 'shadow-[#a89f91]/20',  // Brown shadow with 20% opacity
    },
} as const;

/**
 * Type for accessing color palette
 */
export type ColorPalette = typeof COLORS.palette;
export type ColorGradients = typeof COLORS.gradients;
export type ColorShadows = typeof COLORS.shadows;
