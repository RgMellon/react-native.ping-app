import { Stack } from 'expo-router';

export default function MainLayout() {
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="dashboard/index" options={{ title: 'Dashboard' }} />
      <Stack.Screen name="pending/index"  options={{ title: 'Pending' }} />
    </Stack>
  );
}