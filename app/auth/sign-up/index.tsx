import { PingInput } from "@/src/components/PingInput";
import { useFormInput } from "@/src/hooks/useFormInput";
import { createUser } from "@/src/services/create.user";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import Toast from 'react-native-root-toast'


export default function SignUp() {
  
  const router = useRouter();

  const inputName = useFormInput();
  const inputEmail = useFormInput();
  const inputPassword = useFormInput();


  async function handleSignUp() {
    try {
      if(!inputName.value || !inputEmail.value || !inputPassword.value) {
        Toast.show('Ops, alguns campos estão em brancos, valide antes de cadastrar-se', {
          duration: Toast.durations.LONG,
        });
        return
      }

      await createUser({
        email: inputEmail.value,
        name: inputName.value,
        password: inputPassword.value,
      })

      router.push('/auth/login')

      Toast.show('Cadastro efetuado com sucesso', {
        duration: Toast.durations.LONG,
      });
    } catch (err) {
      Toast.show('Ops, falha ao cadadtrar-se, tente novament em instantes', {
        duration: Toast.durations.LONG,
      });
    }
  }

  return (
    <View className='flex-1 justify-center items-center p-[30px]'>
      <View className='justify-center items-center flex-row mb-20'>
        <View className='w-[90px] h-[90px] bg-ping-yellow rounded-xl justify-center items-center'>
          <Text className='font-bold text-3xl'>P</Text>
        </View> 
        <Text className='font-bold text-2xl mt-[20px] ml-2'>ing</Text>
      </View>


      <PingInput placeholder="Seu nome" {...inputName}  />
      <PingInput placeholder="Seu meu melhor e-mail" keyboardType="email-address"  autoCapitalize="none" {...inputEmail}/>
      <PingInput placeholder="Digite uma senha" autoCapitalize="none" secureTextEntry {...inputPassword} />

      <TouchableOpacity activeOpacity={0.9} className="bg-ping-black rounded-xl mt-10 h-12 w-full justify-center items-center" onPress={handleSignUp}>
        <Text className='text-white font-bold'>Cadastre-se</Text>
      </TouchableOpacity>


      <TouchableOpacity activeOpacity={1} className="mt-20">
        <Text className='text-center text-sm text-gray-500'>Fazer login</Text>
      </TouchableOpacity>
    </View>
  );
}