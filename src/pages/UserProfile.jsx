import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { userAPI } from "../services/userService";
import { AnimationCard } from "../components/AnimationCard";
import { AnimationModal } from "../components/AnimationModal";
import { Loader2 } from "lucide-react";

export default function UserProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [shared, setShared] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    loadUser();
  }, [id]);

  const loadUser = async () => {
    setLoading(true);
    setError("");

    try {
      const [userResp, sharedResp] = await Promise.all([
        userAPI.getUserById(id),
        userAPI.getSharedAnimations(id),
      ]);

      setUser(userResp.data.data);
      setShared(sharedResp.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load user profile");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-indigo-600 flex items-center justify-center text-xl font-semibold">
                {user?.name?.[0]?.toUpperCase() || "U"}
              </div>
              <div>
                <h1 className="text-2xl font-bold">{user?.name}</h1>
                <p className="text-sm text-white/60">{user?.email}</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition"
          >
            Back
          </button>
        </div>

        {error ? (
          <div className="text-center text-red-400">{error}</div>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-4">Shared Animations</h2>
            {shared.length === 0 ? (
              <div className="text-white/60">This user has not shared any animations yet.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {shared.map((card) => (
                  <AnimationCard
                    key={card._id || card.id}
                    card={card}
                    isFavorite={false}
                    onToggleFavorite={() => {}}
                    onClick={() => setSelectedCard(card)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {selectedCard && (
        <AnimationModal
          card={selectedCard}
          isFavorite={false}
          onToggleFavorite={() => {}}
          onClose={() => setSelectedCard(null)}
        />
      )}
    </div>
  );
}
