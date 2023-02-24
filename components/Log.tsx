import React, {FC} from 'react';

export const Log: FC<{width?: number; url: string}> = ({width, url}) => {
  return <img width={width ?? 120} src={url} alt="log" />;
};
