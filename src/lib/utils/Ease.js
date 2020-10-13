export class Ease {
  /** @param {number} n */
  static linear(n) {
    return n;
  }

  /** @param {number} n */
  static inQuad(n) {
    return n * n;
  }

  /** @param {number} n */
  static outQuad(n) {
    return n * (2 - n);
  }

  /** @param {number} n */
  static inOutQuad(n) {
    n *= 2;
    if (n < 1) return 0.5 * n * n;
    return -0.5 * (--n * (n - 2) - 1);
  }

  /** @param {number} n */
  static inCube(n) {
    return n * n * n;
  }

  /** @param {number} n */
  static outCube(n) {
    return --n * n * n + 1;
  }

  /** @param {number} n */
  static inOutCube(n) {
    n *= 2;
    if (n < 1) return 0.5 * n * n * n;
    return 0.5 * ((n -= 2) * n * n + 2);
  }

  /** @param {number} n */
  static inQuart(n) {
    return n * n * n * n;
  }

  /** @param {number} n */
  static outQuart(n) {
    return 1 - --n * n * n * n;
  }

  /** @param {number} n */
  static inOutQuart(n) {
    n *= 2;
    if (n < 1) return 0.5 * n * n * n * n;
    return -0.5 * ((n -= 2) * n * n * n - 2);
  }

  /** @param {number} n */
  static inQuint(n) {
    return n * n * n * n * n;
  }

  /** @param {number} n */
  static outQuint(n) {
    return --n * n * n * n * n + 1;
  }

  /** @param {number} n */
  static inOutQuint(n) {
    n *= 2;
    if (n < 1) return 0.5 * n * n * n * n * n;
    return 0.5 * ((n -= 2) * n * n * n * n + 2);
  }

  /** @param {number} n */
  static inSine(n) {
    return 1 - Math.cos((n * Math.PI) / 2);
  }

  /** @param {number} n */
  static outSine(n) {
    return Math.sin((n * Math.PI) / 2);
  }

  /** @param {number} n */
  static inOutSine(n) {
    return 0.5 * (1 - Math.cos(Math.PI * n));
  }

  /** @param {number} n */
  static inExpo(n) {
    return 0 == n ? 0 : Math.pow(1024, n - 1);
  }

  /** @param {number} n */
  static outExpo(n) {
    return 1 == n ? n : 1 - Math.pow(2, -10 * n);
  }

  /** @param {number} n */
  static inOutExpo(n) {
    if (0 == n) return 0;
    if (1 == n) return 1;
    if ((n *= 2) < 1) return 0.5 * Math.pow(1024, n - 1);
    return 0.5 * (-Math.pow(2, -10 * (n - 1)) + 2);
  }

  /** @param {number} n */
  static inCirc(n) {
    return 1 - Math.sqrt(1 - n * n);
  }

  /** @param {number} n */
  static outCirc(n) {
    return Math.sqrt(1 - --n * n);
  }

  /** @param {number} n */
  static inOutCirc(n) {
    n *= 2;
    if (n < 1) return -0.5 * (Math.sqrt(1 - n * n) - 1);
    return 0.5 * (Math.sqrt(1 - (n -= 2) * n) + 1);
  }

  /** @param {number} n */
  static inBack(n) {
    let s = 1.70158;
    return n * n * ((s + 1) * n - s);
  }

  /** @param {number} n */
  static outBack(n) {
    let s = 1.70158;
    return --n * n * ((s + 1) * n + s) + 1;
  }

  /** @param {number} n */
  static inOutBack(n) {
    let s = 1.70158 * 1.525;
    if ((n *= 2) < 1) return 0.5 * (n * n * ((s + 1) * n - s));
    return 0.5 * ((n -= 2) * n * ((s + 1) * n + s) + 2);
  }

  /** @param {number} n */
  static inBounce(n) {
    return 1 - exports.outBounce(1 - n);
  }

  /** @param {number} n */
  static outBounce(n) {
    if (n < 1 / 2.75) {
      return 7.5625 * n * n;
    } else if (n < 2 / 2.75) {
      return 7.5625 * (n -= 1.5 / 2.75) * n + 0.75;
    } else if (n < 2.5 / 2.75) {
      return 7.5625 * (n -= 2.25 / 2.75) * n + 0.9375;
    }
    return 7.5625 * (n -= 2.625 / 2.75) * n + 0.984375;
  }

  /** @param {number} n */
  static inOutBounce(n) {
    if (n < 0.5) return exports.inBounce(n * 2) * 0.5;
    return exports.outBounce(n * 2 - 1) * 0.5 + 0.5;
  }

  /** @param {number} n */
  static inElastic(n) {
    let s,
      a = 0.1,
      p = 0.4;
    if (n === 0) return 0;
    if (n === 1) return 1;
    if (!a || a < 1) {
      a = 1;
      s = p / 4;
    } else s = (p * Math.asin(1 / a)) / (2 * Math.PI);
    return -(
      a *
      Math.pow(2, 10 * (n -= 1)) *
      Math.sin(((n - s) * (2 * Math.PI)) / p)
    );
  }

  /** @param {number} n */
  static outElastic(n) {
    let s,
      a = 0.1,
      p = 0.4;
    if (n === 0) return 0;
    if (n === 1) return 1;
    if (!a || a < 1) {
      a = 1;
      s = p / 4;
    } else s = (p * Math.asin(1 / a)) / (2 * Math.PI);
    return (
      a * Math.pow(2, -10 * n) * Math.sin(((n - s) * (2 * Math.PI)) / p) + 1
    );
  }

  /** @param {number} n */
  static inOutElastic(n) {
    let s,
      a = 0.1,
      p = 0.4;
    if (n === 0) return 0;
    if (n === 1) return 1;
    if (!a || a < 1) {
      a = 1;
      s = p / 4;
    } else s = (p * Math.asin(1 / a)) / (2 * Math.PI);
    if ((n *= 2) < 1)
      return (
        -0.5 *
        (a *
          Math.pow(2, 10 * (n -= 1)) *
          Math.sin(((n - s) * (2 * Math.PI)) / p))
      );
    return (
      a *
        Math.pow(2, -10 * (n -= 1)) *
        Math.sin(((n - s) * (2 * Math.PI)) / p) *
        0.5 +
      1
    );
  }
}
