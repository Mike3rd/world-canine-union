import RegistrationForm from '@/components/RegistrationForm';


export default function RegistrationPage() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading font-bold text-primary mb-4">
            Register Your Dog
          </h1>
          <p className="text-xl text-text-muted font-body2">
            The official global registry celebrating one-of-a-kind dogs. Join our community today!
          </p>
        </div>
        {/* Caution */}
        <div className="mb-6 p-4 bg-surface rounded-lg border border-border">
          <div className="flex items-start gap-2">
            <span className="text-accent text-lg mt-0.5">⚠️</span>
            <div>
              <p className="font-body2 text-text-muted">
                <span className="text-accent font-bold">Type carefully &#8212; your answers appear on your dog's certificate and profile page exactly as entered on this form.</span> Your email is for WCU records only (never displayed online). <span className="text-accent font-bold"> Check spelling before submitting.</span>
              </p>
            </div>
          </div>
        </div>


        <RegistrationForm />
      </div>
    </div>
  );
}