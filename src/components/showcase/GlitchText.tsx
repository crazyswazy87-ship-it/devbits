export default function GlitchText() {
  return (
    <div className="group relative select-none font-display text-3xl font-semibold text-ink">
      <span className="relative z-10">SYSTEM.OK</span>
      <span
        aria-hidden
        className="absolute left-0 top-0 z-0 text-flux opacity-0 transition-opacity duration-150 group-hover:opacity-80 group-hover:[animation:glitch-1_0.35s_steps(2)_infinite]"
      >
        SYSTEM.OK
      </span>
      <span
        aria-hidden
        className="absolute left-0 top-0 z-0 text-ember opacity-0 transition-opacity duration-150 group-hover:opacity-80 group-hover:[animation:glitch-2_0.35s_steps(2)_infinite]"
      >
        SYSTEM.OK
      </span>
      <style>{`
        @keyframes glitch-1 {
          0% { transform: translate(0,0); clip-path: inset(0 0 60% 0); }
          50% { transform: translate(-3px,1px); clip-path: inset(20% 0 30% 0); }
          100% { transform: translate(2px,-1px); clip-path: inset(60% 0 5% 0); }
        }
        @keyframes glitch-2 {
          0% { transform: translate(0,0); clip-path: inset(40% 0 10% 0); }
          50% { transform: translate(3px,-1px); clip-path: inset(5% 0 70% 0); }
          100% { transform: translate(-2px,1px); clip-path: inset(70% 0 5% 0); }
        }
      `}</style>
    </div>
  )
}
