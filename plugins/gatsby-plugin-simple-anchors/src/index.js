/* eslint-disable no-unused-vars */
import * as React from 'react';
import { Link } from 'gatsby';

const CAN_USE_DOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);
const DEFAULT_OFFSET = 0;
const OFFSET_PROP = '__GATSBY_SCROLL_OFFSET';
const HASH_PROP = '__GATSBY_SCROLL_HASH';
const IS_DEV = process.env.NODE_ENV !== 'production';
const IMPROPPER_FORMATTING =
  'Anchor path should contain an absolute root path `/` and selector `#` Ex: `/about#team`';
const INVALID_HASH =
  'Anchor Links plugin attempted to scroll to an invalid hash on route change.';

const useLayoutEffect = CAN_USE_DOM ? React.useLayoutEffect : () => {};

// offsetElement is either a string passed to querySelector or an element. If it is set, offset is ignored

/**
 * @typedef {{ location: Location }} RouteUpdateArgs
 * @typedef {{ offset?: number; offsetElement?: string|Element; bypassOffsetCache?: boolean }} SimpleAnchorPluginOptions
 */

const cache = { offset: undefined };

/**
 * @param {RouteUpdateArgs} param0
 * @param {SimpleAnchorPluginOptions} param1
 */
function onRouteUpdate(
  { location },
  { offset, offsetElement, bypassOffsetCache }
) {
  if (CAN_USE_DOM) {
    if (!bypassOffsetCache && cache.offset !== undefined) {
      offset = cache.offset;
    } else {
      if (typeof offsetElement === 'string') {
        offsetElement = document.querySelector(offsetElement);
      }
      if (offsetElement) {
        let _offset = offset;
        try {
          offset = offsetElement.offsetHeight * -1;
        } catch (err) {
          // INVALID ELEMENT, warn and reset
          offset = _offset;
        }
      }

      if (offset == null) {
        offset = DEFAULT_OFFSET;
      } else if (typeof offset !== 'number') {
        throw TypeError('Invalid offset value');
      }
    }

    window[OFFSET_PROP] = offset;

    if (window[HASH_PROP]) {
      scroller(window[HASH_PROP], offset);
      window[HASH_PROP] = undefined;
    } else {
      checkHash(location, offset);
    }
    return;
  }

  checkHash(location, DEFAULT_OFFSET);
}

/**
 * @param {string} to
 * @param {React.MouseEvent} event
 */
function handleLinkClick(to, event) {
  // Log warnings on click
  let improperFormatting = !to.includes('/') || !to.includes('#');
  if (improperFormatting && IS_DEV) {
    console.warn(IMPROPPER_FORMATTING);
  }

  if (CAN_USE_DOM && to.includes('#')) {
    let [anchorPath, anchor] = to.split('#');
    if (window.location.pathname === anchorPath) {
      event.preventDefault();
      scroller(`#${anchor}`, window[OFFSET_PROP]);
    }
  }
}

/**
 * @param {string} to
 * @param {React.MouseEvent} event
 */
function handleStrippedLinkClick(to, event) {
  /**
   * Log warnings on click
   */
  let improperFormatting = !to.includes('/') || !to.includes('#');
  if (improperFormatting && IS_DEV) {
    console.warn(IMPROPPER_FORMATTING);
  }

  if (CAN_USE_DOM) {
    let [anchorPath, anchor] = to.split('#');

    // Determine location, run scroller or set window variable
    if (window.location.pathname === anchorPath) {
      event.preventDefault();
      return scroller(`#${anchor}`, window[OFFSET_PROP]);
    }
    window[HASH_PROP] = `#${anchor}`;
  }
}

/**
 * @param {string} to
 */
function stripHashedLocation(to) {
  return to.split('#')[0];
}

/**
 * @param {Location} location
 * @param {number} [offset]
 */
function checkHash(location, offset) {
  let { hash } = location;
  let selector = hash ? hash.substr(1) : null;
  let validElement = selector ? document.getElementById(selector) : null;

  if (hash && selector) {
    if (validElement) {
      scroller(hash, offset);
    } else if (IS_DEV) {
      console.warn(INVALID_HASH);
    }
  }
}

/**
 * @param {Element} elem
 * @param {number} additionalOffset
 * @returns {number}
 */
function calculateScrollOffset(elem, additionalOffset = DEFAULT_OFFSET) {
  let doc = elem.ownerDocument;
  let body = doc.body;
  let html = doc.documentElement;
  let elemRect = elem.getBoundingClientRect();
  let clientHeight = html.clientHeight;
  let scrollPosition = elemRect.top;
  let documentHeight = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );
  return Math.min(
    scrollPosition + additionalOffset + window.pageYOffset,
    documentHeight - clientHeight
  );
}

/**
 * @param {Element|string} target
 * @param {SimpleAnchorPluginOptions} options
 */
function scroller(target, offset = DEFAULT_OFFSET) {
  if (typeof target === 'string') {
    target = document.querySelector(target);
  }
  if (target) {
    let scrollOffset = calculateScrollOffset(target, offset);
    return window.scrollTo(0, scrollOffset);
  }
}

const AnchorLink = React.forwardRef(function AnchorLink(
  { to, children, stripHash = false, ...props },
  ref
) {
  const linkProps = {
    ...props,
  };

  const onClickProp = React.useRef(props.onClick);
  useLayoutEffect(() => {
    onClickProp.current = props.onClick;
  });

  const handleClick = React.useCallback(
    function handleClick(event) {
      onClickProp.current && onClickProp.current(event);
      if (!event.defaultPrevented) {
        stripHash
          ? handleStrippedLinkClick(to, event)
          : handleLinkClick(to, event);
      }
    },
    [stripHash, to]
  );

  return (
    <Link
      {...props}
      to={stripHash ? stripHashedLocation(to) : to}
      onClick={handleClick}
      ref={ref}
    >
      {children || linkProps.title}
    </Link>
  );
});
AnchorLink.displayName = 'AnchorLink';

export { onRouteUpdate, AnchorLink };
