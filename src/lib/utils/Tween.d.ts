import { Emitter } from './Emitter';
export class Tween extends Emitter {
  constructor(obj: { top: number; left: number });
  reset(): this;
  to(obj: { top: number; left: number }): this;
  duration(ms: number): this;
  ease(fn: string | ((n: number) => number)): this;
  stop(): this;
  step(): this;
  update(fn: (...args: any[]) => any): this;
}
