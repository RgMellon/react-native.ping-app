import { useModalPush } from '@/src/context/modal-push';
import React from 'react';
import { Modal, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity, View, Text } from 'react-native';


type Props = {
    isVisible: boolean | null;
    onClose: () => void;
    lat?: number;
    long?: number;
    handleSendAction: (description?: string, price?: string) => void;
};


export const ModalNewPing = ({ isVisible, onClose}: Props) => {
  const {setShow, modalInfo} = useModalPush()

  return (
    <Modal statusBarTranslucent={false} transparent={true} visible={isVisible!!} animationType="slide">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
          <TouchableOpacity className='justify-center items-center' onPress={onClose}>
            <View className='w-[100%] h-[500px] bg-white opacity-70 rounded-md p-11 justify-center items-center' />
          </TouchableOpacity>

          <View className='w-[100%] h-[40%] bg-white rounded-md pt-20 p-[20px]'>

            <View className='mt-4 justify-center items-center'>
              <Text className={"font-bold text-2xl"}>Nova Solicitação</Text>

              <Text className={"font-medium text-xl mt-4"}>{modalInfo.name}</Text>

              <View className='flex-row items-center justify-center mt-6'>
                <View className='rounded-full p-[8px] bg-ping-gray justify-center items-center'>
                    <Text className='text-sm font-bold'>R$</Text>
                </View>  
                
                <Text className={"text-lg ml-[8px]"}>{`R$ ${Number(modalInfo.price).toFixed(2).toLocaleString().replace('.', ',')}`}</Text>
              </View>
              
            </View>


           <View className='flex-row justify-between'>
              <TouchableOpacity 
                    activeOpacity={0.4} 
                    className="bg-ping-gray self-end rounded-2xl mt-10 h-12 w-[40%] justify-center items-center" 
                    onPress={() => { setShow(false)}}>
                      <Text className='color-black font-bold'>Recusar</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    activeOpacity={0.4} 
                    className="bg-ping-yellow self-end rounded-2xl mt-10 h-12 w-[40%] justify-center items-center" 
                    onPress={() => { setShow(false)}}>
                      <Text className='color-black font-bold'>Aceitar</Text>
                </TouchableOpacity>
           </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
};