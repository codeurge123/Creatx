import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { animationAPI } from "../services/animationService";
import { userAPI } from "../services/userService";
import { AnimationCard } from "../components/AnimationCard";
import { AnimationModal } from "../components/AnimationModal";
import { Loader2 } from "lucide-react";
import { isAuthenticated, subscribeToAuthChanges } from "../utils/auth";
import { sampleCards } from "../../samplecard";

const fallbackCommunityCards = sampleCards.map((card) => ({
  ...card,
  id: `sample-${card.id}`,
  owner: {
    _id: "creatx-samples",
    name: "Creatx Samples",
  },
}));

export default function Community() {
  const [animations, setAnimations] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [liked, setLiked] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [likeNotice, setLikeNotice] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchPublicAnimations();
  }, []);

  useEffect(() => {
    return subscribeToAuthChanges((detail) => {
      if (detail?.isAuthenticated) {
        fetchPublicAnimations();
      } else {
        setLiked({});
      }
    });
  }, []);

  useEffect(() => {
    if (!likeNotice) return undefined;

    const timer = setTimeout(() => setLikeNotice(""), 2500);
    return () => clearTimeout(timer);
  }, [likeNotice]);

  const fetchPublicAnimations = async () => {
    try {
      setLoading(true);
      const [response, likedResponse] = await Promise.all([
        animationAPI.getPublic({ limit: 200 }),
        isAuthenticated() ? userAPI.getLikedAnimations() : Promise.resolve(null),
      ]);
      const publicAnimations = response.data.data?.animations ?? response.data.data ?? [];
      const likedIds = new Set(
        likedResponse?.data?.data?.map((animation) => animation._id || animation.id) || []
      );

      setAnimations(publicAnimations);
      setLiked((prev) => {
        const next = { ...prev };
        likedIds.forEach((id) => {
          next[id] = true;
        });
        return next;
      });
      setError("");
    } catch (err) {
      setAnimations(fallbackCommunityCards);
      setError(
        err.response?.data?.message ||
        "Shared components are temporarily unavailable. Showing sample community cards instead."
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleLike = async (id) => {
    if (!isAuthenticated()) {
      setLikeNotice("Please login first to like the component.");
      return;
    }

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
      if (err.response?.status === 401) {
        setLikeNotice("Please login first to like the component.");
      } else if (err.response?.status === 404) {
        setLikeNotice("This sample component cannot be liked because it is not stored on the server.");
      } else {
        console.error("Failed to toggle like", err);
      }
    }
  };

  return (
    <div className="min-h-screen text-white p-6">
      <div className="max-w-7xl mx-auto">
        {likeNotice && (
          <div className="mb-6 rounded-xl border border-amber-400/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
            {likeNotice}
          </div>
        )}
        {error && (
          <div className="mb-6 rounded-xl border border-amber-400/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-400" />
            <span className="ml-2 text-white/70">Loading components...</span>
          </div>
        ) : animations.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-white/60 mb-4">No shared components yet. Be the first to share!</div>
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
