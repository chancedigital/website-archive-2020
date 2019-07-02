import React from 'react';
import cx from 'classnames';

import Layout from '@components/Layout';
import Capabilities from '@components/Capabilities';
import Tools from '@components/Tools';
import PageHeader from '@components/PageHeader';
import MacDrawing from '@components/MacDrawing';
import CTABlock from '@components/CTABlock';
import SEO from '@components/SEO';
import './Homepage.scss';

const Homepage: React.FC<{ data: any }> = () => {
  return (
    <Layout className="Homepage">
      <SEO
        title="Modern Development for the Modern Web"
        description="We create high-impact websites and apps that drive user engagement and leave a lasting impression for your audience."
      />
      <PageHeader
        buttonHref="/contact"
        buttonText="Get In Touch"
        className="Homepage__pageHeader"
        fullHeight={true}
        title="Modern development for the modern web"
        innerContent="We create high-impact websites and apps that drive user engagement and leave a lasting impression for your audience."
        renderImage={({ className }) => {
          return <MacDrawing className={cx(`Homepage__drawing`, className)} />;
        }}
      />
      <Capabilities id="capes" />
      <Tools id="tools" />
      <CTABlock />
    </Layout>
  );
};

export default Homepage;
