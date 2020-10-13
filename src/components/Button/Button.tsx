import React from 'react';
import cx from 'classnames';
import Link from '@components/Link';
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
  onClick,
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

  // Determine which props to pass to link buttons
  const linkProps = {
    className: classNames,
    rel: relProp || target === '_blank' ? 'noopener noreferrer' : undefined,
    target,
    ...rest,
  };

  const inner = <span className="Button__inner">{children}</span>;

  return href ? (
    <LinkEl {...linkProps} href={href}>
      {inner}
    </LinkEl>
  ) : (
    <NonLinkEl {...nonLinkProps}>{inner}</NonLinkEl>
  );
};

export default Button;
