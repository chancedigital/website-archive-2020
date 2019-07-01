export const inViewport = (el: HTMLElement, h?: number) => {
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

  // if 0, the element is considered in the viewport as soon as it enters.
  // if 1, the element is considered in the viewport only when it's fully inside
  // value in percentage (1 >= h >= 0)
  h = h || 0;

  return elTop + elH * h <= viewed && elBottom >= scrolled;
};
