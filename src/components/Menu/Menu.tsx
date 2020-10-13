import React from 'react';
import cx from 'classnames';
import SRT from '@components/SRT';
import MenuLink from './MenuLink';
import MenuItem from './MenuItem';
import './Menu.scss';

export interface MenuItemData {
  id: string | number;
  href?: string;
  label: string;
  options?: {
    target?: string;
    className?: string;
    hideLabel?: boolean;
    isHashLink?: boolean;
  };
  children?: MenuItemData[];
  redirect?: string;
  onClick?(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
}

export interface MenuProps {
  blockClass?: string;
  className?: string;
  togglable?: boolean;
  isActive?: boolean;
  items: MenuItemData[];
}

const Menu: React.FC<MenuProps> = ({
  blockClass,
  className,
  items,
  togglable,
  isActive,
  ...props
}) => {
  const renderSubMenu = (subItems: MenuItemData[]) => {
    if (subItems && subItems.length) {
      return <ul>{renderMenuItems(subItems)}</ul>;
    }
    return null;
  };

  const renderMenuItems = (menuItems: MenuItemData[]) =>
    menuItems.map((item) => {
      const {
        id,
        href,
        options = {},
        children = [] as any,
        onClick,
        redirect,
      } = item;
      const {
        target,
        className: itemClassName,
        hideLabel,
        isHashLink,
      } = options;

      return (
        <MenuItem
          className={cx(itemClassName, {
            [`${blockClass}__item`]:
              blockClass &&
              (itemClassName
                ? itemClassName.indexOf(`${blockClass}__item`) === -1
                : true),
          })}
          key={id}
          hasChildren={!!(children && children.length)}
        >
          <MenuLink
            className={cx({
              [`${blockClass}__link`]: blockClass,
            })}
            onClick={onClick}
            redirect={redirect}
            href={href}
            label={hideLabel ? <SRT>{item.label}</SRT> : item.label}
            target={target}
            tabIndex={togglable && !isActive ? -1 : 0}
            isHashLink={isHashLink}
          />
          {renderSubMenu(children)}
        </MenuItem>
      );
    });
  return (
    <ul
      className={cx('Menu', className, {
        [`${blockClass}__menu`]:
          blockClass &&
          (className ? className.indexOf(`${blockClass}__menu`) === -1 : true),
      })}
      {...props}
    >
      {renderMenuItems(items)}
    </ul>
  );
};

export default Menu;
