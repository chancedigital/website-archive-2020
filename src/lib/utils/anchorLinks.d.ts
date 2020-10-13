export const IS_DEV: boolean;
export const IS_BROWSER: boolean;
export const IMPROPPER_FORMATTING: 'Anchor path should contain an absolute root path `/` and selector `#` Ex: `/about#team`';
export const INVALID_HASH: 'Anchor Links plugin attempted to scroll to an invalid hash on route change.';
export const DEFAULT_OFFSET: 0;

export function handleLinkClick(to: string, event: React.MouseEvent): void;

export function handleStrippedLinkClick(
  to: string,
  event: React.MouseEvent
): void;

export function stripHashedLocation(to: string): string;

export function checkHash(location: Location, offset?: number): void;

export function calculateScrollOffset(
  elem: Element,
  additionalOffset?: number,
  alignment?: ScrollAlignment
): number;

export function scrollToElement(
  elem: Element | string,
  options?: ScrollOptions
): void;

export function scroller(target: Element, options?: ScrollOptions): void;

export function prefersReducedMotion(
  globalWindow?: Window & typeof globalThis
): boolean;

type ScrollAlignment = 'bottom' | 'middle' | 'top';
type ScrollOptions = {
  offset?: number;
  align?: ScrollAlignment;
  ease?: string | ((n: number) => number);
  duration?: number;
};
