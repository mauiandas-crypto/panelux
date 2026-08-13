'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Video {
  id: string
  title: string
  youtubeId: string
  type: 'demo' | 'testimonial' | 'tutorial' | 'care'
  duration: string
}

export default function VideoGallery() {
  const [selectedVideo, setSelectedVideo] = useState<string>('demo1')
  const [autoplay, setAutoplay] = useState(false)

  const videos: Video[] = [
    { id: 'demo1', title: 'Demostración de Sartén Premium', youtubeId: 'dQw4w9WgXcQ', type: 'demo', duration: '3:45' },
    { id: 'test1', title: 'Testimonio Cliente', youtubeId: 'dQw4w9WgXcQ', type: 'testimonial', duration: '2:30' },
    { id: 'tut1', title: 'Cómo Usar y Mantener', youtubeId: 'dQw4w9WgXcQ', type: 'tutorial', duration: '5:20' },
    { id: 'care1', title: 'Guía de Cuidados', youtubeId: 'dQw4w9WgXcQ', type: 'care', duration: '4:15' },
  ]

  const selected = videos.find((v) => v.id === selectedVideo)

  const typeColors: Record<string, string> = {
    demo: 'bg-blue-100 text-blue-700',
    testimonial: 'bg-green-100 text-green-700',
    tutorial: 'bg-purple-100 text-purple-700',
    care: 'bg-orange-100 text-orange-700',
  }

  const typeEmoji: Record<string, string> = {
    demo: '🎬',
    testimonial: '👥',
    tutorial: '📚',
    care: '✨',
  }

  return (
    <section className="py-12 border-t-2 border-gray-200">
      <div className="max-w-4xl">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Galería de Videos</h2>

        <div className="space-y-6">
          {/* Video Principal */}
          <div className="relative bg-black rounded-xl overflow-hidden shadow-lg">
            <div className="aspect-video relative">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selected?.youtubeId}?${autoplay ? 'autoplay=1' : ''}`}
                title={selected?.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0"
              />
            </div>
            <div className="absolute top-4 right-4 flex gap-2">
              <span className={`px-3 py-1 rounded-lg text-sm font-bold ${typeColors[selected?.type || 'demo']}`}>
                {typeEmoji[selected?.type || 'demo']} {selected?.type}
              </span>
              <span className="bg-black/60 text-white px-3 py-1 rounded-lg text-sm font-semibold">
                ⏱️ {selected?.duration}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
            <div>
              <h3 className="font-bold text-gray-900">{selected?.title}</h3>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={autoplay}
                onChange={(e) => setAutoplay(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm font-semibold text-gray-700">Autoplay</span>
            </label>
          </div>

          {/* Miniaturas de Videos */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {videos.map((video) => (
              <button
                key={video.id}
                onClick={() => setSelectedVideo(video.id)}
                className={`relative rounded-lg overflow-hidden border-2 transition transform hover:scale-105 ${
                  selectedVideo === video.id
                    ? 'border-blue-600 shadow-lg ring-2 ring-blue-300'
                    : 'border-gray-200 hover:border-blue-400'
                }`}
              >
                <div className="aspect-video bg-gradient-to-br from-gray-800 to-black flex items-center justify-center text-3xl">
                  {typeEmoji[video.type]}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 rounded-full p-2">▶️</div>
                </div>
                <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded">
                  {video.duration}
                </div>
                <p className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs p-2 truncate">
                  {video.title}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
