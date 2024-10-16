import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="login/index" options={{ headerShown: false }} />
      <Stack.Screen name="signin/index" options={{ headerShown: false }} />
    </Stack>
  );
}