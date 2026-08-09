interface SpotlightProps {
  className?: string
  size?: number
}

export default function Spotlight({ className = "", size = 300 }: SpotlightProps) {
  return (
    <div
      className={`absolute pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        background: "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)",
        filter: "blur(40px)",
      }}
    />
  )
}
