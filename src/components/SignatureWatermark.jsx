import { motion, useReducedMotion } from 'framer-motion'

// ─── Hand-traced SVG paths of the actual Hasan Malik signature ────────────────
// ViewBox: 0 0 1000 600
// Stroke order: H → asan → M → alik → underline → dot

const STROKES = [
  {
    // H — tall looping left stroke
    d: 'M 120 500 Q 100 380 120 280 Q 140 200 180 220 Q 200 240 190 350 Q 180 450 160 500',
    width: 3.8,
    delay: 0.12,
    duration: 1.2,
  },
  {
    // asan — connected lowercase script flowing right
    d: 'M 160 320 Q 180 300 220 310 Q 250 320 270 300 Q 290 280 310 300 Q 330 320 350 310 Q 370 300 390 330 Q 410 360 395 380',
    width: 3.2,
    delay: 1.20,
    duration: 1.3,
  },
  {
    // M — three tall spires, very prominent peaks
    d: 'M 395 350 Q 420 300 440 180 Q 455 130 470 160 Q 480 220 485 320 Q 490 280 510 180 Q 525 120 540 160 Q 550 230 555 340 Q 570 300 590 180 Q 605 130 620 160 Q 630 240 635 350',
    width: 3.8,
    delay: 2.35,
    duration: 1.0,
  },
  {
    // alik — flows right with tall ascender on 'l', 'k' flourish
    d: 'M 635 320 Q 660 300 685 320 Q 705 340 710 360 Q 715 310 720 220 Q 725 180 735 200 Q 745 240 750 340 Q 770 320 795 300 Q 815 290 830 340 Q 840 360 820 375',
    width: 3.2,
    delay: 3.25,
    duration: 1.0,
  },
  {
    // Underline — one long diagonal slash
    d: 'M 100 520 Q 350 500 600 490 Q 800 480 850 475',
    width: 3.0,
    delay: 4.15,
    duration: 0.7,
  },
  {
    // Dot — small terminal mark
    d: 'M 870 460 L 875 460',
    width: 7,
    delay: 4.80,
    duration: 0.15,
  },
]

// Opacity envelope:
//   0s        → invisible
//   ~0.1s     → 28% (drawing phase — clearly visible as the pen moves)
//   ~5.5s     → 28% (drawing complete)
//   ~8.5s     → 6%  (fades to permanent ghost watermark)
const SVG_OPACITY = {
  animate: { opacity: [0, 0.28, 0.28, 0.06] },
  transition: { duration: 9, times: [0, 0.012, 0.62, 1], ease: 'linear' },
}

export default function SignatureWatermark() {
  const reduced = useReducedMotion()

  if (reduced) {
    // Respect system preference — just show the watermark immediately, no animation
    return (
      <svg
        viewBox="0 0 1200 580"
        className="absolute inset-0 w-full h-full pointer-events-none select-none"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        style={{ opacity: 0.06 }}
      >
        {STROKES.map((s, i) => (
          <path
            key={i}
            d={s.d}
            stroke="white"
            strokeWidth={s.width}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
      </svg>
    )
  }

  return (
    <motion.svg
      viewBox="0 0 1200 580"
      className="absolute inset-0 w-full h-full pointer-events-none select-none"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={SVG_OPACITY.animate}
      transition={SVG_OPACITY.transition}
    >
      {STROKES.map((s, i) => (
        <motion.path
          key={i}
          d={s.d}
          stroke="white"
          strokeWidth={s.width}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            delay: s.delay,
            duration: s.duration,
            ease: [0.4, 0, 0.2, 1],
          }}
        />
      ))}
    </motion.svg>
  )
}
