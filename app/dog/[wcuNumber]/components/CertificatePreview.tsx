// app/dog/[wcuNumber]/components/CertificatePreview.tsx
interface CertificatePreviewProps {
    wcuNumber: string
}

export default function CertificatePreview({ wcuNumber }: CertificatePreviewProps) {
    const certificateUrl = `https://your-supabase-url.supabase.co/storage/v1/object/public/certificates/${wcuNumber}.pdf`

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
                Official Certificate
            </h3>
            <div className="aspect-[4/3] bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg border-2 border-amber-200 flex items-center justify-center mb-4">
                <div className="text-center">
                    <div className="text-5xl mb-4">📄</div>
                    <p className="text-amber-800 font-semibold">WCU Certificate</p>
                    <p className="text-amber-600">{wcuNumber}</p>
                </div>
            </div>
            <a
                href={certificateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition"
            >
                View/Download PDF
            </a>
        </div>
    )
}