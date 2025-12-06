"use client";

import { useState } from "react";

export default function TestStripeButton() {
    const [loading, setLoading] = useState(false);

    const handleTestPayment = async () => {
        setLoading(true);
        try {
            // Call our test endpoint
            const response = await fetch("/api/test-stripe");
            const data = await response.json();

            if (data.success && data.url) {
                // Redirect to Stripe
                window.location.href = data.url;
            } else {
                alert("Failed to create payment: " + (data.error || "Unknown error"));
            }
        } catch (error) {
            console.error("Payment error:", error);
            alert("Payment setup failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-8 p-6 border border-blue-300 bg-blue-50 rounded-xl">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">
                🧪 Test Stripe Payment
            </h3>
            <p className="text-sm text-blue-600 mb-4">
                This button tests Stripe independently of the registration form.
            </p>
            <button
                onClick={handleTestPayment}
                disabled={loading}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
                {loading ? "Connecting to Stripe..." : "Test $25 Payment"}
            </button>
            <p className="text-xs text-blue-500 mt-2">
                Will redirect to Stripe checkout. You can cancel without paying.
            </p>
        </div>
    );
}