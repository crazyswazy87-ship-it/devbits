export default function GlowButton() {
  return (
    <button className="group relative rounded-lg p-[1.5px]">
      <span
        className="absolute inset-0 rounded-lg opacity-70 transition-opacity group-hover:opacity-100"
        style={{
          background:
            'conic-gradient(from 0deg, #7c5cff, #45e0c4, #7c5cff)',
          animation: 'spin-border 2.5s linear infinite',
        }}
      />
      <span className="relative flex items-center gap-2 rounded-[7px] bg-surface-2 px-6 py-2.5 font-medium text-ink">
        Get started
      </span>
      <style>{`
        @keyframes spin-border {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </button>
  )
}
