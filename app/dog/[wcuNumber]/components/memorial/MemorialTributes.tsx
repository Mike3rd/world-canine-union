// app/dog/[wcuNumber]/components/memorial/MemorialTributes.tsx
'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, Flame, Heart, User } from 'lucide-react'
import CandleSVG from './CandleSVG'
import { supabase } from '@/lib/supabase'

interface MemorialTributesProps {
    dogId: string
    dogName: string
}

export default function MemorialTributes({ dogId, dogName }: MemorialTributesProps) {
    const [isLit, setIsLit] = useState(false)
    const [message, setMessage] = useState('')
    const [contributorName, setContributorName] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [candleCount, setCandleCount] = useState(0)
    const [tributes, setTributes] = useState<any[]>([])
    const [submittedMessage, setSubmittedMessage] = useState('')

    const [currentPage, setCurrentPage] = useState(1)
    const [hasMore, setHasMore] = useState(false)
    const [isLoadingMore, setIsLoadingMore] = useState(false)
    const TRIBUTES_PER_PAGE = 3

    // Fetch initial data
    useEffect(() => {
        fetchCandleCount()
        fetchTributes(1) // <-- Pass '1' for first page
        checkIfUserHasLit()
    }, [dogId])

    async function fetchCandleCount() {
        try {
            const { data, error } = await supabase
                .from('registrations')
                .select('candle_count')
                .eq('id', dogId)
                .single()

            if (error) throw error
            setCandleCount(data?.candle_count || 0)
        } catch (error) {
            console.error('Error fetching candle count:', error)
        }
    }

    async function fetchTributes(page = 1, loadMore = false) {
        if (loadMore) {
            setIsLoadingMore(true)
        }

        // Calculate the range of tributes to fetch
        const from = (page - 1) * TRIBUTES_PER_PAGE
        const to = from + TRIBUTES_PER_PAGE - 1

        try {
            const { data, error, count } = await supabase
                .from('memorial_tributes')
                .select('*', { count: 'exact' }) // Get total count
                .eq('dog_id', dogId)
                .order('created_at', { ascending: false })
                .range(from, to) // ✅ CRITICAL CHANGE: Fetch only a range

            if (error) throw error

            // Update the tributes list
            if (loadMore) {
                // Append new tributes to existing ones
                setTributes(prev => [...prev, ...(data || [])])
                setCurrentPage(page)
            } else {
                // Replace with first page
                setTributes(data || [])
            }

            // Check if more tributes exist beyond what we just fetched
            setHasMore((data?.length || 0) === TRIBUTES_PER_PAGE)

        } catch (error) {
            console.error('Error fetching tributes:', error)
        } finally {
            if (loadMore) {
                setIsLoadingMore(false)
            }
        }
    }

    // Handle loading the next page of tributes
    const handleLoadMore = async () => {
        if (!hasMore || isLoadingMore) return;
        await fetchTributes(currentPage + 1, true);
    };

    function checkIfUserHasLit() {
        const hasLit = localStorage.getItem(`candle_lit_${dogId}`)
        if (hasLit) {
            setIsLit(true)
        }
    }

    const handleLightCandle = async () => {
        if (!message.trim() || isLit) return

        setIsSubmitting(true)
        // Save the message before clearing
        const currentMessage = message
        const currentContributor = contributorName.trim() || 'Anonymous Friend'

        try {
            // 1. Save tribute to memorial_tributes table
            const { error: tributeError } = await supabase
                .from('memorial_tributes')
                .insert({
                    dog_id: dogId,
                    dog_name: dogName,
                    tribute_message: currentMessage,
                    contributor_name: currentContributor
                })

            if (tributeError) throw tributeError

            // 2. Update candle count in registrations table
            const { error: updateError } = await supabase
                .from('registrations')
                .update({
                    candle_count: candleCount + 1
                })
                .eq('id', dogId)

            if (updateError) throw updateError

            // 3. Update local state
            setIsLit(true)
            setSubmittedMessage(currentMessage) // Save for display
            setCandleCount(prev => prev + 1)
            localStorage.setItem(`candle_lit_${dogId}`, 'true')

            // 4. Clear form fields
            setMessage('')
            setContributorName('')

            // 5. Refresh tributes list
            await fetchTributes()

        } catch (error) {
            console.error('Error lighting candle:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        })
    }

    return (
        <div className="rounded-2xl shadow-xl overflow-hidden bg-memorial-surface ">
            {/* memorial Tribute Header */}
            <div className="p-6 memorial-rainbow-gradient" id="tributes-header">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    {/* Title area */}
                    <div className="flex items-center mb-4 sm:mb-0 memorial-primary">

                        <div>
                            <h2 className="text-2xl font-bold">🔥Virtual Candle Tribute</h2>
                            <p className="opacity-90">Light a candle in memory of {dogName}</p>
                        </div>
                    </div>

                    {/* Candle Count - Stacks under title on mobile */}
                    <div className="flex items-center justify-start sm:justify-end rounded-lg  bg-white pr-2 pl-1">
                        <Flame className="w-5 h-5 mr-1  text-amber-600" />
                        <span className="font-body text-memorial-text">{candleCount.toLocaleString()} candles lit</span>
                    </div>
                </div>
            </div>

            {/* White Content Section - YOUR EXISTING CONTENT GOES HERE */}
            <div className="p-6">

                {/* ROW 2: Candle + Form */}
                <div className="grid lg:grid-cols-2 gap-8 mb-8">

                    {/* LEFT: Candle Image */}
                    {/* LEFT: Candle Image */}
                    <div className="flex flex-col items-center justify-center p-6 rounded-xl bg-gradient-to-b from-white to-gray-50 border-2 border-gray-200/50 shadow-sm">

                        {/* Candle with decorative frame */}
                        <div className="relative mb-6 p-4 bg-gradient-to-b from-gray-50 to-white rounded-2xl border border-gray-200 shadow-inner">
                            {/* Candle glow effect */}
                            {isLit && (
                                <div className="absolute inset-0 bg-gradient-to-t from-amber-100/30 to-transparent blur-md rounded-2xl"></div>
                            )}

                            <CandleSVG isLit={isLit} size={80} />

                            {/* Candle stand */}
                            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-2 bg-gradient-to-r from-gray-300 to-gray-200 rounded-full"></div>
                        </div>

                        {/* Text with better presentation */}
                        <div className="text-center">
                            <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-gray-100 to-white border border-gray-300/50 shadow-sm">
                                <p className="text-sm font-medium text-gray-700">
                                    {isLit ? (
                                        <span className="flex items-center gap-2">
                                            <span className="relative">
                                                <span className="absolute -inset-1 bg-amber-500/20 blur-sm rounded-full"></span>
                                                <span className="relative">✨</span>
                                            </span>
                                            Your candle is lit
                                            <span className="relative">
                                                <span className="absolute -inset-1 bg-amber-500/20 blur-sm rounded-full"></span>
                                                <span className="relative">✨</span>
                                            </span>
                                        </span>
                                    ) : (
                                        `Light a candle for ${dogName}`
                                    )}
                                </p>
                            </div>

                            {/* Subtle decorative line */}
                            <div className="w-16 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto mt-3"></div>
                        </div>
                    </div>

                    {/* RIGHT: Message Form */}
                    <div>
                        {!isLit ? (
                            // ACTIVE FORM
                            <>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-2 text-memorial-text">
                                        Leave a tribute for {dogName}
                                    </label>
                                    <textarea
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Share a memory or kind words..."
                                        className="w-full p-3 rounded-lg border font-body resize-none bg-memorial-background border-memorial-border text-memorial-text"
                                        rows={3}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-2 text-memorial-text">
                                        Your name (optional)
                                    </label>
                                    <input
                                        type="text"
                                        value={contributorName}
                                        onChange={(e) => setContributorName(e.target.value)}
                                        placeholder="Your name"
                                        className="w-full p-3 rounded-lg border font-body bg-memorial-background border-memorial-border text-memorial-text"
                                    />
                                </div>

                                <button
                                    onClick={handleLightCandle}
                                    disabled={!message.trim() || isSubmitting}
                                    className={`w-full py-3 px-6 rounded-lg font-semibold flex items-center justify-center 
                                    ${!message.trim() || isSubmitting
                                            ? 'bg-gray-300 cursor-not-allowed'
                                            : 'bg-amber-600 hover:bg-amber-700 text-white'
                                        }`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                            Lighting Candle...
                                        </>
                                    ) : (
                                        <>
                                            <Flame className="w-4 h-4 mr-2" />
                                            Light Candle & Leave Tribute
                                        </>
                                    )}
                                </button>
                            </>
                        ) : (
                            // THANK YOU MESSAGE
                            <div className="p-6 rounded-lg bg-gradient-to-br from-memorial-spotlight-bg-from to-memorial-spotlight-bg-to"
                            >
                                <Heart className="w-10 h-10 mx-auto mb-3 text-amber-600" />
                                <h4 className="font-bold mb-2 text-center" style={{
                                    color: 'var(--color-memorial-spotlight-text-primary)',
                                    textShadow: '2px 2px 4px rgba(0,0,0,0.1), 0 0 20px rgba(var(--color-memorial-spotlight-primary-rgb), 0.15)',

                                }}>
                                    Thank You for Your Tribute
                                </h4>
                                {message ? (
                                    <p className="text-center text-amber-700 italic mb-2">
                                        "{message}"
                                    </p>
                                ) : null}
                                <p className="text-center text-sm text-memorial-spotlight-text-primary">
                                    Your candle burns brightly for {dogName}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* ROW 3: Messages - Full width */}
                <div className="border-t border-memorial-border pt-8">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h4 className="text-lg font-bold flex items-center text-memorial-text">
                                <MessageCircle className="w-5 h-5 mr-2 text-memorial-accent" />
                                Recent Tributes
                            </h4>
                            <p className="font-body mt-1 text-sm text-memorial-text-muted">
                                Messages in memory of {dogName}
                            </p>
                        </div>

                        <div className="flex items-center text-memorial-accent">
                            <Heart className="w-4 h-4 mr-1" />
                            <span className="font-semibold">{tributes.length}</span>
                        </div>
                    </div>

                    {/* Messages List */}
                    <div className="space-y-4">
                        {tributes.map((tribute) => (
                            <div
                                key={tribute.id}
                                className="p-4 rounded-lg border bg-memorial-background border-memorial-border"
                            >
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3 bg-memorial-surface text-memorial-accent">
                                        <User className="w-4 h-4" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <h5 className="font-semibold text-memorial-text">
                                                {tribute.contributor_name}
                                            </h5>
                                            <span className="text-xs text-memorial-text-muted">
                                                {formatDate(tribute.created_at)}
                                            </span>
                                        </div>
                                        <p className="font-body mt-1 text-memorial-text-muted">
                                            {tribute.tribute_message}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* ... after the tributes.map() ... */}

                        {/* "View More" Button Section */}
                        {hasMore && (
                            <div className="text-center mt-6 pt-6 border-t border-memorial-border">
                                <button
                                    onClick={handleLoadMore}
                                    disabled={isLoadingMore}
                                    className="bg-memorial-buttons text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    {isLoadingMore ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Loading more tributes...
                                        </span>
                                    ) : (
                                        `View More Tributes (${tributes.length}+)`
                                    )}
                                </button>
                                <p className="text-xs text-memorial-text-muted mt-2">
                                    Showing {tributes.length} of all tributes
                                </p>
                            </div>
                        )}

                        {/* "Back to Top" Button - Appears after 10+ tributes are showing */}
                        {tributes.length > 10 && (
                            <div className="text-center mt-4">
                                <button
                                    onClick={() => {
                                        document.getElementById('tributes-header')?.scrollIntoView({
                                            behavior: 'smooth'
                                        })
                                    }}
                                    className="text-memorial-accent hover:text-memorial-accent-light font-medium flex items-center justify-center gap-2 mx-auto cursor-pointer"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                                    </svg>
                                    Back to Top of Tributes
                                </button>
                            </div>
                        )}

                        {/* Optional: End of tributes message */}
                        {!hasMore && tributes.length > TRIBUTES_PER_PAGE && (
                            <div className="text-center mt-6 pt-6 border-t border-memorial-border">
                                <p className="text-memorial-text-muted">
                                    You've seen all {tributes.length} tributes for {dogName}.
                                </p>
                            </div>
                        )}



                    </div>
                </div>
            </div>
        </div>
    )
}