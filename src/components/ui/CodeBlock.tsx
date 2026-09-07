import { Highlight, themes, type Language } from 'prism-react-renderer'
import CopyButton from './CopyButton'

interface CodeBlockProps {
  code: string
  language?: Language
  filename?: string
}

export default function CodeBlock({ code, language = 'tsx', filename }: CodeBlockProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-hairline bg-[#0d0d12]">
      <div className="flex items-center justify-between border-b border-hairline-soft px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          </div>
          {filename && (
            <span className="ml-2 font-mono text-xs text-ink-faint">{filename}</span>
          )}
        </div>
        <CopyButton value={code} />
      </div>
      <Highlight theme={themes.vsDark} code={code.trim()} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${className} max-h-[480px] overflow-auto p-4 font-mono text-[13px] leading-relaxed`}
            style={{ ...style, background: 'transparent' }}
          >
            {tokens.map((line, i) => {
              const lineProps = getLineProps({ line })
              return (
                <div key={i} {...lineProps} className="table-row">
                  <span className="table-cell select-none pr-4 text-right text-ink-faint/50">
                    {i + 1}
                  </span>
                  <span className="table-cell">
                    {line.map((token, tIndex) => {
                      const tokenProps = getTokenProps({ token })
                      return <span key={tIndex} {...tokenProps} />
                    })}
                  </span>
                </div>
              )
            })}
          </pre>
        )}
      </Highlight>
    </div>
  )
}
