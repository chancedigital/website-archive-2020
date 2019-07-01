import 'unfetch';
import '@lib/styles/app.scss';

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
