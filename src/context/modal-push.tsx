import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { LoginUserRequestDto } from "../dtos/login.user.request.dto";
import api from "../api";
import { loginUserService } from "../services/login.user.service";
import { useRouter } from "expo-router";

interface ModalPushContextData {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>
}

type Props = {
  children: React.ReactNode;
};

const ModalPushContext = createContext<ModalPushContextData>({} as ModalPushContextData);

export function useModalPush(): ModalPushContextData {
  const context = useContext(ModalPushContext);
  if (!context) {
    throw Error("useModalPush must be used within an ModalPushProvider");
  }
  return context;
}

export function ModalPushProvider({ children }: Props) {
  const router = useRouter();

  const [show, setShow] = useState(false);

  return (
    <ModalPushContext.Provider value={{ setShow, show }}>
      {children}
    </ModalPushContext.Provider>
  );
};
