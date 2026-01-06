// src/components/StatsDashboard.tsx
"use client";

import { Users, Heart, Home } from "lucide-react";

interface ImpactStats {
    total_dogs: number;
    total_donations: number;
    rescue_partners: number;
    states_represented: number;
    last_updated: string;
}

interface StatsDashboardProps {
    stats: ImpactStats | null;
}

export default function StatsDashboard({ stats }: StatsDashboardProps) {
    return (
        <div className="bg-surface p-8 rounded-2xl border border-border hover:shadow-lg transition-all">
            <h3 className="font-heading text-2xl font-semibold text-primary mb-6">
                Our Community by the Numbers
            </h3>
            <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg">
                    <div className="flex items-center gap-3">
                        <Users className="w-8 h-8 text-primary" />
                        <span className="font-medium text-text">Dogs Registered</span>
                    </div>
                    <span className="text-2xl font-bold text-primary">
                        {stats?.total_dogs?.toLocaleString() || "0"}
                    </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-accent/5 rounded-lg">
                    <div className="flex items-center gap-3">
                        <Heart className="w-8 h-8 text-accent" />
                        <span className="font-medium text-text">Total Donated</span>
                    </div>
                    <span className="text-2xl font-bold text-accent">
                        ${stats?.total_donations?.toLocaleString() || "0"}
                    </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-green-500/5 rounded-lg">
                    <div className="flex items-center gap-3">
                        <Home className="w-8 h-8 text-green-600" />
                        <span className="font-medium text-text">Rescue Partners</span>
                    </div>
                    <span className="text-2xl font-bold text-green-600">
                        {stats?.rescue_partners || "0"}
                    </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-purple-500/5 rounded-lg">
                    <div className="flex items-center gap-3">
                        <Home className="w-8 h-8 text-purple-600" />
                        <span className="font-medium text-text">States Represented</span>
                    </div>
                    <span className="text-2xl font-bold text-purple-600">
                        {stats?.states_represented || "0"}
                    </span>
                </div>
            </div>
        </div>
    );
}