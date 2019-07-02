/**
 * Media query breakpoints.
 * Should mirror values in _breakpoints.scss
 */
export const breakpoints = {
  small: 0,
  medium: 640,
  large: 1024,
  xlarge: 1200,
  xxlarge: 1440,
};

export const breakpointKeys = Object.keys(breakpoints);

export const navMenuBreakpointDown = 'medium';
export const navMenuBreakpointUp =
  breakpointKeys[breakpointKeys.indexOf(navMenuBreakpointDown) + 1];

export default breakpoints;
