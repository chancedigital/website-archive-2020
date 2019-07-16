import React, { useState } from 'react';
import cx from 'classnames';
import TopNav from '@components/TopNav';
import MenuToggle from '@components/MenuToggle';
import SRT from '@components/SRT';
import { Element } from '@lib/types';
import { useId, useScrollYPosition } from '@lib/hooks';
import './Header.scss';

const isBrowser = typeof window !== 'undefined';

function getScrollPosition(): ScrollPosition {
  return isBrowser
    ? { x: window.pageXOffset, y: window.pageYOffset }
    : { x: 0, y: 0 };
}

export interface ScrollPosition {
  x: number;
  y: number;
}

export interface HeaderProps extends Element<'header'> {
  siteTitle: string;
  isHome?: boolean;
}

const SiteTitle: React.FC = () => {
  return (
    <React.Fragment>
      <img
        src="/img/logos/logo-long-box-color.svg"
        aria-hidden
        alt="Chance Digital logo"
      />
      <SRT>Chance Digital</SRT>
    </React.Fragment>
  );
};

const Header: React.FC<HeaderProps> = ({
  className,
  siteTitle = '',
  isHome = false,
  ...props
}) => {
  const [menuIsActive, setMenuActive] = useState<boolean>(false);
  const scrollY = useScrollYPosition();

  const LogoWrapper = isHome ? 'div' : 'h1';
  const navId = `top-nav-${useId()}`;
  return (
    <header
      className={cx(`Header`, className, {
        'Header--sticky': scrollY > 180,
      })}
      {...props}
    >
      <LogoWrapper className="Header__logo">
        {isHome ? (
          <SiteTitle />
        ) : (
          <a href="/">
            <SiteTitle />
          </a>
        )}
      </LogoWrapper>
      <div className="Header__navWrapper">
        <MenuToggle
          className="Header__menuToggle"
          onClick={() => setMenuActive(!menuIsActive)}
          menuIsActive={menuIsActive}
          navId={navId}
        />
        <TopNav
          className="Header__nav"
          menuIsActive={menuIsActive}
          id={navId}
        />
      </div>
    </header>
  );
};

export default Header;
