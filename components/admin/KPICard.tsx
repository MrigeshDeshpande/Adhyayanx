"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import CircularProgress from "./CircularProgress";
import { TrendingUp, TrendingDown } from "lucide-react";

interface KPICardProps {
    title: string;
    value?: string | number;
    subtitle?: string;
    trend?: {
        value: number;
        label: string;
    };
    status?: "good" | "warning" | "critical";
    percentage?: number;
    icon?: React.ReactNode;
    gradient?: string;
    glowColor?: string;
}

export default function KPICard({
    title,
    value,
    subtitle,
    trend,
    status,
    percentage,
    icon,
    gradient = "from-primary/20 to-accent/20",
    glowColor = "rgba(168, 159, 145, 0.3)",
}: KPICardProps) {
    const getStatusColor = () => {
        if (!status) return "hsl(var(--primary))";
        switch (status) {
            case "good":
                return "#10b981";
            case "warning":
                return "#eab308";
            case "critical":
                return "#ef4444";
        }
    };

    const getTrendColor = () => {
        if (!trend) return "";
        return trend.value >= 0
            ? "text-emerald-600 dark:text-emerald-400"
            : "text-red-600 dark:text-red-400";
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    };

    return (
        <motion.div
            variants={cardVariants}
            whileHover={{
                scale: 1.01,
                y: -2,
                transition: { duration: 0.2 },
            }}
            className="h-full"
        >
            <Card
                className="h-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
                <CardContent className="p-8 flex flex-col h-full">
                    {/* Fixed height container */}
                    <div className="flex flex-col gap-6 flex-1">
                        {/* Title and Icon */}
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                                {title}
                            </p>
                            {icon && (
                                <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} text-white`}>
                                    {icon}
                                </div>
                            )}
                        </div>

                        {/* Main content - centered */}
                        <div className="flex items-center justify-center flex-1">
                            {percentage !== undefined ? (
                                <CircularProgress
                                    value={percentage}
                                    size={110}
                                    strokeWidth={10}
                                    color="currentColor"
                                    showPercentage={true}
                                />
                            ) : (
                                <div className="text-center">
                                    <p className="text-5xl font-bold text-gray-900 dark:text-white">
                                        {value}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Subtitle */}
                        {subtitle && (
                            <p className="text-sm text-gray-500 dark:text-gray-400 text-center font-medium">{subtitle}</p>
                        )}

                        {/* Trend */}
                        {/* Trend */}
                        {trend && (
                            <div
                                className={`flex items-center justify-center gap-1 text-xs font-semibold ${getTrendColor()} bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2`}
                            >
                                {trend.value >= 0 ? (
                                    <TrendingUp className="h-3.5 w-3.5" />
                                ) : (
                                    <TrendingDown className="h-3.5 w-3.5" />
                                )}
                                <span>
                                    {trend.value > 0 ? "+" : ""}
                                    {trend.value}% {trend.label}
                                </span>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
