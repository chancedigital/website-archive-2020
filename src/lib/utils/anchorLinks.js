export const IS_DEV = process.env.NODE_ENV !== 'production';
export const IS_BROWSER = typeof window !== 'undefined';
export const IMPROPPER_FORMATTING =
  'Anchor path should contain an absolute root path `/` and selector `#` Ex: `/about#team`';
export const INVALID_HASH =
  'Anchor Links plugin attempted to scroll to an invalid hash on route change.';
export const DEFAULT_OFFSET = 0;

/**
 * @typedef {'bottom'|'middle'|'top'} ScrollAlignment
 * @typedef {{ offset?: number; align?: ScrollAlignment; ease?: string | ((n: number) => number); duration?: number }} ScrollOptions
 */

/**
 * @param {string} to
 * @param {React.MouseEvent} event
 */
export function handleLinkClick(to, event) {
  // Log warnings on click
  let improperFormatting = !to.includes('/') || !to.includes('#');
  if (improperFormatting && IS_DEV) {
    console.warn(IMPROPPER_FORMATTING);
  }

  if (IS_BROWSER && to.includes('#')) {
    let [anchorPath, anchor] = to.split('#');
    if (window.location.pathname === anchorPath) {
      event.preventDefault();
      scroller(`#${anchor}`, {
        offset: window.__gatsby_scroll_offset,
      });
    }
  }
}

/**
 * @param {string} to
 * @param {React.MouseEvent} event
 */
export function handleStrippedLinkClick(to, event) {
  /**
   * Log warnings on click
   */
  let improperFormatting = !to.includes('/') || !to.includes('#');
  if (improperFormatting && IS_DEV) {
    console.warn(IMPROPPER_FORMATTING);
  }

  if (IS_BROWSER) {
    let [anchorPath, anchor] = to.split('#');

    // Determine location, run scroller or set window variable
    if (window.location.pathname === anchorPath) {
      event.preventDefault();
      return scroller(`#${anchor}`, {
        offset: window.__gatsby_scroll_offset,
      });
    }
    window.__gatsby_scroll_hash = `#${anchor}`;
  }
}

/**
 * @param {string} to
 */
export function stripHashedLocation(to) {
  return to.split('#')[0];
}

/**
 * @param {Location} location
 * @param {number} [offset]
 */
export function checkHash(location, offset) {
  let { hash } = location;
  let selector = hash ? hash.substr(1) : null;
  let validElement = selector ? document.getElementById(selector) : null;

  if (hash && selector) {
    if (validElement) {
      scroller(hash, { offset });
    } else if (IS_DEV) {
      console.warn(INVALID_HASH);
    }
  }
}

/**
 * @param {Element} elem
 * @param {number} additionalOffset
 * @param {ScrollAlignment} alignment
 * @returns {number}
 */
export function calculateScrollOffset(
  elem,
  additionalOffset = 0,
  alignment = 'top'
) {
  let body = document.body;
  let html = document.documentElement;

  let elemRect = elem.getBoundingClientRect();
  let clientHeight = html.clientHeight;
  let documentHeight = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );

  let scrollPosition = elemRect.top;
  if (alignment === 'bottom') {
    scrollPosition = elemRect.bottom - clientHeight;
  } else if (alignment === 'middle') {
    scrollPosition = elemRect.bottom - clientHeight / 2 - elemRect.height / 2;
  }

  let maxScrollPosition = documentHeight - clientHeight;
  return Math.min(
    scrollPosition + additionalOffset + window.pageYOffset,
    maxScrollPosition
  );
}

/**
 * @param {Element|string} elem
 * @param {ScrollOptions} options
 */
export function scrollToElement(elem, options = {}) {
  if (typeof elem === 'string') {
    elem = document.querySelector(elem);
  }
  if (elem) {
    const scrollOffset = calculateScrollOffset(
      elem,
      options.offset,
      options.align
    );
    return window.scrollTo(0, scrollOffset);
  }
}

/**
 * @param {Element} target
 * @param {ScrollOptions} options
 */
export function scroller(target, options = {}) {
  let { offset = DEFAULT_OFFSET } = options;
  scrollToElement(target, { offset });
}
