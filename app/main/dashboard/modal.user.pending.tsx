import { PingMap } from '@/src/components/PingMap';
import { useModalPush } from '@/src/context/modal-push';
import React, { useRef } from 'react';
import { Modal, KeyboardAvoidingView, Platform, TouchableOpacity, View, Text } from 'react-native';
import LottieView from 'lottie-react-native';

type Props = {
    isVisible: boolean;
    onClose: () => void;
    handleSendAction: (description?: string, price?: string) => void;
};


export const ModalUserPending = ({ isVisible, onClose}: Props) => {
  const animation = useRef<LottieView>(null);
  
  return (
    <Modal statusBarTranslucent={false} transparent={true} visible={isVisible} animationType="slide">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      > 
      <TouchableOpacity className='justify-center items-center' onPress={onClose}>
        <View className='w-[100%] h-[300px] bg-white opacity-70 rounded-md p-11 justify-center items-center' />
      </TouchableOpacity>

      <View className='w-[100%] h-[70%] items-center bg-white rounded-md relative'>
        <View className='w-[200px] h-[200px] mt-10 rounded-full bg-slate-50 justify-center items-center'>
          <LottieView
            autoPlay
            ref={animation}
            style={{
              width: '80%',
              height: '80%',
              
            }}
            
            source={require('../../../src/assets/wave.json')}
          />
        </View>

        <View className='w-full h-[100%] p-[20px]'>
        
        <Text className='mt-5 text-center text-lg'> Aguarde... </Text>
          <Text className='mt-1 text-center text-md'> Estamos buscando por um vendedor perto de você </Text>

            <TouchableOpacity 
                    activeOpacity={0.4} 
                    className="bg-ping-yellow rounded-2xl mt-10 h-12 w-[100%] justify-center items-center" 
                    onPress={onClose}>
                      <Text className='color-white font-bold'>Cancelar</Text>
            </TouchableOpacity>
        </View>
      </View>

      
      </KeyboardAvoidingView>
    </Modal>
  );
};