// app/faq/page.tsx
'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { faqSections } from './faq-data';
import * as Icons from 'lucide-react';

export default function FAQPage() {
    const [openSection, setOpenSection] = useState<string | null>('general');
    const [openQuestions, setOpenQuestions] = useState<Record<string, boolean>>({});

    // Function to handle section click with smooth scroll
    const handleSectionClick = (sectionId: string) => {
        const element = document.getElementById(`section-${sectionId}`);
        if (element) {
            // Scroll to section
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Open the section (close if already open and clicked again)
            setOpenSection(prev => prev === sectionId ? null : sectionId);
        }
    };

    const toggleQuestion = (questionId: string) => {
        setOpenQuestions(prev => ({
            ...prev,
            [questionId]: !prev[questionId]
        }));
    };

    const getIconComponent = (iconName: string) => {
        const IconComponent = (Icons as any)[iconName];
        return IconComponent ? <IconComponent className="h-5 w-5" /> : null;
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-primary/5">
            {/* Hero Section - Matches width of About and How We Give Back */}
            <div className="bg-gradient-to-r from-primary to-secondary text-header-text">
                <div className="max-w-7xl mx-auto px-4 py-16">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                            Frequently Asked Questions
                        </h1>
                        <p className="text-xl opacity-90 mb-8">
                            Everything you need to know about updating your dog's profile, memorial conversions, and our platform.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content - Updated to max-w-7xl */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                {/* Quick Links */}
                <div className="mb-12">
                    <h2 className="text-2xl font-heading font-bold text-primary mb-6">Quick Sections</h2>
                    <div className="flex flex-wrap gap-3">
                        {faqSections.map(section => (
                            <button
                                key={section.id}
                                onClick={() => handleSectionClick(section.id)}
                                className={`px-4 py-2 rounded-full border transition ${openSection === section.id
                                    ? 'bg-accent text-white border-accent'
                                    : 'bg-surface text-primary border-border hover:border-accent hover:bg-gray-50'
                                    }`}
                            >
                                {section.title}
                            </button>
                        ))}
                    </div>
                </div>

                {/* FAQ Sections */}
                <div className="space-y-8">
                    {faqSections.map(section => (
                        <div
                            key={section.id}
                            id={`section-${section.id}`}
                            className="bg-surface rounded-2xl border border-border shadow-sm overflow-hidden scroll-mt-20"
                        >
                            {/* Section Header */}
                            <button
                                onClick={() => handleSectionClick(section.id)}
                                className="w-full px-8 py-6 flex items-center justify-between hover:bg-gray-50 transition"
                            >
                                <div className="flex items-center">
                                    <div className="p-2 bg-primary/10 rounded-lg mr-4">
                                        {getIconComponent(section.icon as string)}
                                    </div>
                                    <h2 className="text-xl font-heading font-bold text-primary">{section.title}</h2>
                                </div>
                                {openSection === section.id ? (
                                    <ChevronUp className="h-5 w-5 text-text-muted" />
                                ) : (
                                    <ChevronDown className="h-5 w-5 text-text-muted" />
                                )}
                            </button>

                            {/* Section Content */}
                            {openSection === section.id && (
                                <div className="px-8 py-6 border-t border-border">
                                    <div className="space-y-4">
                                        {section.questions.map(question => (
                                            <div
                                                key={question.id}
                                                className="border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-colors"
                                            >
                                                <button
                                                    onClick={() => toggleQuestion(question.id)}
                                                    className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition text-left"
                                                >
                                                    <span className="font-medium text-primary">{question.q}</span>
                                                    {openQuestions[question.id] ? (
                                                        <ChevronUp className="h-4 w-4 text-text-muted flex-shrink-0 ml-2" />
                                                    ) : (
                                                        <ChevronDown className="h-4 w-4 text-text-muted flex-shrink-0 ml-2" />
                                                    )}
                                                </button>

                                                {openQuestions[question.id] && (
                                                    <div className="px-6 py-4 bg-white">
                                                        <p className="text-text-muted whitespace-pre-line leading-relaxed">{question.a}</p>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Contact CTA */}
                <div className="mt-16">
                    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl p-12 text-center">
                        <h2 className="text-2xl font-heading font-bold text-primary mb-4">Still have questions?</h2>
                        <p className="text-text-muted mb-8 max-w-2xl mx-auto text-lg">
                            Can't find the answer you're looking for? Our support team is here to help.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="/contact"
                                className="inline-flex items-center px-8 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition font-medium"
                            >
                                Contact Support
                            </a>
                            <a
                                href="/register"
                                className="inline-flex items-center px-8 py-3 bg-transparent border-2 border-primary text-primary rounded-lg hover:bg-primary/5 transition font-medium"
                            >
                                Register Your Dog
                            </a>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between mt-12 pt-8 border-t border-border">
                    <a
                        href="/"
                        className="text-accent hover:text-accent/80 font-medium text-center"
                    >
                        ← Return to Homepage
                    </a>
                    <a
                        href="/about"
                        className="text-accent hover:text-accent/80 font-medium text-center"
                    >
                        Learn More About WCU →
                    </a>
                </div>
            </div>
        </div>
    );
}