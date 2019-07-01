import React from 'react';
import cx from 'classnames';
import { Element } from '@lib/types';
import './IconWithHoverLabel.scss';

export interface IconWithHoverLabelProps extends Element<'figure'> {
  label: string;
  imgAlt: string;
  imgSrc: string;
}

export const IconWithHoverLabel: React.FC<IconWithHoverLabelProps> = ({
  className,
  label,
  imgAlt,
  imgSrc,
  ...props
}) => {
  return (
    <figure className={cx('IconWithHoverLabel', className)} {...props}>
      <img className="IconWithHoverLabel__img" src={imgSrc} alt={imgAlt} />
      <figcaption className="IconWithHoverLabel__label">
        {label}
      </figcaption>
    </figure>
  );
};

export default IconWithHoverLabel;
