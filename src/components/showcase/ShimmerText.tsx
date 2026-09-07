export default function ShimmerText() {
  return (
    <p
      className="bg-clip-text text-center font-display text-3xl font-semibold text-transparent sm:text-4xl"
      style={{
        backgroundImage:
          'linear-gradient(110deg, #4b4b58 30%, #ffffff 45%, #4b4b58 60%)',
        backgroundSize: '250% 100%',
        animation: 'shimmer-sweep 3.2s linear infinite',
      }}
    >
      Built different.
      <style>{`
        @keyframes shimmer-sweep {
          0% { background-position: 200% 0; }
          100% { background-position: -100% 0; }
        }
      `}</style>
    </p>
  )
}
