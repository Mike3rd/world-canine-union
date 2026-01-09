// app/dog/[wcuNumber]/components/memorial/MemorialCertificateCard.tsx
import { Award, Download } from 'lucide-react'

interface MemorialCertificateCardProps {
    dogName: string
    pdfUrl: string
}

export default function MemorialCertificateCard({ dogName, pdfUrl }: MemorialCertificateCardProps) {
    return (
        <div className="rounded-2xl shadow-xl p-6 border bg-memorial-surface border-memorial-border">
            <div className="flex items-start mb-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center mr-4 bg-memorial-background text-memorial-accent">
                    <Award className="w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-memorial-text">
                        Memorial Certificate
                    </h2>
                    <p className="font-body mt-1 text-memorial-text-muted">
                        Download {dogName}'s WCU memorial certificate
                    </p>
                </div>
            </div>

            <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full py-3 px-6 rounded-lg font-semibold transition mt-2 bg-memorial-buttons text-white hover:opacity-90 font-heading font-medium"
            >
                <Download className="w-4 h-4 mr-2" />
                Download Memorial Certificate
            </a>

            <p className="text-center text-sm mt-3 font-body text-memorial-text-muted">
                A lasting tribute to {dogName}'s life and legacy
            </p>
        </div>
    )
}