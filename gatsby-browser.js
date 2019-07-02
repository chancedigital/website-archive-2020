// import React from 'react';
import smoothscroll from 'smoothscroll-polyfill';
import 'unfetch';
import 'what-input';
import '@lib/styles/app.scss';

smoothscroll.polyfill();

export const shouldUpdateScroll = ({
  prevRouterProps,
  routerProps: {
    location: { state, pathname },
  },
}) => {
  // scroll to the top of the page when:
  //  * page is refreshed (prevRouterProps null) since Nav styles cannot be server side rendered
  //  * replacing the navOpen state since this confuses Gatsby's default scroll behavior
  if (
    !prevRouterProps ||
    (prevRouterProps.location.pathname === pathname &&
      (state && state.navOpen === false))
  ) {
    return [0, 0];
  }
  return true;
};

/* export const wrapRootElement = ({ element }) => {
  return <ContactSectionProvider>{element}</ContactSectionProvider>;
}; */
