'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Clock, CheckCircle, XCircle, Image as ImageIcon, AlertCircle, RefreshCw } from 'lucide-react';
import { UpdateRequest } from '../../../types/update-requests';

export default function UpdateRequestsPage() {
    const router = useRouter();
    const [requests, setRequests] = useState<UpdateRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadUpdateRequests();
    }, []);

    const loadUpdateRequests = async () => {
        try {
            const { supabase } = await import('@/lib/supabase');

            const { data, error } = await supabase
                .from('update_requests')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Supabase error:', error);
                throw error;
            }

            console.log('Loaded requests:', data);

            // Parse JSON data if it's stored as string
            const parsedRequests: UpdateRequest[] = (data || []).map((request: any) => ({
                ...request,
                requested_data: typeof request.requested_data === 'string'
                    ? JSON.parse(request.requested_data)
                    : request.requested_data
            }));

            setRequests(parsedRequests);
        } catch (err) {
            console.error('Error loading update requests:', err);
            setError(err instanceof Error ? err.message : 'Failed to load update requests');
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'pending':
                return (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        <Clock className="w-3 h-3 mr-1" />
                        Pending
                    </span>
                );
            case 'approved':
                return (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Approved
                    </span>
                );
            case 'rejected':
                return (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        <XCircle className="w-3 h-3 mr-1" />
                        Rejected
                    </span>
                );
            default:
                return null;
        }
    };

    const getUpdateTypeBadge = (type: string) => {
        return type === 'memorial' ? (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                Memorial
            </span>
        ) : (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                General Update
            </span>
        );
    };

    const handleReview = (requestId: string) => {
        router.push(`/admin/update-requests/${requestId}`);
    };

    const hasNewPhoto = (request: UpdateRequest) => {
        return request.requested_data?.has_new_photo === true;
    };
    const pendingRequests = requests.filter(r => r.status === 'pending');
    const memorialRequests = requests.filter(r => r.update_type === 'memorial');
    const photoRequests = requests.filter(r => hasNewPhoto(r));

    if (loading) {
        return (
            <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
                <p className="mt-2 text-gray-600">Loading update requests...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                    <AlertCircle className="h-5 w-5 text-red-400" />
                    <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">Error Loading Data</h3>
                        <p className="text-sm text-red-700 mt-2">{error}</p>
                        <button
                            onClick={loadUpdateRequests}
                            className="mt-3 text-sm text-red-600 hover:text-red-800"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="space-y-4  px-5">
                {/* Top row: Back button and Refresh button */}
                <div className="flex justify-between items-center">
                    <button
                        onClick={() => router.push('/admin/dashboard')}
                        className="flex items-center text-gray-600 hover:text-gray-800"
                    >
                        <ArrowLeft className="h-4 w-4 mr-1" />
                        Back to Dashboard
                    </button>
                    <button
                        onClick={loadUpdateRequests}
                        className="flex items-center text-sm text-amber-600 hover:text-amber-800"
                    >
                        <RefreshCw className="h-4 w-4 mr-1" />
                        Refresh
                    </button>
                </div>

                {/* Bottom row: Title and description */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Update Requests</h1>
                    <p className="text-gray-600 mt-2">
                        Review and approve update requests from dog owners
                    </p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold text-gray-700">Pending Review</h3>
                    <p className="text-3xl font-bold text-yellow-600 mt-2">
                        {pendingRequests.length}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                        Awaiting your decision
                    </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold text-gray-700">Memorial Updates</h3>
                    <p className="text-3xl font-bold text-purple-600 mt-2">
                        {memorialRequests.length}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                        Memorial conversions
                    </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold text-gray-700">Photo Updates</h3>
                    <p className="text-3xl font-bold text-blue-600 mt-2">
                        {photoRequests.length}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                        New photos to review
                    </p>
                </div>
            </div>

            {/* Requests Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-800">
                        All Update Requests ({requests.length})
                    </h2>
                </div>

                {requests.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No update requests found</p>
                        <p className="text-sm text-gray-400 mt-1">
                            When users submit updates through the update form, they will appear here.
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        WCU #
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Type
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Submitted
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {requests.map((request) => (
                                    <tr key={request.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <span className="font-mono font-bold text-amber-700">
                                                    {request.wcu_number}
                                                </span>
                                                {hasNewPhoto(request) && (
                                                    <div className="ml-2 relative group">
                                                        <ImageIcon
                                                            className="w-4 h-4 text-blue-500"
                                                        />
                                                        <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-48 p-2 bg-gray-900 text-white text-xs rounded shadow-lg">
                                                            Has new photo - needs admin upload
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {getUpdateTypeBadge(request.update_type)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {getStatusBadge(request.status)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(request.created_at).toLocaleDateString()}
                                            <br />
                                            <span className="text-xs">
                                                {new Date(request.created_at).toLocaleTimeString([], {
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            {request.status === 'pending' ? (
                                                <button
                                                    onClick={() => handleReview(request.id)}
                                                    className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 font-medium"
                                                >
                                                    Review Request
                                                </button>
                                            ) : (
                                                <div className="text-gray-600">
                                                    <div>
                                                        Reviewed on {request.reviewed_at
                                                            ? new Date(request.reviewed_at).toLocaleDateString()
                                                            : 'N/A'
                                                        }
                                                    </div>
                                                    {request.admin_notes && (
                                                        <div className="text-xs text-gray-500 mt-1">
                                                            Notes: {request.admin_notes}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}