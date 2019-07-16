import React from 'react';
import SocialNav from '@components/SocialNav';
import { Element } from '@lib/types';
import CDLogo from '@components/CDLogo';
import './Footer.scss';

export interface FooterProps extends Element<'footer'> {}

const Footer: React.FC<FooterProps> = props => {
  return (
    <footer className="Footer" {...props}>
      <div className="Footer__container">
        <div className="Footer__main">
          <div className="Footer__content">
            <p className="Footer__credit">
              <a className="Footer__creditLink" href="http://chancedigital.io" rel="nofollow">
                Crafted with Care by{' '}
                <CDLogo alt noMargin size="small" className="Footer__cdLogo" />
              </a>{' '}
              © {new Date().getFullYear()}
            </p>
          </div>
        </div>
        <div className="Footer__nav">
          <SocialNav className="Footer__socialNav" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
