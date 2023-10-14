import React, {FC} from 'react';
import Image from 'next/image';

export const Log: FC<{width?: number; url: string}> = ({width, url}) => {
  return <Image width={width ?? 120} src={url} alt="log" />;
};
