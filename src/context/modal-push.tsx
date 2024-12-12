import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface ModalPushContextData {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>
  setModalInfo: React.Dispatch<React.SetStateAction<ModalInfoProps>>
  modalInfo: ModalInfoProps;
}

type Props = {
  children: React.ReactNode;
};

type ModalInfoProps = {
  price: string;
  name: string
}

const ModalPushContext = createContext<ModalPushContextData>({} as ModalPushContextData);

export function useModalPush(): ModalPushContextData {
  const context = useContext(ModalPushContext);

  if (!context) {
    throw Error("useModalPush must be used within an ModalPushProvider");
  } 
  
  return context;
}

export function ModalPushProvider({ children }: Props) {
  
  const [show, setShow] = useState(false);
  const [modalInfo, setModalInfo] = useState({} as ModalInfoProps)
  

  return (
    <ModalPushContext.Provider value={{ setShow, show, modalInfo, setModalInfo }}>
      {children}
    </ModalPushContext.Provider>
  );
};
