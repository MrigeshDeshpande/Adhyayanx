"use client";

import { motion } from "framer-motion";
import KPICard from "./KPICard";
import { Users, BookOpen, GraduationCap, Activity } from "lucide-react";

// Mock data with indigo/purple gradient colors
const kpiData = [
    {
        title: "Active Students",
        value: 247,
        subtitle: "Currently enrolled",
        trend: {
            value: 12,
            label: "vs. last month",
        },
        icon: <Users className="h-5 w-5" />,
        gradient: "from-indigo-500 to-purple-500",
        glowColor: "rgba(99, 102, 241, 0.5)",
    },
    {
        title: "Active Batches",
        value: 12,
        subtitle: "5 courses running",
        icon: <BookOpen className="h-5 w-5" />,
        gradient: "from-purple-500 to-pink-500",
        glowColor: "rgba(168, 85, 247, 0.5)",
    },
    {
        title: "Teacher Utilization",
        percentage: 85,
        subtitle: "17 / 20 teachers active",
        icon: <GraduationCap className="h-5 w-5" />,
        gradient: "from-pink-500 to-rose-500",
        glowColor: "rgba(236, 72, 153, 0.5)",
    },
    {
        title: "System Health",
        value: "Good",
        subtitle: "All systems operational",
        status: "good" as const,
        icon: <Activity className="h-5 w-5" />,
        gradient: "from-indigo-500 to-blue-500",
        glowColor: "rgba(99, 102, 241, 0.5)",
    },
];

export default function KPIGrid() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    return (
        <div className="mb-8">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
                {kpiData.map((kpi, index) => (
                    <KPICard key={index} {...kpi} />
                ))}
            </motion.div>
        </div>
    );
}