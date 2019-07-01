import React, { useRef } from 'react';
import cx from 'classnames';
import { useSpring, animated } from 'react-spring';
import Menu, { MenuItemData } from '@components/Menu';
import { TOP_NAV_MENU } from '@lib/constants';
import { Element } from '@lib/types';
import { useMeasure, usePrevious, useMediaLayout } from '@lib/hooks';
import './TopNav.scss';

const MENU_ITEMS: MenuItemData[] = TOP_NAV_MENU.map((item, i) => ({
  ...item,
  id: i + 1,
}));

export interface TopNavProps extends Element<'nav'> {
  menuIsActive: boolean;
}

const TopNav: React.FC<TopNavProps> = ({
  children,
  className,
  menuIsActive,
  ...props
}) => {
  const menuWrapper = useRef<HTMLDivElement>(null);
  const togglable = useMediaLayout({ maxWidth: 639 }, true);
  const prevMenuActiveState = usePrevious(menuIsActive);
  const { height: viewHeight } = useMeasure(menuWrapper);
  const { height, transform } = useSpring<any>({
    from: {
      height: menuIsActive ? 0 : viewHeight,
      transform: 'translate3d(0,-20px,0)',
    },
    to: {
      height: menuIsActive ? viewHeight : 0,
      transform: `translate3d(0,${menuIsActive ? 0 : `${-20}px`},0)`,
    },
  });

  return (
    <animated.nav
      className={cx(`TopNav`, className, {
        'TopNav--active': menuIsActive,
      })}
      style={
        togglable
          ? {
              height:
                menuIsActive && prevMenuActiveState === menuIsActive
                  ? 'auto'
                  : height,
            }
          : {}
      }
      {...props}
    >
      <animated.div style={togglable ? { transform } : {}} ref={menuWrapper}>
        <Menu
          blockClass="TopNav"
          className="TopNav__menu"
          isActive={menuIsActive}
          items={MENU_ITEMS}
          togglable={togglable}
        />
      </animated.div>
    </animated.nav>
  );
};

export default TopNav;
