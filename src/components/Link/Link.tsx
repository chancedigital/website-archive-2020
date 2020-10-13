import React from 'react';
import { Link as GatsbyLink, GatsbyLinkProps } from 'gatsby';
import { AnchorLink, AnchorLinkProps } from '@components/AnchorLink';
import { omit } from 'lodash';
import { isValidUrl } from '@lib/utils';

const gatsbyLinkPropNames = [
  'getProps',
  'activeClassName',
  'activeStyle',
  'replace',
  'innerRef',
  'state',
  'partiallyActive',
];

const anchorLinkProps = ['stripHash'];

export type LinkDOMProps = React.ComponentPropsWithRef<'a'>;
export type LinkOwnProps = {
  isHashLink?: boolean;
  href: string;
};
export type LinkProps = LinkOwnProps &
  LinkDOMProps &
  Omit<AnchorLinkProps, 'to'> &
  Omit<GatsbyLinkProps<any>, 'to'>;

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  function Link({ isHashLink: isHashLinkProp, ...props }, forwardedRef) {
    let isExternalLink =
      typeof props.href === 'string' && isValidUrl(props.href);
    let rel = props.rel || isExternalLink ? 'nofollow noreferrer' : undefined;
    let target = props.target || isExternalLink ? '_blank' : undefined;
    let isHashLink = isHashLinkProp || props.href.startsWith('#');

    return isHashLink ? (
      <AnchorLink to={props.href} ref={forwardedRef as any} {...props} />
    ) : isExternalLink ? (
      <a
        {...omit(props, [...gatsbyLinkPropNames, ...anchorLinkProps])}
        ref={forwardedRef}
        href={props.href}
        rel={rel}
        target={target}
      />
    ) : (
      <GatsbyLink
        to={props.href}
        ref={forwardedRef as any}
        {...omit(props, anchorLinkProps)}
      />
    );
  }
);

export default Link;
