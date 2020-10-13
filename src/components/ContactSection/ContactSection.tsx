import React from 'react';
import cx from 'classnames';
import { navigate } from 'gatsby';
import * as Yup from 'yup';
import fetch from 'unfetch';
import { Element } from '@lib/types';
import Form from '@components/Form';
import Field from '@components/Field';
import './ContactSection.scss';

const FORM_SCHEMA = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  comments: Yup.string()
    .min(10, 'Message is too short. Try to give us some more context!')
    .max(
      2500,
      'Message is too long. Try giving us an overview; we will reach out for more context if needed!'
    )
    .required('Message is required'),
});

export interface ContactSectionProps extends Element<'section'> {}

function encode(data: any) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
}

const ContactSection: React.FC<ContactSectionProps> = ({
  children,
  className,
  ...props
}) => {
  const handleSubmit = (data: any) => {
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': 'contact',
        ...data,
      }),
    })
      .then(() => {
        navigate('/thanks');
      })
      .catch(console.error); // TODO: Set errors
  };

  return (
    <section
      aria-label="Contact form"
      className={cx(`ContactSection`, className)}
      {...props}
    >
      <div className="ContactSection__container">
        <Form
          buttonText="Submit"
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            comments: '',
          }}
          onSubmit={handleSubmit}
          schema={FORM_SCHEMA}
          formProps={{
            name: 'contact',
            method: 'post',
            'data-netlify': 'true',
            'data-netlify-honeypot': 'bot-field',
          }}
          render={(innerProps: any) => {
            return (
              <React.Fragment>
                <Field
                  className="Form__input"
                  type="text"
                  name="firstName"
                  label="First Name"
                  required
                  showLabel
                  errors={innerProps.errors.firstName}
                  touched={innerProps.touched.firstName}
                />
                <Field
                  className="Form__input"
                  type="text"
                  name="lastName"
                  label="Last Name"
                  required
                  showLabel
                  errors={innerProps.errors.lastName}
                  touched={innerProps.touched.lastName}
                />
                <Field
                  className="Form__input"
                  type="email"
                  name="email"
                  label="Your Email"
                  required
                  showLabel
                  errors={innerProps.errors.email}
                  touched={innerProps.touched.email}
                />
                <Field
                  component="textarea"
                  className="Form__textArea"
                  name="comments"
                  label="How can I help you?"
                  required
                  showLabel
                  errors={innerProps.errors.comments}
                  touched={innerProps.touched.comments}
                  spellCheck={true}
                  rows={10}
                />
              </React.Fragment>
            );
          }}
        />
      </div>
    </section>
  );
};

export default ContactSection;
