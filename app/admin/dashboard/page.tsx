'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FileText, RefreshCw, AlertCircle, CheckSquare, Image as ImageIcon, Search, Users } from 'lucide-react';


export default function AdminDashboard() {
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();

    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [searching, setSearching] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    // Stats state
    const [stats, setStats] = useState({
        total: 0,
        issues: 0,
        recent: 0,
        pendingUpdates: 0
    });
    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            const { supabase } = await import('@/lib/supabase');

            // Get today's start for "Recent Today"
            const today = new Date();
            const startOfDay = new Date(today.setHours(0, 0, 0, 0)).toISOString();

            // Run all 4 queries at once
            const [totalRes, paymentIssuesRes, recentRes, pendingUpdatesRes] = await Promise.all([
                supabase.from('registrations').select('*', { count: 'exact', head: true }),
                supabase.from('registrations').select('*', { count: 'exact', head: true })
                    .eq('status', 'completed')
                    .is('pdf_url', null),
                supabase.from('registrations').select('*', { count: 'exact', head: true })
                    .gte('created_at', startOfDay),
                supabase.from('update_requests').select('*', { count: 'exact', head: true })
                    .eq('status', 'pending')
            ]);

            setStats({
                total: totalRes.count || 0,
                issues: paymentIssuesRes.count || 0,
                recent: recentRes.count || 0,
                pendingUpdates: pendingUpdatesRes.count || 0
            });

        } catch (error) {
            console.error('Failed to load stats:', error);
        }
    };

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;
        setHasSearched(true);
        setSearching(true);
        setSearchResults([]);

        try {
            const { supabase } = await import('@/lib/supabase');

            const search = searchTerm.trim();
            const isWcu = search.toUpperCase().startsWith('WCU-');

            let query = supabase.from('registrations').select('*');

            if (isWcu) {
                query = query.eq('registration_number', search.toUpperCase());
            } else {
                query = query.or(`owner_email.ilike.%${search}%,dog_name.ilike.%${search}%`);
            }

            const { data, error } = await query
                .order('created_at', { ascending: false })
                .limit(10);

            if (error) {
                console.error('Search error:', error);
                setSearchResults([]);
            } else {
                setSearchResults(data || []);
            }

        } catch (error) {
            console.error('Search failed:', error);
            setSearchResults([]);
        } finally {
            setSearching(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('admin_auth');
        router.push('/admin');
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center px-5">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                    <p className="text-gray-600 mt-2">Manage registrations and regenerate PDFs</p>
                </div>
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg"
                >
                    Logout
                </button>
            </div>

            {/* Navigation Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Update Requests Card */}
                <div
                    onClick={() => router.push('/admin/update-requests')}
                    className="bg-white p-6 rounded-lg shadow border border-gray-200 hover:border-amber-300 hover:shadow-md transition cursor-pointer"
                >
                    <div className="flex items-center">
                        <div className="p-3 bg-amber-100 rounded-lg">
                            <AlertCircle className="h-6 w-6 text-amber-600" />
                        </div>
                        <div className="ml-4">
                            <h3 className="text-lg font-semibold text-gray-800">Update Requests</h3>
                            <p className="text-sm text-gray-600 mt-1">Review owner-submitted updates</p>
                        </div>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                        <div>
                            <p className="text-2xl font-bold text-yellow-600">
                                {stats.pendingUpdates}
                            </p>
                            <p className="text-xs text-gray-500">Pending review</p>
                        </div>
                        <span className="text-amber-600 text-sm font-medium">View all →</span>
                    </div>
                </div>

                {/* Search & Edit Card */}
                <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                    <div className="flex items-center">
                        <div className="p-3 bg-blue-100 rounded-lg">
                            <Search className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="ml-4">
                            <h3 className="text-lg font-semibold text-gray-800">Search & Edit</h3>
                            <p className="text-sm text-gray-600 mt-1">Find dogs and edit records</p>
                        </div>
                    </div>
                    <div className="mt-4">
                        <p className="text-sm text-gray-500">Use the search below to find dogs</p>
                    </div>
                </div>

                {/* PDF Regeneration Card */}
                <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                    <div className="flex items-center">
                        <div className="p-3 bg-green-100 rounded-lg">
                            <RefreshCw className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="ml-4">
                            <h3 className="text-lg font-semibold text-gray-800">PDF Regeneration</h3>
                            <p className="text-sm text-gray-600 mt-1">Fix missing certificates</p>
                        </div>
                    </div>
                    <div className="mt-4">
                        <p className="text-xs text-gray-500">
                            Use the search below to find dogs, then click "Regen PDF"
                        </p>
                    </div>
                </div>
            </div>

            {/* Quick Stats - Placeholder */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold text-gray-700">Total Registrations</h3>
                    <p className="text-3xl font-bold text-amber-600 mt-2">{stats.total.toLocaleString()} </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold text-gray-700">⚠️ Needs Attention</h3>
                    <p className="text-3xl font-bold text-amber-600 mt-2">
                        {stats.issues}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Paid but no certificate</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold text-gray-700">Recent Today</h3>
                    <p className="text-3xl font-bold text-amber-600 mt-2">{stats.recent}</p>
                </div>

            </div>

            {/* Search Section */}
            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Find a Dog Record</h2>
                <form onSubmit={handleSearch}>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setHasSearched(false); // ← ADD THIS LINE INSIDE
                            }}
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            placeholder="Search by WCU number (WCU-00001) or owner email..."
                            autoFocus
                        />
                    </div>
                    <button
                        type="submit"
                        className="mt-4 w-full md:w-auto px-6 py-3 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                        Search Records
                    </button>
                </form>

                <div className="mt-4 text-sm text-gray-500">
                    <p>Examples: "WCU-00015" or "owner@example.com"</p>
                </div>
            </div>

            {/* Search Results Section */}
            <div className="bg-white p-6 rounded-lg shadow mt-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Search Results {searchResults.length > 0 && `(${searchResults.length})`}
                </h2>

                {searching ? (
                    <div className="text-center py-8">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
                        <p className="mt-2 text-gray-600">Searching...</p>
                    </div>
                ) : searchResults.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">WCU #</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dog Name</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {searchResults.map((dog) => (
                                    <tr key={dog.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <span className="font-mono font-bold text-amber-700">{dog.registration_number}</span>
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap">{dog.dog_name}</td>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <div className="text-sm">{dog.owner_name}</div>
                                            <div className="text-xs text-gray-500">{dog.owner_email}</div>
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <span className={`px-2 py-1 text-xs rounded-full ${dog.status === 'completed'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-amber-100 text-amber-800'
                                                }`}>
                                                {dog.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                                            <button
                                                onClick={() => router.push(`/admin/edit/${dog.id}`)}
                                                className="text-amber-600 hover:text-amber-800 mr-3"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={async () => {
                                                    if (confirm(`Regenerate PDF for ${dog.dog_name} (${dog.registration_number})?`)) {
                                                        try {
                                                            const { regenerateCertificate } = await import('@/lib/pdf-regeneration');
                                                            const result = await regenerateCertificate(dog.registration_number);

                                                            if (result.success) {
                                                                alert(`✅ PDF regenerated for ${dog.registration_number}`);
                                                            } else {
                                                                alert(`❌ Failed: ${result.error}`);
                                                            }
                                                        } catch (error) {
                                                            alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
                                                        }
                                                    }
                                                }}
                                                className="text-blue-600 hover:text-blue-800"
                                            >
                                                Regen PDF
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : hasSearched ? ( // ← CHANGED TO CHECK hasSearched
                    <div className="text-center py-8 text-gray-500">
                        <p>No dogs found matching "{searchTerm}"</p>
                        <p className="text-sm mt-2">Try a different WCU number or email</p>
                    </div>
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        <p>Enter a WCU number or email above to search</p>
                    </div>
                )}
            </div>
        </div>
    );
}