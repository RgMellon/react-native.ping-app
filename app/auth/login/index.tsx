import { PingInput } from '@/src/components/PingInput';
import { useAuth } from '@/src/hooks/auth';
import { useFormInput } from '@/src/hooks/useFormInput';
import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-root-toast'

export default function LoginScreen() {
  const { signIn } = useAuth();


  
  const inputEmail = useFormInput();
  const inputPassword = useFormInput();

  async function handleSignIn() {
    try {

      const credentials = {
        email: inputEmail.value!,
        password: inputPassword.value!
      }

      await signIn(credentials)

    } catch (err) {
      Toast.show('Falha ao realizar login, tente novamente mais tarde', {
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

      <PingInput placeholder="Seu e-mail cadastrado" {...inputEmail} autoCapitalize='none' keyboardType='email-address' />
      <PingInput placeholder="Digite sua senha" autoCapitalize='none' secureTextEntry {...inputPassword} />

      <TouchableOpacity activeOpacity={0.9} className="bg-ping-yellow rounded-xl mt-10 h-12 w-full justify-center items-center" onPress={handleSignIn}>
        <Text className='color-black font-bold'>Login</Text>
      </TouchableOpacity>


      <TouchableOpacity activeOpacity={1} className="mt-20">
        <Text className='text-center text-sm text-gray-500'>Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}