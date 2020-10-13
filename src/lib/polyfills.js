/* eslint-disable no-shadow */
/* eslint-disable no-extend-native */
import smoothscroll from 'smoothscroll-polyfill';

smoothscroll.polyfill();

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat#Polyfill
if (!Array.prototype.flat) {
  Array.prototype.flat = function() {
    let depth = arguments[0];
    depth = depth === undefined ? 1 : Math.floor(depth);
    if (depth < 1) return Array.prototype.slice.call(this);
    return (function flat(arr, depth) {
      let len = arr.length >>> 0;
      let flattened = [];
      let i = 0;
      while (i < len) {
        if (i in arr) {
          let el = arr[i];
          if (Array.isArray(el) && depth > 0)
            flattened = flattened.concat(flat(el, depth - 1));
          else flattened.push(el);
        }
        i++;
      }
      return flattened;
    })(this, depth);
  };
}
