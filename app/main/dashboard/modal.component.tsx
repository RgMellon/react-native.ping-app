import { PingInput } from '@/src/components/PingInput';
import { useFormInput } from '@/src/hooks/useFormInput';
import React from 'react';
import { Modal, KeyboardAvoidingView, ScrollView, Platform, TextInput, TouchableOpacity, View, Text } from 'react-native';

type Props = {
    isVisible: boolean;
    onClose: () => void;
    handleSendAction: (description?: string, price?: string) => void;
};


export const ModalComponent = ({ isVisible, onClose, handleSendAction}: Props) => {
    const inputDescription = useFormInput();
    const inputPrice = useFormInput();

  return (
    <Modal statusBarTranslucent={false} transparent={true} visible={isVisible} animationType="slide">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
          <TouchableOpacity className='justify-center items-center' onPress={onClose}>
            <View className='w-[100%] h-[300px] bg-slate-300 opacity-40 rounded-md p-11 justify-center items-center' />
          </TouchableOpacity>

          <View className='w-[100%] h-[60%] bg-white rounded-md pt-20 items-center p-[30px]'>

            <PingInput placeholder='Qual item você deseja?' {...inputDescription} />
            <PingInput placeholder='Qual valor acha justo?'  {...inputPrice} keyboardType='numeric'  />
            

            <TouchableOpacity activeOpacity={0.9} className="bg-ping-yellow rounded-xl mt-10 h-12 w-full justify-center items-center" onPress={() => {handleSendAction(inputDescription.value, inputPrice.value)}}>
              <Text className='color-black font-bold'>Confirmar</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
};