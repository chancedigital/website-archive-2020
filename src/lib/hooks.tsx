import nanoid from 'nanoid';
import ResizeObserver from 'resize-observer-polyfill';
import {
  useRef,
  useEffect,
  useLayoutEffect,
  useState,
  DependencyList,
  EffectCallback,
  RefObject,
} from 'react';
import { json2mq } from '@lib/utils';

type Effect = (effect: EffectCallback, deps?: DependencyList) => void;

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

const isBrowser = typeof window !== 'undefined';

function getScrollPosition(): ScrollPosition {
  return isBrowser
    ? { x: window.pageXOffset, y: window.pageYOffset }
    : { x: 0, y: 0 };
}

/**
 * Creates a hook for either `useEffect` or `useLayoutEffect`
 * const isDesktop = useMediaLayout({ minWidth: 500 }, true);
 */
const createUseMedia = (effect: Effect) => (
  rawQuery: any,
  defaultState: boolean = false
) => {
  const [state, setState] = useState(defaultState);
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
  const ref = useRef();
  useEffect(() => void (ref.current = value), [value]);
  return ref.current;
}

export const useMedia = createUseMedia(useEffect);

export const useMediaLayout = createUseMedia(useLayoutEffect);

type IDState = string;

let _id = nanoid();

export const useId = (initialValue?: string | number): IDState => {
  const [id, setId] = useState<IDState>(
    initialValue ? String(initialValue) : _id
  );
  useEffect(() => setId(nanoid()), []);
  return id;
};

export const useMeasure = (
  ref: RefObject<HTMLElement | null>,
  deps: any[] = []
) => {
  const [bounds, setContentRect] = useState<DOMRectReadOnly>(
    // DOMRectReadOnly.fromRect()
    { x: 0, y: 0, width: 0, height: 0, top: 0, right: 0, bottom: 0, left: 0 }
  );

  useLayoutEffect(() => {
    let animationFrameId: number | null = null;
    const measure: ResizeObserverCallback = ([entry]) => {
      animationFrameId = window.requestAnimationFrame(() => {
        setContentRect(entry.contentRect);
      });
    };

    const ro = new ResizeObserver(measure);
    ro.observe(ref.current!);

    return () => {
      window.cancelAnimationFrame(animationFrameId!);
      ro.disconnect();
    };
  }, deps);

  return bounds;
};

export const useScrollPosition = (): ScrollPosition => {
  const [position, setScrollPosition] = useState<ScrollPosition>(
    getScrollPosition()
  );

  useEffect((): any => {
    let requestRunning: number | null = null;
    function handleScroll() {
      console.log('SCROLLLLLED');
      if (isBrowser && requestRunning === null) {
        requestRunning = window.requestAnimationFrame(() => {
          setScrollPosition(getScrollPosition());
          requestRunning = null;
        });
      }
    }

    if (isBrowser) {
      console.log('browser!');
      window.addEventListener('scroll', handleScroll);
      return () => void window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return position;
};

export const useScrollXPosition = (): number => {
  const { x } = useScrollPosition();
  return x;
};

export const useScrollYPosition = (): number => {
  const { y } = useScrollPosition();
  return y;
};

export const useInterval = (callback: () => any, delay: number) => {
  const savedCallback = useRef<any>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect((): void | (() => void) => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => void clearInterval(id);
    }
  }, [delay]);
};
