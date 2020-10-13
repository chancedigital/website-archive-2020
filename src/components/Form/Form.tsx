import React, { useState, useRef } from 'react';
import { Formik } from 'formik';
import cx from 'classnames';
import Button from '@components/Button';
import { useAnimationEndListener } from '@lib/hooks';
import './Form.scss';

const Form: React.FC<any> = ({
  buttonText = 'Submit',
  buttonClassName,
  className,
  initialValues = {},
  onSubmit = () => {},
  onSubmitButtonClick,
  render,
  renderButton,
  schema,
  formProps = {},
  ...rest
}) => {
  const submitButton = useRef<HTMLButtonElement>(null);
  const [errors, setErrors] = useState(false);
  useAnimationEndListener(submitButton, () => void setErrors(false));

  return (
    <Formik
      validationSchema={schema}
      initialValues={initialValues}
      onSubmit={onSubmit}
      {...rest}
      render={(props) => {
        return (
          <form
            className={cx('Form', className)}
            onReset={props.handleReset}
            onSubmit={props.handleSubmit}
            {...formProps}
          >
            {render(props)}
            {renderButton ? (
              renderButton({
                errors,
                className: 'Form__button',
              })
            ) : (
              <Button
                ref={submitButton}
                htmlType="submit"
                className={cx('Form__button', buttonClassName)}
                wobble={errors}
                onClick={(e) => {
                  if (!props.isValid !== errors) {
                    setErrors(!props.isValid);
                  }
                  onSubmitButtonClick && onSubmitButtonClick();
                }}
              >
                {buttonText}
              </Button>
            )}
          </form>
        );
      }}
    />
  );
};

export default Form;
