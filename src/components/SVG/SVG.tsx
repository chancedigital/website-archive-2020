import React from 'react';

export interface SVGProps extends React.SVGProps<SVGSVGElement> {}

const SVG: React.FC<SVGProps> = ({
  children,
  viewBox = '0 0 32 32',
  className,
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      className={className}
      {...props}
    >
      {children}
    </svg>
  );
};

export default SVG;
