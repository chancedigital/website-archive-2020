import React from 'react';
import cx from 'classnames';
import SRT from '@components/SRT';
import { Field as FormikField } from 'formik';
import './Field.scss';

const Field: React.FC<any> = ({
  className,
  component,
  children,
  label,
  showLabel = false,
  errors,
  touched,
  placeholder,
  spellCheck,
  required,
  type,
  ...rest
}) => {
  return (
    <label className={cx(className, 'Field')}>
      <span
        className={cx({
          Field__label: showLabel,
          'util-visually-hidden': !showLabel,
        })}
      >
        {label}
        {required ? (
          <span className="util-required">
            <span aria-hidden> *</span>
            <SRT>(required field)</SRT>
          </span>
        ) : null}
      </span>
      <FormikField
        className={cx('Field__field', {
          [`Field__field--${type}`]: type,
          [`Field__field--${component}`]: component,
          'Field__field--error': errors && touched,
        })}
        component={component}
        placeholder={
          !showLabel ? (required ? `${label} *` : label) : placeholder
        }
        type={type}
        spellCheck={spellCheck || false}
        {...rest}
      >
        {children}
      </FormikField>
      {errors && touched && <div className="Field__errors">{errors}</div>}
    </label>
  );
};

export default Field;
