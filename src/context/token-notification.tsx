import {
  createContext,
  useContext,
  useState,
} from "react";

interface TokenPushContextData {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>
  
}

type Props = {
  children: React.ReactNode;
};


const NotificationTokenContext = createContext<TokenPushContextData>({} as TokenPushContextData);

export function useNotificationToken(): TokenPushContextData {
  const context = useContext(NotificationTokenContext);

  if (!context) {
    throw Error("useModalPush must be used within an ModalPushProvider");
  } 
  
  return context;
}

export function NotificationTokenProvider({ children }: Props) {
  
  const [token, setToken] = useState("");
  
  

  return (
    <NotificationTokenContext.Provider value={{ token, setToken }}>
      {children}
    </NotificationTokenContext.Provider>
  );
};
