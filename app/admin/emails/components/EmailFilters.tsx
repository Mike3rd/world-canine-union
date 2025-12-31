// app/admin/emails/components/EmailFilters.tsx
'use client';

import { Search, Filter } from 'lucide-react';
import { useState, useEffect } from 'react';
import { SupportEmail } from '../types';

interface EmailFiltersProps {
    emails: SupportEmail[];
    onFilterChange: (filteredEmails: SupportEmail[]) => void;
}

type FilterType = 'all' | 'unread' | 'read' | 'replied' | 'by-email';

export default function EmailFilters({ emails, onFilterChange }: EmailFiltersProps) {
    const [filter, setFilter] = useState<FilterType>('all');
    const [searchEmail, setSearchEmail] = useState('');

    // Apply filters in useEffect
    useEffect(() => {
        let filtered = [...emails];

        // Apply status filters
        if (filter === 'unread') {
            filtered = filtered.filter(email => email.status === 'unread');
        }

        if (filter === 'read') {
            filtered = filtered.filter(email => email.status === 'read');
        }

        if (filter === 'replied') {
            filtered = filtered.filter(email => email.status === 'replied');
        }

        // Apply email address filter
        if (filter === 'by-email' && searchEmail.trim()) {
            const searchLower = searchEmail.toLowerCase().trim();
            filtered = filtered.filter(email =>
                email.from_email.toLowerCase().includes(searchLower) ||
                email.to_email?.toLowerCase().includes(searchLower)
            );
        }

        onFilterChange(filtered);
    }, [filter, searchEmail, emails, onFilterChange]);

    const handleFilterChange = (newFilter: FilterType) => {
        setFilter(newFilter);
        if (newFilter !== 'by-email') setSearchEmail('');
    };

    const handleSearchChange = (value: string) => {
        setSearchEmail(value);
    };

    // Count emails by status
    const unreadCount = emails.filter(e => e.status === 'unread').length;
    const readCount = emails.filter(e => e.status === 'read').length;
    const repliedCount = emails.filter(e => e.status === 'replied').length;

    return (
        <div className="flex flex-col md:flex-row gap-4 p-4 bg-white border border-gray-200 rounded-lg">

            {/* Filter Type Selector */}
            <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                    <Filter className="h-4 w-4 text-gray-700" />
                    <span className="text-sm font-medium text-gray-700">Filter by</span>
                </div>
                <select
                    value={filter}
                    onChange={(e) => handleFilterChange(e.target.value as FilterType)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                >
                    <option value="all">All emails ({emails.length})</option>
                    <option value="unread">Unread ({unreadCount})</option>
                    <option value="read">Read - Need reply ({readCount})</option>
                    <option value="replied">Replied ({repliedCount})</option>
                    <option value="by-email">By email address</option>
                </select>
            </div>

            {/* Email Search (only shows when 'by-email' selected) */}
            {filter === 'by-email' && (
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <Search className="h-4 w-4 text-gray-700" />
                        <span className="text-sm font-medium text-gray-700">Email</span>
                    </div>
                    <input
                        type="text"
                        value={searchEmail}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        placeholder="user@example.com"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    />
                </div>
            )}
        </div>
    );
}