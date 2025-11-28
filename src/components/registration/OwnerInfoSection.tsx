interface OwnerInfoSectionProps {
  formData: {
    ownerName: string;
    ownerEmail: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export default function OwnerInfoSection({ formData, onInputChange }: OwnerInfoSectionProps) {
  return (
    <div className="pt-4 border-t border-border">
      <h3 className="text-xl font-heading font-semibold text-primary mb-6">
        Owner Information
      </h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-body2 font-medium text-text mb-2">
            Your Name *
          </label>
          <input
            type="text"
            name="ownerName"
            required
            value={formData.ownerName}
            onChange={onInputChange}
            className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text"
            placeholder="Your full name"
          />
        </div>
        <div>
          <label className="block text-sm font-body2 font-medium text-text mb-2">
            Email Address *
          </label>
          <input
            type="email"
            name="ownerEmail"
            required
            value={formData.ownerEmail}
            onChange={onInputChange}
            className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text"
            placeholder="your.email@example.com"
          />
        </div>
      </div>
    </div>
  );
}
