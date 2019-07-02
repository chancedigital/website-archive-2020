import React from 'react';
import PageHeader from '@components/PageHeader';
import Layout from '@components/Layout';
import SEO from '@components/SEO';
import './Error404.scss';

const Error404: React.FC<{ data: any }> = () => {
  return (
    <Layout className="Error404">
      <SEO title="404: Danger!" />
      <PageHeader
        buttonHref="/"
        buttonText="Go Back Home"
        className="Error404__pageHeader"
        fullHeight={true}
        title="404: Danger!"
        innerContent="You can clearly predict the future, as you've landed on a page that hasn't yet been created. Well done."
      />
    </Layout>
  );
};

export default Error404;
