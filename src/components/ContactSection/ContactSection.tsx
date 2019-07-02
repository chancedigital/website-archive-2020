import React from 'react';
import cx from 'classnames';
import * as Yup from 'yup';
import { Element } from '@lib/types';
import Form from '@components/Form';
import Field from '@components/Field';
import './ContactSection.scss';

const FORM_SCHEMA = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short')
    .max(50, 'Too Long!')
    .required('First Name is required'),
  lastName: Yup.string()
    .min(2, 'Too Short')
    .max(50, 'Too Long!')
    .required('Last Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  comments: Yup.string()
    .min(20, 'Too Short')
    .max(5000, 'Too Long!')
    .required('Context is required'),
});

export interface ContactSectionProps extends Element<'section'> {}

const ContactSection: React.FC<ContactSectionProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <section className={cx(`ContactSection`, className)} {...props}>
      <div className="ContactSection__container">
        <Form
          buttonText="Submit"
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            comments: '',
          }}
          schema={FORM_SCHEMA}
          render={(props: any) => {
            return (
              <React.Fragment>
                <Field
                  className="Form__input"
                  type="text"
                  name="firstName"
                  label="First Name"
                  required
                  showLabel
                  errors={props.errors.firstName}
                  touched={props.touched.firstName}
                />
                <Field
                  className="Form__input"
                  type="text"
                  name="lastName"
                  label="Last Name"
                  required
                  showLabel
                  errors={props.errors.lastName}
                  touched={props.touched.lastName}
                />
                <Field
                  className="Form__input"
                  type="email"
                  name="email"
                  label="Your Email"
                  required
                  showLabel
                  errors={props.errors.email}
                  touched={props.touched.email}
                />
                <Field
                  component="textarea"
                  className="Form__textArea"
                  name="comments"
                  label="How can I help you?"
                  required
                  showLabel
                  errors={props.errors.comments}
                  touched={props.touched.comments}
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
