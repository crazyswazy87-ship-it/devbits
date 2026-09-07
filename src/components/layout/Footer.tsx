import { Link } from 'react-router-dom'
import { categories } from '../../data/categories'
import logo from "../../../public/assets/images/devbits.png"


export default function Footer() {
  return (
    <footer className="border-t border-hairline">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <Link to="/" className="flex items-center gap-2.5">
              <img 
                src={logo}
                alt='Rb'
                className='nido'
              />
              
              <span className="font-display text-sm font-semibold text-ink">
                dev<span className="text-ink-faint">bits</span>
              </span>
            </Link>
            <p className="mt-3 max-w-[22ch] text-sm leading-relaxed text-ink-faint">
              A collection of motion-driven components built to make interfaces feel alive.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-medium text-ink-dim">Categories</h4>
            <ul className="mt-3 space-y-2">
              {categories.slice(0, 4).map((c) => (
                <li key={c.id}>
                  <Link
                    to={`/components?category=${c.id}`}
                    className="text-sm text-ink-faint transition-colors hover:text-ink"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-medium text-ink-dim">More</h4>
            <ul className="mt-3 space-y-2">
              {categories.slice(4).map((c) => (
                <li key={c.id}>
                  <Link
                    to={`/components?category=${c.id}`}
                    className="text-sm text-ink-faint transition-colors hover:text-ink"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-medium text-ink-dim">Project</h4>
            <ul className="mt-3 space-y-2">
              <li>
                <Link to="/components" className="text-sm text-ink-faint transition-colors hover:text-ink">
                  All components
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-ink-faint transition-colors hover:text-ink"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-hairline-soft pt-6 text-xs text-ink-faint sm:flex-row sm:items-center">
          <span>Built for developers who want better interfaces, faster.</span>
          <span>A Block Seven Creation</span>
        </div>
      </div>
    </footer>
  )
}
