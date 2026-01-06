"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, UserPlus, BarChart3, Settings } from "lucide-react";

const quickActions = [
    {
        label: "Add Batch",
        icon: Plus,
        action: () => console.log("Navigate to Add Batch"),
        iconColor: "text-indigo-600 dark:text-indigo-400",
        iconBg: "bg-indigo-50 dark:bg-indigo-950/30",
        hoverBorder: "hover:border-indigo-300 dark:hover:border-indigo-700",
    },
    {
        label: "Invite Teacher",
        icon: UserPlus,
        action: () => console.log("Open Invite Teacher Modal"),
        iconColor: "text-cyan-600 dark:text-cyan-400",
        iconBg: "bg-cyan-50 dark:bg-cyan-950/30",
        hoverBorder: "hover:border-cyan-300 dark:hover:border-cyan-700",
    },
    {
        label: "View Reports",
        icon: BarChart3,
        action: () => console.log("Navigate to Reports"),
        iconColor: "text-emerald-600 dark:text-emerald-400",
        iconBg: "bg-emerald-50 dark:bg-emerald-950/30",
        hoverBorder: "hover:border-emerald-300 dark:hover:border-emerald-700",
    },
    {
        label: "Settings",
        icon: Settings,
        action: () => console.log("Navigate to Settings"),
        iconColor: "text-amber-600 dark:text-amber-400",
        iconBg: "bg-amber-50 dark:bg-amber-950/30",
        hoverBorder: "hover:border-amber-300 dark:hover:border-amber-700",
    },
];

export default function QuickActionsBar() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mb-10"
        >
            <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm rounded-2xl">
                <CardContent className="p-8">
                    <h3 className="mb-8 text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600">
                            <Settings className="h-5 w-5 text-white" />
                        </div>
                        Quick Actions
                    </h3>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-2 gap-6 sm:grid-cols-4"
                    >
                        {quickActions.map((action, index) => (
                            <motion.button
                                key={index}
                                variants={itemVariants}
                                whileHover={{
                                    scale: 1.02,
                                    y: -4,
                                }}
                                whileTap={{ scale: 0.98 }}
                                onClick={action.action}
                                className={`group p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 hover:shadow-lg transition-all duration-300 ${action.hoverBorder}`}
                            >
                                <div className="flex flex-col items-center gap-4">
                                    <div className={`p-3.5 rounded-lg ${action.iconBg} shadow-sm`}>
                                        <action.icon className={`h-6 w-6 ${action.iconColor}`} />
                                    </div>
                                    <span className="text-sm font-semibold text-gray-900 dark:text-white text-center leading-tight">
                                        {action.label}
                                    </span>
                                </div>
                            </motion.button>
                        ))}
                    </motion.div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
