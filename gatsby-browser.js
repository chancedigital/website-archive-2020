import React from 'react';
import '@lib/polyfills';
import 'what-input';
import '@lib/styles/app.scss';
// eslint-disable-next-line no-unused-vars
import { A11yProvider } from '@lib/providers';
import { checkHash, scroller } from './src/lib/utils/anchorLinks';

const IS_BROWSER = typeof window !== 'undefined';

export function shouldUpdateScroll({
  prevRouterProps,
  routerProps: {
    location: { state, pathname },
  },
}) {
  // scroll to the top of the page when:
  //  * page is refreshed (prevRouterProps null) since Nav styles cannot be server side rendered
  //  * replacing the navOpen state since this confuses Gatsby's default scroll behavior
  if (
    !prevRouterProps ||
    (prevRouterProps.location.pathname === pathname &&
      state &&
      state.navOpen === false)
  ) {
    return [0, 0];
  }
  return true;
}

// Patch broken hash link scrolling
export function onRouteUpdate({ location }) {
  const DEFAULT_OFFSET = 0;
  let offset = DEFAULT_OFFSET;
  if (IS_BROWSER) {
    if (typeof window.__gatsby_scroll_offset === 'undefined') {
      let header = document.getElementById('site-header');
      offset = header ? header.offsetHeight * -1 : DEFAULT_OFFSET;
      window.__gatsby_scroll_offset = offset;
    } else {
      offset = window.__gatsby_scroll_offset;
    }
    if (window.__gatsby_scroll_hash) {
      scroller(window.__gatsby_scroll_hash, {
        offset: window.__gatsby_scroll_offset,
      });
      window.__gatsby_scroll_hash = undefined;
      return;
    }
    checkHash(location, offset);
    return;
  }
  checkHash(location, DEFAULT_OFFSET);
}

export const wrapRootElement = ({ element }) => {
  return <A11yProvider>{element}</A11yProvider>;
};
