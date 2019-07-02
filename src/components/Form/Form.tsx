import React, { useState, useRef } from 'react';
import { Formik, Form as Frm } from 'formik';
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
  ...rest
}) => {
  const submitButton = useRef<HTMLButtonElement>(null);
  const [errors, setErrors] = useState(false);
  if (submitButton.current) {
    useAnimationEndListener(submitButton.current, () => void setErrors(false));
  }
  return (
    <Formik
      validationSchema={schema}
      initialValues={initialValues}
      onSubmit={onSubmit}
      {...rest}
      render={props => {
        return (
          <Frm className={cx('Form', className)}>
            {render(props)}
            {renderButton ? (
              renderButton({
                errors,
                className: 'Form__button',
              })
            ) : (
              <Button
                // ref={submitButton} // TODO: Fix ref if possible
                htmlType="submit"
                className={cx('Form__button', buttonClassName)}
                wobble={errors}
                onClick={e => {
                  if (!props.isValid !== errors) {
                    setErrors(!props.isValid);
                  }
                  onSubmitButtonClick && onSubmitButtonClick();
                }}
              >
                {buttonText}
              </Button>
            )}
          </Frm>
        );
      }}
    />
  );
};

export default Form;
