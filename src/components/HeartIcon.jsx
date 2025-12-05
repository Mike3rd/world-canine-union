export default function HeartIcon({ 
  className = "", 
  size = 24,
  color = "currentColor" 
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`text-accent ${className}`}
      fill={color}
      aria-hidden="true"
    >
      {/* ZapfDingbats-style heart */}
      <path d="M50,85 C30,70 15,55 15,35 C15,20 25,10 40,10 C50,10 55,15 50,25 C45,15 50,10 60,10 C75,10 85,20 85,35 C85,55 70,70 50,85 Z" />
    </svg>
  );
}