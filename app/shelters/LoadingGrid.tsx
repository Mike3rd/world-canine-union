export default function LoadingGrid() {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-surface rounded-2xl p-6 shadow-lg border border-border">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-6 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-4 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                </div>
            ))}
        </div>
    );
}
