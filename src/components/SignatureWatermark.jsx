import { motion, useReducedMotion } from 'framer-motion'

// ─── Hand-traced SVG paths of the Hasan Malik signature ──────────────────────
// ViewBox: 0 0 1200 580
// Stroke order follows natural pen movement: H → asan → M → alik → underline × 2 → dot

const STROKES = [
  {
    // H — tall initial upstroke, loop, descends back into the script
    d: 'M 182 455 C 148 372 108 248 126 162 C 140 104 168 120 172 194 C 178 278 154 372 146 426 C 140 460 155 486 178 490 C 202 494 230 474 256 446',
    width: 3.5,
    delay: 0.15,
    duration: 1.4,
  },
  {
    // asan — lowercase cursive, three small loops connecting to M
    d: 'M 256 446 C 280 420 306 398 338 380 C 360 366 374 372 383 356 C 398 332 394 308 380 328 C 366 348 362 380 382 392 C 404 406 440 388 474 364 C 494 350 506 358 518 342 C 534 320 530 296 516 316 C 502 336 498 368 518 380 C 540 394 576 376 612 352',
    width: 3.2,
    delay: 1.28,
    duration: 1.5,
  },
  {
    // M — three tall spires, the tallest strokes in the signature
    d: 'M 612 352 C 625 326 632 236 641 160 C 649 116 665 134 669 186 C 676 248 672 334 689 302 C 707 266 728 156 744 112 C 758 76 776 96 781 150 C 789 216 783 308 798 276',
    width: 3.5,
    delay: 2.55,
    duration: 1.0,
  },
  {
    // alik — flows right, 'l' has a tall ascender, 'k' kicks out
    d: 'M 798 276 C 812 253 832 270 852 310 C 870 342 875 326 880 300 C 885 274 878 256 871 276 C 864 298 868 334 886 348 C 906 364 930 340 950 308 C 964 286 969 300 971 332 C 974 358 970 386 978 356 C 988 324 996 246 1010 173 C 1018 134 1034 156 1039 204 C 1045 256 1042 318 1058 314',
    width: 3.2,
    delay: 3.38,
    duration: 1.1,
  },
  {
    // Underline 1 — long diagonal slash through the entire signature
    d: 'M 108 488 C 318 470 578 458 818 446 C 938 440 1026 436 1080 432',
    width: 2.8,
    delay: 4.28,
    duration: 0.62,
  },
  {
    // Underline 2 — parallel flourish just below
    d: 'M 238 524 C 446 506 690 494 916 484 C 1028 479 1093 476 1118 474',
    width: 2.5,
    delay: 4.80,
    duration: 0.52,
  },
  {
    // Dot — small round terminal mark after the underlines
    d: 'M 1136 452 L 1137 452',
    width: 8,
    delay: 5.18,
    duration: 0.18,
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
