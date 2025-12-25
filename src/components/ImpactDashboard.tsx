// src/components/ImpactDashboard.tsx - FINAL CLEAN VERSION
"use client";

import Link from "next/link";
import { Dog, Heart, Syringe, Home } from "lucide-react";

export default function ImpactDashboard() {
    return (
        <section className="pt-16 ">
            <div className="max-w-7xl mx-auto px-4">
                {/* HEADER SECTION */}
                <h2 className="text-4xl font-heading font-bold text-primary text-center mb-6">
                    Your Registration Makes a Difference
                </h2>

                <p className="text-xl font-body2 text-text-muted text-center mb-12 max-w-3xl mx-auto">
                    Every WCU registration includes a <strong>20% donation</strong> that directly supports rescue animals.
                    Here&apos;s how your support helps and what our community has accomplished together.
                </p>

                {/* IMPACT METRICS CARDS */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                    {/* Dogs Fed Card */}
                    <div className="group relative">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl blur opacity-0 group-hover:opacity-70 transition duration-500"></div>
                        <div className="relative bg-surface p-6 rounded-2xl border-2 border-amber-100 hover:border-amber-300 transition-all shadow-sm hover:shadow-lg">
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center">
                                    <Dog className="w-7 h-7 text-white" />
                                </div>
                                <span className="text-xs font-medium bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                                    3-4 Days
                                </span>
                            </div>
                            <h3 className="font-heading text-xl font-bold text-primary mb-3">
                                Feeds Shelter Pets
                            </h3>
                            <p className="text-text-muted font-body text-sm mb-4">
                                <span className="font-semibold text-amber-700">$5 from your fee</span> provides nutritious meals for shelter animals
                            </p>
                            <div className="pt-3 border-t border-border">
                                <div className="flex items-center text-xs text-text-muted">
                                    <div className="w-full bg-amber-100 rounded-full h-1.5 mr-2">
                                        <div className="bg-gradient-to-r from-amber-400 to-orange-500 h-1.5 rounded-full w-3/4"></div>
                                    </div>
                                    <span className="font-semibold text-amber-700">75% Impact</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Vaccines Provided Card */}
                    <div className="group relative">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl blur opacity-0 group-hover:opacity-70 transition duration-500"></div>
                        <div className="relative bg-surface p-6 rounded-2xl border-2 border-blue-100 hover:border-blue-300 transition-all shadow-sm hover:shadow-lg">
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center">
                                    <Syringe className="w-7 h-7 text-white" />
                                </div>
                                <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                    Life-Saving
                                </span>
                            </div>
                            <h3 className="font-heading text-xl font-bold text-primary mb-3">
                                Provides Vaccines
                            </h3>
                            <p className="text-text-muted font-body text-sm mb-4">
                                <span className="font-semibold text-blue-700">Every 2 registrations</span> funds a complete vaccine for a rescue
                            </p>
                            <div className="pt-3 border-t border-border">
                                <div className="flex items-center text-xs text-text-muted">
                                    <div className="w-full bg-blue-100 rounded-full h-1.5 mr-2">
                                        <div className="bg-gradient-to-r from-blue-400 to-cyan-500 h-1.5 rounded-full w-1/2"></div>
                                    </div>
                                    <span className="font-semibold text-blue-700">50% Impact</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Medical Treatments Card */}
                    <div className="group relative">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl blur opacity-0 group-hover:opacity-70 transition duration-500"></div>
                        <div className="relative bg-surface p-6 rounded-2xl border-2 border-green-100 hover:border-green-300 transition-all shadow-sm hover:shadow-lg">
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                                    <Heart className="w-7 h-7 text-white" />
                                </div>
                                <span className="text-xs font-medium bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                    Emergency Care
                                </span>
                            </div>
                            <h3 className="font-heading text-xl font-bold text-primary mb-3">
                                Funds Medical Care
                            </h3>
                            <p className="text-text-muted font-body text-sm mb-4">
                                <span className="font-semibold text-green-700">Every 8 registrations</span> provides emergency medical treatment
                            </p>
                            <div className="pt-3 border-t border-border">
                                <div className="flex items-center text-xs text-text-muted">
                                    <div className="w-full bg-green-100 rounded-full h-1.5 mr-2">
                                        <div className="bg-gradient-to-r from-green-400 to-emerald-500 h-1.5 rounded-full w-1/4"></div>
                                    </div>
                                    <span className="font-semibold text-green-700">25% Impact</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Spay/Neuters Card */}
                    <div className="group relative">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-400 to-violet-500 rounded-2xl blur opacity-0 group-hover:opacity-70 transition duration-500"></div>
                        <div className="relative bg-surface p-6 rounded-2xl border-2 border-purple-100 hover:border-purple-300 transition-all shadow-sm hover:shadow-lg">
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-violet-500 rounded-xl flex items-center justify-center">
                                    <Home className="w-7 h-7 text-white" />
                                </div>
                                <span className="text-xs font-medium bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                                    Prevents Homelessness
                                </span>
                            </div>
                            <h3 className="font-heading text-xl font-bold text-primary mb-3">
                                Supports Spay/Neuter
                            </h3>
                            <p className="text-text-muted font-body text-sm mb-4">
                                <span className="font-semibold text-purple-700">Every 12 registrations</span> funds a spay/neuter surgery
                            </p>
                            <div className="pt-3 border-t border-border">
                                <div className="flex items-center text-xs text-text-muted">
                                    <div className="w-full bg-purple-100 rounded-full h-1.5 mr-2">
                                        <div className="bg-gradient-to-r from-purple-400 to-violet-500 h-1.5 rounded-full w-1/5"></div>
                                    </div>
                                    <span className="font-semibold text-purple-700">20% Impact</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}