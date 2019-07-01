import React from 'react';
import cx from 'classnames';

export interface MenuItemProps {
  className?: string;
  children: React.ReactNode;
  hasChildren: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({
  children,
  className,
  hasChildren = false,
  ...props
}) => {
  return <li className={cx('Menu__item', className)} {...props}>{children}</li>;
};

export default MenuItem;
