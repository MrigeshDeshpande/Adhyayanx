"use client";

import { motion } from "framer-motion";
import { COLORS } from "@/lib/constants";

interface CircularProgressProps {
    value: number; // 0-100
    size?: number;
    strokeWidth?: number;
    color?: string;
    label?: string;
    showPercentage?: boolean;
}

export default function CircularProgress({
    value,
    size = 120,
    strokeWidth = 8,
    color = COLORS.palette.brownTaupe,
    label,
    showPercentage = true,
}: CircularProgressProps) {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (value / 100) * circumference;

    return (
        <div className="relative inline-flex items-center justify-center">
            <svg width={size} height={size} className="transform -rotate-90">
                {/* Background circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    fill="none"
                    className="text-muted/20"
                />
                {/* Progress circle */}
                <motion.circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={color}
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1, ease: "easeOut" }}
                />
            </svg>
            {/* Center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                {showPercentage && (
                    <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="text-2xl font-bold"
                    >
                        {value}%
                    </motion.span>
                )}
                {label && (
                    <span className="text-xs text-muted-foreground mt-1">{label}</span>
                )}
            </div>
        </div>
    );
}
