import { AppProvider } from '@/src/context';
import { useAuth } from '@/src/context/auth';
import { usePushNotifications } from '@/src/hooks/usePushNotification';
import { Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';


function MainApp() {
  const { loading } = useAuth();
  const { expoPushToken, notification } = usePushNotifications();


  if (loading) {
    return (
      <RootSiblingParent>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#f5d21f" />
        </View>
      </RootSiblingParent>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  return <AppProvider>
          <MainApp/>
      </AppProvider>
}