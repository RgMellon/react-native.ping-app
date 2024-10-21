import AsyncStorage from "@react-native-community/async-storage";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { LoginUserRequestDto } from "../dtos/location/login.user.request.dto";
import api from "../api";
import { loginUserService } from "../services/login.user.service";
import { useRouter } from "expo-router";

interface AuthContextData {
  loading: boolean;
  data: AuthState,
  signIn(credentials: LoginUserRequestDto): Promise<void>;
}

interface AuthState {
  access_token: string;
}

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();

  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth(): Promise<void> {
      const [token] = await AsyncStorage.multiGet([
        "@Ping:token",
      ]);

      if (token[1]) {
        api.defaults.headers.authorization = `Bearer ${token[1]}`;
        setData({access_token: token[1]});
      }

      setLoading(false);
    }

    checkAuth();
  }, []);


  useEffect(() => {
    if (!loading && !data?.access_token) {
      router.replace("/auth/login");  
    } else {
      router.replace("/main/dashboard");  
    }
  }, []);

  const signIn = useCallback(async ({ email, password }: LoginUserRequestDto) => {
    const response = await loginUserService({email, password});
    const { access_token } = response;

    await AsyncStorage.multiSet([
      ["@Ping:token", access_token],
    ]);

    api.defaults.headers.authorization = `Bearer ${access_token}`;

    setData({ access_token});
  }, []);



  return (
    <AuthContext.Provider value={{ loading, signIn, data }}>
      {children}
    </AuthContext.Provider>
  );
};
