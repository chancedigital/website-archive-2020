import React from 'react';
import { GatsbyLinkProps, RouteUpdateArgs } from 'gatsby';

// Plugin types

export type SimpleAnchorPluginOptions = {
  offset?: number;
  offsetElement?: string | Element;
  bypassOffsetCache?: boolean;
};

export function onRouteUpdate(
  args: RouteUpdateArgs,
  options?: SimpleAnchorPluginOptions
): void;

// AnchorLink component types

type AnchorLinkDomProps = Omit<React.ComponentPropsWithRef<'a'>, 'href'>;
type AnchorLinkOwnProps = {
  to: string;
  title?: string;
  className?: string;
  stripHash?: boolean;
};

export type AnchorLinkProps<TState = any> = AnchorLinkDomProps &
  GatsbyLinkProps<TState> &
  AnchorLinkOwnProps;

export const AnchorLink: React.ForwardRefExoticComponent<
  React.PropsWithoutRef<AnchorLinkProps> &
    React.RefAttributes<HTMLAnchorElement>
>;
