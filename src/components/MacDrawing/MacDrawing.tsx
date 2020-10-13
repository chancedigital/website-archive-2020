import * as React from 'react';
import cx from 'classnames';
import SVG, { SVGProps } from '@components/SVG';
import SRT from '@components/SRT';
import { Element } from '@lib/types';
import { drawing } from './drawing';
import { useLayoutEffect } from '@lib/hooks';
import './MacDrawing.scss';

export interface MacDrawingProps extends Element<'section'> {}

export const MacDrawing: React.FC<MacDrawingProps> = ({
  className,
  ...props
}) => {
  const [drawingStarted, setStartDrawing] = React.useState(false);
  useLayoutEffect(() => {
    setStartDrawing(true);
    return drawing();
  }, []);
  return (
    <figure
      className={cx(className, `MacDrawing`, {
        'MacDrawing--drawing': drawingStarted,
      })}
      {...props}
    >
      <div className="MacDrawing__container">
        <img
          className="MacDrawing__img"
          src="/img/imac.png"
          alt="iMac Illustration"
        />
        <MacOutline
          className="MacDrawing__svg draw"
          width="100%"
          height="600"
          viewBox="0 0 1000 600"
          aria-hidden
        />
      </div>
      <SRT component="figcaption">
        Animated iMac screen showing a website coming to life.
      </SRT>
    </figure>
  );
};

export const MacOutline: React.FC<SVGProps> = ({ className, ...props }) => {
  return (
    <SVG
      className={cx(`MacOutline`, className)}
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M 257.85024,158.16843 754.90716,35.953537 731.06035,405.57906 228.78695,448.8014 z" />
      <path d="m 259.83736,136.30872 c 0,0 -6.74232,0.97288 -11.61303,5.46502 -3.96751,3.659 -6.12527,9.40831 -7.01729,20.86596 l -36.5158,346.77284 c 0,0 -3.47753,13.41382 10.68151,14.15903 l 517.67468,-21.11485 c 0,0 18.38216,0.74522 19.87257,-19.62369 L 784.07068,11.384991 c 0,0 0.059,-13.07475 -23.20111,-7.2266959 L 259.83736,136.30872 z" />
      <path d="m 211.29271,522.89381 c 0,0 12.5259,6.63947 19.72988,5.64573 l 513.45197,-19.12737 c 0,0 18.87884,0.74557 21.61112,-18.87848 l 29.5596,-462.528221 c 0,0 1.49047,-10.184447 -13.54272,-21.4997553" />
      <path d="M 208.59466,472.34637 756.27723,432.02629" />
      <path d="m 591.36015,515.11602 11.15099,41.36862 c 0,0 8.62435,33.16197 -11.15099,33.16197 l -55.35924,4.26821 c 0,0 -9.65275,0.58387 -13.08781,0.58387 -1.35069,0 -5.16991,0.0265 -5.16991,0.0265 l -149.57016,-0.0347 c 0,0 -1.45726,0.12035 -1.52173,-0.0853 -0.14195,-0.4531 1.2173,-0.44973 1.2173,-0.44973 l 93.42473,-4.68143 c 0,0 23.85536,1.49042 23.85127,-27.57288 l -2.70885,-42.52741" />
      <path d="m 595.82547,514.94947 11.52956,43.3982 c 0,0 8.23944,32.78936 -11.52956,38.00586 h -58.52044 l -12.10971,0.99374 -16.58099,-0.61332 -128.7355,0.17849 c 0,0 -10.74373,-0.45795 -13.22753,-2.50727" />
      <path d="m 486.38703,90.292617 c -0.3846,2.126175 -1.9686,3.619643 -3.5379,3.335758 -1.5693,-0.283875 -2.5297,-2.237606 -2.1451,-4.363775 0.38461,-2.12617 1.96859,-3.619642 3.53789,-3.335762 1.56931,0.283879 2.52971,2.23761 2.14511,4.363779 z" />
      <path d="m 483.95449,571.8934 120.41968,0" />
      <path d="m 783.49986,166.74023 -9.12881,133.48624" />
      <path d="m 773.91008,309.26031 -1.81646,29.43591" />
    </SVG>
  );
};

export default MacDrawing;
