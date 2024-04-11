import classNames from 'classnames';
import {ComponentProps} from 'react';

const ErrorBox = ({className, ...props}: ComponentProps<'div'>) => {
  return <div className={classNames('px-4 py-2 bg-red-200/75 rounded-lg', className)} {...props} />;
};

export default ErrorBox;
