import React from 'react';

const style = {
  position: 'absolute' as 'absolute',
  height: '1px',
  width: '1px',
  padding: 0,
  border: 0,
  clip: 'rect(0 0 0 0)',
  margin: '-1px',
  overflow: 'hidden',
};

export interface SRTProps {
  component?: any;
}

export type TSRTProps = JSX.IntrinsicElements['span'] &
  JSX.IntrinsicElements['div'] &
  SRTProps;

const SRT: React.FC<TSRTProps> = ({ component: Comp = 'span', ...props }) => {
  return <Comp style={style} {...props} />;
};

export default SRT;
