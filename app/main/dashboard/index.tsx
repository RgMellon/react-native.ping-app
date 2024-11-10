import { Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { useState } from 'react';
import { useDashboardViewModel } from '@/src/hooks/viewModel/useDashboardViewModel';

import { ModalComponent } from './modal.component';
import { RequestButton } from './request.button';
import { useAuth } from '@/src/context/auth';
import { useModalPush } from '@/src/context/modal-push';
import { ModalNewPing } from './modal.new.ping';
import { PingMap } from '@/src/components/PingMap';
import Toast from 'react-native-root-toast';

export default function DashboardScreen() {
  const {show} = useModalPush()
  const {data} = useAuth();
  const {nearbySellers, location, createOrder} = useDashboardViewModel()
 
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);
  const [modalVisible, setModalVisible] = useState(false);
  
  async function handleConfirm(description?: string, price?: string) {
    try {
      if(!description || !price) {
        alert('Preencha todos os campos');
        return;
      }

      await createOrder({
        amount: parseFloat(price),
        description: description,
      });
      
    } catch (error) {
      Toast.show('Falha ao criar ordem, tente novamente mais tarde', {
        duration: Toast.durations.LONG,
      });
    }
  }

  return (
    <View className="flex-1">
       {location && 
            <PingMap latitude={location.coords.latitude} longitude={location.coords.longitude}>
                {!!nearbySellers &&  nearbySellers.map(seller => 
                  seller.key !== data.user.id && 
                    <Marker key={seller.key}
                      onPress={() => {alert("oi")}}
                      coordinate={{
                          latitude: seller.latitude,
                          longitude: seller.longitude
                    }}>
                      <View className='w-[30px] h-[30px] rounded-xl bg-ping-yellow justify-center items-center'>
                        <Text className='font-bold'>P</Text>
                      </View>
                    </Marker>
                  )}
              </PingMap>
        }
        
        <ModalNewPing lat={location?.coords.latitude} long={location?.coords.longitude} isVisible={show} onClose={() => {}} handleSendAction={() => {}} />
        <ModalComponent isVisible={modalVisible} onClose={closeModal} handleSendAction={handleConfirm} />
        <RequestButton onPress={openModal} />

        <View className='relative'>
           <TouchableOpacity activeOpacity={0.9} onPress={openModal} className="bg-ping-yellow absolute rounded-xl bottom-10 left-10 right-0 h-12 w-[80%] justify-center items-center">
             <Text className='color-black font-bold'>Solicitar</Text>
           </TouchableOpacity>
       </View>
    </View>
  );
}

 