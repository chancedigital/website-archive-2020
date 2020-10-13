import React, { useState, useRef, useContext } from 'react';
import { Helmet } from 'react-helmet';
import cx from 'classnames';
import { useSpring, animated } from 'react-spring';
import { startCase, camelCase, upperFirst } from 'lodash';
// import { Link } from 'gatsby';
import SRT from '@components/SRT';
import SVG, { SVGProps } from '@components/SVG';
import { useMeasure, useMedia, usePrevious, useId } from '@lib/hooks';
import { A11yStateProps, A11yContext, a11yInitialState } from '@lib/providers';
import './A11yControls.scss';

const A11yIcon = ({ children, viewBox, ...props }: SVGProps) => {
  return (
    <SVG viewBox="0 0 1224 792" {...props}>
      <path d="M833.56,367.57A38.55,38.55,0,0,0,803.9,356l-134,7.46,73.73-84a45,45,0,0,0,9.45-42.16A38.28,38.28,0,0,0,736,213c-.28-.2-176.25-102.43-176.25-102.43a38.44,38.44,0,0,0-44.88,4.56l-86,76.67A38.42,38.42,0,1,0,480,249.18l65.17-58.13,53.88,31.29L504,330.64a196,196,0,0,0-102.77,50.8l49.66,49.66a126.29,126.29,0,0,1,178.4,178.39l49.66,49.66a196.49,196.49,0,0,0,33.36-221l51.86-2.89L751.54,590a38.42,38.42,0,0,0,35.18,41.42c1.06.09,2.11.13,3.16.13a38.44,38.44,0,0,0,38.26-35.31l16.19-198.68A38.49,38.49,0,0,0,833.56,367.57Z" />
      <path d="M762.38,203a64.32,64.32,0,1,0-64.32-64.32A64.31,64.31,0,0,0,762.38,203Z" />
      <path d="M535.79,650.93A126.29,126.29,0,0,1,431.26,453.69L381.07,403.5a195.57,195.57,0,0,0-41.79,121.08c0,108.53,88,196.51,196.51,196.51A195.57,195.57,0,0,0,656.87,679.3l-50.19-50.19A125.63,125.63,0,0,1,535.79,650.93Z" />
    </SVG>
  );
};

const CheckIcon = ({ children, viewBox, ...props }: SVGProps) => {
  return (
    <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
    </SVG>
  );
};

export interface A11yControlsProps {
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  // [key: string]: any;
}

export interface A11yControlsItemProps {
  id: keyof A11yStateProps;
  label: string;
}

const menuItems: A11yControlsItemProps[] = [
  {
    id: 'textSize',
    label: 'Text size',
  },
  {
    id: 'contrast',
    label: 'Contrast',
  },
  {
    id: 'saturation',
    label: 'Saturation',
  },
  {
    id: 'fonts',
    label: 'Fonts',
  },
];

export const A11yControls: React.FC<A11yControlsProps> = ({
  children,
  className,
  disabled = false,
  loading = false,
  onClick,
  ...rest
}) => {
  const menuId = `a11y-menu-${useId()}`;
  const a11yContext = useContext(A11yContext);
  const [isActive, toggle] = useState(false);
  const prevActiveState = usePrevious(isActive);
  const prefersReducedMotion = useMedia({ prefersReducedMotion: 'reduce' });
  const menuWrapper = useRef<HTMLDivElement>(null);
  const { height: viewHeight } = useMeasure(menuWrapper);
  const { height, transform } = useSpring<any>({
    from: {
      height: isActive ? 0 : viewHeight,
      transform: 'translate3d(0,-20px,0)',
    },
    to: {
      height: isActive ? viewHeight : 0,
      transform: `translate3d(0,${isActive ? 0 : `${-20}px`},0)`,
    },
  });

  // Menu style for animations
  let menuStyle = {};
  let menuHeight = height;
  // Active
  if (isActive && prevActiveState === isActive) menuHeight = 'auto';

  // Override for users who prefer reduced motion
  if (prefersReducedMotion) menuHeight = isActive ? 'auto' : 0;

  menuStyle = { height: menuHeight, overflow: 'hidden' };

  // Get click handler for menu items
  const getClickHandler = (key: keyof A11yStateProps) => {
    return () =>
      void a11yContext.dispatch({
        type: `toggle${upperFirst(camelCase(key))}`,
      });
  };

  // Get the formatted state label for each menu item
  const getStateLabel = (key: keyof A11yStateProps) => {
    const state = a11yContext[key];
    let label: string;
    if (typeof state === 'boolean') {
      label = state === false ? 'Default' : 'On';
    } else if (typeof state !== 'string') {
      label = (state as any).toString();
    } else {
      label = state;
    }
    switch (key) {
      case 'saturation':
        return state === true ? 'Desaturated' : startCase(label);
      case 'fonts':
        return state === true ? 'Reset' : startCase(label);
      default:
        return startCase(label);
    }
  };

  // Determine whether or not any a11y settings have been selected
  // to highlight the toggle button
  const a11ySettingsSelected = menuItems
    .map(({ id }) => a11yContext[id] === a11yInitialState[id])
    .some(state => state === false);

  return (
    <div className="A11yControls">
      <Helmet
        htmlAttributes={{
          class: cx({
            [`textSize--${a11yContext.textSize}`]: a11yContext.textSize,
            [`contrast--${a11yContext.contrast}`]: a11yContext.contrast,
            desaturate: a11yContext.saturation,
            noFonts: a11yContext.fonts,
          }),
        }}
      />
      <button
        type="button"
        aria-controls={menuId}
        aria-expanded={isActive}
        className={cx('A11yControls__toggle', {
          'A11yControls__toggle--active': a11ySettingsSelected,
        })}
        onClick={() => toggle(!isActive)}
      >
        <SRT>Toggle Accessibility Menu</SRT>
        <A11yIcon className="A11yControls__icon" />
        {a11ySettingsSelected ? (
          <div
            className="A11yControls__selectedMarker"
            aria-hidden
            role="presentation"
          >
            <CheckIcon className="A11yControls__selectedIcon" />
          </div>
        ) : null}
      </button>
      <animated.div
        id={menuId}
        style={menuStyle}
        className={cx('A11yControls__menuWrapper', {
          'A11yControls__menuWrapper--active': isActive,
        })}
      >
        <animated.div
          className="A11yControls__menuWrapperInner"
          style={!prefersReducedMotion ? { transform } : {}}
          ref={menuWrapper}
        >
          <ul className="A11yControls__menu">
            {menuItems.map(({ id, label }) => {
              return (
                <li key={id} className="A11yControls__menuItem">
                  <button
                    type="button"
                    aria-pressed={Boolean(a11yContext[id])}
                    onClick={getClickHandler(id)}
                    className={cx('A11yControls__menuButton', {
                      'A11yControls__menuButton--active': a11yContext[id],
                    })}
                    tabIndex={isActive ? 0 : -1}
                  >
                    {label}
                  </button>
                  <span className="A11yControls__menuState">
                    {getStateLabel(id)}
                  </span>
                </li>
              );
            })}
          </ul>
        </animated.div>
      </animated.div>
    </div>
  );
};

export default A11yControls;
