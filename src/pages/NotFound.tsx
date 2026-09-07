import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-6 py-32 text-center">
      <span className="font-display text-6xl font-medium text-ink-faint">404</span>
      <h1 className="mt-4 font-display text-xl font-medium text-ink">
        This component doesn't exist yet
      </h1>
      <p className="mt-2 text-sm text-ink-dim">
        The page you're looking for was moved, renamed, or never built.
      </p>
      <Link
        to="/"
        className="mt-6 flex items-center gap-2 rounded-lg bg-ink px-4 py-2 text-sm font-medium text-canvas"
      >
        <ArrowLeft size={14} />
        Back to home
      </Link>
    </div>
  )
}
