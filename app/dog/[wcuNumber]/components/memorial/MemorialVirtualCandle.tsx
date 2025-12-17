// app/dog/[wcuNumber]/components/memorial/MemorialVirtualCandle.tsx
'use client'

import { useState } from 'react'
import { Flame, Heart } from 'lucide-react'
import CandleSVG from './CandleSVG' // ← Import the new component

interface MemorialVirtualCandleProps {
    dogId: string
    dogName: string
}

export default function MemorialVirtualCandle({ dogId, dogName }: MemorialVirtualCandleProps) {
    const [isLit, setIsLit] = useState(false)
    const [message, setMessage] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [candleCount, setCandleCount] = useState(42)

    const handleLightCandle = async () => {
        if (!message.trim() || isLit) return

        setIsSubmitting(true)

        try {
            await new Promise(resolve => setTimeout(resolve, 800))
            setIsLit(true)
            setCandleCount(prev => prev + 1)
            console.log('Candle lit for dog:', dogId, 'Message:', message)
        } catch (error) {
            console.error('Error lighting candle:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="rounded-2xl shadow-xl overflow-hidden border bg-memorial-surface border-memorial-border">
            <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                    <div>
                        <h3 className="text-xl font-bold flex items-center text-memorial-text">
                            <Flame className="w-5 h-5 mr-2 text-memorial-candle" />
                            Virtual Candle Tribute
                        </h3>
                        <p className="font-body mt-1 text-memorial-text-muted">
                            Light a candle in memory of {dogName}
                        </p>
                    </div>

                    <div className="mt-4 md:mt-0 flex items-center text-memorial-accent">
                        <Flame className="w-4 h-4 mr-2" />
                        <span className="font-semibold">{candleCount.toLocaleString()} candles lit</span>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Candle Visualization - Using the new component */}
                    <div className="flex-1 flex flex-col items-center justify-center">
                        <div className="relative mb-6">
                            <CandleSVG isLit={isLit} size={80} />
                        </div>

                        <div className="text-center">
                            {isLit ? (
                                <div className="text-green-600 font-medium flex items-center justify-center">
                                    <Heart className="w-4 h-4 mr-2" />
                                    Your candle is burning brightly
                                </div>
                            ) : (
                                <div className="text-memorial-text-muted">
                                    Click "Light Candle" to add your tribute
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Message Form */}
                    <div className="flex-1">
                        {!isLit ? (
                            <>
                                <div className="mb-4">
                                    <label htmlFor="candle-message" className="block text-sm font-medium mb-2 text-memorial-text">
                                        Leave a message in memory of {dogName}
                                    </label>
                                    <textarea
                                        id="candle-message"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Share a memory, a kind word, or simply light a candle in their honor..."
                                        className="w-full p-3 rounded-lg border font-body resize-none bg-memorial-background border-memorial-border text-memorial-text"
                                        rows={4}
                                    />
                                </div>

                                <button
                                    onClick={handleLightCandle}
                                    disabled={!message.trim() || isSubmitting}
                                    className={`w-full py-3 px-6 rounded-lg font-semibold transition flex items-center justify-center 
                                        ${!message.trim() || isSubmitting
                                            ? 'bg-memorial-border cursor-not-allowed'
                                            : 'bg-memorial-buttons hover:opacity-90'
                                        } text-white`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                            Lighting Candle...
                                        </>
                                    ) : (
                                        <>
                                            <Flame className="w-4 h-4 mr-2" />
                                            Light Virtual Candle
                                        </>
                                    )}
                                </button>
                            </>
                        ) : (
                            <div className="p-6 rounded-lg text-center bg-memorial-background border border-memorial-border">
                                <Heart className="w-12 h-12 mx-auto mb-4 text-memorial-accent" />
                                <h4 className="font-bold mb-2 text-memorial-text">
                                    Thank You for Your Tribute
                                </h4>
                                <p className="font-body mb-4 text-memorial-text-muted">
                                    "{message}"
                                </p>
                                <p className="text-sm text-memorial-text-muted">
                                    Your candle will burn brightly in {dogName}'s memory.
                                </p>
                            </div>
                        )}

                        <div className="mt-4 text-center">
                            <p className="text-sm font-body text-memorial-text-muted">
                                Each candle represents a tribute in {dogName}'s memory
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}