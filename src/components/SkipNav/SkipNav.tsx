import React from 'react';
import cx from 'classnames';
import './SkipNav.scss';

const id = 'skip-nav';

export interface SkipNavProps {
  children?: string | JSX.Element;
}

let SkipNavLink: React.FC<SkipNavProps & JSX.IntrinsicElements['a']> = ({
  children = 'Skip to main content',
  className,
  ...props
}) => (
  <a className={cx('SkipNavLink', className)} {...props} href={`#${id}`}>
    {children}
  </a>
);

let SkipNavContent: React.FC<SkipNavProps> &
  JSX.IntrinsicElements['div'] = props => <div {...props} id={id} />;

export { SkipNavLink, SkipNavContent };
