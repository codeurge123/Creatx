import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, X } from "lucide-react";
import { userAPI } from "../services/userService";
import { animationAPI } from "../services/animationService";
import { AnimationCard } from "../components/AnimationCard";
import { AnimationModal } from "../components/AnimationModal";
import { clearAuthSession, setStoredUser } from "../utils/auth";
import { getComponentLikesForCurrentUser, toggleComponentLike } from "../utils/componentLikes";
import { sampleCards } from "../../samplecard";

function PopupShell({ title, subtitle, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
      <div className="w-full max-w-6xl overflow-hidden rounded-[28px] border border-cyan-400/10 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.16),_transparent_28%),linear-gradient(180deg,_rgba(15,23,42,0.98),_rgba(17,24,39,0.98))] shadow-[0_30px_120px_rgba(2,6,23,0.72)]">
        <div className="flex items-start justify-between border-b border-white/10 bg-white/5 p-6">
          <div>
            <h2 className="text-2xl font-semibold text-white">{title}</h2>
            {subtitle && <p className="mt-1 text-sm text-slate-300">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="rounded-full border border-white/10 bg-slate-900/80 p-2 text-white/70 transition hover:bg-slate-800 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>
        <div className="max-h-[75vh] overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
}

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shared, setShared] = useState([]);
  const [likedAnimations, setLikedAnimations] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [likedMap, setLikedMap] = useState({});
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showSharedModal, setShowSharedModal] = useState(false);
  const [showFavoritesModal, setShowFavoritesModal] = useState(false);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  const getLocalLikedComponents = () => {
    const likeMap = getComponentLikesForCurrentUser();
    return sampleCards.filter((card) => likeMap[card.id]).map((card) => ({
      ...card,
      owner: {
        _id: "creatx-samples",
        name: "Creatx Samples",
      },
    }));
  };

  const localLikedComponents = useMemo(() => getLocalLikedComponents(), [likedMap, showFavoritesModal, user]);

  const favoriteCards = useMemo(() => {
    const map = new Map();

    [...localLikedComponents, ...likedAnimations].forEach((card) => {
      map.set(card._id || card.id, card);
    });

    return [...map.values()];
  }, [likedAnimations, localLikedComponents]);

  const loadProfile = async () => {
    setLoading(true);
    setError("");

    try {
      const resp = await userAPI.getCurrentUser();
      const currentUser = resp.data.data;
      setUser(currentUser);
      setStoredUser(currentUser);
      setEditName(currentUser.name);
      setEditEmail(currentUser.email);

      const [sharedResp, likedResp] = await Promise.all([
        userAPI.getSharedAnimations(currentUser._id),
        userAPI.getLikedAnimations(),
      ]);

      const sharedItems = sharedResp.data.data || [];
      const likedItems = likedResp.data.data || [];
      const nextLikedMap = {};

      likedItems.forEach((item) => {
        nextLikedMap[item._id || item.id] = true;
      });
      getLocalLikedComponents().forEach((item) => {
        nextLikedMap[item._id || item.id] = true;
      });

      setShared(sharedItems);
      setLikedAnimations(likedItems);
      setLikedMap(nextLikedMap);
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        clearAuthSession();
        navigate("/login");
        return;
      }

      setError(err.response?.data?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const refreshLikedData = async () => {
    try {
      const resp = await userAPI.getLikedAnimations();
      const likedItems = resp.data.data || [];
      setLikedAnimations(likedItems);
      setLikedMap(() => {
        const next = { ...getComponentLikesForCurrentUser() };
        likedItems.forEach((item) => {
          next[item._id || item.id] = true;
        });
        return next;
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load liked components");
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
      const resp = await userAPI.updateProfile({ name: editName.trim(), email: editEmail.trim().toLowerCase() });
      setUser(resp.data.data);
      setStoredUser(resp.data.data);
      setShowUpdateModal(false);
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
      setShowUpdateModal(false);
    } catch (err) {
      setError(err.response?.data?.message || "Password change failed");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await userAPI.logout();
    } catch {
      // noop
    }

    clearAuthSession();
    navigate("/login");
  };

  const toggleLike = async (card) => {
    const id = card._id || card.id;
    const isServerCard = Boolean(card._id);

    if (!isServerCard) {
      toggleComponentLike(id);
      setLikedMap((prev) => ({
        ...prev,
        [id]: !prev[id],
      }));
      return;
    }

    try {
      const response = await animationAPI.toggleLike(id);
      const liked = response.data.data.liked;
      const likesCount = response.data.data.likesCount;

      setLikedMap((prev) => ({ ...prev, [id]: liked }));
      setShared((prev) =>
        prev.map((item) => ((item._id || item.id) === id ? { ...item, likesCount } : item))
      );
      setLikedAnimations((prev) => {
        if (liked) {
          return prev.map((item) => ((item._id || item.id) === id ? { ...item, likesCount } : item));
        }

        return prev.filter((item) => (item._id || item.id) !== id);
      });

      if (liked && !likedAnimations.some((item) => (item._id || item.id) === id)) {
        const source = shared.find((item) => (item._id || item.id) === id) || card;
        setLikedAnimations((prev) => [...prev, { ...source, likesCount }]);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Could not toggle like");
    }
  };

  const openSharedModal = async () => {
    if (user?._id) {
      try {
        const resp = await userAPI.getSharedAnimations(user._id);
        setShared(resp.data.data || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load shared components");
      }
    }

    setShowSharedModal(true);
  };

  const openFavoritesModal = async () => {
    await refreshLikedData();
    setShowFavoritesModal(true);
  };

  const renderGrid = (items, emptyText) => {
    if (!items.length) {
      return <div className="py-12 text-center text-white/60">{emptyText}</div>;
    }

    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((card) => (
          <AnimationCard
            key={card._id || card.id}
            card={card}
            isFavorite={likedMap[card._id || card.id]}
            onToggleFavorite={() => toggleLike(card)}
            onClick={() => setSelectedCard(card)}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-indigo-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="overflow-hidden rounded-[32px] border border-cyan-400/10 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.22),_transparent_30%),linear-gradient(180deg,_rgba(15,23,42,0.96),_rgba(17,24,39,0.96))] p-8 shadow-[0_30px_120px_rgba(2,6,23,0.65)]">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-5">
              <div className="flex h-20 w-20 items-center justify-center rounded-[24px] bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-500 text-3xl font-semibold shadow-lg shadow-indigo-950/50">
                {user?.name?.[0]?.toUpperCase() || "U"}
              </div>
              <div>
                <h1 className="text-3xl font-semibold">{user?.name}</h1>
                <p className="mt-1 text-slate-300">{user?.email}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="rounded-2xl border border-red-400/20 bg-red-500/90 px-5 py-3 font-semibold text-white transition hover:bg-red-500"
            >
              Logout
            </button>
          </div>

          {error && (
            <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </div>
          )}

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-inner shadow-slate-950/40">
              <div className="text-xs uppercase tracking-[0.2em] text-white/45">Username</div>
              <div className="mt-2 text-lg font-medium">{user?.name}</div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-inner shadow-slate-950/40">
              <div className="text-xs uppercase tracking-[0.2em] text-white/45">Email</div>
              <div className="mt-2 text-lg font-medium">{user?.email}</div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-inner shadow-slate-950/40">
              <div className="text-xs uppercase tracking-[0.2em] text-white/45">Favorites</div>
              <div className="mt-2 text-lg font-medium">{favoriteCards.length}</div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={() => setShowUpdateModal(true)}
              className="rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 px-5 py-3 font-semibold text-white shadow-lg shadow-indigo-950/50 transition hover:brightness-110"
            >
              Update Profile
            </button>
            <button
              onClick={openSharedModal}
              className="rounded-2xl border border-white/15 bg-slate-900/70 px-5 py-3 font-semibold transition hover:bg-slate-800"
            >
              Shared
            </button>
            <button
              onClick={openFavoritesModal}
              className="rounded-2xl border border-white/15 bg-slate-900/70 px-5 py-3 font-semibold transition hover:bg-slate-800"
            >
              Favorite
            </button>
          </div>
        </div>
      </div>

      {showUpdateModal && (
        <PopupShell
          title="Update Profile"
          subtitle="Change your username or password from one place."
          onClose={() => setShowUpdateModal(false)}
        >
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-4 rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-inner shadow-slate-950/40">
              <h3 className="text-lg font-semibold">Change Username</h3>
              <div>
                <label className="mb-2 block text-sm text-slate-300">Username</label>
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none ring-0 transition focus:border-indigo-400/40"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm text-slate-300">Email</label>
                <input
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none ring-0 transition focus:border-indigo-400/40"
                />
              </div>
            </div>

            <div className="space-y-4 rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-inner shadow-slate-950/40">
              <h3 className="text-lg font-semibold">Change Password</h3>
              <input
                type="password"
                placeholder="Current password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none ring-0 transition focus:border-indigo-400/40"
              />
              <input
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none ring-0 transition focus:border-indigo-400/40"
              />
              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none ring-0 transition focus:border-indigo-400/40"
              />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={handleUpdateProfile}
              disabled={saving}
              className="rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 px-5 py-3 font-semibold text-white shadow-lg shadow-indigo-950/50 transition hover:brightness-110 disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Profile"}
            </button>
            <button
              onClick={handleChangePassword}
              disabled={saving}
              className="rounded-2xl border border-white/10 bg-slate-900/80 px-5 py-3 font-semibold transition hover:bg-slate-800 disabled:opacity-60"
            >
              {saving ? "Saving..." : "Update Password"}
            </button>
          </div>
        </PopupShell>
      )}

      {showSharedModal && (
        <PopupShell
          title="Shared Components"
          subtitle="Items you shared with the community."
          onClose={() => setShowSharedModal(false)}
        >
          {renderGrid(shared, "You have not shared any components yet.")}
        </PopupShell>
      )}

      {showFavoritesModal && (
        <PopupShell
          title="Favorite Components"
          subtitle="Liked items stay here until you dislike them."
          onClose={() => setShowFavoritesModal(false)}
        >
          {renderGrid(favoriteCards, "You have not liked any components yet.")}
        </PopupShell>
      )}

      {selectedCard && (
        <AnimationModal
          card={selectedCard}
          isFavorite={likedMap[selectedCard._id || selectedCard.id]}
          onToggleFavorite={() => toggleLike(selectedCard)}
          onClose={() => setSelectedCard(null)}
        />
      )}
    </div>
  );
}
