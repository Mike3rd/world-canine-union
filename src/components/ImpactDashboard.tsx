// src/components/ImpactDashboard.tsx - SIMPLIFIED VERSION
"use client";

import { Dog, Heart, Syringe, Home, Users, Sparkles } from "lucide-react";

export default function ImpactDashboard() {
    return (
        <section className="pt-16 pb-20 bg-background">
            <div className="max-w-7xl mx-auto px-4">
                {/* HEADER SECTION */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                        <Sparkles className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-4xl font-heading font-bold text-primary mb-6">
                        Registration Creates Ripples of Good
                    </h2>
                    <p className="text-xl text-text-muted max-w-3xl mx-auto">
                        Every WCU registration helps support animal rescue efforts nationwide.
                        Join thousands of pet owners making a difference.
                    </p>
                </div>

                {/* SIMPLE IMPACT CARDS */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {/* Food & Care */}
                    <div className="group relative">
                        <div className="relative bg-white p-6 rounded-2xl border-2 border-amber-100 hover:border-amber-300 transition-all shadow-sm hover:shadow-lg">
                            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center mb-4">
                                <Dog className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="font-heading text-lg font-bold text-primary mb-3">
                                Shelter Food & Care
                            </h3>
                            <p className="text-text-muted text-sm">
                                Helps provide nutritious meals and daily care for animals awaiting their forever homes
                            </p>
                        </div>
                    </div>

                    {/* Vaccinations */}
                    <div className="group relative">
                        <div className="relative bg-white p-6 rounded-2xl border-2 border-blue-100 hover:border-blue-300 transition-all shadow-sm hover:shadow-lg">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
                                <Syringe className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="font-heading text-lg font-bold text-primary mb-3">
                                Life-Saving Vaccines
                            </h3>
                            <p className="text-text-muted text-sm">
                                Supports vaccination programs that protect rescue animals from preventable diseases
                            </p>
                        </div>
                    </div>

                    {/* Medical Care */}
                    <div className="group relative">
                        <div className="relative bg-white p-6 rounded-2xl border-2 border-green-100 hover:border-green-300 transition-all shadow-sm hover:shadow-lg">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
                                <Heart className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="font-heading text-lg font-bold text-primary mb-3">
                                Emergency Medical Care
                            </h3>
                            <p className="text-text-muted text-sm">
                                Funds critical treatments for injured or sick animals in need of urgent veterinary attention
                            </p>
                        </div>
                    </div>

                    {/* Spay/Neuter */}
                    <div className="group relative">
                        <div className="relative bg-white p-6 rounded-2xl border-2 border-purple-100 hover:border-purple-300 transition-all shadow-sm hover:shadow-lg">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-violet-500 rounded-xl flex items-center justify-center mb-4">
                                <Home className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="font-heading text-lg font-bold text-primary mb-3">
                                Spay & Neuter Programs
                            </h3>
                            <p className="text-text-muted text-sm">
                                Contributes to population control efforts that prevent future animal homelessness
                            </p>
                        </div>
                    </div>
                </div>

                {/* COMMUNITY IMPACT STATEMENT */}
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-full mb-6">
                        <Heart className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-primary mb-4">
                        Together, We're Making a Difference
                    </h3>
                    <p className="text-text-muted text-lg max-w-3xl mx-auto mb-8">
                        Every registration not only celebrates your dog's unique story but also
                        contributes to helping other animals in need. It's a legacy of love that
                        extends beyond your own pet.
                    </p>
                    <div className="text-sm text-text-muted/80 max-w-2xl mx-auto">
                        <p>
                            <strong>Transparency:</strong> We provide regular updates on our
                            rescue partnerships and the impact of your contributions.
                            Registration fees help sustain our platform while supporting
                            animal welfare initiatives.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}