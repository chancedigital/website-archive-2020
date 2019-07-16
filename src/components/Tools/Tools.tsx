import React from 'react';
import cx from 'classnames';
import IconWithHoverLabel from '@components/IconWithHoverLabel';
import { useId } from '@lib/hooks';
import { Element } from '@lib/types';
import './Tools.scss';

const ICONS = [
  {
    label: `JavaScript`,
    imgSrc: `/img/logo-javascript.svg`,
  },
  {
    label: `React`,
    imgSrc: `/img/logo-react.svg`,
  },
  {
    label: `Vue JS`,
    imgSrc: `/img/logo-vue.svg`,
  },
  {
    label: `Next JS`,
    imgSrc: `/img/logo-next-js.svg`,
  },
  {
    label: `Webpack`,
    imgSrc: `/img/logo-webpack.svg`,
  },
  {
    label: `Sass`,
    imgSrc: `/img/logo-sass.svg`,
  },
  {
    label: `WordPress`,
    imgSrc: `/img/logo-wordpress.svg`,
  },
  {
    label: `Laravel`,
    imgSrc: `/img/logo-laravel.svg`,
  },
  {
    label: `PHP`,
    imgSrc: `/img/logo-php.svg`,
  },
];

export interface ToolsProps extends Element<'section'> {}

const Tools: React.FC<ToolsProps> = ({ className, ...props }) => {
  const titleId = useId('tools');
  return (
    <section
      aria-labelledby={titleId}
      className={cx('Tools', className)}
      {...props}
    >
      <div className="Tools__container">
        <h2 id={titleId} className="Tools__heading">
          Tools of the Trade
        </h2>
        <ul className="Tools__list">
          {ICONS.map(icon => (
            <li key={icon.label} className="Tools__item">
              <IconWithHoverLabel
                {...icon}
                imgAlt={`${icon.label} logo`}
                tabIndex={0}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Tools;
