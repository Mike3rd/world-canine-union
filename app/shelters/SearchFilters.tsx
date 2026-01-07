import { MapPin, Search } from "lucide-react";

interface SearchFiltersProps {
    selectedState: string;
    setSelectedState: (state: string) => void;
    onSearch: () => void; // Add search button handler
}

const US_STATES = [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
    "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
    "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
    "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
    "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];

export default function SearchFilters({
    selectedState,
    setSelectedState,
    onSearch
}: SearchFiltersProps) {
    return (
        <div className="bg-surface rounded-2xl p-4 sm:p-6 shadow-lg border border-border mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                    <label className="block text-sm font-body2 font-medium text-text mb-2">
                        <MapPin className="w-4 h-4 inline-block mr-2" />
                        Search by State
                    </label>
                    <select
                        className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-text text-sm sm:text-base"
                        value={selectedState}
                        onChange={(e) => setSelectedState(e.target.value)}
                    >
                        <option value="">Select a state</option>
                        {US_STATES.map((state) => (
                            <option key={state.toLowerCase()} value={state.toLowerCase()}>
                                {state}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex items-end">
                    <button
                        className="w-full bg-buttons text-surface py-3 px-6 rounded-xl font-heading font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2 h-[52px]"
                        onClick={onSearch}
                        disabled={!selectedState}
                    >
                        <Search className="w-4 h-4" />
                        Search
                    </button>
                </div>
            </div>
            <p className="text-xs text-text-muted mt-3">
                Select a state and click Search to see shelters in that area
            </p>
        </div>
    );
}