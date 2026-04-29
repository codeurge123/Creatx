const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const USER_KEY = "creatx_user";
const AUTH_EVENT = "creatx:auth-changed";

function emitAuthChange(detail) {
  window.dispatchEvent(new CustomEvent(AUTH_EVENT, { detail }));
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function isAuthenticated() {
  return Boolean(getAccessToken());
}

export function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY) || "null");
  } catch {
    return null;
  }
}

export function setStoredUser(user) {
  if (!user) {
    localStorage.removeItem(USER_KEY);
    return;
  }

  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function setAuthSession({ accessToken, refreshToken, user } = {}) {
  if (accessToken) {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  }

  if (refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }

  if (user) {
    setStoredUser(user);
  }

  emitAuthChange({
    isAuthenticated: Boolean(accessToken || getAccessToken()),
    user: user || getStoredUser(),
  });
}

export function clearAuthSession() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  emitAuthChange({
    isAuthenticated: false,
    user: null,
  });
}

export function subscribeToAuthChanges(callback) {
  const handler = (event) => callback(event.detail);
  window.addEventListener(AUTH_EVENT, handler);

  return () => window.removeEventListener(AUTH_EVENT, handler);
}
