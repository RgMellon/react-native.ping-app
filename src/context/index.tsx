import React from "react";
import { AuthProvider } from "./auth";
import { ModalPushProvider } from "./modal-push";
import { NotificationTokenProvider } from "./token-notification";

type AppProviderProps = {
  children: React.ReactNode;
};

function AppProvider({ children }: AppProviderProps) {
  return <NotificationTokenProvider>
          <ModalPushProvider>
            <AuthProvider>{children}</AuthProvider>
          </ModalPushProvider>
        </NotificationTokenProvider>
}

export { AppProvider };