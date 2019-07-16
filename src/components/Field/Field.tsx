import React from 'react';
import cx from 'classnames';
import { Field as FormikField } from 'formik';
import SRT from '@components/SRT';
import { useId } from '@lib/hooks';
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
  const errorId = useId('error');
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
        aria-invalid={errors && touched}
        aria-describedby={errors && touched ? errorId : undefined}
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
      {errors && touched && (
        <div id={errorId} className="Field__errors">
          {errors}
        </div>
      )}
    </label>
  );
};

export default Field;
