import { AppProvider } from '@/src/context';
import { useAuth } from '@/src/hooks/auth';
import { Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';

export default function RootLayout() {
  const {loading } = useAuth()

  
  if (loading) {
    return (
      <RootSiblingParent>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#f5d21f" />  
          </View>
        </RootSiblingParent>
    );
  }

  
  return <AppProvider>
        <Stack  screenOptions={{headerShown: false}}/> 
      </AppProvider>
}