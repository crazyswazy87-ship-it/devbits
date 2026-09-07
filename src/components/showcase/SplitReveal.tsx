import { motion } from 'framer-motion'

export default function SplitReveal() {
  const line = 'Motion that reads.'
  const words = line.split(' ')

  return (
    <div className="flex flex-wrap justify-center gap-x-3 px-6 text-center">
      {words.map((word, wi) => (
        <span key={wi} className="flex overflow-hidden">
          {word.split('').map((char, ci) => (
            <motion.span
              key={ci}
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{
                duration: 0.6,
                delay: wi * 0.08 + ci * 0.03,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-block font-display text-2xl font-medium text-ink sm:text-3xl"
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </div>
  )
}
