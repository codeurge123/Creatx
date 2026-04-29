import React, { useState, useEffect } from "react";
import { AnimationModal } from "./AnimationModal";
import { AnimationCard } from "./AnimationCard";
import { sampleCards } from "../../samplecard";
import { isAuthenticated, subscribeToAuthChanges } from "../utils/auth";
import { getComponentLikesForCurrentUser, toggleComponentLike } from "../utils/componentLikes";

export default function Library() {
  const [category, setCategory] = useState("all");
  const [selectedCard, setSelectedCard] = useState(null);
  const [favorites, setFavorites] = useState({});
  const [copied, setCopied] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [likeNotice, setLikeNotice] = useState("");
  const [loggedIn, setLoggedIn] = useState(isAuthenticated());

  useEffect(() => {
    setLoggedIn(isAuthenticated());
    setFavorites(getComponentLikesForCurrentUser());
  }, []);

  useEffect(() => {
    return subscribeToAuthChanges((detail) => {
      setLoggedIn(Boolean(detail?.isAuthenticated));
      setFavorites(Boolean(detail?.isAuthenticated) ? getComponentLikesForCurrentUser() : {});
    });
  }, []);

  useEffect(() => {
    if (!likeNotice) return undefined;

    const timer = setTimeout(() => setLikeNotice(""), 2500);
    return () => clearTimeout(timer);
  }, [likeNotice]);

  const allAnimations = sampleCards;

  const filteredCards = category === "all"
    ? allAnimations
    : allAnimations.filter(c => c.category === category);

  const displayedCards = showAll ? filteredCards : filteredCards.slice(0, 6);

  const toggleFavorite = async (id) => {
    if (!isAuthenticated()) {
      setLikeNotice("Please login first to like the component.");
      return;
    }

    const nextLiked = toggleComponentLike(id);
    setFavorites(getComponentLikesForCurrentUser());

    if (nextLiked === null) {
      setLikeNotice("Please login first to like the component.");
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
        {likeNotice && (
          <div className="mb-6 rounded-xl border border-amber-400/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
            {likeNotice}
          </div>
        )}

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
        {displayedCards.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-white/60 mb-4">
              {allAnimations.length === 0
                ? "No components available yet. Check Community or create your own."
                : "No components found in this category."}
            </div>
            <a
              href="/create"
              className="inline-block px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium transition-colors"
            >
              Create Your First Component
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
                likeDisabled={!loggedIn && !favorites[card._id || card.id]}
              />
            ))}
          </div>
        )}

        {/* View All Button */}
        {!showAll && filteredCards.length > 6 && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setShowAll(true)}
              className="px-8 py-3 relative top-[-49px] duration-200 bg-indigo-500 hover:bg-indigo-600 rounded-full font-semibold shadow-lg transition-all hover:scale-105"
            >
              View All Components ({filteredCards.length})
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedCard && (
        <AnimationModal
          card={selectedCard}
          isFavorite={favorites[selectedCard._id || selectedCard.id]}
          onToggleFavorite={() => toggleFavorite(selectedCard._id || selectedCard.id)}
          onClose={() => setSelectedCard(null)}
          onCopy={copyCode}
          copied={copied}
        />
      )}
    </div>
  );
}
