import React, {FC, ReactNode} from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
const queryClient = new QueryClient();

export const TestWrapper: FC<{children: ReactNode}> = ({children}) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
