import { PingMap } from "@/src/components/PingMap";
import React from "react";
import { Image, Text, View } from "react-native";
import { Marker, Polyline } from "react-native-maps";

import quiosque from '../../../src/assets/images/quiosque.png'

export default function Pending() {
  const vendedorLocation = { latitude: -23.55052, longitude: -46.633308 }; 
  const compradorLocation = { latitude: -23.551123, longitude: -46.634567 }; 

  return (
    <View className="flex-1">
      <PingMap
        latitude={vendedorLocation.latitude}
        longitude={vendedorLocation.longitude}
      >
        
        <Marker coordinate={vendedorLocation} title="Vendedor" />
        <Marker coordinate={compradorLocation} title="Comprador" />

        
        <Polyline
          coordinates={[vendedorLocation, compradorLocation]}
          strokeColor="#f5d21f" 
          strokeWidth={3} 
        />
       
      </PingMap>

        <View className="h-[350] rounded-2xl bg-white p-[20px]">
            <View className="items-center mt-10 justify-center">
                <Text className="text-center font-semibold">Tempo estimado 10 minutos</Text>
                <Text className="text-center">Renan esta trazendo seu pedido até você agora</Text>
            </View>

            <View  className="w-full h-[0.2px] mt-6 mb-6 bg-slate-300"/>

            <View className="flex-row items-center">
                <View className="w-12 h-12 p-1 border  border-ping-gray rounded-full">
                    <Image className="w-full h-full" source={quiosque} />
                </View>

                <View className="ml-2">
                    <View>
                        <Text className="text-zinc-400 text-sm">Entregador</Text>
                        <Text className="text-black text-md font-semibold">Renan Melo</Text>
                    </View>
                </View>
            </View>

            <View  className="w-full h-[0.3px] mt-6 mb-6 bg-slate-300"/>

            <View className="flex-row justify-between p-2">
                <Text>Valor</Text>
                <View>
                    <Text className="font-bold">20 R$</Text>
                    <View className="w-[40px] h-[2px] bg-ping-yellow">

                    </View>
                </View>
            </View>
        </View>

    </View>
  );
}


