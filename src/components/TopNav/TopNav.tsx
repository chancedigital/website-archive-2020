import React, { useRef } from 'react';
import cx from 'classnames';
import { useSpring, animated } from 'react-spring';
import Menu from '@components/Menu';
import { Element } from '@lib/types';
import { useMeasure, usePrevious, useBreakpoint } from '@lib/hooks';
import { navMenuBreakpointDown } from '@lib/styles/breakpoints';
import './TopNav.scss';

export interface TopNavProps extends Element<'nav'> {
  menuIsActive: boolean;
}

const TopNav: React.FC<TopNavProps> = ({
  children,
  className,
  menuIsActive,
  ...props
}) => {
  const navItems = [
    {
      label: 'How We Can Help',
      href: '/#capes',
    },
    {
      label: 'Tools We Use',
      href: '/#tools',
    },
    {
      label: `Let's Talk`,
      href: 'contact',
    },
  ].map((item, i) => ({
    ...item,
    id: i + 1,
  }));

  const menuWrapper = useRef<HTMLDivElement>(null);
  const togglable = useBreakpoint(`${navMenuBreakpointDown} down`);
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
      aria-label="Site navigation"
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
          items={navItems}
          togglable={togglable}
        />
      </animated.div>
    </animated.nav>
  );
};

export default TopNav;
