import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import { useStaticQuery, StaticQuery, graphql } from 'gatsby';
import Header from '@components/Header';
import Footer from '@components/Footer';
import { SkipNavLink, SkipNavContent } from '@components/SkipNav';
import { Element } from '@lib/types';
import { useScrollPosition, useScrollYPosition } from '@lib/hooks';
import './Layout.scss';

export interface LayoutProps extends Element<'div'> {}

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <div className={cx('Layout', className)}>
      <SkipNavLink className="skipnav" />
      <Header siteTitle={data.site.siteMetadata.title} />
      <main className="Layout__contentWrapper">
        <SkipNavContent />
        <div className="Layout__contentArea">{children}</div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
