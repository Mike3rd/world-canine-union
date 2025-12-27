// app/dog/[wcuNumber]/components/memorial/CandleSVG.tsx
'use client'

interface CandleSVGProps {
    isLit: boolean
    size?: number
    className?: string
}

export default function CandleSVG({ isLit, size = 80, className = '' }: CandleSVGProps) {
    const height = size * 2.8

    return (
        <svg
            width={size}
            height={height}
            viewBox="0 -50 80 260"
            className={`mx-auto ${className}`}
            preserveAspectRatio="xMidYMid meet"
        >
            {/* Gradient definitions for flame */}
            <defs>
                <radialGradient id="flame-gradient">
                    <stop offset="0%" stopColor="#ff4500" />   {/* Red-orange center */}
                    <stop offset="60%" stopColor="#ff8c00" />  {/* Orange middle */}
                    <stop offset="90%" stopColor="#ffd700" />  {/* Yellow edge */}
                    <stop offset="100%" stopColor="transparent" />
                </radialGradient>
                <radialGradient id="inner-flame-gradient">
                    <stop offset="0%" stopColor="#ffff00" />   {/* Bright yellow center */}
                    <stop offset="70%" stopColor="#ffa500" />  {/* Orange */}
                    <stop offset="100%" stopColor="transparent" />
                </radialGradient>
            </defs>

            {/* Candle base */}
            <ellipse
                cx="40"
                cy="190"
                rx="30"
                ry="5"
                className="fill-memorial-text-muted"
            />

            {/* Candle stick */}
            <rect
                x="25"
                y="20"
                width="30"
                height="170"
                rx="4"
                className={isLit ? "fill-memorial-candle" : "fill-gray-300"}
                style={isLit ? { filter: 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.4))' } : {}}
            />

            {/* Wax drips - made more visible with darker color */}
            <path
                d="M 28 18 C 30 10, 50 10, 52 18 L 52 25 C 50 22, 30 22, 28 25 Z"
                fill="#d46b08"
                opacity="0.8"
            />

            {/* Wick */}
            <line
                x1="40"
                y1="-10"
                x2="40"
                y2="20"
                stroke={isLit ? "#5d2906" : "#6B7280"}  /* Darker brown when lit */
                strokeWidth="2"
            />

            {/* Flame */}
            {isLit && (
                <g className="candle-flame">
                    {/* Outer flame - red/orange/yellow gradient */}
                    <path
                        d="M 30 -10 Q 40 -35, 50 -10 Q 40 -25, 30 -10"
                        fill="url(#flame-gradient)"
                        style={{
                            filter: 'drop-shadow(0 0 15px rgba(255, 69, 0, 0.5))',
                            transformOrigin: 'center -20px',
                            animation: 'flicker 0.5s infinite alternate'
                        }}
                    />

                    {/* Inner flame - bright yellow core */}
                    <path
                        d="M 35 -15 Q 40 -28, 45 -15 Q 40 -22, 35 -15"
                        fill="url(#inner-flame-gradient)"
                        style={{
                            transformOrigin: 'center -20px',
                            animation: 'flicker-slow 1s infinite alternate'
                        }}
                    />

                    {/* Bright yellow tip */}
                    <ellipse
                        cx="40"
                        cy="-30"
                        rx="3"
                        ry="4"
                        fill="#ffff00"
                        style={{
                            filter: 'drop-shadow(0 0 8px yellow)',
                            animation: 'flicker 0.5s infinite alternate'
                        }}
                    />

                    {/* Glow/halo around flame */}
                    <ellipse
                        cx="40"
                        cy="-5"
                        rx="15"
                        ry="8"
                        fill="url(#flame-gradient)"
                        opacity="0.3"
                        style={{ filter: 'blur(8px)' }}
                    />
                </g>
            )}
        </svg>
    )
}