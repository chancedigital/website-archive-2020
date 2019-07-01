import React from 'react';
import cx from 'classnames';
import { Element } from '@lib/types';
import './TextCard.scss';

export interface TextCardProps extends Element<'section'> {
  heading: string;
  content: string;
}

export const TextCard: React.FC<TextCardProps> = ({
  className,
  content,
  heading,
  ...props
}) => {
  return (
    <div className={cx('TextCard', className)} {...props}>
      <h3 className="TextCard__heading">{heading}</h3>
      <p className="TextCard__content">{content}</p>
    </div>
  );
};

export default TextCard;
