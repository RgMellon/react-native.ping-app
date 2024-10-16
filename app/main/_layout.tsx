import { Stack } from 'expo-router';

export default function MainLayout() {
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="dashboard/index" options={{ title: 'Dashboard' }} />
      {/* Adicione outras telas do app principal conforme necessário */}
    </Stack>
  );
}