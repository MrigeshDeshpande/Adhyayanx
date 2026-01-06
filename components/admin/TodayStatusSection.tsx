"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, CheckCircle2, FileText } from "lucide-react";

// Color-coded stats data with unified indigo/purple theme
const todayStats = [
    {
        label: "Scheduled Classes",
        value: 8,
        max: 10,
        icon: Calendar,
        progressGradient: "from-blue-500 to-blue-600",
        iconColor: "text-indigo-600 dark:text-indigo-400",
        iconBg: "bg-indigo-50 dark:bg-indigo-950/30",
    },
    {
        label: "Ongoing Classes",
        value: 2,
        max: 8,
        icon: Clock,
        progressGradient: "from-cyan-500 to-cyan-600",
        iconColor: "text-cyan-600 dark:text-cyan-400",
        iconBg: "bg-cyan-50 dark:bg-cyan-950/30",
    },
    {
        label: "Completed Classes",
        value: 3,
        max: 8,
        icon: CheckCircle2,
        progressGradient: "from-emerald-500 to-emerald-600",
        iconColor: "text-emerald-600 dark:text-emerald-400",
        iconBg: "bg-emerald-50 dark:bg-emerald-950/30",
    },
    {
        label: "Pending Reports",
        value: 5,
        max: 8,
        icon: FileText,
        progressGradient: "from-amber-500 to-amber-600",
        iconColor: "text-amber-600 dark:text-amber-400",
        iconBg: "bg-amber-50 dark:bg-amber-950/30",
    },
];

const weekStats = [
    {
        label: "Scheduled Classes",
        value: 40,
        max: 50,
        icon: Calendar,
        progressGradient: "from-blue-500 to-blue-600",
        iconColor: "text-indigo-600 dark:text-indigo-400",
        iconBg: "bg-indigo-50 dark:bg-indigo-950/30",
    },
    {
        label: "Ongoing Classes",
        value: 8,
        max: 40,
        icon: Clock,
        progressGradient: "from-cyan-500 to-cyan-600",
        iconColor: "text-cyan-600 dark:text-cyan-400",
        iconBg: "bg-cyan-50 dark:bg-cyan-950/30",
    },
    {
        label: "Completed Classes",
        value: 25,
        max: 40,
        icon: CheckCircle2,
        progressGradient: "from-emerald-500 to-emerald-600",
        iconColor: "text-emerald-600 dark:text-emerald-400",
        iconBg: "bg-emerald-50 dark:bg-emerald-950/30",
    },
    {
        label: "Pending Reports",
        value: 15,
        max: 40,
        icon: FileText,
        progressGradient: "from-amber-500 to-amber-600",
        iconColor: "text-amber-600 dark:text-amber-400",
        iconBg: "bg-amber-50 dark:bg-amber-950/30",
    },
];

export default function TodayStatusSection() {
    const renderStats = (stats: typeof todayStats) => (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative rounded-2xl p-5 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 group"
                >
                    {/* Icon with subtle colored background */}
                    <div className="flex items-start justify-between mb-4">
                        <motion.div
                            className={`p-3 rounded-xl ${stat.iconBg} shadow-sm`}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ duration: 0.3 }}
                        >
                            <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
                        </motion.div>
                        <span className="text-xs font-semibold text-muted-foreground bg-background/50 dark:bg-background/30 px-2 py-1 rounded-full">
                            {stat.value}/{stat.max}
                        </span>
                    </div>

                    {/* Value */}
                    <motion.p
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                        className="text-4xl font-black mb-2 text-gray-900 dark:text-white"
                    >
                        {stat.value}
                    </motion.p>

                    {/* Label */}
                    <p className="text-sm font-semibold text-foreground dark:text-white/90 mb-3">{stat.label}</p>

                    {/* Progress Bar with gradient */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs font-semibold">
                            <span className="text-muted-foreground">Progress</span>
                            <span className={`bg-gradient-to-br ${stat.progressGradient} bg-clip-text text-transparent`}>
                                {Math.round((stat.value / stat.max) * 100)}%
                            </span>
                        </div>
                        <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${(stat.value / stat.max) * 100}%` }}
                                transition={{ duration: 1, delay: index * 0.1 + 0.3, ease: "easeOut" }}
                                className={`h-full bg-gradient-to-r ${stat.progressGradient} rounded-full relative`}
                            >
                                {/* Shimmer effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                            </motion.div>
                        </div>
                    </div>

                </motion.div>
            ))}
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-10"
        >
            <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600">
                            <Calendar className="h-5 w-5 text-white" />
                        </div>
                        Class Status
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="today" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-8">
                            <TabsTrigger value="today">Today</TabsTrigger>
                            <TabsTrigger value="week">This Week</TabsTrigger>
                        </TabsList>
                        <TabsContent value="today" className="mt-0">
                            {renderStats(todayStats)}
                        </TabsContent>
                        <TabsContent value="week" className="mt-0">
                            {renderStats(weekStats)}
                        </TabsContent>
                    </Tabs>

                    {/* Call to action button */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="mt-8 text-center"
                    >
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200"
                        >
                            View Full Schedule →
                        </motion.button>
                    </motion.div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
