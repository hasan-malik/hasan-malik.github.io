import { useState, useEffect } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-apple-bg/85 backdrop-blur-md border-b border-apple-border'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <a
          href="#"
          className="text-apple-dark font-bold text-lg tracking-tight hover:text-apple-blue transition-colors duration-200"
        >
          HM
        </a>
        <div className="flex items-center gap-8">
          {[
            { label: 'Work',       href: '#work'       },
            { label: 'Experience', href: '#experience' },
            { label: 'Recognition',href: '#recognition'},
            { label: 'Gallery',    href: '#gallery'    },
            { label: 'Contact',    href: '#contact'    },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-sm font-medium text-apple-gray hover:text-apple-dark transition-colors duration-200 hidden sm:block"
            >
              {label}
            </a>
          ))}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium px-4 py-2 border border-apple-border rounded-full text-apple-dark hover:border-apple-blue hover:text-apple-blue transition-all duration-200"
          >
            Resume ↗
          </a>
        </div>
      </div>
    </nav>
  )
}
