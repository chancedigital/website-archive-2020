/* eslint-disable no-new */
/**
 * Tests whether a string is a valid URL.
 * @param str
 */
export function isValidUrl(str: string): boolean {
  try {
    new URL(str);
    return true;
  } catch (_) {
    return false;
  }
}
