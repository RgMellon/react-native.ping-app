import { RootSiblingParent } from 'react-native-root-siblings';
import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <RootSiblingParent>
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="login/index" options={{ headerShown: false }} />
        <Stack.Screen name="sign-up/index" options={{ headerShown: false }} />
      </Stack>
    </RootSiblingParent>
  );
}