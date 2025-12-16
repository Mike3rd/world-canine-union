// app/dog/[wcuNumber]/components/VirtualCandle.tsx
'use client'

import { useState } from 'react'

interface VirtualCandleProps {
    dogId: string
}

export default function VirtualCandle({ dogId }: VirtualCandleProps) {
    const [isLit, setIsLit] = useState(false)
    const [message, setMessage] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleLightCandle = async () => {
        if (!message.trim() || isLit) return

        setIsSubmitting(true)

        // TODO: API call to record candle lighting
        await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API call

        setIsLit(true)
        setIsSubmitting(false)
    }

    return (
        <div className="bg-gradient-to-b from-gray-900 to-black text-white rounded-2xl shadow-lg p-6 text-center">
            <h3 className="text-xl font-bold mb-4">Light a Virtual Candle</h3>

            <div className="mb-6">
                <div className="relative inline-block">
                    {/* Candle */}
                    <div className="w-8 h-24 bg-gradient-to-b from-yellow-100 to-yellow-300 rounded-t-lg mx-auto mb-2 relative">
                        {/* Flame */}
                        {isLit && (
                            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                                <div className="w-6 h-12 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full blur-sm animate-flicker"></div>
                            </div>
                        )}
                    </div>
                    {/* Candle holder */}
                    <div className="w-12 h-4 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full mx-auto"></div>
                </div>
            </div>

            {!isLit ? (
                <>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Leave a message in memory..."
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-400 mb-4 resize-none"
                        rows={3}
                    />
                    <button
                        onClick={handleLightCandle}
                        disabled={!message.trim() || isSubmitting}
                        className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Lighting...' : 'Light Candle'}
                    </button>
                </>
            ) : (
                <div className="space-y-4">
                    <p className="text-green-200">✨ Your candle has been lit</p>
                    <p className="text-gray-300 italic">"{message}"</p>
                    <p className="text-sm text-gray-400">
                        Thank you for honoring their memory
                    </p>
                </div>
            )}
        </div>
    )
}