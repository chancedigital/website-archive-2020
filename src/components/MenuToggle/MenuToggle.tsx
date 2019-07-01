import React from 'react';
import cx from 'classnames';
import SRT from '@components/SRT';
import { Element } from '@lib/types';
import './MenuToggle.scss';

export interface MenuToggleProps extends Element<'button'> {
  menuIsActive: boolean;
  onClick(event?: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
  navId: string;
}

export const MenuToggle: React.FC<MenuToggleProps> = ({
  className,
  menuIsActive,
  onClick,
  navId,
}) => {
  return (
    <div
      className={cx(`MenuToggle`, className, {
        'MenuToggle--active': menuIsActive,
      })}
    >
      <button
        className="MenuToggle__button"
        type="button"
        onClick={onClick}
        aria-expanded={menuIsActive}
        aria-controls={navId}
      >
        {[1, 2, 3].map((_, i) => (
          <span key={i} className="MenuToggle__line" aria-hidden />
        ))}
        <SRT>Toggle Navigation</SRT>
      </button>
    </div>
  );
};

export default MenuToggle;
