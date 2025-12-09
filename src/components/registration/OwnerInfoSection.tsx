interface OwnerInfoSectionProps {
  formData: {
    ownerName: string;
    ownerEmail: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  fieldErrors: Record<string, string>;
}

export default function OwnerInfoSection({ formData, onInputChange, fieldErrors }: OwnerInfoSectionProps) {
  return (
    <div className="pt-4 border-t border-border">
      <h3 className="text-xl font-heading font-semibold text-primary mb-6">
        Owner Information
      </h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-body2 font-medium text-text mb-2">
            Your Name <span className="text-accent font-bold">*</span>
          </label>
          <input
            type="text"
            name="ownerName"
            required
            value={formData.ownerName}
            onChange={onInputChange}
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text ${fieldErrors.ownerName ? 'border-red-500' : 'border-border'
              }`}
            placeholder="Your full name"
          />
          {fieldErrors.ownerName && (
            <p className="text-red-500 text-xs mt-1">{fieldErrors.ownerName}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-body2 font-medium text-text mb-2">
            Email Address <span className="text-accent font-bold">*</span>
          </label>
          <input
            type="email"
            name="ownerEmail"
            required
            value={formData.ownerEmail}
            onChange={onInputChange}
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text ${fieldErrors.ownerEmail ? 'border-red-500' : 'border-border'
              }`}
            placeholder="your.email@example.com"
          />
          {fieldErrors.ownerEmail && (
            <p className="text-red-500 text-xs mt-1">{fieldErrors.ownerEmail}</p>
          )}
        </div>
      </div>
    </div>
  );
}
