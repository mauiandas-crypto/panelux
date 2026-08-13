'use client'

import { useEffect, useState } from 'react'

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check localStorage or system preference
    const stored = localStorage.getItem('darkMode')
    if (stored !== null) {
      setIsDark(stored === 'true')
    } else if (typeof window !== 'undefined') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setIsDark(prefersDark)
    }
  }, [])

  useEffect(() => {
    if (!mounted) return

    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
      localStorage.setItem('darkMode', 'true')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('darkMode', 'false')
    }
  }, [isDark, mounted])

  if (!mounted) return null

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="fixed top-6 right-6 z-40 bg-gray-900 dark:bg-white text-white dark:text-gray-900 w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition flex items-center justify-center font-bold text-xl"
      aria-label={isDark ? 'Modo claro' : 'Modo oscuro'}
      title={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  )
}
