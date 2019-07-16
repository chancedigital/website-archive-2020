import React from 'react';
import cx from 'classnames';

import PageHeader from '@components/PageHeader';
import Layout from '@components/Layout';
import SEO from '@components/SEO';
import ContactSection from '@components/ContactSection';
import './ContactPage.scss';

const ContactPage: React.FC<{ data: any; transitionStatus: any }> = ({
  transitionStatus,
}) => {
  return (
    <Layout className={cx('ContactPage', transitionStatus)}>
      <SEO
        title="Get In Touch"
        description="You're one step away from reinventing your business on the web. What are you waiting for? Contact us today."
      />
      <PageHeader
        className="ContactPage__pageHeader"
        title="Let’s Talk"
        innerContent="I can’t wait to hear what problems you’re looking to solve and discuss creative solutions to push your business forward. Fill out the form below and I’ll get back to you within the next business day."
        buttonText="Get Started Now"
        buttonHref="#contact"
      />
      <ContactSection id="contact" />
    </Layout>
  );
};

export default ContactPage;
