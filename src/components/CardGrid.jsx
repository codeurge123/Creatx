import React from 'react'

export default function CardGrid({ cards = [], onSelect, selectedId }) {
  return (
    <div className="grid gap-3">
      {cards.map((c) => (
        <div
          key={c.id}
          onClick={() => onSelect(c)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => (e.key === 'Enter' ? onSelect(c) : null)}
          className={`relative bg-white/4  hover:bg-white/6 border border-white/6 rounded-lg p-3 transition-transform transform hover:-translate-y-1 hover:shadow-sm hover:shadow-purple-400 cursor-pointer ${selectedId === c.id ? 'ring-2 ring-indigo-500/40 border-purple-500' : ''}`}
        >
          <h3 className="text-sm font-medium text-white">{c.title}</h3>
          <p className="text-xs text-white/70 mt-1">{c.description}</p>
        </div>
      ))}
    </div>
  )
}
