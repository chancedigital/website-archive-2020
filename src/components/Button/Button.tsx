import React from 'react';
import cx from 'classnames';
import { Link } from 'gatsby';
import { isValidUrl } from '@lib/utils';
import './Button.scss';

export interface ButtonProps {
  className?: string;
  color?: string;
  disabled?: boolean;
  element?: 'button' | 'span' | 'div';
  href?: string;
  htmlType?: 'button' | 'submit' | 'reset';
  loading?: boolean;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  rel?: string;
  size?: string;
  target?: '_blank';
  wobble?: boolean;
  [key: string]: any;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  color,
  disabled = false,
  element = 'button',
  href,
  htmlType = 'button',
  loading = false,
  onClick: onClick,
  rel: relProp,
  size,
  target,
  wobble,
  ...rest
}) => {
  // Compose classnames
  const classNames = cx('Button', className, {
    [`Button--${size}`]: size,
    [`Button--${color}`]: color,
    [`Button--loading`]: loading,
    [`Button--disabled`]: disabled,
    [`Button--wobble`]: wobble,
  });

  // Check for loading state before firing a click handler
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (loading) {
      e.preventDefault();
      return;
    }
    onClick && onClick(e);
  };

  // Determine the element to use for non-link buttons
  // Anything with a click handler will use a `button` tag
  let NonLinkEl = element;
  let htmlButtonProps = {};
  if (onClick) {
    NonLinkEl = 'button';
    htmlButtonProps = {
      onClick: handleClick,
      type: htmlType,
    };
  }

  // Determine which props to pass to non-link buttons
  const nonLinkProps = {
    className: classNames,
    ...htmlButtonProps,
    ...rest,
  };

  // By default, use a Gatsby Link component for links
  // If the href is pointing to a valid URL, we need to use a standard anchor
  // tag and use the `href` prop instead of the `to` prop
  let LinkEl: typeof Link | string = Link;
  let linkHrefProps: any = { to: href! };
  if (href && (isValidUrl(href) || href.indexOf('#') === 0)) {
    LinkEl = 'a';
    linkHrefProps = { href };
  }

  // Determine which props to pass to link buttons
  const linkProps = {
    className: classNames,
    rel: relProp || target === '_blank' ? 'noopener noreferrer' : undefined,
    target,
    ...linkHrefProps,
    ...rest,
  };

  return href ? (
    <LinkEl {...linkProps}>{children}</LinkEl>
  ) : (
    <NonLinkEl {...nonLinkProps}>{children}</NonLinkEl>
  );
};

export default Button;
