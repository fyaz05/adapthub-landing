/**
 * Shared scroll lock utility to manage document.body overflow.
 * Uses a reference counter to handle multiple components
 * that may need to lock scrolling simultaneously.
 */

let lockCount = 0;

function lock(): void {
  lockCount++;
  if (lockCount === 1) {
    document.body.style.overflow = "hidden";
  }
}

function unlock(): void {
  if (lockCount > 0) {
    lockCount--;
    if (lockCount === 0) {
      document.body.style.overflow = "";
    }
  }
}

function forceUnlock(): void {
  lockCount = 0;
  document.body.style.overflow = "";
}

export const scrollLock = {
  lock,
  unlock,
  forceUnlock,
};
