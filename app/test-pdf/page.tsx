// app/test-pdf/page.tsx
"use client";

export default function TestPDFPage() {
    const generateTestPDF = async () => {
        // Call your actual production endpoint
        const response = await fetch("/api/generate-certificate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                registration_number: "WCU-00090",
                dog_name: "Test Dog",
                // ... other test data
            }),
        });

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        window.open(url, "_blank");
    };

    return (
        <div>
            <button onClick={generateTestPDF}>Generate Test PDF</button>
        </div>
    );
}