import React, { ReactNode } from "react";

import { AuthProvider } from "context/auth-context";

import { QueryClient, QueryClientProvider } from "react-query";
import { store } from "store";
import { Provider } from "react-redux";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={new QueryClient()}>
        <AuthProvider>{children}</AuthProvider>
      </QueryClientProvider>
    </Provider>
  );
};
