import React from 'react';
import { Link, GatsbyLinkProps } from 'gatsby';
import {
  handleLinkClick,
  stripHashedLocation,
  handleStrippedLinkClick,
} from '@lib/utils/anchorLinks';
import { useLayoutEffect } from '@lib/hooks';

export type AnchorLinkOwnProps = {
  to: string;
  title?: string;
  className?: string;
  stripHash?: boolean;
};

export type AnchorLinkProps<TState = any> = GatsbyLinkProps<TState> &
  AnchorLinkOwnProps;

export const AnchorLink = React.forwardRef<HTMLAnchorElement, AnchorLinkProps>(
  function AnchorLink({ to, children, stripHash = false, ...props }, ref) {
    const linkProps = {
      ...props,
    };

    const onClickProp = React.useRef(props.onClick);
    useLayoutEffect(() => {
      onClickProp.current = props.onClick;
    });

    const handleClick = React.useCallback(
      function handleClick(
        event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
      ) {
        onClickProp.current && onClickProp.current(event);
        if (!event.defaultPrevented) {
          stripHash
            ? handleStrippedLinkClick(to, event)
            : handleLinkClick(to, event);
        }
      },
      [stripHash, to]
    );

    return (
      <Link
        {...props}
        to={stripHash ? stripHashedLocation(to) : to}
        onClick={handleClick}
        ref={ref as any}
      >
        {children || linkProps.title}
      </Link>
    );
  }
);
