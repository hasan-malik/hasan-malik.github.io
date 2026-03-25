import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  if (days < 30) return `${days}d ago`
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export default function GitHubActivity() {
  const [activity, setActivity] = useState(null)

  useEffect(() => {
    fetch('https://api.github.com/users/hasan-malik/events?per_page=30')
      .then(r => r.json())
      .then(events => {
        const push = events.find(e => e.type === 'PushEvent')
        if (!push) return
        const commit = push.payload.commits?.at(-1)
        if (!commit) return
        setActivity({
          repo: push.repo.name.replace('hasan-malik/', ''),
          message: commit.message.split('\n')[0].slice(0, 72),
          time: timeAgo(push.created_at),
        })
      })
      .catch(() => {})
  }, [])

  if (!activity) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-start gap-3 bg-white/[0.03] border border-apple-border rounded-xl px-4 py-3"
    >
      <span className="text-green-400 mt-1 text-[8px] leading-none">●</span>
      <div className="min-w-0">
        <p className="text-xs text-apple-gray mb-0.5">
          last commit · <span className="text-white/60">{activity.time}</span>
        </p>
        <p className="text-sm font-medium text-white/90 leading-snug truncate">{activity.message}</p>
        <p className="text-xs text-apple-gray/50 mt-0.5">{activity.repo}</p>
      </div>
    </motion.div>
  )
}
