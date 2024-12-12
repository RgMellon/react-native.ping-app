import { Image, Text, View } from "react-native";

export default function Pending() {
    return <View className="flex-1 relative justify-center items-center bg-[#fff]">
        
        <View className="flex-row items-center justify-center mb-[40px]">
            <Image source={require("./wait-2.png")} className="w-[100%] h-[450px] z-10" resizeMode="contain" />
        </View>

        <Text className="font-semibold text-2xl text-white z-10 p-4 text-center"> Vendedor a caminho, aguarde ... </Text>
        
        <View className="flex w-[100%] h-[50%] justify-center items-center bottom-0 absolute bg-ping-yellow opacity-50">
        </View>
    </View>
}