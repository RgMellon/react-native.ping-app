import { Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // null = carregando
  const router = useRouter();

  
  useEffect(() => {
    // Aqui você normalmente verificaria o estado de autenticação,
    // por exemplo, chamando uma API ou verificando o token no AsyncStorage.
    const checkAuthStatus = async () => {
      // Simulando um atraso para checar o estado de autenticação
      setTimeout(() => {
        const userIsLoggedIn = true; // Altere para true para simular um usuário autenticado
        setIsAuthenticated(userIsLoggedIn);
      }, 1000); // 1 segundo de atraso (simulando uma chamada de API)
    };

    checkAuthStatus();
  }, []);

  useEffect(() => {
    
    if (isAuthenticated === false) {
      router.replace("/auth/login"); 
    } else if (isAuthenticated === true) {
      router.replace("/main/dashboard"); 
    }
  }, [isAuthenticated]);

  
  if (isAuthenticated === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  
  return <Stack  screenOptions={{headerShown: false}}/>;
}