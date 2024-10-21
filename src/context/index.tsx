import React from "react";
import { AuthProvider } from "../hooks/auth";

type AppProviderProps = {
  children: React.ReactNode;
};

function AppProvider({ children }: AppProviderProps) {
  return <AuthProvider>{children}</AuthProvider>;
}

export { AppProvider };