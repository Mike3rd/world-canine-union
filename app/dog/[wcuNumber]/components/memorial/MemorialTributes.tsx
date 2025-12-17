// app/dog/[wcuNumber]/components/memorial/MemorialTributes.tsx
'use client'
import { MessageCircle, Heart, User } from 'lucide-react'

interface MemorialTributesProps {
    dogId: string
    dogName: string
}

// Mock data - will come from database
const mockTributes = [
    { id: 1, name: "Sarah M.", message: "Forever in our hearts. Such a beautiful soul.", date: "2024-01-15" },
    { id: 2, name: "The Johnson Family", message: "We'll always remember your happy tail wags.", date: "2024-01-10" },
    { id: 3, name: "Friend from the park", message: "Miss seeing you on our morning walks.", date: "2024-01-05" },
]

export default function MemorialTributes({ dogId, dogName }: MemorialTributesProps) {

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        })
    }

    return (
        <div className="rounded-2xl shadow-xl overflow-hidden border bg-memorial-surface border-memorial-border">
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-xl font-bold flex items-center text-memorial-text">
                            <MessageCircle className="w-5 h-5 mr-2 text-memorial-accent" />
                            Tributes & Memories
                        </h3>
                        <p className="font-body mt-1 text-memorial-text-muted">
                            Messages from friends and family
                        </p>
                    </div>

                    <div className="flex items-center text-memorial-accent">
                        <Heart className="w-4 h-4 mr-1" />
                        <span className="font-semibold">{mockTributes.length} tributes</span>
                    </div>
                </div>

                {/* Tribute Messages */}
                <div className="space-y-6">
                    {mockTributes.map((tribute) => (
                        <div
                            key={tribute.id}
                            className="p-5 rounded-xl border bg-memorial-background border-memorial-border"
                        >
                            <div className="flex items-start mb-3">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mr-3 bg-memorial-surface text-memorial-accent">
                                    <User className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                        <h4 className="font-semibold text-memorial-text">
                                            {tribute.name}
                                        </h4>
                                        <span className="text-sm mt-1 sm:mt-0 text-memorial-text-muted">
                                            {formatDate(tribute.date)}
                                        </span>
                                    </div>
                                    <p className="font-body mt-2 text-memorial-text-muted">
                                        {tribute.message}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center justify-end mt-4 pt-4 border-t border-memorial-border">
                                <button className="flex items-center text-sm text-memorial-accent hover:text-memorial-accent-light">
                                    <Heart className="w-3 h-3 mr-1" />
                                    <span>Send love</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Add Tribute Form (Simplified) */}
                <div className="mt-8 pt-6 border-t border-memorial-border">
                    <div className="text-center">
                        <p className="font-body mb-4 text-memorial-text-muted">
                            Share your own memory of {dogName}
                        </p>
                        <button
                            className="inline-flex items-center py-2 px-6 rounded-lg font-medium transition bg-memorial-buttons text-white hover:opacity-90"
                            onClick={() => alert('Tribute submission will be available soon')}
                        >
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Share a Memory
                        </button>
                        <p className="text-xs mt-3 font-body text-memorial-text-muted">
                            Tributes are moderated before appearing
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}