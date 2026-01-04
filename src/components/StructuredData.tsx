"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

type MembershipFeature = {
    name: string;
    description: string;
};

type OpenAPI = {
    membership: {
        features: MembershipFeature[];
        tagline: string;
        membership_type: string;
    };
};

export default function StructuredData() {
    const [membership, setMembership] = useState<MembershipFeature[]>([]);
    const [tagline, setTagline] = useState<string>("Soul over Pedigree");
    const [membershipType, setMembershipType] = useState<string>("Lifetime");

    useEffect(() => {
        fetch("/openapi.json")
            .then((res) => res.json())
            .then((data: OpenAPI) => {
                if (data.membership) {
                    setMembership(data.membership.features || []);
                    setTagline(data.membership.tagline || "Soul over Pedigree");
                    setMembershipType(data.membership.membership_type || "Lifetime");
                }
            })
            .catch((err) => console.error("Failed to load structured data:", err));
    }, []);

    const faqItems = membership.map((feature) => ({
        "@type": "Question",
        name: feature.name,
        acceptedAnswer: {
            "@type": "Answer",
            text: feature.description,
        },
    }));

    return (
        <>
            {/* Organization Schema */}
            <Script
                type="application/ld+json"
                id="organization-jsonld"
                strategy="afterInteractive"
            >
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    name: "World Canine Union",
                    url: "https://worldcanineunion.org",
                    logo: "https://worldcanineunion.org/images/wcu-logo-1200.png",
                    sameAs: [
                        "https://www.facebook.com/worldcanineunion",
                        "https://www.instagram.com/worldcanineunion"
                    ],
                    foundingDate: "2025-01-01",
                    description: "Soul over Pedigree. The official global registry celebrating one-of-a-kind dogs."
                })}
            </Script>

            {/* FAQ Schema */}
            <Script
                type="application/ld+json"
                id="faq-jsonld"
                strategy="afterInteractive"
            >
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    mainEntity: [
                        ...faqItems,
                        {
                            "@type": "Question",
                            name: "Do I need a pedigree dog to join?",
                            acceptedAnswer: {
                                "@type": "Answer",
                                text: "No! We celebrate all dogs, regardless of breed or background."
                            }
                        },
                        {
                            "@type": "Question",
                            name: "Is World Canine Union membership really lifetime?",
                            acceptedAnswer: {
                                "@type": "Answer",
                                text: "Yes! Once you register your dog, it is honored forever. No annual fees."
                            }
                        }
                    ]
                })}
            </Script>
        </>
    );
}
