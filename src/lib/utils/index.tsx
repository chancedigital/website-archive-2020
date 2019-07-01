import { kebabCase } from 'lodash';

const NODE_ENV = process.env.NODE_ENV;

// Tests whether a string is a valid URL.
export const isValidUrl = (string: string): boolean => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

/**
 * Converts a single object into a media query string.
 * https://github.com/akiran/json2mq
 */
export const obj2mq = (obj: { [key: string]: any }): string => {
  const isDimension = function(feature: string) {
    const re = /[height|width]$/;
    return re.test(feature);
  };
  let mq = '';
  const features = Object.keys(obj);
  features.forEach((feature, index) => {
    let value = obj[feature];
    feature = kebabCase(feature);
    // Add px to dimension features
    if (isDimension(feature) && typeof value === 'number') {
      value = value + 'px';
    }
    if (value === true) {
      mq += feature;
    } else if (value === false) {
      mq += 'not ' + feature;
    } else {
      mq += '(' + feature + ': ' + value + ')';
    }
    if (index < features.length - 1) {
      mq += ' and ';
    }
  });
  return mq;
};

/**
 * Converts an object or array of objects into a media query string.
 * https://github.com/akiran/json2mq
 */
export const json2mq = (query: any): string => {
  let mq = '';
  if (typeof query === 'string') {
    return query;
  }
  // Handling array of media queries
  if (Array.isArray(query)) {
    query.forEach((q, index) => {
      mq += obj2mq(q);
      if (index < query.length - 1) {
        mq += ', ';
      }
    });
    return mq;
  }
  // Handling single media query
  return obj2mq(query);
};

/**
 * Use invariant() to assert state which your program assumes to be true.
 * https://github.com/zertosh/invariant
 */
export const invariant = function(
  condition: any,
  format?: string,
  ...args: any[]
) {
  if (NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    let error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
          'for the full error message and additional helpful warnings.'
      );
    } else {
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, () => args[argIndex++]));
      error.name = 'Invariant Violation';
    }
    // @ts-ignore
    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

export { default as keyCodeMap } from './keyCodeMap';
export { uid } from './uid';
export { inViewport } from './inViewport';
