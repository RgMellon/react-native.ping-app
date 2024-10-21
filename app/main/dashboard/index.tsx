import { Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { useState } from 'react';
import { useDashboardViewModel } from '@/src/hooks/viewModel/useDashboardViewModel';

import { ModalComponent } from './modal.component';
import { RequestButton } from './request.button';

export default function DashboardScreen() {
 const {nearbySellers, location} = useDashboardViewModel()
 const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);
  const [modalVisible, setModalVisible] = useState(false);
  
  function handleConfirm(description?: string, price?: string) {
    if(!description || !price) {
      alert('Preencha todos os campos');
      return;
    }
  
    // Simulate sending data to server  
  }

  return (
    <View className="flex-1">
       {location && 
       <MapView 
          customMapStyle={customMapStyle}
          className='flex-1 w-full' 
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }} 
          showsUserLocation={true}>
            
          {!!nearbySellers && nearbySellers.map(seller => 
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
            
        </MapView>
       }
        
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

 const customMapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"  
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"  // Remove ícones
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#2E2D2D"  // Texto em cor escura (próximo ao #2E2D2D)
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#ffffff"  // Traço do texto branco
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e4e4e4"  // Estradas cinza claro
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#2E2D2D"  // Texto de estrada escuro
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#A1C6EA"  // Cor da água em amarelo claro (#f5d21f)
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e4e4e4"  // Parques em cinza claro
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"  // Remove elementos de trânsito para um visual mais clean
      }
    ]
  },
  {
    "featureType": "administrative",
    "stylers": [
      {
        "visibility": "off"  // Remove labels administrativas para manter minimalista
      }
    ]
  }
];
