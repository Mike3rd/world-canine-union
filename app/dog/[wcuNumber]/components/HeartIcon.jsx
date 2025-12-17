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
      <path d="M69.99,35.56C60.54-7.31-.2-1.54,2.71,42.92c2.33,35.6,52.58,30.78,67.27,58.44v.04s0-.01.01-.02c0,0,0,.01.01.02v-.04c14.69-27.66,64.95-22.84,67.27-58.44,2.91-44.46-57.83-50.24-67.29-7.37Z" />
    </svg>
  );
}