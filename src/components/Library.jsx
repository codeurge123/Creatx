import React, { useState, useEffect } from "react";
import {
  Heart,
  X,
  Copy,
  Check,
  Edit,
  Maximize2,
  Loader2
} from 'lucide-react';
import { AnimationModal } from "./AnimationModal";
import { AnimationCard } from "./AnimationCard";
import { animationAPI } from "../services/animationService";
import { sampleCards } from "../../samplecard";

export default function Library() {
  const [category, setCategory] = useState("all");
  const [selectedCard, setSelectedCard] = useState(null);
  const [favorites, setFavorites] = useState({});
  const [copied, setCopied] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [animations, setAnimations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUserAnimations();
  }, []);

  const fetchUserAnimations = async () => {
    try {
      setLoading(true);
      const response = await animationAPI.getUserAnimations();
      // Only show non-public (private) animations in your library.
      // Shared animations are visible in the Community section.
      const privateAnimations = (response.data.data || []).filter(
        (anim) => !anim.isPublic
      );
      setAnimations(privateAnimations);
    } catch (err) {
      setError("Failed to load animations");
      console.error("Error fetching animations:", err);
    } finally {
      setLoading(false);
    }
  };

  const allAnimations = [...animations, ...sampleCards];

  const filteredCards = category === "all"
    ? allAnimations
    : allAnimations.filter(c => c.category === category);

  const displayedCards = showAll ? filteredCards : filteredCards.slice(0, 6);

  const toggleFavorite = async (id) => {
    try {
      const response = await animationAPI.toggleLike(id);
      const liked = response.data.data.liked;
      const likesCount = response.data.data.likesCount;

      setFavorites((prev) => ({
        ...prev,
        [id]: liked,
      }));

      // update local likes count for the animation
      setAnimations((prev) =>
        prev.map((anim) =>
          (anim._id || anim.id) === id ? { ...anim, likesCount } : anim
        )
      );
    } catch (err) {
      console.error("Failed to toggle like", err);
    }
  };

  const copyCode = () => {
    if (!selectedCard) return;

    const code = `<!-- HTML -->
${selectedCard.html}

/* CSS */
${selectedCard.css}

${selectedCard.js ? `// JavaScript\n${selectedCard.js}` : ''}`;

    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen text-white p-6">
      <div className="max-w-7xl mx-auto">

        {/* Category Filters */}
        <div className="flex gap-3 mb-8">
          <button
            onClick={() => {
              setCategory("all");
              setShowAll(false);
            }}
            className={`px-6 py-2 rounded-full font-medium transition-all ${category === "all"
              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/50"
              : "bg-white/5 text-gray-300 hover:bg-white/10"
              }`}
          >
            All
          </button>
          <button
            onClick={() => {
              setCategory("css");
              setShowAll(false);
            }}
            className={`px-6 py-2 rounded-full font-medium transition-all ${category === "css"
              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/50"
              : "bg-white/5 text-gray-300 hover:bg-white/10"
              }`}
          >
            CSS
          </button>
          <button
            onClick={() => {
              setCategory("js");
              setShowAll(false);
            }}
            className={`px-6 py-2 rounded-full font-medium transition-all ${category === "js"
              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/50"
              : "bg-white/5 text-gray-300 hover:bg-white/10"
              }`}
          >
            JS
          </button>
        </div>

        {/* Animation Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-400" />
            <span className="ml-2 text-white/60">Loading your animations...</span>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="text-red-400 mb-4">{error}</div>
            <button
              onClick={fetchUserAnimations}
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : displayedCards.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-white/60 mb-4">
              {animations.length === 0
                ? "You haven't created any private animations yet. Create one or share to Community to show it to others."
                : "No animations found in this category."}
            </div>
            <a
              href="/create"
              className="inline-block px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium transition-colors"
            >
              Create Your First Animation
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedCards.map((card) => (
              <AnimationCard
                key={card._id || card.id}
                card={card}
                isFavorite={favorites[card._id || card.id]}
                onToggleFavorite={() => toggleFavorite(card._id || card.id)}
                onClick={() => setSelectedCard(card)}
              />
            ))}
          </div>
        )}

        {/* View All Button */}
        {!showAll && !loading && !error && filteredCards.length > 6 && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setShowAll(true)}
              className="px-8 py-3 relative top-[-49px] duration-200 bg-indigo-500 hover:bg-indigo-600 rounded-full font-semibold shadow-lg transition-all hover:scale-105"
            >
              View All Animations ({filteredCards.length})
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedCard && (
        <AnimationModal
          card={selectedCard}
          isFavorite={favorites[selectedCard.id]}
          onToggleFavorite={() => toggleFavorite(selectedCard.id)}
          onClose={() => setSelectedCard(null)}
          onCopy={copyCode}
          copied={copied}
        />
      )}
    </div>
  );
}
