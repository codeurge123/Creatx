import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userAPI } from "../services/userService";
import { animationAPI } from "../services/animationService";
import { AnimationCard } from "../components/AnimationCard";
import { AnimationModal } from "../components/AnimationModal";
import { Loader2 } from "lucide-react";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("shared");
  const [shared, setShared] = useState([]);
  const [liked, setLiked] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [likedMap, setLikedMap] = useState({});
  const [error, setError] = useState("");
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setLoading(true);
    setError("");

    try {
      const resp = await userAPI.getCurrentUser();
      setUser(resp.data.data);
      setEditName(resp.data.data.name);
      setEditEmail(resp.data.data.email);
      await loadShared(resp.data.data._id);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const loadShared = async (userId) => {
    try {
      const resp = await userAPI.getSharedAnimations(userId);
      setShared(resp.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load shared animations");
    }
  };

  const loadLiked = async () => {
    try {
      const resp = await userAPI.getLikedAnimations();
      setLiked(resp.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load liked animations");
    }
  };

  const handleUpdateProfile = async () => {
    if (!editName.trim() || !editEmail.trim()) {
      setError("Name and email are required.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const resp = await userAPI.updateProfile({ name: editName, email: editEmail });
      setUser(resp.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      setError("Please fill in all password fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirmation do not match.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      await userAPI.changePassword({ oldPassword, newPassword });
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err.response?.data?.message || "Password change failed");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await userAPI.logout();
    } catch (err) {
      // ignore
    }
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  const toggleLike = async (id) => {
    try {
      const response = await animationAPI.toggleLike(id);
      const liked = response.data.data.liked;
      const likesCount = response.data.data.likesCount;

      setLikedMap((prev) => ({ ...prev, [id]: liked }));

      setShared((prev) =>
        prev.map((a) => (a._id === id ? { ...a, likesCount } : a))
      );
      setLiked((prev) =>
        prev.map((a) => (a._id === id ? { ...a, likesCount } : a))
      );
    } catch (err) {
      console.error("Could not toggle like", err);
    }
  };

  const renderAnimations = (list) => {
    if (!list?.length) {
      return (
        <div className="text-center py-16 text-white/70">
          {tab === "shared"
            ? "No shared animations yet. Create and share one!"
            : "No liked animations yet. Like one to come back here."}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((card) => (
          <AnimationCard
            key={card._id || card.id}
            card={card}
            isFavorite={likedMap[card._id || card.id]}
            onToggleFavorite={() => toggleLike(card._id || card.id)}
            onClick={() => setSelectedCard(card)}
          />
        ))}
      </div>
    );
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
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Profile Settings */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              {/* Avatar & Name */}
              <div className="flex flex-col items-center mb-6">
                <div className="h-16 w-16 rounded-full bg-indigo-600 flex items-center justify-center text-3xl font-semibold mb-2">
                  {user?.name?.[0]?.toUpperCase() || "U"}
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold">{user?.name}</div>
                  <div className="text-sm text-white/60">{user?.email}</div>
                </div>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-700/20 border border-red-700 rounded text-sm">
                  {error}
                </div>
              )}

              {/* Change Username */}
              <div className="mb-6">
                <label className="text-xs font-semibold text-white/70 uppercase tracking-wide mb-2 block">
                  Change Username
                </label>
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Enter new username"
                  className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-white placeholder-white/40 text-sm"
                />
              </div>

              {/* Change Password */}
              <div className="mb-6">
                <label className="text-xs font-semibold text-white/70 uppercase tracking-wide mb-2 block">
                  Change Password
                </label>
                <input
                  type="password"
                  placeholder="Current password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-white placeholder-white/40 text-sm mb-2"
                />
                <input
                  type="password"
                  placeholder="New password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-white placeholder-white/40 text-sm mb-2"
                />
                <input
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-white placeholder-white/40 text-sm"
                />
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={handleUpdateProfile}
                  disabled={saving}
                  className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-semibold text-sm transition disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
                <button
                  onClick={handleChangePassword}
                  disabled={saving}
                  className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-semibold text-sm transition disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Update Password"}
                </button>
                <button
                  onClick={async () => {
                    try {
                      await userAPI.logout();
                    } catch (err) {
                      // ignore
                    }
                    localStorage.removeItem("accessToken");
                    navigate("/login");
                  }}
                  className="w-full px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg font-semibold text-sm transition"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Middle: Content Tabs */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              {/* Tab Buttons */}
              <div className="flex flex-col gap-3 mb-6">
                <button
                  onClick={() => setTab("shared")}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition border ${
                    tab === "shared"
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-transparent text-white/70 border-white/20 hover:border-white/40"
                  }`}
                >
                  Shared
                </button>
                <button
                  onClick={() => {
                    setTab("likes");
                    loadLiked();
                  }}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition border ${
                    tab === "likes"
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-transparent text-white/70 border-white/20 hover:border-white/40"
                  }`}
                >
                  Fav
                </button>
                <button
                  onClick={() => setTab("notifications")}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition border ${
                    tab === "notifications"
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-transparent text-white/70 border-white/20 hover:border-white/40"
                  }`}
                >
                  Notification
                </button>
              </div>

              {/* Content Stats */}
              <div className="text-xs text-white/50 space-y-1">
                <div>Shared: {shared.length}</div>
                <div>Liked: {liked.length}</div>
              </div>
            </div>
          </div>

          {/* Right: Animations Grid / Notifications */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 max-h-[600px] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold uppercase tracking-wide">
                  {tab === "notifications" ? "Notification" : tab === "shared" ? "Shared" : "Fav"}
                </h3>
              </div>

              {tab === "notifications" ? (
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <button
                      key={i}
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 hover:bg-white/10 rounded text-xs text-white/70 text-left transition"
                    >
                      Like by user on this shared animation
                    </button>
                  ))}
                </div>
              ) : (
                <div>
                  {tab === "shared" && shared.length === 0 ? (
                    <div className="text-xs text-white/50 text-center py-8">No shared animations yet</div>
                  ) : tab === "likes" && liked.length === 0 ? (
                    <div className="text-xs text-white/50 text-center py-8">No liked animations yet</div>
                  ) : (
                    renderAnimations(tab === "shared" ? shared : liked)
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedCard && (
        <AnimationModal
          card={selectedCard}
          isFavorite={likedMap[selectedCard._id || selectedCard.id]}
          onToggleFavorite={() => toggleLike(selectedCard._id || selectedCard.id)}
          onClose={() => setSelectedCard(null)}
        />
      )}
    </div>
  );
}
