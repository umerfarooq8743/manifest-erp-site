export type ThemePreference = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

export const THEME_STORAGE_KEY = "manifest-theme";
/** sessionStorage flag: the intro splash has been shown in this browser session. */
export const SPLASH_SESSION_KEY = "manifest-splash";
const THEME_EVENT = "manifest-theme-change";

/**
 * Runs in <head> before first paint (stringified into an inline script):
 * applies the theme (no flash), enables scroll reveals when motion is allowed,
 * and shows the intro splash on the first page view of a browser session
 * (or whenever the URL has ?splash) — never with reduced motion. The splash
 * ends ~2.6 s after the DOM is ready, on click or on Escape. Keep it
 * dependency-free.
 */
const SPLASH_PART = `var force=/[?&]splash(=|&|$)/.test(location.search);if(!rm&&(force||!sessionStorage.getItem(SK))){sessionStorage.setItem(SK,"1");r.classList.add("splash");var done=0,end=function(){if(done)return;done=1;r.classList.add("splash-out");setTimeout(function(){r.classList.remove("splash","splash-out")},650)},go=function(){setTimeout(end,2600)};if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",go);else go();addEventListener("keydown",function(e){if(e.key==="Escape")end()});addEventListener("click",function(e){var x=e.target;if(x&&x.closest&&x.closest("[data-splash]"))end()})}`;

export const buildThemeInitScript = (splash: boolean) => `(function(){try{var SK="${SPLASH_SESSION_KEY}",k="${THEME_STORAGE_KEY}",p=localStorage.getItem(k);if(p!=="light"&&p!=="dark")p="system";var d=p==="dark"||(p==="system"&&window.matchMedia("(prefers-color-scheme: dark)").matches);var r=document.documentElement;r.setAttribute("data-theme",d?"dark":"light");r.style.colorScheme=d?"dark":"light";var rm=window.matchMedia("(prefers-reduced-motion: reduce)").matches;if(!rm)r.classList.add("js-reveal");${splash ? SPLASH_PART : ""}}catch(e){}})();`;

export function readPreference(): ThemePreference {
  try {
    const value = window.localStorage.getItem(THEME_STORAGE_KEY);
    return value === "light" || value === "dark" ? value : "system";
  } catch {
    return "system";
  }
}

function systemPrefersDark() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function resolveTheme(preference: ThemePreference): ResolvedTheme {
  if (preference === "system") return systemPrefersDark() ? "dark" : "light";
  return preference;
}

export function applyTheme(preference: ThemePreference) {
  const resolved = resolveTheme(preference);
  const root = document.documentElement;
  // Suppress transitions for the instant of the switch so colours don't animate unevenly.
  root.setAttribute("data-theme-switching", "");
  root.setAttribute("data-theme", resolved);
  root.style.colorScheme = resolved;
  window.requestAnimationFrame(() => window.requestAnimationFrame(() => root.removeAttribute("data-theme-switching")));
}

export function setPreference(preference: ThemePreference) {
  try {
    if (preference === "system") window.localStorage.removeItem(THEME_STORAGE_KEY);
    else window.localStorage.setItem(THEME_STORAGE_KEY, preference);
  } catch {
    /* storage unavailable — still apply for this page view */
  }
  applyTheme(preference);
  window.dispatchEvent(new Event(THEME_EVENT));
}

/** Subscribe for useSyncExternalStore: own changes, other tabs and OS theme changes. */
export function subscribeTheme(callback: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const onSystem = () => {
    if (readPreference() === "system") applyTheme("system");
    callback();
  };
  const onStorage = (event: StorageEvent) => {
    if (event.key === THEME_STORAGE_KEY || event.key === null) {
      applyTheme(readPreference());
      callback();
    }
  };
  window.addEventListener(THEME_EVENT, callback);
  window.addEventListener("storage", onStorage);
  media.addEventListener("change", onSystem);
  return () => {
    window.removeEventListener(THEME_EVENT, callback);
    window.removeEventListener("storage", onStorage);
    media.removeEventListener("change", onSystem);
  };
}
