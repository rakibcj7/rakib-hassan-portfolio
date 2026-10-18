// Shared cache helper for the GitHub profile data fetched from /profile.json.
// Data is preserved across page refreshes for 10 minutes so the Open Source
// Projects and GitHub profile sections do not re-fetch on every navigation.

const PROFILE_CACHE_KEY = "rakibProfileCache";
const PROFILE_CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

export function getCachedProfile() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(PROFILE_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || !parsed.timestamp) return null;
    const age = Date.now() - parsed.timestamp;
    if (age > PROFILE_CACHE_TTL_MS) {
      window.localStorage.removeItem(PROFILE_CACHE_KEY);
      return null;
    }
    return parsed.data;
  } catch (error) {
    console.warn("Failed to read profile cache", error);
    return null;
  }
}

export function setCachedProfile(data) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      PROFILE_CACHE_KEY,
      JSON.stringify({timestamp: Date.now(), data})
    );
  } catch (error) {
    console.warn("Failed to write profile cache", error);
  }
}

export function clearProfileCache() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(PROFILE_CACHE_KEY);
  } catch (error) {
    console.warn("Failed to clear profile cache", error);
  }
}