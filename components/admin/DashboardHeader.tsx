"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Calendar, Clock } from "lucide-react";

export default function DashboardHeader() {
    const [currentTime, setCurrentTime] = useState<Date | null>(null);
    const gradient = "from-indigo-600 to-purple-600";

    useEffect(() => {
        setCurrentTime(new Date());
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000);
        return () => clearInterval(timer);
    }, []);

    const formatDate = (date: Date) => {
        return date.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
        >
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Welcome back, <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>Admin</span>
            </h1>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400"
            >
                {currentTime ? (
                    <>
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                            <span>{formatDate(currentTime)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                            <motion.span
                                key={formatTime(currentTime)}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {formatTime(currentTime)}
                            </motion.span>
                        </div>
                    </>
                ) : (
                    <span className="opacity-0">Loading...</span>
                )}
            </motion.div>
        </motion.div>
    );
}
