export class Emitter {
  on(event: string, fn: (...args: any[]) => any): this;
  once(event: string, fn: (...args: any[]) => any): this;
  off(event: string, fn: (...args: any[]) => any): this;
  emit(event: string): this;
  listeners(event: string): EmitterCallback[];
  hasListeners(event: string): boolean;
  private _callbacks: Record<string, EmitterCallback[]>;
}

type EmitterCallback =
  | ((...args: any[]) => any)
  | { fn: (...args: any[]) => any };
