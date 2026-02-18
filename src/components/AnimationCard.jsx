import React, { useState, useEffect, useRef } from "react";
import {
  Heart,
  X,
} from 'lucide-react';
import { PreviewContent } from "./PreviewContent";

function AnimationCard({ card, isFavorite, onToggleFavorite, onClick }) {
  return (
    <div
      className="relative group bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl overflow-hidden border border-white/10 hover:border-indigo-500/50 transition-all  hover:scale-105"
    >
      {/* Preview Area */}
      <div className="h-48 bg-black/20 flex items-center justify-center p-4">
        <PreviewContent card={card} />
      </div>

      {/* Card Content */}
      <div className="p-4 cursor-pointer" onClick={onClick}>
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-left text-white">{card.title}</h3>
            <p className="text-sm text-gray-400 text-left mt-1">{card.description}</p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite();
            }}
            className="ml-2 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-150"
          >
            <Heart
              size={20}
              className={`transition-all ${isFavorite
                ? "fill-red-500 text-red-500"
                : "text-gray-400 hover:text-red-400"
                }`}
            />
          </button>
        </div>
        <span className="inline-block px-3 py-1 text-xs rounded-full bg-indigo-500/20 text-indigo-300">
          {card.language}
        </span>
      </div>
    </div>
  );
}

function EditControlsModal({ card, onClose, onApply }) {
  const [controls, setControls] = useState({
    size: 100,
    opacity: 100,
    speed: 100
  });
  const [position, setPosition] = useState({ x: window.innerWidth / 2 - 200, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const modalRef = useRef(null);

  const handleMouseDown = (e) => {
    if (e.target.closest('.modal-header')) {
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const handleApply = () => {
    onApply(controls);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[70] flex items-center justify-center">
      <div
        ref={modalRef}
        style={{
          position: 'fixed',
          left: `${position.x}px`,
          top: `${position.y}px`,
          cursor: isDragging ? 'grabbing' : 'default'
        }}
        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-white/10 w-96 shadow-2xl"
      >
        {/* Draggable Header */}
        <div
          className="modal-header flex items-center justify-between p-4 border-b border-white/10 cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
        >
          <h3 className="text-lg font-semibold text-white">Edit Animation</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-150"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Controls */}
        <div className="p-6 space-y-6">
          {/* Size Control */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-300">Size</label>
              <span className="text-sm text-indigo-400">{controls.size}%</span>
            </div>
            <input
              type="range"
              min="50"
              max="200"
              value={controls.size}
              onChange={(e) => setControls(prev => ({ ...prev, size: parseInt(e.target.value) }))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
          </div>

          {/* Opacity Control */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-300">Opacity</label>
              <span className="text-sm text-indigo-400">{controls.opacity}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={controls.opacity}
              onChange={(e) => setControls(prev => ({ ...prev, opacity: parseInt(e.target.value) }))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
          </div>

          {/* Speed Control */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-300">Speed</label>
              <span className="text-sm text-indigo-400">{controls.speed}%</span>
            </div>
            <input
              type="range"
              min="25"
              max="400"
              value={controls.speed}
              onChange={(e) => setControls(prev => ({ ...prev, speed: parseInt(e.target.value) }))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg font-medium transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium transition-all"
            >
              Apply Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { AnimationCard, EditControlsModal };