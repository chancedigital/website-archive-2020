import React from 'react';
import cx from 'classnames';
import Link from '@components/Link';
// import { TransitionLink as Link } from 'gatsby-plugin-transition-link';
import { GatsbyLinkProps } from 'gatsby-link';
import { isValidUrl } from '@lib/utils';

type TMenuLinkProps = Omit<Omit<GatsbyLinkProps<{}>, 'to'>, 'onClick'> &
  JSX.IntrinsicElements['button'];

export interface MenuLinkProps extends TMenuLinkProps {
  href?: string;
  label: string | JSX.Element;
  redirect?: string;
  onClick?(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
  isHashLink?: boolean;
}

const MenuLink: React.FC<MenuLinkProps> = ({
  className,
  href,
  target,
  label,
  onClick,
  rel: relProp,
  redirect,
  ...props
}) => {
  const classNames = cx('Menu__link', className);
  const rel =
    relProp || target === '_blank' ? 'noopener noreferrer' : undefined;
  if (onClick) {
    return (
      <button
        className={cx(classNames, 'Menu__link--button')}
        onClick={onClick}
        type="button"
        {...props}
      >
        {label}
      </button>
    );
  }
  if (href) {
    return (
      <Link
        className={classNames}
        href={href}
        target={target}
        rel={rel}
        {...(props as any)}
      >
        {label}
      </Link>
    );
  }
  return <span {...props}>{label}</span>;
};

export default MenuLink;
