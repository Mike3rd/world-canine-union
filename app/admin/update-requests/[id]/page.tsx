'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle, XCircle, AlertCircle, Image as ImageIcon, FileText, User, Calendar, MapPin, Mail, Home, Globe, Heart } from 'lucide-react';

// Use relative import for the type
import { UpdateRequest } from '../../../../types/update-requests';

export default function UpdateRequestReviewPage() {
    const params = useParams();
    const router = useRouter();
    const requestId = params.id as string;

    const [request, setRequest] = useState<UpdateRequest | null>(null);
    const [dogData, setDogData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [adminNotes, setAdminNotes] = useState('');
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        if (requestId) {
            loadData();
        }
    }, [requestId]);

    const loadData = async () => {
        try {
            const { supabase } = await import('@/lib/supabase');

            // Load the update request
            const { data: requestData, error: requestError } = await supabase
                .from('update_requests')
                .select('*')
                .eq('id', requestId)
                .single();

            if (requestError) throw requestError;

            // Parse requested_data if needed
            const parsedRequest: UpdateRequest = {
                ...requestData,
                requested_data: typeof requestData.requested_data === 'string'
                    ? JSON.parse(requestData.requested_data)
                    : requestData.requested_data
            };

            setRequest(parsedRequest);

            // Load the current dog data
            const { data: dogData, error: dogError } = await supabase
                .from('registrations')
                .select('*')
                .eq('registration_number', parsedRequest.wcu_number)
                .single();

            if (dogError) throw dogError;

            setDogData(dogData);
        } catch (err) {
            console.error('Error loading data:', err);
            setError(err instanceof Error ? err.message : 'Failed to load data');
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async () => {
        if (!request || !dogData) return;

        if (!confirm(`Approve this update for ${dogData.dog_name} (${request.wcu_number})?`)) {
            return;
        }

        await processRequest('approved');
    };

    const handleReject = async () => {
        if (!request) return;

        if (!adminNotes.trim()) {
            alert('Please add a note explaining why you are rejecting this request.');
            return;
        }

        if (!confirm(`Reject this update for ${request.wcu_number}?`)) {
            return;
        }

        await processRequest('rejected');
    };

    const processRequest = async (status: 'approved' | 'rejected') => {
        if (!request || !dogData) return;

        setProcessing(true);
        try {
            const { supabase } = await import('@/lib/supabase');

            if (status === 'approved') {
                // Apply the updates to the registration
                const updatesToApply = { ...request.requested_data };

                // Handle OLD data with wrong field names (backward compatibility)
                // 1. gotcha_day → gotcha_date
                if ('gotcha_day' in updatesToApply) {
                    updatesToApply.gotcha_date = (updatesToApply as any).gotcha_day;
                    delete (updatesToApply as any).gotcha_day;
                }

                // 2. special_qualities → special_attributes  
                if ('special_qualities' in updatesToApply) {
                    updatesToApply.special_attributes = (updatesToApply as any).special_qualities;
                    delete (updatesToApply as any).special_qualities;
                }

                // Remove has_new_photo flag since it's not a real column
                delete (updatesToApply as any).has_new_photo;

                // Apply the updates
                const { error: updateError } = await supabase
                    .from('registrations')
                    .update(updatesToApply)
                    .eq('registration_number', request.wcu_number);

                if (updateError) throw updateError;
            }

            // Update the request status
            const { error: requestUpdateError } = await supabase
                .from('update_requests')
                .update({
                    status: status,
                    reviewed_at: new Date().toISOString(),
                    admin_notes: adminNotes.trim() || null,
                    // In a real app, you would store the admin user ID here
                    reviewed_by: null
                })
                .eq('id', request.id);

            if (requestUpdateError) throw requestUpdateError;

            alert(`✅ Update ${status} successfully!`);
            router.push('/admin/update-requests');
        } catch (err) {
            console.error('Error processing request:', err);
            alert(`Error: ${err instanceof Error ? err.message : 'Failed to process request'}`);
        } finally {
            setProcessing(false);
        }
    };

    const renderComparison = () => {
        if (!request || !dogData) return null;

        const current = dogData;
        const requested = request.requested_data;

        const fields = [
            { label: 'Dog Name', current: current.dog_name, requested: requested.dog_name, icon: <FileText className="w-4 h-4" /> },
            { label: 'Owner Name', current: current.owner_name, requested: requested.owner_name, icon: <User className="w-4 h-4" /> },
            { label: 'Owner Email', current: current.owner_email, requested: requested.owner_email, icon: <Mail className="w-4 h-4" /> },
            { label: 'Breed Description', current: current.breed_description, requested: requested.breed_description, icon: <FileText className="w-4 h-4" /> },
            { label: 'Gender', current: current.gender, requested: requested.gender, icon: <User className="w-4 h-4" /> },
            { label: 'Birth Date', current: current.birth_date, requested: requested.birth_date, icon: <Calendar className="w-4 h-4" /> },
            { label: 'Gotcha Day', current: current.gotcha_date, requested: requested.gotcha_date, icon: <Calendar className="w-4 h-4" /> },
            { label: 'Color', current: current.dog_color, requested: requested.dog_color, icon: <FileText className="w-4 h-4" /> },
            { label: 'Physical Description', current: current.dog_description, requested: requested.dog_description, icon: <FileText className="w-4 h-4" /> },
            { label: 'Location', current: current.location, requested: requested.location, icon: <MapPin className="w-4 h-4" /> },
            { label: 'Shelter Name', current: current.shelter_name, requested: requested.shelter_name, icon: <Home className="w-4 h-4" /> },
            { label: 'Shelter City', current: current.shelter_city, requested: requested.shelter_city, icon: <MapPin className="w-4 h-4" /> },
            { label: 'Shelter State', current: current.shelter_state, requested: requested.shelter_state, icon: <MapPin className="w-4 h-4" /> },
            { label: 'Shelter Website', current: current.shelter_website, requested: requested.shelter_website, icon: <Globe className="w-4 h-4" /> },
        ];

        return (
            <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800">Changes Requested:</h3>
                <div className="space-y-4">
                    {fields.map((field, index) => {
                        // Only show fields that have changes
                        const hasChange = field.requested && field.requested !== field.current;
                        if (!hasChange) return null;

                        return (
                            <div key={index} className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                    {field.icon}
                                    <span className="ml-2">{field.label}</span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-xs text-gray-500 mb-1">Current Value:</div>
                                        <div className="text-gray-700 p-3 bg-white rounded border min-h-[44px]">
                                            {field.current || <span className="text-gray-400">Not set</span>}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 mb-1">Requested Change:</div>
                                        <div className="text-gray-700 p-3 bg-blue-50 rounded border border-blue-200 min-h-[44px]">
                                            {field.requested}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {/* Story fields */}
                    {requested.rescue_story && requested.rescue_story !== current.rescue_story && (
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                <FileText className="w-4 h-4" />
                                <span className="ml-2">Rescue Story</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Current:</div>
                                    <div className="text-gray-700 p-3 bg-white rounded border text-sm h-48 overflow-y-auto whitespace-pre-wrap">
                                        {current.rescue_story || <span className="text-gray-400">Not set</span>}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Requested:</div>
                                    <div className="text-gray-700 p-3 bg-blue-50 rounded border border-blue-200 text-sm h-48 overflow-y-auto whitespace-pre-wrap">
                                        {requested.rescue_story}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Other story fields */}
                    {['special_attributes', 'favorite_activities', 'unique_traits'].map((fieldName) => {
                        const requestedValue = requested[fieldName];
                        const currentValue = current[fieldName];

                        if (!requestedValue || requestedValue === currentValue) return null;

                        const labels: Record<string, string> = {
                            special_attributes: 'Special Attributes',
                            favorite_activities: 'Favorite Activities',
                            unique_traits: 'Unique Traits'
                        };

                        return (
                            <div key={fieldName} className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                    <Heart className="w-4 h-4" />
                                    <span className="ml-2">{labels[fieldName]}</span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-xs text-gray-500 mb-1">Current:</div>
                                        <div className="text-gray-700 p-3 bg-white rounded border text-sm min-h-[60px]">
                                            {currentValue || <span className="text-gray-400">Not set</span>}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 mb-1">Requested:</div>
                                        <div className="text-gray-700 p-3 bg-blue-50 rounded border border-blue-200 text-sm min-h-[60px]">
                                            {requestedValue}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {/* Memorial fields */}
                    {request.update_type === 'memorial' && (
                        <div className="bg-purple-50 border-2 border-purple-200 p-4 rounded-lg">
                            <div className="flex items-center text-sm font-medium text-purple-700 mb-4">
                                <AlertCircle className="w-5 h-5" />
                                <span className="ml-2 text-lg">⚠️ Memorial Conversion Request</span>
                            </div>

                            <div className="space-y-4">
                                {requested.memorial_date && (
                                    <div>
                                        <div className="text-sm font-medium text-purple-700 mb-2">Memorial Date</div>
                                        <div className="text-gray-700 p-3 bg-purple-100 rounded border border-purple-300">
                                            {requested.memorial_date}
                                        </div>
                                    </div>
                                )}

                                {requested.memorial_message && (
                                    <div>
                                        <div className="text-sm font-medium text-purple-700 mb-2">Memorial Message</div>
                                        <div className="text-gray-700 p-3 bg-purple-100 rounded border border-purple-300 whitespace-pre-wrap">
                                            {requested.memorial_message}
                                        </div>
                                    </div>
                                )}

                                {requested.memorial_favorite_memories && (
                                    <div>
                                        <div className="text-sm font-medium text-purple-700 mb-2">Favorite Memories</div>
                                        <div className="text-gray-700 p-3 bg-purple-100 rounded border border-purple-300 whitespace-pre-wrap">
                                            {requested.memorial_favorite_memories}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
                <p className="mt-2 text-gray-600">Loading update request...</p>
            </div>
        );
    }

    if (error || !request || !dogData) {
        return (
            <div className="rounded-md bg-red-50 p-6">
                <div className="flex">
                    <AlertCircle className="h-5 w-5 text-red-400" />
                    <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">Error</h3>
                        <p className="text-sm text-red-700 mt-2">
                            {error || 'Failed to load update request'}
                        </p>
                        <button
                            onClick={() => router.push('/admin/update-requests')}
                            className="mt-4 text-sm text-red-600 hover:text-red-800"
                        >
                            ← Back to Update Requests
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const hasNewPhoto = request.requested_data?.has_new_photo === true;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <button
                        onClick={() => router.push('/admin/update-requests')}
                        className="flex items-center text-gray-600 hover:text-gray-800"
                    >
                        <ArrowLeft className="h-4 w-4 mr-1" />
                        Back to Update Requests
                    </button>
                    <div className="text-sm text-gray-500">
                        Status:
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            request.status === 'approved' ? 'bg-green-100 text-green-800' :
                                'bg-red-100 text-red-800'
                            }`}>
                            {request.status}
                        </span>
                    </div>
                </div>

                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Review Update: {dogData.dog_name} ({request.wcu_number})
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Submitted on {new Date(request.created_at).toLocaleDateString()} at{' '}
                        {new Date(request.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                </div>
            </div>

            {/* Alert for new photo */}
            {hasNewPhoto && (
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <div className="flex items-center">
                        <ImageIcon className="h-5 w-5 text-blue-500 mr-2" />
                        <div>
                            <h3 className="text-sm font-medium text-blue-800">Photo Update Requested</h3>
                            <p className="text-sm text-blue-700 mt-1">
                                Owner has uploaded a new photo. After approving this request, you'll need to manually upload the new photo to Supabase storage.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Comparison Section */}
            {renderComparison()}

            {/* Admin Actions Section */}
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Admin Decision</h3>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Admin Notes (Optional)
                        </label>
                        <textarea
                            value={adminNotes}
                            onChange={(e) => setAdminNotes(e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            placeholder="Add any notes about your decision..."
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <button
                            onClick={handleReject}
                            disabled={processing}
                            className="flex-1 flex items-center justify-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <XCircle className="h-5 w-5 mr-2" />
                            {processing ? 'Processing...' : 'Reject Update'}
                        </button>

                        <button
                            onClick={handleApprove}
                            disabled={processing}
                            className="flex-1 flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <CheckCircle className="h-5 w-5 mr-2" />
                            {processing ? 'Processing...' : 'Approve Update'}
                        </button>
                    </div>

                    <p className="text-sm text-gray-500 text-center pt-2">
                        Note: Approving will automatically apply all changes to the dog's record.
                    </p>
                </div>
            </div>
        </div>
    );
}