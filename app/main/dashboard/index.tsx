import { Text, TouchableOpacity, View } from 'react-native';
import { Marker } from 'react-native-maps';

import { useState } from 'react';
import { useDashboardViewModel } from '@/src/hooks/viewModel/useDashboardViewModel';

import { ModalComponent } from './modal.component';
import { RequestButton } from './request.button';
import { useAuth } from '@/src/context/auth';
import { useModalPush } from '@/src/context/modal-push';
import { ModalNewPing } from './modal.new.ping';
import { PingMap } from '@/src/components/PingMap';
import Toast from 'react-native-root-toast';
import { useNotificationToken } from '@/src/context/token-notification';
import { ModalUserPending } from './modal.user.pending';

export default function DashboardScreen() {
  const {show} = useModalPush()

  
  // const {data} = useAuth();
  const {token} = useNotificationToken();
  const {nearbySellers, location, createOrder} = useDashboardViewModel()

  const [activeModal, setActiveModal] = useState<'newPing' | 'userPending' | 'createOrder' | null>(null);

  const openModal = (modal: 'newPing' | 'userPending' | 'createOrder') => setActiveModal(modal);
  const closeModal = () => setActiveModal(null);

 
  // const openModal = () => setModalVisible(true);
  // const closeModal = () => setModalVisible(false);
  // const [modalVisible, setModalVisible] = useState(false);
  // const [modalWaitSellerConfirmation, setModalWaitSellerConfirmation] = useState(false);
  
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

      closeModal()
      // setModalVisible(false)
      // setModalWaitSellerConfirmation(true)
      
    } catch (error) {
      Toast.show('Falha ao criar ordem, tente novamente mais tarde', {
        duration: Toast.durations.LONG,
      });

      closeModal()
    }
  }

  return (
    <View className="flex-1">
      {location && 
        <PingMap latitude={location.coords.latitude} longitude={location.coords.longitude}>
          {nearbySellers?.filter(seller => seller.key !== token).map(seller => (
            <Marker 
              key={seller.key} 
              onPress={() => alert('oi')} 
              coordinate={{
                latitude: seller.latitude,
                longitude: seller.longitude
              }}
            >
              <View className='w-[30px] h-[30px] rounded-xl bg-ping-yellow justify-center items-center'>
                <Text className='font-bold'>P</Text>
              </View>
            </Marker>
          ))}
        </PingMap>
      }
      
      <ModalUserPending 
        isVisible={activeModal === 'userPending'} 
        onClose={closeModal} 
        handleSendAction={() => {}} 
      />

      <ModalNewPing 
        isVisible={show} 
        onClose={closeModal} 
        lat={location?.coords.latitude} 
        long={location?.coords.longitude} 
        handleSendAction={() => {}} 
      />

      <ModalComponent 
        isVisible={activeModal === 'createOrder'} 
        onClose={closeModal} 
        handleSendAction={handleConfirm} 
      />
        
        {/* <ModalUserPending handleSendAction={() => {} }  isVisible={modalWaitSellerConfirmation} onClose={() =>{
          setModalWaitSellerConfirmation(false)
        }}/>

        <ModalNewPing lat={location?.coords.latitude} 
          long={location?.coords.longitude} 
          isVisible={activeModal} onClose={() => {}} 
          handleSendAction={() => {}} />

        <ModalComponent isVisible={activeModal} onClose={closeModal} handleSendAction={handleConfirm} />
        
        <RequestButton onPress={openModal} /> */}

        <View className='relative'>
           <TouchableOpacity activeOpacity={0.9} onPress={() => {(openModal("createOrder"))}} className="bg-ping-yellow absolute rounded-xl bottom-10 left-10 right-0 h-12 w-[80%] justify-center items-center">
             <Text className='color-black font-bold'>Solicitar</Text>
           </TouchableOpacity>
       </View>
    </View>
  );
}

 