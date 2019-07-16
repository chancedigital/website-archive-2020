import React from 'react';
import cx from 'classnames';
import PageHeader from '@components/PageHeader';
import Layout from '@components/Layout';
import SEO from '@components/SEO';
import './Thanks.scss';

const Thanks: React.FC<{ data: any; transitionStatus: any }> = ({
  transitionStatus,
}) => {
  return (
    <Layout className={cx('Thanks', transitionStatus)}>
      <SEO
        title="Thank You"
        description="We can't wait to see how we can help! We'll review and get back to you within one business day."
      />
      <PageHeader
        buttonHref="/"
        buttonText="Go Back Home"
        className="Thanks__pageHeader"
        fullHeight={true}
        title="Thanks a ton!"
        innerContent="We can't wait to see how we can help! We'll review and get back to you within one business day."
      />
    </Layout>
  );
};

export default Thanks;
