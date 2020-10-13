# Gatsby Simple Anchors

A fork of [Gatsby Smooth Scroll Anchor Links](https://www.npmjs.com/package/gatsby-plugin-anchor-links).

## Why?

You can read about the evolution of the logic on the [original plugin author's blog](https://chaseohlson.com/gatsby-link-anchor-navigation).

This plugin is much simpler than `gatsby-plugin-anchor-links` in that it doesn't handle smooth scrolling with complex JavaScript (Smooth scrolling can be achieved more optimally with the [CSS `scroll-behavior` property](https://css-tricks.com/snippets/jquery/smooth-scrolling/), which can be [polyfilled as needed](https://github.com/wessberg/scroll-behavior-polyfill) for unsupportive browsers). Instead, it opts simply to replicate a standard HTML link's hash-anchor functionality, with the added bonus of allowing an offset to account for sticky headers.

Like its inspiration, this plugin adds a check `onRouteUpdate` - which looks for hashes in the current pathname. In addition, it provides component(s) for use in your Gatsby code to which you can provide both hashed & non-hashed `to` paths.

## Installation

Using Yarn

- `yarn add gatsby-plugin-simple-anchors`

Using NPM

- `npm i gatsby-plugin-simple-anchors`

### gatsby-config.js

This plugin can be used with or without a configuration object:

```js
module.exports = {
  plugins: [`gatsby-plugin-simple-anchors`],
};
```

```js
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-simple-anchors',
      // Configuration Options
      options: {
        /**
         * The distance to offset the scroll target from the top of the viwewport.
         * Defaults to 0.
         * @type {number}
         */
        offset: -100,
        /**
         * An HTML element or query selector for an element whose height will be
         * used to determine the scroll offset. If this is set, the `offset`
         * option will be ignored. If the element isn't found on a given page, the
         * offset will default to 0.
         * @type {string|Element}
         */
        offsetElement: '#sticky-header',
        /**
         * By default, the plugin looks for an offset once and caches its value for
         * the duration of a user's session. If the offset is calculated by an
         * element that may or may not exist on certain pages, set this option to
         * `true` so the plugin will check for the element on every anchor link click.
         * @type {boolean}
         */
        bypassOffsetCache: false,
      },
    },
  ],
};
```

## Component usage

You can provide anchor or non-anchor links to this component for ease of use. If you use it as an anchor component, be sure to include both a base path and hash in the `to` string.

```javascript
import { AnchorLink } from 'gatsby-plugin-simple-anchors';

export default () => (
  <AnchorLink to="/about#team">
    <span>Check out our team!</span>
  </AnchorLink>
);
// => <a href="/about#team"><span>Check out our team!</span></a>

export default () => <AnchorLink to="#team">Check out our team!</AnchorLink>;
// => <a href="#team">Check out our team!</a>

export default () => (
  <AnchorLink to="/about#team" stripHash>
    Check out our team!
  </AnchorLink>
);
// => <a href="/about">Check out our team!</a>
// => Hash will be stripped, and a full page scroll will occure onRouteChange

export default () => <AnchorLink to="/about">About us</AnchorLink>;
// => <a href="/about">About us</a>
```

### AnchorLink props

`AnchorLink` accepts any props that can be passed to Gatsby's `Link` component, in addition to:

| Prop        |                                                              Description |      Type | Required |
| ----------- | -----------------------------------------------------------------------: | --------: | -------: |
| `stripHash` | Strips hash from link and forces a full scroll to target `onRouteChange` | `boolean` |  `false` |

#### A note on `stripHash`

When passing a hashed `to` prop to the link component - browsers will automatically try to get you there when the route changes. If you have some offset value, you'll see some scrolling action. If you don't, you'll just see a static route change directly to the hash.

The `stripHash` prop will route to the base path of your `to` prop, save the hash on the `window`, then navigate to it. As far as semantic HTML & Google SERP nav links concerned, this probably isn't what you want in every sitation, but it achieves the desired effect for many that are looking for this kind of solution. So, take this with a grain of salt.
