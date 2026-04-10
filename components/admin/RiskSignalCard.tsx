"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, ChevronRight } from "lucide-react";

interface RiskSignalCardProps {
    type: "critical" | "warning";
    title: string;
    count?: number;
    message: string;
    actionLink: string;
}

export default function RiskSignalCard({
    type,
    title,
    count,
    message,
    actionLink,
}: RiskSignalCardProps) {
    const getColor = () => {
        return type === "critical"
            ? "rose-500"
            : "amber-500";
    };

    const getBgColor = () => {
        return type === "critical"
            ? "bg-rose-50 dark:bg-rose-950/20"
            : "bg-amber-50 dark:bg-amber-950/20";
    };

    const getTextColor = () => {
        return type === "critical"
            ? "text-rose-600 dark:text-rose-400"
            : "text-amber-600 dark:text-amber-400";
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
            className="rounded-xl overflow-hidden"
        >
            <div className={`p-5 border ${getBgColor()} border-gray-200 dark:border-gray-800 hover:shadow-md transition-shadow rounded-xl`}>
                <div className="flex items-start gap-4">
                    <div className={`p-2.5 rounded-lg ${getTextColor()} bg-white dark:bg-gray-900`}>
                        <AlertCircle className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold text-gray-900 dark:text-gray-100">{title}</h4>
                            {count !== undefined && (
                                <Badge variant="outline" className="text-xs">
                                    {count}
                                </Badge>
                            )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{message}</p>
                        <a
                            href={actionLink}
                            className={`inline-flex items-center gap-1 text-sm font-medium ${getTextColor()} hover:underline`}
                        >
                            View Details
                            <ChevronRight className="h-4 w-4" />
                        </a>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
