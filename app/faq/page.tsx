'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { faqSections } from './faq-data';
import * as Icons from 'lucide-react';

export default function FAQPage() {
    const [openSection, setOpenSection] = useState<string | null>('general');
    const [openQuestions, setOpenQuestions] = useState<Record<string, boolean>>({});

    const toggleSection = (sectionId: string) => {
        setOpenSection(openSection === sectionId ? null : sectionId);
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
        <div className="min-h-screen bg-gray-50">
            {/* Hero Header */}
            <div className="bg-gradient-to-r from-primary to-accent text-white">
                <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
                        <p className="text-xl opacity-90 max-w-3xl mx-auto">
                            Everything you need to know about updating your dog's profile, memorial conversions, and our platform.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                {/* Quick Links */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-primary mb-6">Quick Sections</h2>
                    <div className="flex flex-wrap gap-3">
                        {faqSections.map(section => (
                            <button
                                key={section.id}
                                onClick={() => toggleSection(section.id)}
                                className={`px-4 py-2 rounded-full border transition ${openSection === section.id
                                    ? 'bg-accent text-white border-accent'
                                    : 'bg-white text-primary border-border hover:border-accent'
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
                            className="bg-white rounded-xl shadow-lg border border-border overflow-hidden"
                        >
                            {/* Section Header */}
                            <button
                                onClick={() => toggleSection(section.id)}
                                className="w-full px-6 py-4 flex items-center justify-between bg-surface hover:bg-gray-50 transition"
                            >
                                <div className="flex items-center">
                                    <div className="p-2 bg-amber-100 rounded-lg mr-4">
                                        {getIconComponent(section.icon as string)}
                                    </div>
                                    <h2 className="text-xl font-bold text-primary">{section.title}</h2>
                                </div>
                                {openSection === section.id ? (
                                    <ChevronUp className="h-5 w-5 text-text-muted" />
                                ) : (
                                    <ChevronDown className="h-5 w-5 text-text-muted" />
                                )}
                            </button>

                            {/* Section Content */}
                            {openSection === section.id && (
                                <div className="px-6 py-4 border-t border-border">
                                    <div className="space-y-4">
                                        {section.questions.map(question => (
                                            <div
                                                key={question.id}
                                                className="border border-gray-200 rounded-lg overflow-hidden"
                                            >
                                                <button
                                                    onClick={() => toggleQuestion(question.id)}
                                                    className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition text-left"
                                                >
                                                    <span className="font-medium text-text">{question.q}</span>
                                                    {openQuestions[question.id] ? (
                                                        <ChevronUp className="h-4 w-4 text-text-muted flex-shrink-0 ml-2" />
                                                    ) : (
                                                        <ChevronDown className="h-4 w-4 text-text-muted flex-shrink-0 ml-2" />
                                                    )}
                                                </button>

                                                {openQuestions[question.id] && (
                                                    <div className="px-4 py-3 bg-white">
                                                        <p className="text-text whitespace-pre-line">{question.a}</p>
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
                <div className="mt-16 text-center">
                    <div className="bg-gradient-to-r from-blue-50 to-amber-50 border border-blue-200 rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-primary mb-3">Still have questions?</h2>
                        <p className="text-text-muted mb-6 max-w-2xl mx-auto">
                            Can't find the answer you're looking for? Our support team is here to help.
                        </p>
                        <a
                            href="/contact"
                            className="inline-flex items-center px-6 py-3 bg-accent text-white rounded-lg hover:bg-opacity-90 transition font-medium"
                        >
                            Contact Support
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}