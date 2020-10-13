/**
 * Generate a unique ID.
 */
export function uid() {
  let counter = 1;
  const map = new WeakMap<any, number>();
  const uuid = (item: any, index?: number): string => {
    if (typeof item === 'number' || typeof item === 'string') {
      return index ? `idx-${index}` : `val-${item}`;
    }
    if (!map.has(item)) {
      map.set(item, counter++);
      return uuid(item);
    }
    return 'uid' + map.get(item);
  };
  return uuid;
}
