const DONE_CLASS = "intro-done";
const DONE_EVENT = "intro:done";

/** Called by the Preloader once the curtain has lifted (or straight away with reduced motion). */
export function markIntroDone() {
  document.documentElement.classList.add(DONE_CLASS);
  window.dispatchEvent(new Event(DONE_EVENT));
}

/**
 * Runs `callback` once the intro is over, so on-load animations aren't wasted behind the curtain.
 * After the first page it runs immediately. Returns a cleanup function.
 */
export function afterIntro(callback: () => void) {
  if (document.documentElement.classList.contains(DONE_CLASS)) {
    callback();
    return () => {};
  }
  window.addEventListener(DONE_EVENT, callback, { once: true });
  return () => window.removeEventListener(DONE_EVENT, callback);
}
