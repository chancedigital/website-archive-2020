import { Emitter } from './Emitter';
import { Ease } from './Ease';
import { camelCase } from 'lodash';

export class Tween extends Emitter {
  /**
   * @param {{top: number; left: number}} obj
   */
  constructor(obj) {
    super(obj);
    if (!(this instanceof Tween)) {
      return new Tween(obj);
    }
    this._from = obj;
    this.ease('linear');
    this.duration(500);
  }

  reset() {
    this.isArray =
      Object.prototype.toString.call(this._from) === '[object Array]';
    this._curr = { ...this._from };
    this._done = false;
    this._start = Date.now();
    return this;
  }

  /**
   * @param {{top: number; left: number}} obj
   */
  to(obj) {
    this.reset();
    this._to = obj;
    return this;
  }

  /**
   * @param {number} ms
   */
  duration(ms) {
    this._duration = ms;
    return this;
  }

  /**
   *
   * @param {string | ((n: number) => number)} fn
   */
  ease(fn) {
    fn = 'function' == typeof fn ? fn : Ease[camelCase(fn)];
    if (!fn) {
      throw new TypeError('invalid easing function');
    }
    this._ease = fn;
    return this;
  }

  stop() {
    this.stopped = true;
    this._done = true;
    this.emit('stop');
    this.emit('end');
    return this;
  }

  step() {
    if (this._done) return;

    let duration = this._duration;
    let now = Date.now();
    let delta = now - this._start;
    let done = delta >= duration;

    if (done) {
      this._from = this._to;
      this._update(this._to);
      this._done = true;
      this.emit('end');
      return this;
    }

    let from = this._from;
    let to = this._to;
    let curr = this._curr;
    let fn = this._ease;
    let p = (now - this._start) / duration;
    let n = fn(p);

    if (this.isArray) {
      for (let i = 0; i < from.length; ++i) {
        curr[i] = from[i] + (to[i] - from[i]) * n;
      }

      this._update(curr);
      return this;
    }

    for (let k in from) {
      curr[k] = from[k] + (to[k] - from[k]) * n;
    }

    this._update(curr);
    return this;
  }

  update(fn) {
    if (0 == arguments.length) return this.step();
    this._update = fn;
    return this;
  }
}
