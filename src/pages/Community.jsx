import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { animationAPI } from "../services/animationService";
import { AnimationCard } from "../components/AnimationCard";
import { AnimationModal } from "../components/AnimationModal";
import { Loader2 } from "lucide-react";

export default function Community() {
  const [animations, setAnimations] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [liked, setLiked] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchPublicAnimations();
  }, []);

  const fetchPublicAnimations = async () => {
    try {
      setLoading(true);
      const response = await animationAPI.getPublic();
      setAnimations(response.data.data.animations || []);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load shared animations.");
    } finally {
      setLoading(false);
    }
  };

  const toggleLike = async (id) => {
    try {
      const response = await animationAPI.toggleLike(id);
      const liked = response.data.data.liked;
      const likesCount = response.data.data.likesCount;

      setLiked((prev) => ({ ...prev, [id]: liked }));
      setAnimations((prev) =>
        prev.map((anim) =>
          (anim._id || anim.id) === id ? { ...anim, likesCount } : anim
        )
      );
    } catch (err) {
      console.error("Failed to toggle like", err);
    }
  };

  return (
    <div className="min-h-screen text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-semibold">Community Animations</h1>
            <p className="text-white/70 mt-1">Browse creations shared by other users. Click to open and explore.</p>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-400" />
            <span className="ml-2 text-white/70">Loading animations...</span>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="text-red-400 mb-4">{error}</div>
            <button
              onClick={fetchPublicAnimations}
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium transition-colors"
            >
              Try again
            </button>
          </div>
        ) : animations.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-white/60 mb-4">No shared animations yet. Be the first to share!</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {animations.map((card) => (
              <AnimationCard
                key={card._id || card.id}
                card={card}
                isFavorite={liked[card._id || card.id]}
                onToggleFavorite={() => toggleLike(card._id || card.id)}
                onClick={() => setSelectedCard(card)}
                onOwnerClick={() => navigate(`/user/${card.owner?._id || card.owner}`)}
              />
            ))}
          </div>
        )}

        {selectedCard && (
          <AnimationModal
            card={selectedCard}
            isFavorite={liked[selectedCard._id || selectedCard.id]}
            onToggleFavorite={() => toggleLike(selectedCard._id || selectedCard.id)}
            onClose={() => setSelectedCard(null)}
          />
        )}
      </div>
    </div>
  );
}
