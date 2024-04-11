import classNames from 'classnames';
import {ComponentProps} from 'react';

const Box = ({className, ...props}: ComponentProps<'div'>) => {
  return (
    <div
      className={classNames(
        'flex flex-col items-start justify-center rounded-2xl border-2 overflow-hidden shadow-md',
        className
      )}
      {...props}
    />
  );
};

export default Box;
