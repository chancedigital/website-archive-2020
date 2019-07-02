/**
 * Tests whether or not a DOM element is in the viewport
 * @param el - The element to search for
 * @param allIn - Whether or not to wait until the element is entirely in the viewport
 */
export function inViewport(el: HTMLElement, allIn: boolean = false): boolean {
  const docElem = window.document.documentElement;

  function getViewportH() {
    const client = docElem.clientHeight;
    const inner = window.innerHeight;

    if (client < inner) {
      return inner;
    } else {
      return client;
    }
  }

  function scrollY() {
    return window.pageYOffset || docElem.scrollTop;
  }

  // http://stackoverflow.com/a/5598797/989439
  function getOffset(el: any) {
    let offsetTop = 0;
    let offsetLeft = 0;
    do {
      if (!isNaN(el.offsetTop)) {
        offsetTop += el.offsetTop;
      }
      if (!isNaN(el.offsetLeft)) {
        offsetLeft += el.offsetLeft;
      }
    } while ((el = el.offsetParent)); // eslint-disable-line no-cond-assign

    return {
      top: offsetTop,
      left: offsetLeft,
    };
  }
  const elH = el.offsetHeight;
  const scrolled = scrollY();
  const viewed = scrolled + getViewportH();
  const elTop = getOffset(el).top;
  const elBottom = elTop + elH;

  return elTop + elH * Number(allIn) <= viewed && elBottom >= scrolled;
};
