// src/components/StatsDashboard.tsx - FIXED VERSION
"use client";

import { Users, Heart, Home, MapPin } from "lucide-react";

interface StatsData {
    total_dogs: number;
    total_donations: number;
    rescue_partners: number;
    states_represented: number;
    last_updated?: string;
}

interface StatsDashboardProps {
    stats: StatsData | null;
    loading?: boolean;
}

export default function StatsDashboard({ stats, loading = false }: StatsDashboardProps) {
    // LOADING STATE
    if (loading || !stats) {
        return (
            <div className="bg-surface p-8 rounded-2xl border border-border">
                {/* Title skeleton */}
                <div className="h-8 bg-gray-200 rounded w-2/3 mb-6 animate-pulse"></div>
                {/* Stats skeletons - 4 items */}
                <div className="space-y-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-gray-300 rounded animate-pulse"></div>
                                <div className="h-6 bg-gray-300 rounded w-32 animate-pulse"></div>
                            </div>
                            <div className="h-8 bg-gray-300 rounded w-20 animate-pulse"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // LOADED STATE - ALL 4 STATS
    return (
        <div className="bg-surface p-8 rounded-2xl border border-border hover:shadow-lg transition-all">
            <h3 className="font-heading text-2xl font-semibold text-primary mb-6">
                Our Community by the Numbers
            </h3>

            <div className="space-y-6">
                {/* 1. Dogs Registered */}
                <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg">
                    <div className="flex items-center gap-3">
                        <Users className="w-8 h-8 text-primary" />
                        <span className="font-medium text-text">Dogs Registered</span>
                    </div>
                    <span className="text-2xl font-bold text-primary">
                        {stats.total_dogs?.toLocaleString() || "0"}
                    </span>
                </div>

                {/* 2. Total Donated */}
                <div className="flex items-center justify-between p-4 bg-accent/5 rounded-lg">
                    <div className="flex items-center gap-3">
                        <Heart className="w-8 h-8 text-accent" />
                        <span className="font-medium text-text">Total Donated</span>
                    </div>
                    <span className="text-2xl font-bold text-accent">
                        ${stats.total_donations?.toLocaleString() || "0"}
                    </span>
                </div>

                {/* 3. Rescue Partners */}
                <div className="flex items-center justify-between p-4 bg-green-500/5 rounded-lg">
                    <div className="flex items-center gap-3">
                        <Home className="w-8 h-8 text-green-600" />
                        <span className="font-medium text-text">Rescue Partners</span>
                    </div>
                    <span className="text-2xl font-bold text-green-600">
                        {stats.rescue_partners || "0"}
                    </span>
                </div>

                {/* 4. States Represented */}
                <div className="flex items-center justify-between p-4 bg-purple-500/5 rounded-lg">
                    <div className="flex items-center gap-3">
                        <MapPin className="w-8 h-8 text-purple-600" />
                        <span className="font-medium text-text">States Represented</span>
                    </div>
                    <span className="text-2xl font-bold text-purple-600">
                        {stats.states_represented || "0"}
                    </span>
                </div>
            </div>
        </div>
    );
}