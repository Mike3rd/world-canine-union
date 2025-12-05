export default function HeartIcon({ 
  className = "", 
  size = 24,
  color = "currentColor" 
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 141.65 109.57"
      className={`text-accent ${className}`}
      fill={color}
      aria-hidden="true"
    >
      {/* ZapfDingbats-style heart */}
      <path d="M70.01,35.61v65.8C55.35,73.69,5.03,78.54,2.71,42.92-.2-1.56,60.59-7.32,70.01,35.61ZM70.09,35.61v65.8c14.66-27.71,64.97-22.87,67.3-58.48,2.91-44.48-57.88-50.24-67.3-7.31Z" />
    </svg>
  );
}