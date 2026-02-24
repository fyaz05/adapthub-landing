/**
 * Shared scroll lock utility to manage document.body overflow.
 * Uses a reference counter to handle multiple components
 * that may need to lock scrolling simultaneously.
 */

let lockCount = 0;
let previousOverflow = "";

function lock(): void {
  lockCount++;
  if (lockCount === 1) {
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  }
}

function unlock(): void {
  if (lockCount > 0) {
    lockCount--;
    if (lockCount === 0) {
      document.body.style.overflow = previousOverflow;
    }
  }
}

function forceUnlock(): void {
  lockCount = 0;
  document.body.style.overflow = previousOverflow;
}

export const scrollLock = {
  lock,
  unlock,
  forceUnlock,
};
