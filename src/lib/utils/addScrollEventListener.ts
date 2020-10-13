import { canUseDOM } from './canUseDOM';
export const addScrollEventListener = (() => {
  if (!canUseDOM()) {
    return function loop() {
      return function () {};
    };
  }

  let lastPosition: ScrollPosition = { y: window.scrollY, x: window.scrollX };
  let rAF: number;
  return function loop(callback = (position: ScrollPosition) => {}) {
    if (
      lastPosition.y !== window.scrollY ||
      lastPosition.x !== window.scrollX
    ) {
      lastPosition.y = window.scrollY;
      lastPosition.x = window.scrollX;
      callback(lastPosition);
    }
    rAF = window.requestAnimationFrame(loop.bind(null, callback));
    return () => window.cancelAnimationFrame(rAF);
  };
})();

type ScrollPosition = { y: number; x: number };
