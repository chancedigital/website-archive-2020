import React from 'react';
import { graphql } from 'gatsby';
import cx from 'classnames';
import Layout from '@components/Layout';
import Capabilities from '@src/components/Capabilities';
import Tools from '@src/components/Tools';
import PageHeader from '@components/PageHeader';
import MacDrawing from '@components/MacDrawing';
import CTABlock from '@components/CTABlock';
import SEO from '@components/SEO';
import './Homepage.scss';

const Homepage: React.FC<{ data: any }> = () => {
  return (
    <Layout className="Homepage">
      <SEO title="Home" />
      <PageHeader
        buttonOnClick={() => void null}
        buttonText="Get In Touch"
        className="Homepage__pageHeader"
        title="Modern development for the modern web"
        innerContent="We create high-impact websites and apps that drive user engagement and leave a lasting impression for your audience."
        renderImage={({ className }) => {
          return <MacDrawing className={cx(`Homepage__drawing`, className)} />;
        }}
      />
      <Capabilities />
      <Tools />
      <CTABlock />
    </Layout>
  );
};

export default Homepage;
