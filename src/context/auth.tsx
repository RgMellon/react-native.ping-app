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

interface AuthContextData {
  loading: boolean;
  data: AuthState,
  signIn(credentials: LoginUserRequestDto): Promise<void>;
}

interface AuthState {
  access_token: string;
  user: {
    id: string,
	  email  : string,
	  name : string,
	  token_notification?: string,
  }
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
      try {
        const [token, user] = await AsyncStorage.multiGet([
          "@Ping:token",
          "@Ping:user"
        ]);

        if (token[1] && user[1]) {
          api.defaults.headers.authorization = `Bearer ${token[1]}`;
          setData({ access_token: token[1], user: JSON.parse(user[1]) });
        }
      } catch (error) {
        console.error('Failed to retrieve token:', error);
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, []);

  useEffect(() => {
    if (!loading) {
      if (!data?.access_token) {
        router.replace("/auth/login"); 
      } else {
        router.replace("/main/pending");
      }
    }
  }, [loading, data?.access_token, router]);

  const signIn = useCallback(async ({ email, password }: LoginUserRequestDto) => {
    const response = await loginUserService({email, password});
    const { access_token, user } = response;

    await AsyncStorage.multiSet([
      ["@Ping:token", access_token],
      ["@Ping:user", JSON.stringify(user)],
    ]);

    api.defaults.headers.authorization = `Bearer ${access_token}`;

    setData({ access_token, user });
  }, []);



  return (
    <AuthContext.Provider value={{ loading, signIn, data }}>
      {children}
    </AuthContext.Provider>
  );
};
