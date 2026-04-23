"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RiskSignalCard from "./RiskSignalCard";
import { AlertTriangle, CheckCircle } from "lucide-react";

// Mock risk signals data
const riskSignals = [
    {
        type: "critical" as const,
        title: "Suspended Users",
        count: 3,
        message: "Action needed to review and resolve suspended accounts",
        actionLink: "View Users",
    },
    {
        type: "warning" as const,
        title: "Batches Ending Soon",
        count: 2,
        message: "2 batches ending within the next 7 days",
        actionLink: "View Batches",
    },
    {
        type: "warning" as const,
        title: "Pending Password Resets",
        count: 12,
        message: "Users waiting for password reset confirmation",
        actionLink: "View Requests",
    },
];

export default function RiskSignalsSection() {
    const hasRisks = riskSignals.length > 0;

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
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mb-8"
        >
            <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-rose-500 to-red-500">
                            <AlertTriangle className="h-5 w-5 text-white" />
                        </div>
                        Risk Signals
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {hasRisks ? (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="space-y-4"
                        >
                            {riskSignals.map((signal, index) => (
                                <motion.div
                                    key={index}
                                    variants={{
                                        hidden: { opacity: 0, x: -20 },
                                        visible: { opacity: 1, x: 0 },
                                    }}
                                >
                                    <RiskSignalCard {...signal} />
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center justify-center py-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/30"
                        >
                            <div className="text-center">
                                <motion.div
                                    animate={{ scale: [1, 1.05, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="inline-block mb-3 p-3 rounded-full bg-emerald-500"
                                >
                                    <CheckCircle className="h-10 w-10 text-white" />
                                </motion.div>
                                <p className="font-semibold text-lg text-emerald-600 dark:text-emerald-400 mb-1">
                                    No issues detected
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    All systems operating normally
                                </p>
                            </div>
                        </motion.div>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    );
}
