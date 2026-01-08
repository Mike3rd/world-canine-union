// app/dog/[wcuNumber]/components/living/LivingCertificateCard.tsx

interface LivingCertificateCardProps {
    dogName: string
    pdfUrl: string
}

export default function LivingCertificateCard({ dogName, pdfUrl }: LivingCertificateCardProps) {
    return (
        <div className="bg-gradient-to-br from-dog-background to-dog-surface rounded-2xl shadow-xl p-6 border border-dog-border">
            <h2 className="text-xl font-bold text-dog-text mb-4">Official Certificate</h2>
            <p className="text-dog-text-muted mb-4 font-body">
                Download {dogName}'s official WCU registration certificate.
            </p>
            <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full bg-dog-buttons text-white px-6 py-3 rounded-lg hover:bg-dog-error transition font-body font-heading font-medium "
            >
                View/Download Certificate
            </a>
        </div>
    )
}