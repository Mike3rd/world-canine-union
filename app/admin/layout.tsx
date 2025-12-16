// app/admin/layout.tsx - Nested layout, NO <html> or <body>
export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        // Only return content wrappers, not <html> or <body>
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {children}
            </div>
        </div>
    );
}