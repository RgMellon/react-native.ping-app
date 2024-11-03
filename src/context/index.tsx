import React from "react";
import { AuthProvider } from "./auth";
import { ModalPushProvider } from "./modal-push";

type AppProviderProps = {
  children: React.ReactNode;
};

function AppProvider({ children }: AppProviderProps) {
  return <ModalPushProvider>
          <AuthProvider>{children}</AuthProvider>
      </ModalPushProvider>
}

export { AppProvider };