import React from 'react';
import cx from 'classnames';
import SRT from '@components/SRT';
import { Element } from '@lib/types';
import './CDLogo.scss';

export interface CDLogoProps extends Element<'span'> {
  alt?: boolean;
  color?: 'white' | 'black';
  noMargin?: boolean;
  size?: 'small' | 'tiny';
}

const CDLogo: React.FC<CDLogoProps> = ({
  alt,
  className,
  color,
  noMargin,
  size,
  ...props
}) => {
  return (
    <span
      className={cx(`CDLogo`, className, {
        'CDLogo--alt': alt,
        'CDLogo--noMargin': noMargin,
        [`CDLogo--${color}`]: color,
        [`CDLogo--${size}`]: size,
      })}
      aria-hidden
      {...props}
    >
      <SRT>Chance Digital</SRT>
    </span>
  );
};

export default CDLogo;
