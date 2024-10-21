import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

export type Props = {
    onPress: () => void;
};


export const RequestButton = ({ onPress }: Props) => {
  return (
    <View className='relative'>
      <TouchableOpacity 
        activeOpacity={0.9} 
        className="bg-ping-yellow absolute rounded-xl bottom-10 left-10 right-0 h-12 w-[80%] justify-center items-center"
        onPress={onPress}
      >
        <Text className='color-black font-bold'>Solicitar</Text>
      </TouchableOpacity>
    </View>
  );
};