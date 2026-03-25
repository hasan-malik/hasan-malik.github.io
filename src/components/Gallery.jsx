import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── DATA ────────────────────────────────────────────────────────────────────
// Add your posts here. Images live in /public/gallery/postN/1.jpg etc.
// Each post should have 8–9 images.

const posts = [
  {
    id: 1,
    caption: 'Still chasing it',
    date: 'January 13, 2026',
    images: Array.from({ length: 9 }, (_, i) => `/gallery/post1/${i + 1}.jpg`),
  },
  {
    id: 2,
    caption: 'Harmless wrongs.',
    date: 'February 4, 2024',
    images: Array.from({ length: 10 }, (_, i) => `/gallery/post2/${i + 1}.jpg`),
  },
  {
    id: 3,
    caption: 'Stole the DRS sign.',
    date: 'June 15, 2025',
    images: Array.from({ length: 9 }, (_, i) => `/gallery/post3/${i + 1}.jpg`),
  },
]

// ─── PLACEHOLDER ─────────────────────────────────────────────────────────────

function ImgWithFallback({ src, alt, className }) {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return (
      <div className={`${className} bg-apple-light flex items-center justify-center`}>
        <span className="text-apple-gray text-xs text-center px-2">{alt}</span>
      </div>
    )
  }
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
    />
  )
}

// ─── LIGHTBOX ────────────────────────────────────────────────────────────────

function Lightbox({ post, initialIndex, onClose }) {
  const [current, setCurrent] = useState(initialIndex)
  const total = post.images.length

  const prev = useCallback(() => setCurrent(c => Math.max(c - 1, 0)), [])
  const next = useCallback(() => setCurrent(c => Math.min(c + 1, total - 1)), [total])

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape')     onClose()
      if (e.key === 'ArrowLeft')  prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, prev, next])

  // lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 bg-black/96 flex flex-col"
      onClick={onClose}
    >
      {/* Header */}
      <div
        className="flex items-start justify-between px-6 py-5 shrink-0"
        onClick={e => e.stopPropagation()}
      >
        <div>
          <p className="text-white font-semibold leading-snug">{post.caption}</p>
          <p className="text-apple-gray text-sm mt-0.5">{post.date}</p>
        </div>
        <button
          onClick={onClose}
          className="text-apple-gray hover:text-white transition-colors text-3xl leading-none ml-6 mt-0.5"
          aria-label="Close"
        >
          ×
        </button>
      </div>

      {/* Main image */}
      <div
        className="flex-1 flex items-center justify-center relative px-14 min-h-0"
        onClick={e => e.stopPropagation()}
      >
        {/* Prev */}
        <button
          onClick={prev}
          disabled={current === 0}
          className="absolute left-3 text-3xl text-white/60 hover:text-white disabled:opacity-20 transition-all w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10"
          aria-label="Previous"
        >
          ‹
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="w-full h-full flex items-center justify-center"
          >
            <ImgWithFallback
              src={post.images[current]}
              alt={`${post.caption} — photo ${current + 1}`}
              className="max-h-full max-w-full object-contain rounded-xl"
            />
          </motion.div>
        </AnimatePresence>

        {/* Next */}
        <button
          onClick={next}
          disabled={current === total - 1}
          className="absolute right-3 text-3xl text-white/60 hover:text-white disabled:opacity-20 transition-all w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10"
          aria-label="Next"
        >
          ›
        </button>
      </div>

      {/* Counter */}
      <p
        className="text-center text-apple-gray text-sm py-2 shrink-0"
        onClick={e => e.stopPropagation()}
      >
        {current + 1} / {total}
      </p>

      {/* Thumbnail strip */}
      <div
        className="flex gap-2 px-6 pb-6 pt-2 overflow-x-auto shrink-0 justify-center"
        onClick={e => e.stopPropagation()}
      >
        {post.images.map((img, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-all duration-150 ${
              i === current
                ? 'border-apple-blue scale-105'
                : 'border-transparent opacity-50 hover:opacity-80'
            }`}
          >
            <ImgWithFallback
              src={img}
              alt={`thumb ${i + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </motion.div>
  )
}

// ─── POST CARD ────────────────────────────────────────────────────────────────

function PostCard({ post, index, onOpen }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="cursor-pointer group"
      onClick={() => onOpen(post, 0)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Cover image */}
      <div className="relative aspect-square rounded-2xl overflow-hidden border border-apple-border">
        <ImgWithFallback
          src={post.images[0]}
          alt={post.caption}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Hover overlay */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-2 px-4"
        >
          <p className="text-white text-sm font-semibold text-center leading-snug">
            {post.caption}
          </p>
          <p className="text-apple-gray text-xs">{post.images.length} photos</p>
        </motion.div>

        {/* Photo count badge */}
        {post.images.length > 1 && (
          <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm rounded-full px-2 py-0.5 flex items-center gap-1">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5zm-2 8v-2h10v2H5z"/>
            </svg>
            <span className="text-white text-xs font-medium">{post.images.length}</span>
          </div>
        )}
      </div>

      {/* Caption + date */}
      <div className="mt-3 px-1">
        <p className="text-apple-dark text-sm font-semibold leading-snug line-clamp-2">
          {post.caption}
        </p>
        <p className="text-apple-gray text-xs mt-1">{post.date}</p>
      </div>
    </motion.div>
  )
}

// ─── GALLERY SECTION ─────────────────────────────────────────────────────────

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null) // { post, index }

  const openLightbox  = (post, index) => setLightbox({ post, index })
  const closeLightbox = useCallback(() => setLightbox(null), [])

  return (
    <section id="gallery" className="py-28">
      <div className="max-w-5xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <p className="text-sm font-semibold text-apple-blue tracking-widest uppercase mb-3">
            Gallery
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">
            <span className="text-apple-dark">Memorable </span>
            <span className="text-apple-blue">Moments</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <PostCard
              key={post.id}
              post={post}
              index={i}
              onOpen={openLightbox}
            />
          ))}
        </div>

      </div>

      <AnimatePresence>
        {lightbox && (
          <Lightbox
            post={lightbox.post}
            initialIndex={lightbox.index}
            onClose={closeLightbox}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
