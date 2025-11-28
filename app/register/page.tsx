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
            Join the World Canine Union and get official certification for your
            one-of-a-kind companion
          </p>
        </div>

        <RegistrationForm />
      </div>
    </div>
  );
}