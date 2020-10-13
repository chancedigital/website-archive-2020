import { nanoid } from 'nanoid';
import ResizeObserver from 'resize-observer-polyfill';
import * as React from 'react';
import { json2mq, getBreakpointQueryObject, canUseDOM } from '@lib/utils';

const CAN_USE_DOM = canUseDOM();

export interface DOMRectReadOnly {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly top: number;
  readonly right: number;
  readonly bottom: number;
  readonly left: number;
}

export interface ScrollPosition {
  x: number;
  y: number;
}

/**
 * On the server, React emits a warning when calling `useLayoutEffect`.
 * This is because neither `useLayoutEffect` nor `useEffect` run on the server.
 * We use this safe version which suppresses the warning by replacing it with a noop on the server.
 *
 * See: https://reactjs.org/docs/hooks-reference.html#uselayouteffect
 */
export const useLayoutEffect = CAN_USE_DOM ? React.useLayoutEffect : () => {};

function getScrollPosition(): ScrollPosition {
  return CAN_USE_DOM
    ? { x: window.pageXOffset, y: window.pageYOffset }
    : { x: 0, y: 0 };
}

/**
 * Creates a hook for either `React.useEffect` or `useLayoutEffect`
 * const isDesktop = useMediaLayout({ minWidth: 500 }, true);
 */
const createUseMedia = (effect: typeof React.useEffect) => (
  rawQuery: any,
  defaultState: boolean = false
) => {
  const [state, setState] = React.useState(defaultState);
  const query = json2mq(rawQuery);
  effect(() => {
    let mounted = true;
    const mql = window.matchMedia(query);
    const onChange = () => {
      if (!mounted) return;
      setState(!!mql.matches);
    };

    mql.addListener(onChange);
    setState(mql.matches);

    return () => {
      mounted = false;
      mql.removeListener(onChange);
    };
  }, [query]);

  return state;
};

/**
 * Store a component's previous value in a ref for use after the value changes.
 */
export function usePrevious(value: any): any {
  const ref = React.useRef();
  React.useEffect(() => void (ref.current = value), [value]);
  return ref.current;
}

export const useMedia = createUseMedia(React.useEffect);

export const useMediaLayout = createUseMedia(useLayoutEffect);

export const useBreakpoint = (
  bpQuery: string | number,
  defaultState: boolean = false,
  toRem: boolean = true
) => {
  const queryObject = getBreakpointQueryObject(bpQuery, toRem);
  const matches = useMediaLayout(queryObject, defaultState);
  return matches;
};

type IDState = string;

let _id = nanoid();

export function useId(initialValue?: string | number): IDState {
  const [id, setId] = React.useState<IDState>(
    initialValue ? String(initialValue) : _id
  );
  React.useEffect(() => setId(nanoid()), []);
  return id;
}

export function useMeasure(ref: React.RefObject<HTMLElement | null>) {
  const [bounds, setContentRect] = React.useState<DOMRectReadOnly>(
    // DOMRectReadOnly.fromRect()
    { x: 0, y: 0, width: 0, height: 0, top: 0, right: 0, bottom: 0, left: 0 }
  );

  useLayoutEffect((): any => {
    let animationFrameId: number | null = null;
    const measure: ResizeObserverCallback = ([entry]) => {
      animationFrameId = window.requestAnimationFrame(() => {
        setContentRect(entry.contentRect);
      });
    };

    if (ref.current) {
      const ro = new ResizeObserver(measure);
      ro.observe(ref.current);

      return () => {
        window.cancelAnimationFrame(animationFrameId!);
        ro.disconnect();
      };
    }
  }, [ref]);

  return bounds;
}

export function useScrollPosition(): ScrollPosition {
  const [position, setScrollPosition] = React.useState<ScrollPosition>(
    getScrollPosition()
  );

  React.useEffect((): any => {
    let requestRunning: number | null = null;
    function handleScroll() {
      if (requestRunning === null) {
        requestRunning = window.requestAnimationFrame(() => {
          setScrollPosition(getScrollPosition());
          requestRunning = null;
        });
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => void window.removeEventListener('scroll', handleScroll);
  }, []);

  return position;
}

export function useInterval(callback: () => any, delay: number) {
  const savedCallback = React.useRef<any>();

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect((): void | (() => void) => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => void clearInterval(id);
    }
  }, [delay]);
}

export function useAnimationEndListener(
  elementRef: React.RefObject<HTMLElement>,
  callback: (ev: AnimationEvent, el: HTMLElement) => any
) {
  const callbackRef = React.useRef(callback);
  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  React.useEffect(() => {
    const elem = elementRef.current;
    const cb = callbackRef.current;
    elem?.addEventListener('animationend', handleAnimationEnd);
    return function () {
      elem?.removeEventListener('animationend', handleAnimationEnd);
    };
    function handleAnimationEnd(event: AnimationEvent) {
      if (elem && cb) cb(event, elem);
    }
  }, [elementRef]);
}
