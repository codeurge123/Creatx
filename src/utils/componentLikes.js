import { getStoredUser } from "./auth";

const COMPONENT_LIKES_KEY = "creatx_component_likes";

function readStore() {
  try {
    return JSON.parse(localStorage.getItem(COMPONENT_LIKES_KEY) || "{}");
  } catch {
    return {};
  }
}

function writeStore(store) {
  localStorage.setItem(COMPONENT_LIKES_KEY, JSON.stringify(store));
}

function getUserKey() {
  const user = getStoredUser();
  return user?._id || user?.email || null;
}

export function getComponentLikesForCurrentUser() {
  const userKey = getUserKey();
  if (!userKey) {
    return {};
  }

  const store = readStore();
  return store[userKey] || {};
}

export function isComponentLiked(id) {
  const likes = getComponentLikesForCurrentUser();
  return Boolean(likes[id]);
}

export function toggleComponentLike(id) {
  const userKey = getUserKey();
  if (!userKey) {
    return null;
  }

  const store = readStore();
  const userLikes = { ...(store[userKey] || {}) };

  if (userLikes[id]) {
    delete userLikes[id];
  } else {
    userLikes[id] = true;
  }

  store[userKey] = userLikes;
  writeStore(store);
  return Boolean(userLikes[id]);
}

export function getLikedComponentIds() {
  return Object.keys(getComponentLikesForCurrentUser()).filter((id) => isComponentLiked(id));
}
