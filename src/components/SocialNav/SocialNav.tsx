import React from 'react';
import cx from 'classnames';
import SRT from '@components/SRT';
import Icon from '@components/Icon';
import { Element } from '@lib/types';
import './SocialNav.scss';

export interface SocialNavProps extends Element<'nav'> {}

const MENU_ITEMS = [
  {
    property: 'Twitter',
    url: 'https://twitter.com/chancethedev',
  },
  {
    property: 'Instagram',
    url: 'https://www.instagram.com/chancethedev',
  },
  {
    property: 'LinkedIn',
    url: 'https://www.linkedin.com/in/chancestrickland',
  },
  {
    property: 'GitHub',
    url: 'https://github.com/chancestrickland',
  },
  {
    property: 'CodePen',
    url: 'https://codepen.io/chancethedev',
  },
];

const SocialNav: React.FC<SocialNavProps> = ({ className }) => {
  return (
    <nav className={cx('SocialNav', className)}>
      <ul className="SocialNav__menu">
        {MENU_ITEMS.map(({ property, url }) => {
          const SocialIcon = Icon[property];
          return (
            <li key={property} className="SocialNav__menuItem">
              <a href={url} className="SocialNav__link">
                <SRT>{property}</SRT>
                <SocialIcon className="SocialNav__icon" />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default SocialNav;
