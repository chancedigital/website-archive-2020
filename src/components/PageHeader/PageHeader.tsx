import React from 'react';
import cx from 'classnames';
import Button from '@components/Button';
import { Element } from '@lib/types';
import './PageHeader.scss';

export interface PageHeaderProps extends Element<'section'> {
  buttonHref?: string;
  buttonOnClick?: (
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  buttonText?: string;
  innerContent: string;
  renderImage?: ({  }: any) => any;
  title: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  buttonHref,
  buttonOnClick,
  buttonText,
  className,
  innerContent,
  renderImage,
  title,
  ...props
}) => {
  return (
    <header className={cx(`PageHeader`, className)} {...props}>
      <div className="PageHeader__container">
        <div className="PageHeader__content">
          <div>
            <h1 className="PageHeader__title">{title}</h1>
            <p className="PageHeader__subtitle">{innerContent}</p>
            <Button
              className="PageHeader__cta"
              href={buttonHref}
              htmlType="button"
              onClick={buttonOnClick}
            >
              {buttonText}
            </Button>
          </div>
          {renderImage ? renderImage({ className: 'PageHeader__image' }) : null}
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
